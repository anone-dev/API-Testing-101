"""
Environment Loader for Robot Framework
Loads .env files and makes them available as Robot variables
"""
import os
from pathlib import Path
from dotenv import load_dotenv


class EnvLoader:
    """Load environment variables from .env files"""
    
    def __init__(self):
        self.env_vars = {}
    
    def load_env_file(self, env='sit'):
        """
        Load environment file based on environment name
        
        Args:
            env: Environment name (local, sit, uat)
        """
        base_path = Path(__file__).parent.parent
        
        if env == 'local':
            env_file = base_path / '.env.local'
        elif env == 'uat':
            env_file = base_path / '.env.uat'
        else:
            env_file = base_path / '.env'
        
        if env_file.exists():
            load_dotenv(env_file)
            print(f"Loaded environment file: {env_file}")
        else:
            print(f"Warning: Environment file not found: {env_file}")
    
    def get_env_variable(self, key, default=None):
        """Get environment variable value"""
        return os.getenv(key, default)
    
    def get_all_env_variables(self):
        """Get all environment variables as dictionary"""
        return dict(os.environ)


# Robot Framework Library Interface
def load_environment(env='sit'):
    """Load environment configuration"""
    loader = EnvLoader()
    loader.load_env_file(env)
    return loader


def get_variable(key, default=None):
    """Get environment variable"""
    return os.getenv(key, default)
