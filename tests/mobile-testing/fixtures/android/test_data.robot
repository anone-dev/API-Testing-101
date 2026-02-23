*** Variables ***
# Test Data for Android SIT Environment

# User Credentials
${VALID_USERNAME}    testuser@example.com
${VALID_PASSWORD}    Test123!
${INVALID_USERNAME}  invalid@example.com
${INVALID_PASSWORD}  wrongpass

# Test Users
&{ADMIN_USER}        username=admin@example.com    password=Admin123!    role=admin
&{REGULAR_USER}      username=user@example.com     password=User123!     role=user
&{PREMIUM_USER}      username=premium@example.com  password=Premium123!  role=premium

# Payment Test Data
&{VALID_CARD}        number=4111111111111111    cvv=123    expiry=12/25    name=Test User
&{INVALID_CARD}      number=4000000000000002    cvv=999    expiry=01/20    name=Invalid User

# Profile Test Data
&{PROFILE_DATA}      firstName=John    lastName=Doe    email=john.doe@example.com    phone=+1234567890

# App Configuration
${APP_TIMEOUT}       30s
${ELEMENT_TIMEOUT}   10s
${IMPLICIT_WAIT}     5s