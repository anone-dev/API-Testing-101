*** Settings ***
Resource    ../common/BasePage.resource

*** Variables ***
# Locators using Accessibility IDs (Flutter compatible)
${LOGIN_USERNAME_FIELD}    accessibility_id=username_field
${LOGIN_PASSWORD_FIELD}    accessibility_id=password_field
${LOGIN_BUTTON}            accessibility_id=login_button
${LOGIN_ERROR_MESSAGE}     accessibility_id=error_message
${FORGOT_PASSWORD_LINK}    accessibility_id=forgot_password_link

*** Keywords ***
Input Username
    [Arguments]    ${username}
    Input Text Safe    ${LOGIN_USERNAME_FIELD}    ${username}

Input Password
    [Arguments]    ${password}
    Input Text Safe    ${LOGIN_PASSWORD_FIELD}    ${password}

Click Login Button
    Click Element Safe    ${LOGIN_BUTTON}

Get Error Message
    ${message}=    Get Text Safe    ${LOGIN_ERROR_MESSAGE}
    RETURN    ${message}

Click Forgot Password
    Click Element Safe    ${FORGOT_PASSWORD_LINK}

Verify Login Page Displayed
    Wait For Element    ${LOGIN_USERNAME_FIELD}
    Wait For Element    ${LOGIN_PASSWORD_FIELD}
    Wait For Element    ${LOGIN_BUTTON}

Login With Credentials
    [Arguments]    ${username}    ${password}
    Verify Login Page Displayed
    Input Username    ${username}
    Input Password    ${password}
    Click Login Button
