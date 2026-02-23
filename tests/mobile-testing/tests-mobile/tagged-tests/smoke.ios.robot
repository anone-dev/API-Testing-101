*** Settings ***
Resource    ../../keywords/ios/common/common_keywords.robot
Resource    ../../keywords/ios/auth/login_flow.robot
Variables   ../../fixtures/ios/sit.yaml

Suite Setup       Setup iOS Test    sit
Suite Teardown    Teardown iOS Test

*** Test Cases ***
Smoke Test - App Launch
    [Tags]    smoke
    [Documentation]    Verify app launches successfully
    Sleep    2s
    Page Should Contain Element    ${LOGIN_USERNAME_FIELD}

Smoke Test - Login Flow
    [Tags]    smoke
    [Documentation]    Verify basic login functionality
    Login With Valid Credentials    ${USERS.valid.username}    ${USERS.valid.password}
    Sleep    2s

Smoke Test - Navigation
    [Tags]    smoke
    [Documentation]    Verify basic navigation works
    Login With Valid Credentials    ${USERS.valid.username}    ${USERS.valid.password}
    Sleep    2s
    # Add navigation verification
