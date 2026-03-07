*** Settings ***
Documentation    [PBI-0003] Orders Feature
...              Test suite for Create, View, Update, and Delete orders
Resource         ../../pages/auth/AuthPage.resource
Resource         ../../pages/books/BooksPage.resource
Resource         ../../pages/orders/OrdersPage.resource
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
[TC-0018] User Should Create Order With Valid Customer Name
    [Documentation]    Tap book card → enter customer name → create order → navigate back to Books
    [Tags]    Feature:Orders    Important:Critical    Scenario:Success
    # 📝 Arrange
    Register And Navigate To Books
    # 🎬 Act
    Create Order For Book    1    ${ORDERS.customer.name}
    # ✅ Assert — back on Books screen after order created
    Verify Books Screen Displayed

[TC-0019] User Should See Validation Error When Create Order With Empty Customer Name
    [Documentation]    Tap book card → leave customer name empty → tap create → stays on detail screen
    [Tags]    Feature:Orders    Important:High    Scenario:Alternative
    # 📝 Arrange
    Register And Navigate To Books
    # 🎬 Act
    Tap Book Card    1
    Click Element Safe    ${CREATE_ORDER_BUTTON}
    # ✅ Assert — snackbar error and stays on detail screen
    Wait For Element    xpath=//android.widget.TextView[@text='Please enter customer name']

[TC-0020] User Should See Orders List After Creating Order
    [Documentation]    Create order → navigate to Orders tab → order card displayed
    [Tags]    Feature:Orders    Important:Critical    Scenario:Success
    # 📝 Arrange
    Register And Navigate To Books
    Create Order For Book    1    ${ORDERS.customer.name}
    # 🎬 Act
    Navigate To Orders Tab
    # ✅ Assert
    ${order_id}=    Get First Order Id
    Verify Order Card Exists    ${order_id}

[TC-0021] User Should See Empty State When No Orders Exist
    [Documentation]    Fresh login with no orders → Orders tab shows "No orders yet"
    [Tags]    Feature:Orders    Important:High    Scenario:Alternative
    # 📝 Arrange — register new user (no orders)
    Register And Navigate To Books
    # 🎬 Act
    Navigate To Orders Tab
    # ✅ Assert
    Verify Empty Orders Displayed

[TC-0022] User Should Update Order Customer Name Successfully
    [Documentation]    Create order → edit customer name → confirm → updated name shown
    [Tags]    Feature:Orders    Important:Critical    Scenario:Success
    # 📝 Arrange
    Register And Navigate To Books
    Create Order For Book    1    ${ORDERS.customer.name}
    Navigate To Orders Tab
    ${order_id}=    Get First Order Id
    # 🎬 Act
    Update Order Customer Name    ${order_id}    ${ORDERS.customer.updated_name}
    # ✅ Assert
    Wait For Element    xpath=//android.widget.TextView[contains(@text,'${ORDERS.customer.updated_name}')]

[TC-0023] User Should Cancel Update Order And Name Remains Unchanged
    [Documentation]    Open update dialog → tap Cancel → customer name unchanged
    [Tags]    Feature:Orders    Important:Medium    Scenario:Alternative
    # 📝 Arrange
    Register And Navigate To Books
    Create Order For Book    1    ${ORDERS.customer.name}
    Navigate To Orders Tab
    ${order_id}=    Get First Order Id
    # 🎬 Act
    Cancel Update Order    ${order_id}
    # ✅ Assert — original name still visible
    Wait For Element    xpath=//android.widget.TextView[contains(@text,'${ORDERS.customer.name}')]

[TC-0024] User Should Delete Order Successfully
    [Documentation]    Create order → delete → confirm → order removed from list
    [Tags]    Feature:Orders    Important:Critical    Scenario:Success
    # 📝 Arrange
    Register And Navigate To Books
    Create Order For Book    1    ${ORDERS.customer.name}
    Navigate To Orders Tab
    ${order_id}=    Get First Order Id
    # 🎬 Act
    Confirm Delete Order    ${order_id}
    # ✅ Assert
    Verify Empty Orders Displayed

[TC-0025] User Should Cancel Delete Order And Order Remains In List
    [Documentation]    Open delete dialog → tap Cancel → order still in list
    [Tags]    Feature:Orders    Important:Medium    Scenario:Alternative
    # 📝 Arrange
    Register And Navigate To Books
    Create Order For Book    1    ${ORDERS.customer.name}
    Navigate To Orders Tab
    ${order_id}=    Get First Order Id
    # 🎬 Act
    Cancel Delete Order    ${order_id}
    # ✅ Assert
    Verify Order Card Exists    ${order_id}

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
