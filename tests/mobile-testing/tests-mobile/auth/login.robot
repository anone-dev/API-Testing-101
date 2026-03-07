*** Settings ***
Documentation    [PBI-0001] Login with Token Feature
...              Test suite for Login with Token mode
Resource         ../../pages/auth/AuthPage.resource
Resource         ../../pages/common/BasePage.resource
Variables        ../../fixtures/testdata.${ENV}.${PLATFORM}.yaml

Suite Setup      Setup Mobile Test
Suite Teardown   Teardown Mobile Test
Test Teardown    Run Keyword If Test Failed    Capture Page Screenshot

*** Variables ***
# กำหนดค่า Default ไว้ (เผื่อลืมใส่ตอนรัน)
${PLATFORM}    android
${ENV}         local
${HEADLESS}    false

*** Test Cases ***
[TC-L001] User Should Login With Valid Token Successfully
    [Documentation]    Register → get token → logout → login with token → HomeScreen
    [Tags]    Feature:Auth    Important:Critical    Scenario:Success
    Register With Credentials    ${USERS.valid.email}    ${USERS.valid.name}
    Verify Home Screen Displayed
    ${token}=    Get Token From Info Dialog
    Logout
    Switch To Login Mode
    Login With Token    ${token}
    Verify Home Screen Displayed

[TC-L002] User Should See Error When Login With Invalid Token
    [Documentation]    Login with invalid token → error snackbar displayed
    [Tags]    Feature:Auth    Important:High    Scenario:Alternative
    Switch To Login Mode
    Login With Token    ${TOKEN.invalid}
    Wait For Element    xpath=//android.widget.TextView[contains(@text,'Invalid token')]

[TC-L003] User Should See Validation Error When Login With Empty Token
    [Documentation]    Login with empty token → stays on login page
    [Tags]    Feature:Auth    Important:High    Scenario:Alternative
    Switch To Login Mode
    Login With Token    ${TOKEN.empty}
    Verify Login Page Displayed

*** Keywords ***
Setup Mobile Test
    Open Application    ${APPIUM_URL}
    ...    platformName=${PLATFORM_NAME}
    ...    platformVersion=${PLATFORM_VERSION}
    ...    deviceName=${DEVICE_NAME}
    ...    app=${APP_PATH}
    ...    automationName=${AUTOMATION_NAME}
    ...    noReset=false

Teardown Mobile Test
    Close Application
