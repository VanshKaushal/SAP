import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "SAP Cognitive Workflow Orchestra"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./sap_orchestra.db")
    OPENROUTER_API_KEY: str = os.getenv("OPENROUTER_API_KEY", "")
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    
    # AI Models
    DEEPSEEK_MODEL: str = "deepseek/deepseek-chat"
    QWEN_MODEL: str = "qwen/qwen-72b-chat"
    GEMINI_MODEL: str = "google/gemini-pro"
    LLAMA_MODEL: str = "meta-llama/llama-3-70b-instruct"

settings = Settings()
