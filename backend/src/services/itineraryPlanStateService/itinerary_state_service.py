from . import redis_cache
import pickle
from pydantic import BaseModel


class ItineraryState(BaseModel):
    session_id: str
    destination: str | None
    duration: str | None
    budget: str | None
    time_of_year: str | None


def format_key(session_id):
    return f"itinerary_state:{session_id}"


def get_itinerary(session_id) -> ItineraryState | None:
    cached_state = redis_cache.get(format_key(session_id))
    if cached_state:
        print("Itinerary found in cache")
        return pickle.loads(cached_state)
    print("Itinerary not found in cache")
    return None


def save_itinerary(session_id, itineraryState: ItineraryState):
    redis_cache.set(format_key(session_id), pickle.dumps(itineraryState))
