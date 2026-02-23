*** Settings ***
Resource    ../../keywords/android/common/common_keywords.robot
Resource    ../../keywords/android/auth/login_flow.robot
Variables   ../../fixtures/android/sit.yaml

Suite Setup       Setup Android Test    sit
Suite Teardown    Teardown Android Test

*** Test Cases ***
Regression - Login With Multiple Users
    [Tags]    regression
    [Documentation]    Test login with different user types
    Login With Valid Credentials    ${USERS.valid.username}    ${USERS.valid.password}
    Logout
    Login With Valid Credentials    ${USERS.admin.username}    ${USERS.admin.password}

Regression - Login Error Scenarios
    [Tags]    regression
    [Documentation]    Test various login error scenarios
    ${error1}=    Login With Invalid Credentials    invalid@test.com    wrongpass
    Should Contain    ${error1}    Invalid
    
    ${error2}=    Login With Invalid Credentials    ${EMPTY}    ${EMPTY}
    Should Not Be Empty    ${error2}

Regression - Password Reset Flow
    [Tags]    regression
    [Documentation]    Test password reset functionality
    Verify Login Page Displayed
    Click Forgot Password
    # Add password reset verification
