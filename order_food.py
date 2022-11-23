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

def lambda_handler(event, context):
	# Parse order details from event
	# Push the order details to a simple queue
	# Question: When the user clicks on the image of food to order, how is the data transferred to lambda
	body = event["orderDetails"] # change orderDetails to the param that have that info
	sqs = boto3.client('sqs')
    sqs.send_message(
        QueueUrl="InsertQueueURL",
        MessageBody = json.dumps(body)
    )
    # Return based on the response structure expected
	return -1;

