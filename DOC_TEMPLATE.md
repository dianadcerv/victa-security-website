# Intake Form Google Doc template

The website syncs questions from Docs titled like **Intake Form - …** every 5 minutes.
Use this structure so the parser can turn Doc text into Victa-branded form fields.

## Mapping (Request Form → Doc)

| Primary Interest (website) | Google Doc title |
|----------------------------|------------------|
| Physical Security Assessment | Intake Form - Physical Security Assessment |
| Security Laminate / Glass Hardening | Intake Form - Security Laminate / Glass Hardening |
| Ballistic Panels | Intake Form - Ballistic Panels |
| Multiple Services | Intake Form - Multiple Services |
| Other | Intake Form - General |

## Section headers

```
SECTION 1 — ORGANIZATION & CONTACT
SECTION 2 — FACILITIES & OPERATIONS
```

Headings in ALL CAPS (without `SECTION`) also start a new section, e.g. `SERVICE REQUIREMENTS`.

## Text questions

End the line with underscores (or a `?`):

```
Do you have an existing security strategy or roadmap? __________
What outcomes do you most want from this engagement? __________
```

These become multi-line text areas on the website.

## Multi-select (checkboxes)

```
Which services are you interested in exploring? (check all that apply)
[ ] Long-term security roadmapping
[ ] Vendor selection & RFP support
[ ] Budget & feasibility planning
```

## Single-select (dropdown)

```
What is your desired timeline? (select one)
Urgent - within 30 days
1-3 months
3-6 months
```

## After editing a Doc

1. Save the Doc (automatic in Drive).
2. Wait up to **5 minutes**, or run **Victa Intake → Sync intake schemas now**.
3. Reload the prospect intake link — no website redeploy needed.
