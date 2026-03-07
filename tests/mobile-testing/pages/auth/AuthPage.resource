*** Settings ***
Resource    ../common/BasePage.resource

*** Variables ***
# Auth Screen — Register mode
${EMAIL_INPUT}              xpath=//android.widget.EditText[contains(@hint,'email_input')]
${NAME_INPUT}               xpath=//android.widget.EditText[contains(@hint,'name_input')]
${REGISTER_BUTTON}          xpath=//android.widget.Button[@content-desc='register_button']

# Auth Screen — Login mode
${TOKEN_INPUT}              xpath=//android.widget.EditText[contains(@hint,'token_input')]
${LOGIN_BUTTON}             xpath=//android.widget.Button[@content-desc='login_button']
${PASTE_TOKEN_BUTTON}       xpath=//android.widget.Button[@content-desc='paste_token_button']

# Toggle & shared
${TOGGLE_MODE_BUTTON}       xpath=//android.widget.Button[@content-desc='toggle_mode_button']

# Home Screen
${BOTTOM_NAV}               xpath=//android.widget.FrameLayout[@content-desc='bottom_nav']
${LOGOUT_BUTTON}            xpath=//android.widget.Button[@content-desc='logout_button']
${INFO_BUTTON}              xpath=//android.widget.Button[@content-desc='info_button']
${TOKEN_TEXT}               xpath=//android.widget.TextView[@text and string-length(@text)>20 and contains(@text,'-')]
${COPY_TOKEN_BUTTON}        xpath=//android.widget.Button[@text='Copy Token']

*** Keywords ***
Verify Register Page Displayed
    Wait For Element    ${EMAIL_INPUT}
    Wait For Element    ${NAME_INPUT}
    Wait For Element    ${REGISTER_BUTTON}

Verify Login Page Displayed
    Wait For Element    ${TOKEN_INPUT}
    Wait For Element    ${LOGIN_BUTTON}

Switch To Login Mode
    Click Element Safe    ${TOGGLE_MODE_BUTTON}
    Wait For Element    ${TOKEN_INPUT}

Switch To Register Mode
    Click Element Safe    ${TOGGLE_MODE_BUTTON}
    Wait For Element    ${EMAIL_INPUT}

Register With Credentials
    [Arguments]    ${email}    ${name}
    Verify Register Page Displayed
    Input Text Safe    ${EMAIL_INPUT}    ${email}
    Input Text Safe    ${NAME_INPUT}    ${name}
    Click Element Safe    ${REGISTER_BUTTON}

Login With Token
    [Arguments]    ${token}
    Verify Login Page Displayed
    Input Text Safe    ${TOKEN_INPUT}    ${token}
    Click Element Safe    ${LOGIN_BUTTON}

Verify Home Screen Displayed
    Wait For Element    ${BOTTOM_NAV}

Verify Auth Screen Displayed
    Wait For Element    ${TOGGLE_MODE_BUTTON}

Logout
    Click Element Safe    ${LOGOUT_BUTTON}
    Verify Auth Screen Displayed

Get Token From Info Dialog
    Click Element Safe    ${INFO_BUTTON}
    Wait For Element    ${TOKEN_TEXT}
    ${token}=    Get Text    ${TOKEN_TEXT}
    Click Element    ${COPY_TOKEN_BUTTON}
    Wait For Element    xpath=//android.widget.TextView[@text='Token copied to clipboard']
    Click Element    xpath=//android.widget.Button[@text='Close']
    RETURN    ${token}
