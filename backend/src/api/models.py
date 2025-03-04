from pydantic import BaseModel, Field

class ItineraryRequest(BaseModel):
    user_prompt: str

class ItineraryResponse(BaseModel):
    response: str