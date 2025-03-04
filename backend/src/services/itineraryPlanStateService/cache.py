import redis

class RedisCache:
    def __init__(self, host='localhost', port=6379):
        self.cache = redis.Redis(host=host, port=port)

    def set(self, key, value):
        try:
            return self.cache.set(key, value)
        except redis.exceptions.ConnectionError:
            print("Redis connection error")
        except redis.exceptions.ResponseError:
            print(f"Key {key} already exists in cache")

    def get(self, key):
        try:
            return self.cache.get(key)
        except redis.exceptions.ConnectionError:
            print("Redis connection error")
        except redis.exceptions.ResponseError:
            print(f"Key {key} not found in cache")
            return None
        
redis_cache = RedisCache()