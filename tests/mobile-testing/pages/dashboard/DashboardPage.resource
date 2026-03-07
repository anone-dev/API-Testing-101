*** Settings ***
Resource    ../common/BasePage.resource

*** Variables ***
# Locators using Accessibility IDs (Flutter compatible)
${DASHBOARD_TITLE}         accessibility_id=dashboard_title
${PROFILE_BUTTON}          accessibility_id=profile_button
${LOGOUT_BUTTON}           accessibility_id=logout_button
${MENU_BUTTON}             accessibility_id=menu_button

*** Keywords ***
Verify Dashboard Displayed
    Wait For Element    ${DASHBOARD_TITLE}

Click Profile Button
    Click Element Safe    ${PROFILE_BUTTON}

Click Logout Button
    Click Element Safe    ${LOGOUT_BUTTON}

Click Menu Button
    Click Element Safe    ${MENU_BUTTON}

Get Dashboard Title
    ${title}=    Get Text Safe    ${DASHBOARD_TITLE}
    RETURN    ${title}
