import boto3
import json
from datetime import datetime

def lambda_handler(event, context):
    """
    Parse order details from event; Push the order details to a simple queue
    Question: When the user clicks on the image of food to order, how is the data transferred
    to lambda
    """

    body = event["orderDetails"]  # change orderDetails to the param that have that info
    sqs = boto3.client("sqs")
    sqs.send_message(QueueUrl="InsertQueueURL", MessageBody=json.dumps(body))
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

