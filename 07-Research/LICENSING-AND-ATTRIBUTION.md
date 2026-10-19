# Upstream Licensing Verification and Attribution Assessment

- **Ticket Reference:** [[RES-005-verify-upstream-licenses-and-attribution|RES-005]]
- **Auditor:** Hermes Agent / Lead Developer
- **Audit Date:** 2026-10-19
- **Status:** Complete / Clean-Room Policy Enforced

---

## 1. Executive Summary

A comprehensive source-level audit of the four primary reference repositories was conducted at exact commit SHAs. Three out of the four repositories (Flow Automator, OmniImageAutoGen, and Google-Flow-Automation) claim an MIT license in their `README.md` text, but **completely lack a `LICENSE` or `COPYING` file in their repositories**. OmniImageAutoGen is further explicitly marked `"private": true` in its `package.json`.

Only `omid-io/gflow-cli` possesses a verified, valid MIT `LICENSE` file. However, because its implementation relies on techniques strictly prohibited by `AGENTS.md` (private API reverse engineering, Bearer token extraction, and automated `grecaptcha` minting), no source code from it will be reused.

**Decision:** The project adopts a **strict clean-room engineering policy**. Zero lines of code will be copied from any upstream reference. All extension modules, schemas, adapters, and UI components will be written from scratch in TypeScript under the AI Media Automator MIT license.

---

## 2. Upstream Repository Audit Ledger

| Repository | Inspected Commit SHA | Declared License in README | Actual Repository License File | `package.json` / Metadata Status | Legal Clearance & Decision |
|---|---|---|---|---|---|
| **ART-TECH-FUZION/google-flow-automator** | `25eecee86c25123dac6cd46871c37cf51bd0db5d` | "MIT License" | **None** (Absent from root) | No manifest/package license | **Unverified.** Code reuse prohibited. Ideas-only reference. |
| **fangwangme/OmniImageAutoGen** | `0e5cea3a3710129a3114422de03736776053f518` | "MIT License" | **None** (Absent from root) | `"private": true`, `"license": null` | **Prohibited.** Explicit private package. Code reuse prohibited. Ideas-only reference. |
| **Shivanshu85/Google-Flow-Automation** | `f002984147d5475f15de6616f85dce15c22a8221` | "MIT License" | **None** (Absent from root) | No package metadata | **Unverified.** Code reuse prohibited. Ideas-only reference. |
| **omid-io/gflow-cli** | `cb6d5019babf0cb89886a1f3ca265b40e44cd72b` | "MIT License" | **`LICENSE` present** (MIT, Flavio Oliva) | Valid MIT legal notice | **Technically MIT; Code Rejected.** Methods violate project ethics/policy. Conceptual reuse only. |

---

## 3. Legal and Intellectual Property Analysis

1. **Common Fallacy:** A README claim of "MIT" is insufficient under copyright law without an explicit license grant file or copyright notice specifying rights and conditions.
2. **Private Repository Artifacts:** `OmniImageAutoGen` contains `"private": true` in `package.json`, creating an irreconcilable ambiguity between the README assertion and the npm publishing directive.
3. **Contamination Guard:** Copying unverified code into a commercial or open-source repository risks copyright infringement claims or license taint. A clean-room approach completely eliminates this risk.

---

## 4. Attribution Policy for Reused Ideas

Where concepts or structural inspirations are utilized, attribution will be maintained strictly in architectural documentation and commit messages, without incorporating copyrighted source:
- **Conversation URL Locking:** Credited conceptually to `fangwangme/OmniImageAutoGen`.
- **Generation History Settling:** Credited conceptually to `fangwangme/OmniImageAutoGen`.
- **Flow Mode Classifications (`t2v`, `i2v`, `c2v`, `t2i`, `i2i`):** Credited conceptually to `Shivanshu85/Google-Flow-Automation`.
- **Domain DTO Models & Test Catalog Structure:** Credited conceptually to `omid-io/gflow-cli`.

---

## 5. Verification Checklist & Gate Exit

- [x] All 4 repositories inspected at exact git commit SHAs.
- [x] Absence of root license files verified via script on 3 repositories.
- [x] Prohibited reverse-engineering patterns documented on 1 repository.
- [x] Clean-room engineering mandate established for all subsequent implementation sprints.
