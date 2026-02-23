*** Settings ***
Library    AppiumLibrary

*** Keywords ***
Wait For Element
    [Arguments]    ${locator}    ${timeout}=30s
    Wait Until Element Is Visible    ${locator}    ${timeout}

Click Element Safe
    [Arguments]    ${locator}
    Wait For Element    ${locator}
    Click Element    ${locator}

Input Text Safe
    [Arguments]    ${locator}    ${text}
    Wait For Element    ${locator}
    Input Text    ${locator}    ${text}

Get Text Safe
    [Arguments]    ${locator}
    Wait For Element    ${locator}
    ${text}=    Get Text    ${locator}
    RETURN    ${text}

Scroll To Element
    [Arguments]    ${locator}
    Wait Until Element Is Visible    ${locator}    30s
    Scroll    ${locator}

Take Screenshot On Failure
    Run Keyword If Test Failed    Capture Page Screenshot

Hide Keyboard If Visible
    ${status}=    Run Keyword And Return Status    Page Should Contain Element    xpath=//android.widget.EditText
    Run Keyword If    ${status}    Hide Keyboard
