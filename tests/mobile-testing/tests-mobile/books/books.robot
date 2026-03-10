*** Settings ***
Documentation    [PBI-0002] Books Feature
...              Test suite for Books list, filter by type, and book detail
Resource         ../../pages/auth/AuthPage.resource
Resource         ../../pages/books/BooksPage.resource
Resource         ../../pages/common/BasePage.resource
Variables        ../../fixtures/testdata.${ENV}.${PLATFORM}.yaml
Variables        ../../pages/auth/locators.${PLATFORM}.yaml
Variables        ../../pages/books/locators.${PLATFORM}.yaml

Suite Setup      Setup Mobile Test
Suite Teardown   Teardown Mobile Test
Test Setup       Register And Navigate To Books
Test Teardown    Run Keyword If Test Failed    Capture Page Screenshot

*** Variables ***
# กำหนดค่า Default ไว้ (เผื่อลืมใส่ตอนรัน)
${PLATFORM}    android
${ENV}         local
${HEADLESS}    false

*** Test Cases ***
[TC-0011] User Should See Books List After Login
    [Documentation]    Navigate to Books tab → books list displayed with filter bar
    [Tags]    Feature:Books    Important:Critical    Scenario:Success
    # ✅ Assert — already on Books screen from Test Setup
    Verify Books Screen Displayed
    Verify Books List Not Empty

[TC-0012] User Should Filter Books By Fiction
    [Documentation]    Select Fiction filter → only fiction books displayed
    [Tags]    Feature:Books    Important:High    Scenario:Success
    # 🎬 Act
    Select Filter Fiction
    # ✅ Assert
    Verify Books List Not Empty
    ${cards}=    Get Webelements    xpath=//android.widget.TextView[contains(@text,'FICTION')]
    Should Not Be Empty    ${cards}

[TC-0013] User Should Filter Books By Non-Fiction
    [Documentation]    Select Non-Fiction filter → only non-fiction books displayed
    [Tags]    Feature:Books    Important:High    Scenario:Success
    # 🎬 Act
    Select Filter Non Fiction
    # ✅ Assert
    Verify Books List Not Empty
    ${cards}=    Get Webelements    xpath=//android.widget.TextView[contains(@text,'NON-FICTION')]
    Should Not Be Empty    ${cards}

[TC-0014] User Should See All Books After Reset Filter To All
    [Documentation]    Select Fiction then switch back to All → all books displayed
    [Tags]    Feature:Books    Important:High    Scenario:Success
    # 🎬 Act
    Select Filter Fiction
    Select Filter All
    # ✅ Assert
    Verify Books List Not Empty

[TC-0015] User Should See Book Detail When Tap Book Card
    [Documentation]    Tap book card → detail screen shows name, type, status
    [Tags]    Feature:Books    Important:Critical    Scenario:Success
    # 🎬 Act
    Tap Book Card    1
    # ✅ Assert
    Verify Book Detail Displayed

[TC-0016] User Should See Available Status On Available Book Detail
    [Documentation]    Tap available book → status shows Available
    [Tags]    Feature:Books    Important:High    Scenario:Success
    # 🎬 Act — Book ID 1 is available by default
    Tap Book Card    1
    Verify Book Detail Displayed
    # ✅ Assert
    ${status}=    Get Book Status
    Should Contain    ${status}    Available

[TC-0017] User Should See Out Of Stock Status On Unavailable Book Detail
    [Documentation]    Tap out-of-stock book → status shows Out of Stock
    [Tags]    Feature:Books    Important:High    Scenario:Alternative
    # 🎬 Act — scroll to find an out-of-stock book card
    Swipe Up
    ${oos_cards}=    Get Webelements    xpath=//android.widget.TextView[@text='Out of Stock']
    Should Not Be Empty    ${oos_cards}    msg=No out-of-stock books found — reset stock and retry
    Click Element    ${oos_cards}[0]
    Verify Book Detail Displayed
    # ✅ Assert
    ${status}=    Get Book Status
    Should Contain    ${status}    Out of Stock

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

Register And Navigate To Books
    Register With Credentials    ${USERS.valid.email}    ${USERS.valid.name}
    Verify Home Screen Displayed
    Verify Books Screen Displayed
