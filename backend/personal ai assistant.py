import dotenv
import mira_sdk
import os
from mira_sdk import MiraClient, Flow
import mira_sdk.exceptions
dotenv.load_dotenv()
client = MiraClient(config={"API_KEY": os.getenv("MY_API_KEY")})
input_dict = {"prime_input_1": "copiously","prime_input_2":"very stressful","prime_input_3":"around 9 pm","prime_input_4":"around 5 am","prime_input_5":"heart disease","prime_input_6":"very little excericise","prime_input_7":"male"}
flow1=Flow(source="sleep.yaml")
flow2=Flow(source="gym.yaml")
response1=client.flow.test(flow1,input_dict)
flow3=Flow(source="nutrition.yaml")
flow=Flow(source="final.yaml")
input_dict["prime_input_8"]="want 6 pack abs"
response2=client.flow.test(flow2,input_dict)
response3=client.flow.test(flow3,input_dict)
input_dict["input3"]=response1
input_dict["input1"]=response2
input_dict["input2"]=response3
response = client.flow.test(flow, input_dict) 
print(response)
