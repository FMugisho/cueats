import boto3
import json

def send_email(request):
	SENDER = "cueats@gmail.com" # must be verified in AWS SES Email
    RECIPIENT = request['email'] # must be verified in AWS SES Email

    SUBJECT = "Order Confirmation"
    BODY_TEXT = ("Your order is confirmed. You have ordered " + request['foodName'] + "from " + request['diningName'])

    BODY_HTML_1 = """<html>
    <head></head>
    <body><div>
        """ 
    BODY_HTML_2 = """</div></body>
    </html>
        """
    
    BODY_HTML = BODY_HTML_1 + "\n" + BODY_TEXT + "\n" + BODY_HTML_2    

    client = boto3.client('ses',region_name=AWS_REGION)

    # Try to send the email.
    try:
        #Provide the contents of the email.
        response = client.send_email(
            Destination={
                'ToAddresses': [
                    RECIPIENT,
                ],
            },
            Message={
                'Body': {
                    'Html': {
        
                        'Data': BODY_HTML
                    },
                    'Text': {
        
                        'Data': BODY_TEXT
                    },
                },
                'Subject': {

                    'Data': SUBJECT
                },
            },
            Source=SENDER
        )
    # Display an error if something goes wrong.	
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print("Email sent! Message ID:"),
        print(response['MessageId'])


def lambda_handler(event, context):
	# Polls order from the queue and processes it
	# Add the order to the queue for the delivery person (SQS2)
	# Sends email to customer about the status of the order (Confirmation)
	for record in event['Records']:
		order = record['body']
		order_info = json.loads(order)

		sqs = boto3.client('sqs')
    	sqs.send_message(
        	QueueUrl="InsertDriverSQSURL",
        	MessageBody = json.dumps(order_info) # Check the structure of order_info
    	)

    	send_email(order_info)
