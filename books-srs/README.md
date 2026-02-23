# Books System - Software Requirements Specification (SRS)

## Overview

ระบบ Books ประกอบด้วย 2 ส่วนหลัก:

| Component | Description |
|-----------|-------------|
| **books-local** | Mock API Server (Python/Flask) สำหรับจัดการ Books และ Orders |
| **books_mobile_app** | Flutter Mobile Application สำหรับใช้งานผ่าน API |

## Documents

| File | Description |
|------|-------------|
| [SRS-01-api-server.md](./SRS-01-api-server.md) | Requirements ของ API Server (books-local) |
| [SRS-02-mobile-app.md](./SRS-02-mobile-app.md) | Requirements ของ Mobile App (books_mobile_app) |
| [SRS-03-api-specification.md](./SRS-03-api-specification.md) | API Endpoint Specification |
| [SRS-04-business-flow.md](./SRS-04-business-flow.md) | Business Flow & Test Scenarios (S1-S3, F1-F4) |

## System Architecture

```
┌─────────────────────┐         ┌──────────────────────┐
│  books_mobile_app   │ ──────► │    books-local        │
│  (Flutter App)      │  HTTP   │  (Flask API Server)   │
│  Android / iOS /    │         │  http://localhost:5000 │
│  Windows / Web      │         └──────────────────────┘
└─────────────────────┘
```

## Version History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0.0 | 2026-02-17 | QA-CoE | Initial release |
