# Mobile Testing Commands Quick Reference

## Setup
```bash
# Install dependencies
pip install -r requirements.txt
npm install -g appium
appium driver install uiautomator2
appium driver install xcuitest

# Start Appium
appium
```

## Android Tests
```bash
# SIT Environment
robot tests-mobile/android/
robot tests-mobile/android/auth/login.robot
robot tests-mobile/tagged-tests/smoke.android.robot
robot tests-mobile/tagged-tests/regression.android.robot

# UAT Environment
robot --variable ENV:uat tests-mobile/android/

# With tags
robot --include smoke tests-mobile/android/
robot --include regression tests-mobile/android/
robot --include auth tests-mobile/android/
```

## iOS Tests
```bash
# SIT Environment
robot tests-mobile/ios/
robot tests-mobile/ios/auth/login.robot
robot tests-mobile/tagged-tests/smoke.ios.robot
robot tests-mobile/tagged-tests/regression.ios.robot

# UAT Environment
robot --variable ENV:uat tests-mobile/ios/

# With tags
robot --include smoke tests-mobile/ios/
robot --include regression tests-mobile/ios/
```

## Parallel Execution
```bash
# Run with pabot
pabot --processes 2 tests-mobile/android/
pabot --processes 2 tests-mobile/android/ tests-mobile/ios/

# Run specific tests in parallel
pabot --processes 2 --include smoke tests-mobile/
```

## Reports
```bash
# Generate reports in specific directory
robot --outputdir results tests-mobile/android/

# View reports
open results/report.html
open results/log.html
```

## Device Management
```bash
# Android
adb devices
adb kill-server && adb start-server

# iOS
xcrun simctl list devices
xcrun simctl boot "iPhone 14 Pro"
xcrun simctl shutdown "iPhone 14 Pro"
```

## Debugging
```bash
# Run with debug level logging
robot --loglevel DEBUG tests-mobile/android/auth/login.robot

# Run Appium with debug logs
appium --log-level debug

# Check Appium doctor
appium-doctor --android
appium-doctor --ios
```

## App Management
```bash
# Download from Azure DevOps
az pipelines runs artifact download --artifact-name android-sit --path apps/android/sit/

# Download from AWS S3
aws s3 cp s3://builds/android/sit/app-latest.apk apps/android/sit/
```

## Database
```bash
# Setup database
mysql -u root -p testdb < db-scripts/setup.sit.sql

# Cleanup database
mysql -u root -p testdb < db-scripts/cleanup.sql
```
