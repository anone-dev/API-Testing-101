*** Settings ***
Resource    ../common/CommonKeywords.robot

*** Variables ***
# Locators
${LOGIN_USERNAME_FIELD}    id=com.example.app:id/username
${LOGIN_PASSWORD_FIELD}    id=com.example.app:id/password
${LOGIN_BUTTON}            id=com.example.app:id/loginButton
${LOGIN_ERROR_MESSAGE}     id=com.example.app:id/errorMessage
${FORGOT_PASSWORD_LINK}    id=com.example.app:id/forgotPassword

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
