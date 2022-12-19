import boto3
import json

def send_email(request):
    SENDER = "ColumbiaUEats@gmail.com" # must be verified in AWS SES Email
    RECIPIENT = "debimulugeta1999@gmail.com" # must be verified in AWS SES Email

    SUBJECT = "Delivery Request"
    BODY_TEXT = ("A customer has requested delivery from " + request['unstructured']["dining_location"] + ". You can find the order details below:\n "
                 "Dining Location: " + request['unstructured']["dining_location"] + "\n"
                 "Ordered Food: " + request['unstructured']["order_name"] + "\n"
                 "Delivery Location: " + request['unstructured']["location"] + "\n")

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
    # Sends email to delivery person about the order
    for record in event['Records']:
        order = record['body']
        order_info = json.loads(order)
        send_email(order_info)