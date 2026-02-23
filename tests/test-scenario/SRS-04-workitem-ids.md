# SRS-04 Axons Test Scenario IDs - Azure DevOps (coe-app-demo)

Generated: 2026-02-23  
Work Item Type: **Axons Test Scenario**  
Board: https://dev.azure.com/AXONS-Strategic-And-Digital-Transformation/coe-app-demo/_boards

## PBI 12567 — Success Flows: S1-Order, S2-Update, S3-Delete
| TC | Title | Axons Test Scenario ID |
|---|---|---|
| TC-01 | [API][S1][OrderBooks] S1 - Order fiction book success (full flow) | 12641 |
| TC-02 | [API][S1][OrderBooks] S1 - Verify order list contains only own orders | 12642 |
| TC-03 | [API][S2][UpdateOrder] S2 - Update order customerName success (full flow) | 12643 |
| TC-04 | [API][S3][DeleteOrder] S3 - Delete order success (full flow) | 12644 |
| TC-05 | [API][Flow][StateTransition] Order state: created → updated → deleted | 12645 |

## PBI 12568 — Failure Flows: F1-Out of Stock, F2-Update Deleted, F3-Delete Deleted, F4-Duplicate Email
| TC | Title | Axons Test Scenario ID |
|---|---|---|
| TC-06 | [API][F1][OutOfStock] F1 - Order out-of-stock book returns 404 (full flow) | 12646 |
| TC-07 | [API][F2][UpdateDeleted] F2 - PATCH deleted order returns 404 (full flow) | 12647 |
| TC-08 | [API][F3][DeleteDeleted] F3 - DELETE deleted order returns 404 (full flow) | 12648 |
| TC-09 | [API][F4][DuplicateEmail] F4 - Register duplicate email returns 409 (full flow) | 12649 |
| TC-10 | [API][F4][DuplicateEmail] F4 - Register without clientEmail returns 400 | 12650 |
| TC-11 | [API][F4][DuplicateEmail] F4 - Register without clientName returns 400 | 12651 |
| TC-12 | [API][Auth][PreReq] Authentication pre-requisite for all protected flows | 12652 |

---
Total: 12 Axons Test Scenario work items | IDs: 12641–12645 (PBI 12567), 12646–12652 (PBI 12568)
