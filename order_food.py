import boto3
import json
from datetime import datetime


def send_email(request):
    SENDER = "ColumbiaUEats@gmail.com"  # must be verified in AWS SES Email
    RECIPIENT = request['email']  # must be verified in AWS SES Email

    SUBJECT = "Order Confirmation"
    BODY_TEXT = ("Your order is confirmed. You have ordered " + request['unstructured']['order_name'] + "from " + request['unstructured']['dining_location'])

    BODY_HTML_1 = """<html>
        <head></head>
        <body><div>
            """
    BODY_HTML_2 = """</div></body>
        </html>
            """

    BODY_HTML = BODY_HTML_1 + "\n" + BODY_TEXT + "\n" + BODY_HTML_2

    client = boto3.client('ses', region_name=AWS_REGION)

    # Try to send the email.
    try:
        # Provide the contents of the email.
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
    """
    Parse order details from event; Push the order details to a simple queue and sends email
    Question: When the user clicks on the image of food to order, how is the data transferred
    to lambda
    """
    body = event["messages"][0]  # change orderDetails to the param that have that info
    sqs = boto3.client("sqs")
    sqs.send_message(
        QueueUrl="https://sqs.us-east-1.amazonaws.com/420958655029/orderQueue", 
        MessageBody=json.dumps(body)
    )
    send_email(body)
    return {
        "messages": [
            {
                "type": "unstructured",
                "unstructured": {
                    "id": "1579",  # the order id
                    "uid": "15799",  # the user id
                    "text": "philly cheesesteak",  # some order details
                    "timestamp": str(datetime.now().strftime("%H:%M:%S")),
                },
            }
        ]
    }
