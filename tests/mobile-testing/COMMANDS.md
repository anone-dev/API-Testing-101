# Mobile Testing Commands Quick Reference

## Setup
```bash
# Install dependencies
pip install -r requirements.txt

# Start Appium
appium
```

## Variable Files (Environment × Platform)
| File | Platform | Environment |
|------|----------|-------------|
| `fixtures/testdata.local.android.yaml` | Android | Local |
| `fixtures/testdata.local.ios.yaml` | iOS | Local |
| `fixtures/testdata.sit.android.yaml` | Android | SIT |
| `fixtures/testdata.sit.ios.yaml` | iOS | SIT |

## Run Tests
```bash
# รูปแบบ: robot --variable ENV:<env> --variable PLATFORM:<platform> [options] <suite>

# Android Local (default)
robot tests-mobile/

# Android SIT
robot --variable ENV:sit tests-mobile/

# iOS Local
robot --variable PLATFORM:ios tests-mobile/

# iOS SIT
robot --variable ENV:sit --variable PLATFORM:ios tests-mobile/
```

## Specific Suite
```bash
robot --variable ENV:local --variable PLATFORM:android tests-mobile/auth/auth.robot
robot --variable ENV:local --variable PLATFORM:android tests-mobile/books/books.robot
robot --variable ENV:local --variable PLATFORM:android tests-mobile/orders/orders.robot
robot --variable ENV:sit   --variable PLATFORM:android tests-mobile/
robot --variable ENV:sit   --variable PLATFORM:ios     tests-mobile/
```

## With Tags
```bash
robot --variable ENV:local --variable PLATFORM:android --include smoke      tests-mobile/
robot --variable ENV:local --variable PLATFORM:android --include regression tests-mobile/
robot --variable ENV:sit   --variable PLATFORM:android --include Feature:Auth tests-mobile/
```

## With Output Directory
```bash
robot --variable ENV:local --variable PLATFORM:android --outputdir results/android-local tests-mobile/
robot --variable ENV:sit   --variable PLATFORM:ios     --outputdir results/ios-sit       tests-mobile/
```

## Parallel Execution
```bash
pip install robotframework-pabot

pabot --processes 2 --variable ENV:local --variable PLATFORM:android tests-mobile/
pabot --processes 2 --variable ENV:sit   --variable PLATFORM:ios     tests-mobile/
```

## Reports
```bash
# View reports (Windows)
start results\android-local\report.html

# View reports (macOS/Linux)
open results/android-local/report.html
```

## Device Management
```bash
# Android
adb devices
adb kill-server && adb start-server

# iOS
xcrun simctl list devices
xcrun simctl boot "iPhone 14"
xcrun simctl shutdown "iPhone 14"
```

## Debugging
```bash
robot --variable ENV:local --variable PLATFORM:android --loglevel DEBUG tests-mobile/auth/auth.robot
appium --log-level debug
appium-doctor --android
appium-doctor --ios
```

## App Management
```bash
# Download from Azure DevOps
az pipelines runs artifact download --artifact-name android-sit --path apps/

# Download from AWS S3
aws s3 cp s3://builds/android/sit/app-latest.apk apps/app-release.apk
```

## Database
```bash
mysql -u root -p testdb < db-scripts/setup.sit.sql
mysql -u root -p testdb < db-scripts/cleanup.sql
```
