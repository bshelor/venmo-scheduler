from venmo_api import Client
import os
from datetime import datetime
import ast
import pandas as pd

DEFAULT_DYNAMIC_FIELDS = {
  'month': lambda: datetime.now().strftime('%B')
}

def _renderDescStr(desc: str, dynamic_fields):
  rendered = desc
  dynamic_fields_arr = ast.literal_eval(dynamic_fields)
  for field in dynamic_fields_arr:
    if field in DEFAULT_DYNAMIC_FIELDS.keys():
      dynamicReplace = DEFAULT_DYNAMIC_FIELDS[field]()
      strToFind = "{{" + field + "}}"
      rendered = rendered.replace(strToFind, str(dynamicReplace))
      continue
    print('Cannot render dynamic field - invalid dynamic option', field)
  return rendered

def _usernameIsValid(user, expectedUsername: str):
  return user.username == expectedUsername

def fetchSchedules(filename: str):
  df = pd.read_csv(filename)
  return df

def makePayment(schedule):
  client = Client(access_token=os.environ['TOKEN'])
  userToPay = client.user.search_for_users(query=schedule['payee'])
  if (_usernameIsValid(userToPay, schedule['payee'])):
    return

def makeRequest(schedule):
  client = Client(access_token=os.environ['TOKEN'])
  [userToRequest] = client.user.search_for_users(query=schedule['payer'])
  if (_usernameIsValid(userToRequest, schedule['payer'])):
    desc = _renderDescStr(schedule['description'], schedule['dynamic_text'])

    client.payment.request_money(
      amount=schedule['amount'],
      note=desc,
      target_user_id=userToRequest.id)

    print('Requested $' + str(schedule['amount']) + ' from user: ' + schedule['payer'] +
          ' with description: ' + str(desc))
    return
  print('Couldn\'t find user to request money from', schedule['payer'])

def execSched(schedule):
  if (schedule['type'] == 'payment'):
    makePayment(schedule)
  elif (schedule['type'] == 'request'):
    makeRequest(schedule)

def executeSchedules(schedules):
  for index, row in schedules.iterrows():
    execSched(row)

def main():
  schedules = fetchSchedules('./action_scripts/payment_scheduler/schedules.csv')
  executeSchedules(schedules)

main()