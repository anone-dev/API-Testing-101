# SRS-03 Axons Test Scenario IDs - Azure DevOps (coe-app-demo)

Generated: 2026-02-23  
Work Item Type: **Axons Test Scenario**  
Board: https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_boards

## PBI 12555 — FR-01: Health Check
| TC | Title | Axons Test Scenario ID |
|---|---|---|
| TC-01 | [API][Status][Schema] GET /status response schema is valid | 12623 |

## PBI 12556 — FR-02: Authentication
| TC | Title | Axons Test Scenario ID |
|---|---|---|
| TC-02 | [API][Auth][Schema] POST /api-clients response schema is valid | 12624 |
| TC-03 | [API][Auth][Schema] POST /api-clients 409 error schema is valid | 12625 |

## PBI 12557 — FR-03: Books Management
| TC | Title | Axons Test Scenario ID |
|---|---|---|
| TC-04 | [API][Books][Schema] GET /books list schema is valid | 12626 |
| TC-05 | [API][Books][Schema] GET /books/{bookId} detail schema is valid | 12627 |
| TC-06 | [API][Books][Schema] GET /books/{bookId} 404 error schema is valid | 12628 |
| TC-07 | [API][Books][QueryParam] GET /books limit boundary min=1 | 12629 |
| TC-08 | [API][Books][QueryParam] GET /books limit boundary max=20 | 12630 |
| TC-09 | [API][Books][QueryParam] GET /books combined type and limit filter | 12631 |

## PBI 12558 — FR-04: Orders Management
| TC | Title | Axons Test Scenario ID |
|---|---|---|
| TC-10 | [API][Orders][Schema] POST /orders 201 response schema is valid | 12632 |
| TC-11 | [API][Orders][Schema] POST /orders 401 error schema is valid | 12633 |
| TC-12 | [API][Orders][Schema] POST /orders 404 out-of-stock schema is valid | 12634 |
| TC-13 | [API][Orders][Schema] GET /orders list schema is valid | 12635 |
| TC-14 | [API][Orders][Schema] GET /orders/{orderId} detail schema is valid | 12636 |
| TC-15 | [API][Orders][Schema] GET /orders/{orderId} 404 error schema is valid | 12637 |
| TC-16 | [API][Orders][Schema] PATCH /orders/{orderId} 204 no content | 12638 |
| TC-17 | [API][Orders][Schema] DELETE /orders/{orderId} 204 no content | 12639 |

## PBI 12559 — FR-05: Stock Management
| TC | Title | Axons Test Scenario ID |
|---|---|---|
| TC-18 | [API][Reset][Schema] POST /reset response schema is valid | 12640 |

---
Total: 18 Axons Test Scenario work items | IDs: 12623–12640
