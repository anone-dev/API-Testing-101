import yaml
from pathlib import Path
from typing import Dict, Any

class TestDataLoader:
    """Helper class for loading test data from YAML files"""
    
    def __init__(self):
        self.base_dir = Path(__file__).parent.parent
        self.fixtures_dir = self.base_dir / 'fixtures'
    
    def load_test_data(self, platform: str, env: str) -> Dict[str, Any]:
        """
        Load test data for specific platform and environment
        
        Args:
            platform: 'android' or 'ios'
            env: 'sit' or 'uat'
        
        Returns:
            Dictionary containing test data
        """
        file_path = self.fixtures_dir / platform / f"{env}.yaml"
        
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
    
    def get_user_credentials(self, platform: str, env: str, user_type: str = 'valid') -> Dict[str, str]:
        """Get user credentials for login"""
        data = self.load_test_data(platform, env)
        return data['USERS'][user_type]
