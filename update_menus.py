#!/usr/bin/env python3
# coding: utf-8

import requests
import json
import zlib
import datetime
from dateutil import parser as timeparser

DINING_HOST = 'https://dining.columbia.edu'
LOCATIONS_ENDPOINT = DINING_HOST + '/sites/default/files/cu_dining/cu_dining_nodes.json'
MEALS_ENDPOINT = DINING_HOST + '/cu_dining/rest/meals'
MENU_TYPES_ENDPOINT = DINING_HOST + '/sites/default/files/cu_dining/cu_dining_terms.json'
MENUS_ENDPOINT = DINING_HOST + '/cu_dining/rest/menus/nested'


def get_json(url):
    res = requests.get(url)
    return json.loads(res.text)

def get_location_key(location):
    return zlib.crc32(location['title'].encode())

def generate_locations(location_endpoint):
    locations = get_json(location_endpoint)['locations']

    result_locations = {}
    for location in locations:
        # This key will be used to index the details table
        location_id = get_location_key(location)

        # If we need more than just the title (name) of the location at this
        # stage, we can add it here
        result_locations[location_id] = location['title']

    # For working with Columbia's API, we also need the "nid", which seems to be
    # an arbitrarily assigned id value for any object, so we create a mapping
    # from that to our own location_ids here
    nid_to_location = {}
    for location in locations:
        nid_to_location[location['nid']] = get_location_key(location)

    return result_locations, nid_to_location

def get_meals(meals_endpoint):
    meals = get_json(meals_endpoint)

    # The meals response is an array, so convert it to dictionary keyed by meal
    # 'nid'
    meals_dict = {}
    for meal in meals:
        meals_dict[meal['nid']] = meal

    return meals_dict

def get_dining_keyword_mappings(menu_types_endpoint):
    menu_types = get_json(menu_types_endpoint)

    meal_types = {} # nid -> breakfast, lunch etc.
    stations = {} # nid -> Action, Fusion etc.

    for nid,val in menu_types['types'].items():
        meal_types[nid] = val['name']
    for nid,val in menu_types['stations'].items():
        stations[nid] = val['name']

    return meal_types, stations


def get_menus(menus_endpoint):
    return get_json(MENUS_ENDPOINT)

def generate_result_menus(target_date, menus, nid_to_location, meal_types,
                          stations, meals):
    def create_if_not_exists(m, k, v):
        if k not in m:
            m[k] = v
        return m[k]

    menu_details = {}
    for menu in menus:
        location_id = nid_to_location[menu['locations'][0]]
        cur_menu_details = create_if_not_exists(menu_details, location_id, {})
        for date_range in menu['date_range_fields']:
            start = timeparser.parse(date_range['date_from'])
            end = timeparser.parse(date_range['date_to'])

            if start > target_date or end < target_date:
                continue

            cur_meal_type = meal_types[date_range['menu_type'][0]]
            cur_menu = create_if_not_exists(cur_menu_details, cur_meal_type, {})
            for station in date_range['stations']:
                station_name = stations[station['station'][0]]
                cur_items = create_if_not_exists(cur_menu, station_name, [])
                cur_items.extend([meals[meal]['title'] for meal in station['meals']])

    return menu_details


def main():
    locations, nid_to_location = generate_locations(LOCATIONS_ENDPOINT)

    # TODO: upload these locations to locatinons dynamo table

    meals = get_meals(MEALS_ENDPOINT)
    meal_types, stations = get_dining_keyword_mappings(MENU_TYPES_ENDPOINT)
    menus = get_menus(MENUS_ENDPOINT)

    today_date = timeparser.parse("2022-11-28")
    location_menus = generate_result_menus(today_date, menus, nid_to_location,
                                           meal_types, stations, meals)

    # TODO: upload menus dict to dynamo table

    print(location_menus)

if __name__ == '__main__':
    main()
