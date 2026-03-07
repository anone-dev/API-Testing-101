import yaml
from pathlib import Path
from typing import Dict, Any

class TestDataLoader:
    """Helper class for loading test data from YAML files"""
    
    def __init__(self):
        self.base_dir = Path(__file__).parent.parent
        self.fixtures_dir = self.base_dir / 'fixtures'
    
    def load_test_data(self, env: str = 'sit', platform: str = 'android') -> Dict[str, Any]:
        """
        Load test data for specific environment and platform
        
        Args:
            env: 'local' or 'sit'
            platform: 'android' or 'ios'
        
        Returns:
            Dictionary containing test data
        """
        file_path = self.fixtures_dir / f"testdata.{env}.{platform}.yaml"
        
        if not file_path.exists():
            raise FileNotFoundError(f"Test data file not found: {file_path}")
        
        with open(file_path, 'r', encoding='utf-8') as f:
            return yaml.safe_load(f)
    
    def load_translation(self, language: str = 'en') -> Dict[str, Any]:
        """
        Load translation file
        
        Args:
            language: 'en' or 'th'
        
        Returns:
            Dictionary containing translations
        """
        file_path = self.fixtures_dir / 'translation' / f"{language}.yaml"
        
        if not file_path.exists():
            raise FileNotFoundError(f"Translation file not found: {file_path}")
        
        with open(file_path, 'r', encoding='utf-8') as f:
            return yaml.safe_load(f)
    
    def get_user_credentials(self, env: str = 'sit', platform: str = 'android', user_type: str = 'valid') -> Dict[str, str]:
        """Get user credentials for login"""
        data = self.load_test_data(env, platform)
        return data['USERS'][user_type]
