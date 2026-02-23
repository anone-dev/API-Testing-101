# Mobile App Binaries

## Directory Structure
- `android/sit/` - Android SIT builds (.apk)
- `android/uat/` - Android UAT builds (.apk)
- `ios/sit/` - iOS SIT builds (.app for simulator, .ipa for device)
- `ios/uat/` - iOS UAT builds (.app for simulator, .ipa for device)

## Naming Convention
- `app-v{version}.{ext}` - Versioned builds (e.g., app-v1.0.0.apk)
- `app-latest.{ext}` - Latest build (symlink or copy)
- `app-{date}.{ext}` - Date-based builds (e.g., app-2024-01-15.apk)

## How to Update Apps

### Download from CI/CD
```bash
# Azure DevOps
az pipelines runs artifact download --artifact-name android-sit --path apps/android/sit/

# AWS S3
aws s3 cp s3://builds/android/sit/app-latest.apk apps/android/sit/

# Azure Blob Storage
az storage blob download --account-name myaccount --container-name apps --name android/sit/app-latest.apk --file apps/android/sit/app-latest.apk
```

### Manual Upload
1. Get build from developer or build server
2. Copy to appropriate folder: `apps/{platform}/{env}/`
3. Rename to `app-latest.{ext}` or keep version name
4. Update `versions.json` with new version info

## App Versions
Current versions are tracked in `versions.json` at the root of apps folder.

## Storage Options

### Option 1: Local Storage (Development)
- Store apps locally in `apps/` folder
- Add to `.gitignore` (files are large)
- Good for local testing

### Option 2: Git LFS (Small Teams)
```bash
git lfs install
git lfs track "apps/**/*.apk"
git lfs track "apps/**/*.ipa"
git lfs track "apps/**/*.app"
```

### Option 3: Cloud Storage (Recommended for Teams)
- AWS S3
- Azure Blob Storage
- Google Cloud Storage
- Download before running tests

## Best Practices
1. ✅ Always use versioned names for builds
2. ✅ Keep `app-latest.*` as symlink or copy of current version
3. ✅ Update `versions.json` when adding new builds
4. ✅ Clean up old versions periodically
5. ✅ Use cloud storage for team collaboration
6. ❌ Don't commit large app files to Git (use .gitignore)
7. ❌ Don't mix SIT and UAT builds
