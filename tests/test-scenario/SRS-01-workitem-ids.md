# SRS-01 Axons Test Scenario IDs - Azure DevOps (coe-app-demo)

Generated: 2026-02-23  
Work Item Type: **Axons Test Scenario**  
Board: https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_boards

## PBI 12555 — FR-01: Health Check
| TC | Title | Axons Test Scenario ID |
|---|---|---|
| TC-01 | [API][Status][HealthCheck] GET /status returns OK | 12653 |
| TC-02 | [API][Status][HealthCheck] GET /status has no-cache header | 12570 |

## PBI 12556 — FR-02: Authentication
| TC | Title | Axons Test Scenario ID |
|---|---|---|
| TC-03 | [API][Auth][Register] POST /api-clients register success | 12571 |
| TC-04 | [API][Auth][Register] POST /api-clients duplicate email returns 409 | 12572 |
| TC-05 | [API][Auth][Token] Protected endpoint without token returns 401 | 12573 |
| TC-06 | [API][Auth][Token] Protected endpoint with invalid token returns 401 | 12574 |

## PBI 12557 — FR-03: Books Management
| TC | Title | Axons Test Scenario ID |
|---|---|---|
| TC-07 | [API][Books][List] GET /books returns all 25 books | 12575 |
| TC-08 | [API][Books][Filter] GET /books?type=fiction returns only fiction | 12576 |
| TC-09 | [API][Books][Filter] GET /books?type=non-fiction returns only non-fiction | 12577 |
| TC-10 | [API][Books][Filter] GET /books?limit=5 returns max 5 items | 12578 |
| TC-11 | [API][Books][Detail] GET /books/{bookId} returns book detail | 12579 |
| TC-12 | [API][Books][Detail] GET /books/{bookId} available reflects stock | 12580 |
| TC-13 | [API][Books][Detail] GET /books/{bookId} not found returns 404 | 12581 |

## PBI 12558 — FR-04: Orders Management
| TC | Title | Axons Test Scenario ID |
|---|---|---|
| TC-14 | [API][Orders][Create] POST /orders create order success | 12582 |
| TC-15 | [API][Orders][Create] POST /orders out of stock returns 404 | 12583 |
| TC-16 | [API][Orders][Create] POST /orders without token returns 401 | 12584 |
| TC-17 | [API][Orders][List] GET /orders returns order list | 12585 |
| TC-18 | [API][Orders][Detail] GET /orders/{orderId} returns order detail | 12586 |
| TC-19 | [API][Orders][Detail] GET /orders/{orderId} not found returns 404 | 12587 |
| TC-20 | [API][Orders][Update] PATCH /orders/{orderId} update customerName success | 12588 |
| TC-21 | [API][Orders][Update] PATCH /orders/{orderId} not found returns 404 | 12589 |
| TC-22 | [API][Orders][Delete] DELETE /orders/{orderId} success | 12590 |
| TC-23 | [API][Orders][Delete] DELETE /orders/{orderId} not found returns 404 | 12591 |

## PBI 12559 — FR-05: Stock Management
| TC | Title | Axons Test Scenario ID |
|---|---|---|
| TC-24 | [API][Stock][Reset] POST /reset resets all stock | 12592 |
| TC-25 | [API][Books][Bug] BUG-01: bookId=3 bypasses stock check | 12593 |

## PBI 12560 — FR-06: Web UI
| TC | Title | Axons Test Scenario ID |
|---|---|---|
| TC-26 | [WEB][Auth][Login] Web UI password protection success | 12595 |
| TC-27 | [WEB][Auth][Login] Web UI wrong password shows error | 12596 |
| TC-28 | [WEB][Books][Display] Books tab shows book list with filter | 12597 |
| TC-29 | [WEB][Orders][Create] Create order via Web UI | 12598 |
| TC-30 | [WEB][Stock][Reset] Reset stock button works | 12599 |
| TC-31 | [WEB][UI][Theme] Web UI supports 6 color themes | 12600 |

---
Total: 31 Axons Test Scenario work items | IDs: 12570–12600 (ยกเว้น 12594 ที่ข้ามไป) + 12653 (TC-01 สร้างใหม่)
