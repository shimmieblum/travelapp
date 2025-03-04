
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
validationPrompt = """
You are a prompt validator. your job is to check if a prompt is valid.

The prompt should be describing a holiday for the user. 

For example: 
    * design a 3 day trip to Paris
    * I want to go on a holiday somewhere hot during the winter with some culture and some beach days.

To be valid it must contain information about:
    * a destination
    * a duration
    * a budget
    * time of year

Respond with validation about each category in json format.

note the prompt may be exact or general. 
For example if the prompt says 'i want to go on a holiday somewhere hot during the winter with some culture and some beach days' then you would destination is valid as there is a good description of the destination.
{
    "destination_valid": true,

For example:
{
    "destination_valid": true,
    "duration_valid": true,
    "budget_valid": true,
    "time_of_year_valid": true
}
"""


class PromptValidationResponse(BaseModel):
    destination_valid: bool
    duration_valid: bool
    budget_valid: bool
    time_of_year_valid: bool


client = OpenAI()

def validate_prompt(prompt: str):
    try:
        response = client.beta.chat.completions.parse(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": validationPrompt},
                {"role": "user", "content": prompt},
            ],
            response_format=PromptValidationResponse,
        )
        validation_response: PromptValidationResponse = response.choices[0].message.parsed
        return validation_response
    except Exception as e:
        print(e)
