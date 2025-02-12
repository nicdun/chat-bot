from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


class Settings(BaseSettings):
    GOOGLE_GEMINI_API_KEY: str
    model_config = SettingsConfigDict(env_file=".env")


@lru_cache
def get_env():
    return Settings()
