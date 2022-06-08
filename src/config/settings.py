import os
import urllib.parse
from typing import Any, List, Optional

from dotenv import load_dotenv
from pydantic import BaseSettings, PostgresDsn, validator


class Settings(BaseSettings):
    PORT: int = 8000

    POSTGRES_HOST: str = ""
    POSTGRES_DB: str = ""
    POSTGRES_USER: str = ""
    POSTGRES_PASSWORD: str = ""
    DATABASE_URL: Optional[str] = None

    GITHUB_URL: Optional[str] = "https://api.github.com/search/repositories"

    ALLOWED_HOSTS: List[str] = ["*"]

    @validator("ALLOWED_HOSTS", pre=True)
    def allow_hosts(cls, v: Optional[str]) -> Optional[List[str]]:
        if isinstance(v, str):
            return v.split(",")
        return ["*"]

    @validator("DATABASE_URL", pre=True)
    def assemble_db_connection(cls, v: Optional[str]) -> Any:
        if isinstance(v, str):
            return v
        return PostgresDsn.build(
            scheme="postgresql+asyncpg",
            user=os.getenv("POSTGRES_USER"),
            port=os.getenv("POSTGRES_PORT") or "5432",
            password=urllib.parse.quote(os.getenv("POSTGRES_PASSWORD") or ""),
            host=os.getenv("POSTGRES_HOST"),
            path=f"/{os.getenv('POSTGRES_DB') or ''}",
        )


load_dotenv(".env.local")
settings = Settings()
