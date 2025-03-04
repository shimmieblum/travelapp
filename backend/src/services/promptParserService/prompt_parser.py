from openai import OpenAI
from dotenv import load_dotenv
from pydantic import BaseModel
from .prompt_validator import PromptValidationResponse
import json
load_dotenv()

client = OpenAI()

parsingPrompt = """
You are a prompt parser. your job is to parse a prompt.

The prompt should be describing a holiday for the user your job is to identify the {slice} the user is looking for.

For example: 
Prompt: "design a 3 day trip to Paris"
the destination is "Paris". the duration is "3 days". the budget & time of year are not defined. 


"I want to go on a holiday somewhere hot during the winter with some culture and some beach days"
destination: "Somewhere hot during the winter with some culture and beaches"
duration: "None"
budget: "None"
time_of_year: "questioners winter"

valid response should ONLY BE the {slice}

respond with just your derived answer for the {slice}. 

The response may be an exact response for example 'Paris' or a more generic response for example 'Somewhere hot during the winter with some culture and beaches'. 

make sure to include as much information as possible about the {slice} in the response that can be derived from the prompt. but don't add any information that is not in the prompt.
"""


class PromptParsingResponse:
    destination: str
    duration: str
    budget: str
    time_of_year: str

    def toJSON(self):
        return json.dumps(
            self,
            default=lambda o: o.__dict__, 
            sort_keys=True,
            indent=4)


def parse_prompt(user_prompt: str, validation_response: PromptValidationResponse):
    response = PromptParsingResponse()
    if validation_response.destination_valid:
        response.destination = _extract_slice_from_prompt(user_prompt, "destination")
    if validation_response.duration_valid:
        response.duration = _extract_slice_from_prompt(user_prompt, "duration")
    if validation_response.budget_valid:
        response.budget = _extract_slice_from_prompt(user_prompt, "budget")
    if validation_response.time_of_year_valid:
        response.time_of_year = _extract_slice_from_prompt(user_prompt, "time_of_year")
    return response


def _extract_slice_from_prompt(user_prompt: str, slice: str):
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": parsingPrompt.format(slice=slice)},
            {"role": "user", "content": user_prompt},
        ],
    )
    return response.choices[0].message.content
