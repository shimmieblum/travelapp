from flask import Blueprint, request, jsonify
from ..services.promptParserService.prompt_validator import (
    validate_prompt,
    PromptValidationResponse,
)
from ..services.promptParserService.prompt_parser import parse_prompt
import json

api = Blueprint("api", __name__)


@api.route("/itinerary", methods=["POST"])
def generate_itinerary():
    user_prompt = request.json.get("prompt")
    print("hi")
    validation_response: PromptValidationResponse = validate_prompt(user_prompt)
    print("hi")
    response = parse_prompt(user_prompt, validation_response)
    print(response.toJSON())
    return jsonify({"response": response.toJSON()}), 200
