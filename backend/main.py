from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import dotenv
import os
from mira_sdk import MiraClient, Flow
import mira_sdk.exceptions
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
dotenv.load_dotenv()
API_KEY = os.getenv("MY_API_KEY")
if not API_KEY:
    raise EnvironmentError("MY_API_KEY not set in environment variables.")

# Initialize FastAPI and MiraClient
app = FastAPI()
client = MiraClient(config={"API_KEY": API_KEY})

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    prime_input_1: str
    prime_input_2: str
    prime_input_3: str
    prime_input_4: str
    prime_input_5: str
    prime_input_6: str
    prime_input_7: str
    prime_input_8: str

@app.post("/")
async def process_flow(data: InputData):
    logger.info(f"Received request with data: {data}")
    try:
        input_dict = data.model_dump()
        flow1 = Flow(source="sleep.yaml")
        flow2 = Flow(source="gym.yaml")
        response1 = client.flow.test(flow1, input_dict)
        flow3 = Flow(source="nutrition.yaml")
        final_flow = Flow(source="final.yaml")
        
        response2 = client.flow.test(flow2, input_dict)
        response3 = client.flow.test(flow3, input_dict)
        
        input_dict["input3"] = response1
        input_dict["input1"] = response2
        input_dict["input2"] = response3
        
        final_response = client.flow.test(final_flow, input_dict)
        logger.info(f"Sending response: {final_response}")
        return {"response": final_response}
    except Exception as exc:
        logger.error(f"Error processing request: {exc}")
        raise HTTPException(status_code=500, detail=str(exc))
