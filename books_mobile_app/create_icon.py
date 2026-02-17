"""
Simple App Icon Generator
Creates a basic icon with book emoji for Books App
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_icon():
    # Icon sizes for Android
    sizes = {
        'mdpi': 48,
        'hdpi': 72,
        'xhdpi': 96,
        'xxhdpi': 144,
        'xxxhdpi': 192
    }
    
    # Create assets folder if not exists
    os.makedirs('assets', exist_ok=True)
    
    # Create main icon (1024x1024)
    size = 1024
    img = Image.new('RGBA', (size, size), color=(0, 0, 0, 0))  # โปร่งใส
    draw = ImageDraw.Draw(img)
    
    # Draw circle with gradient colors
    draw.ellipse([0, 0, size, size], fill='#667eea')
    draw.ellipse([50, 50, size-50, size-50], fill='#764ba2')
    
    # Try to add text (book emoji or text)
    try:
        # Use a large font size
        font_size = 500
        font = ImageFont.truetype("seguiemj.ttf", font_size)  # Windows emoji font
        text = "📚"
    except:
        # Fallback to default font with text
        font = ImageFont.load_default()
        text = "BOOKS"
        font_size = 200
    
    # Get text size and center it
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (size - text_width) // 2
    y = (size - text_height) // 2 - 50
    
    # Draw text
    draw.text((x, y), text, fill='white', font=font)
    
    # Save main icon
    img.save('assets/icon.png')
    print('✅ Created: assets/icon.png (1024x1024)')
    
    # Create Android icons
    android_res = 'android/app/src/main/res'
    
    for density, icon_size in sizes.items():
        folder = f'{android_res}/mipmap-{density}'
        os.makedirs(folder, exist_ok=True)
        
        # Resize and save
        resized = img.resize((icon_size, icon_size), Image.Resampling.LANCZOS)
        resized.save(f'{folder}/ic_launcher.png')
        print(f'✅ Created: {folder}/ic_launcher.png ({icon_size}x{icon_size})')
    
    print('\n🎉 Icon generation complete!')
    print('\nNext steps:')
    print('1. Run: build-apk.bat')
    print('2. Install: adb install -r build\\app\\outputs\\flutter-apk\\app-release.apk')

if __name__ == '__main__':
    try:
        create_icon()
    except Exception as e:
        print(f'❌ Error: {e}')
        print('\nAlternative: Use online tool at https://icon.kitchen/')
