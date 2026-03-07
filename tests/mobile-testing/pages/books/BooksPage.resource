*** Settings ***
Resource    ../common/BasePage.resource

*** Variables ***
# Books Screen
${BOOK_FILTER}              accessibility_id=book_filter
${FILTER_ALL}               xpath=//android.widget.Button[@text='All']
${FILTER_FICTION}           xpath=//android.widget.Button[@text='Fiction']
${FILTER_NON_FICTION}       xpath=//android.widget.Button[@text='Non-Fiction']

# Book Detail Screen
${BOOK_NAME}                accessibility_id=book_name
${BOOK_TYPE}                accessibility_id=book_type
${BOOK_STATUS}              accessibility_id=book_status
${BOOK_AUTHOR}              accessibility_id=book_author
${BOOK_PRICE}               accessibility_id=book_price
${BOOK_STOCK}               accessibility_id=book_stock

*** Keywords ***
Verify Books Screen Displayed
    Wait For Element    ${BOOK_FILTER}

Select Filter All
    Click Element Safe    ${FILTER_ALL}
    Wait For Element    ${BOOK_FILTER}

Select Filter Fiction
    Click Element Safe    ${FILTER_FICTION}
    Wait For Element    ${BOOK_FILTER}

Select Filter Non Fiction
    Click Element Safe    ${FILTER_NON_FICTION}
    Wait For Element    ${BOOK_FILTER}

Tap Book Card
    [Arguments]    ${book_id}
    Click Element Safe    accessibility_id=book_card_${book_id}

Verify Book Detail Displayed
    Wait For Element    ${BOOK_NAME}
    Wait For Element    ${BOOK_TYPE}
    Wait For Element    ${BOOK_STATUS}

Get Book Status
    ${status}=    Get Text Safe    ${BOOK_STATUS}
    RETURN    ${status}

Get Book Type
    ${type}=    Get Text Safe    ${BOOK_TYPE}
    RETURN    ${type}

Verify Books List Not Empty
    ${cards}=    Get Webelements    xpath=//android.view.ViewGroup[contains(@content-desc,'book_card_')]
    Should Not Be Empty    ${cards}
