*** Settings ***
Resource    ../common/BasePage.resource

*** Variables ***
# Bottom nav — Orders tab
${ORDERS_TAB}                   xpath=//android.widget.TextView[@text='Orders']

# Orders Screen
${EMPTY_ORDERS_TEXT}            xpath=//android.widget.TextView[@text='No orders yet']

# Book Detail — Create Order
${CUSTOMER_NAME_INPUT}          accessibility_id=customer_name_input
${CREATE_ORDER_BUTTON}          accessibility_id=create_order_button

# Order Card (dynamic)
# Use: accessibility_id=order_card_${order_id}

# Edit / Delete icons (dynamic)
# Use: accessibility_id=edit_order_${order_id}
# Use: accessibility_id=delete_order_${order_id}

# Update Order Dialog
${UPDATE_ORDER_DIALOG}          accessibility_id=update_order_dialog
${UPDATE_NAME_INPUT}            accessibility_id=update_customer_name_input
${UPDATE_CONFIRM_BUTTON}        accessibility_id=update_confirm_button
${UPDATE_CANCEL_BUTTON}         accessibility_id=update_cancel_button

# Delete Order Dialog
${DELETE_ORDER_DIALOG}          accessibility_id=delete_order_dialog
${DELETE_CONFIRM_BUTTON}        accessibility_id=delete_confirm_button
${DELETE_CANCEL_BUTTON}         accessibility_id=delete_cancel_button

*** Keywords ***
Navigate To Orders Tab
    Click Element Safe    ${ORDERS_TAB}

Verify Orders Screen Displayed
    Wait For Element    ${ORDERS_TAB}

Verify Empty Orders Displayed
    Wait For Element    ${EMPTY_ORDERS_TEXT}

Create Order For Book
    [Arguments]    ${book_id}    ${customer_name}
    Click Element Safe    accessibility_id=book_card_${book_id}
    Input Text Safe    ${CUSTOMER_NAME_INPUT}    ${customer_name}
    Click Element Safe    ${CREATE_ORDER_BUTTON}
    Wait For Element    accessibility_id=book_filter

Verify Order Card Exists
    [Arguments]    ${order_id}
    Wait For Element    accessibility_id=order_card_${order_id}

Verify Order Card Not Exists
    [Arguments]    ${order_id}
    Element Should Not Be Visible    accessibility_id=order_card_${order_id}

Get First Order Id
    ${cards}=    Get Webelements    xpath=//android.view.ViewGroup[contains(@content-desc,'order_card_')]
    Should Not Be Empty    ${cards}    msg=No orders found
    ${desc}=    Get Element Attribute    ${cards}[0]    content-desc
    ${order_id}=    Evaluate    '${desc}'.replace('order_card_', '')
    RETURN    ${order_id}

Tap Edit Order
    [Arguments]    ${order_id}
    Click Element Safe    accessibility_id=edit_order_${order_id}
    Wait For Element    ${UPDATE_ORDER_DIALOG}

Update Order Customer Name
    [Arguments]    ${order_id}    ${new_name}
    Tap Edit Order    ${order_id}
    Clear Text    ${UPDATE_NAME_INPUT}
    Input Text Safe    ${UPDATE_NAME_INPUT}    ${new_name}
    Click Element Safe    ${UPDATE_CONFIRM_BUTTON}

Cancel Update Order
    [Arguments]    ${order_id}
    Tap Edit Order    ${order_id}
    Click Element Safe    ${UPDATE_CANCEL_BUTTON}

Tap Delete Order
    [Arguments]    ${order_id}
    Click Element Safe    accessibility_id=delete_order_${order_id}
    Wait For Element    ${DELETE_ORDER_DIALOG}

Confirm Delete Order
    [Arguments]    ${order_id}
    Tap Delete Order    ${order_id}
    Click Element Safe    ${DELETE_CONFIRM_BUTTON}

Cancel Delete Order
    [Arguments]    ${order_id}
    Tap Delete Order    ${order_id}
    Click Element Safe    ${DELETE_CANCEL_BUTTON}
