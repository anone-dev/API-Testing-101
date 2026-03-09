*** Settings ***
Resource    ../common/BasePage.resource

*** Variables ***
# Auth Screen — Register mode
${EMAIL_INPUT}              android=new UiSelector().className("android.widget.EditText").instance(1)
${NAME_INPUT}               android=new UiSelector().className("android.widget.EditText").instance(3)
${REGISTER_BUTTON}          accessibility_id=register_button

# Auth Screen — Login mode
${TOKEN_INPUT}              android=new UiSelector().className("android.widget.EditText").instance(1)
${LOGIN_BUTTON}             accessibility_id=login_button
${PASTE_TOKEN_BUTTON}       accessibility_id=paste_token_button

# Toggle & shared
${TOGGLE_MODE_BUTTON}       accessibility_id=toggle_mode_button

# Home Screen
${BOTTOM_NAV}               accessibility_id=bottom_nav
${LOGOUT_BUTTON}            accessibility_id=logout_button
${INFO_BUTTON}              accessibility_id=info_button
${COPY_TOKEN_BUTTON}        accessibility_id=Copy Token
${CLOSE_DIALOG_BUTTON}      accessibility_id=Close

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
    Click Element Safe  ${EMAIL_INPUT}
    Input Text Safe   ${EMAIL_INPUT}    ${email}
    Click Element Safe       ${NAME_INPUT}
    Input Text Safe    ${NAME_INPUT}    ${name}
    Click Element Safe    ${REGISTER_BUTTON}

Login With Token
    [Arguments]    ${token}    ${use_paste}=False
    Verify Login Page Displayed
    Run Keyword If    '${use_paste}' == 'True'    Click Element Safe    ${PASTE_TOKEN_BUTTON}
    ...    ELSE    Input Text Safe    ${TOKEN_INPUT}    ${token}
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
    Click Element Safe    ${COPY_TOKEN_BUTTON}
    ${token}=    Execute Script    mobile: getClipboard    
    Click Element Safe    ${CLOSE_DIALOG_BUTTON}
    RETURN    ${token}
