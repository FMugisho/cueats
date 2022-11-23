import boto3
import json
credentials = boto3.Session().get_credentials()

def get_menu():
	# Connect to DB
	# Create nested dictionary to store dining information from DB
	# return dictionary (Check Type of data)
	# Comment: Maybe this should be another lambda function or part of the scraping lambda
	dynamodb = boto3.resource(
        'dynamodb',
        aws_access_key_id=credentials.access_key,
        aws_secret_access_key=credentials.secret_key,
        region_name='us-east-1',
    )
    table = dynamodb.Table('#NameOfTable')
    response = table.scan()
	data = response['Items']

	while 'LastEvaluatedKey' in response:
	    response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
	    data.extend(response['Items'])

	return data;

