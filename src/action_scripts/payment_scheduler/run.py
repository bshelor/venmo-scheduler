from venmo_api import Client
import os

client = Client(access_token=os.environ['TOKEN'])
# client = Client(access_token='[REDACTED]')

profile = client.user.get_my_profile()


print("My profile:", profile)