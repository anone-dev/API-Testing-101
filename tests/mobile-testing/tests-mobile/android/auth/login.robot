*** Settings ***
Resource    ../../../pages/android/auth/LoginPage.robot
Variables   ../../../fixtures/android/sit.yaml

Suite Setup       Setup Android Test    sit
Suite Teardown    Teardown Android Test

*** Test Cases ***
Login With Valid User Should Success
    [Tags]    smoke    auth    login
    Verify Login Page Displayed
    Input Username    ${USERS.valid.username}
    Input Password    ${USERS.valid.password}
    Click Login Button
    Sleep    2s

Login With Invalid Password Should Show Error
    [Tags]    regression    auth    login
    Verify Login Page Displayed
    Input Username    ${USERS.valid.username}
    Input Password    wrongpassword
    Click Login Button
    ${error}=    Get Error Message
    Should Contain    ${error}    Invalid credentials

Login With Empty Username Should Show Error
    [Tags]    regression    auth    login
    Verify Login Page Displayed
    Input Username    ${EMPTY}
    Input Password    ${USERS.valid.password}
    Click Login Button
    ${error}=    Get Error Message
    Should Not Be Empty    ${error}
