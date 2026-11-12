# QR tracking setup

Status: code prepared and locally validated. On November 12, 2026, the owner confirmed saving all seven Production variables in Vercel team `real5`, project `ar-website`. Screenshots confirmed its repository is `kbryant2961-a11y/ar-website`, production branch `main`, and domain `www.arassetrecovery.com`. Live delivery must still be verified after release.

## Google Sheets connection (developer setup)

1. In Google Cloud Console, select or create a project. The current project is `ar-qr-tracking` in the developer-managed `fortunesagency.com` organization; the client owns the spreadsheet. Enable **Google Sheets API**.
2. Under **IAM & Admin → Service Accounts**, create `ar-qr-tracking`. It needs no project-level IAM role.
3. Open that service account → **Keys → Add Key → Create new key → JSON**. Store the download securely, outside the repository. Never send it in email/chat or commit it.
4. Share the client's spreadsheet with the JSON file's `client_email` as an Editor. Keep general access restricted.
5. Add a new tab called **QR Visits**, leaving any existing tabs untouched. Paste this header row into A1:F1:

   `Timestamp UTC | Reference | City | Region | Country | Visit ID`

   Put each heading in its own column. Freeze row 1. This dedicated tab avoids overwriting existing client data.

6. Sheet ID: `1gF75IhtJ6uU0wt-66Y_w4rV4D1szje8CzHrBzIHAcfc`.

## Resend connection

In the client's Resend team, create a key named **AR QR Tracking**, with **Sending access**, restricted to `arassetrecovery.com`. Keep it private.

Confirm the recipient with the client. Suggested sender: `AR QR Alerts <notifications@arassetrecovery.com>`. No new mailbox is needed for this sender; replies will not be handled unless configured separately.

## Client's Vercel steps

Do these only in the project whose **Settings → Domains** lists `arassetrecovery.com`. Confirm **Settings → Git** points to the client's `kbryant2961-a11y/ar-website` repo before deploying.

Open **Settings → Environment Variables**, select **Production** only, and add:

| Name                          | Value                                              | Secret? |
| ----------------------------- | -------------------------------------------------- | ------- |
| `QR_TRACKING_ENABLED`         | `true`                                             | No      |
| `RESEND_API_KEY`              | Sending-only key from Resend                       | Yes     |
| `QR_ALERT_FROM`               | `AR QR Alerts <notifications@arassetrecovery.com>` | No      |
| `QR_ALERT_TO`                 | `renee@arassetrecovery.com`                          | No      |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Entire downloaded JSON file contents               | Yes     |
| `GOOGLE_SHEET_ID`             | `1gF75IhtJ6uU0wt-66Y_w4rV4D1szje8CzHrBzIHAcfc`     | No      |
| `QR_SHEET_RANGE`              | `'QR Visits'!A:F`                                  | No      |

Secrets must not use a `NEXT_PUBLIC_` prefix. Paste JSON directly, including braces, without adding enclosing quotes. Vercel supplies `VERCEL_ENV` automatically; do not add or override it.

After the reviewed code is transferred into the client repo's production branch, deploy that commit. Environment changes apply to new deployments, so redeploy if variables were saved afterward. Keep tracking disabled on the developer repo and previews.

## Acceptance check

1. Visit `https://www.arassetrecovery.com/verify?ref=setup-test` once in a regular browser.
2. Confirm the reference displays correctly and the page still works.
3. Confirm one row with `setup-test` appears in **QR Visits**, and the recipient receives an email with the same Visit ID. Check spam and Resend's delivery status if needed.
4. A local or preview visit must not produce alerts. Verify the real letter QR still opens the expected domain, route and reference.
5. Confirm the form still includes its reference (already implemented). Don't send a fake lead without the client's agreement.
6. If either delivery fails, inspect Vercel logs for `[qr-tracking]`. The two services run independently, so one can succeed while the other fails. Rotate any credential that was exposed.

## What this measures

Every eligible server render of `/verify` is a visit, including repeat visits and visits without a reference (`direct`). Known crawler user agents and prefetches are skipped; bot filtering is best effort. No IP address is stored. City/region/country come from Vercel headers and may be blank, inaccurate, or reflect a VPN. Timestamps in the sheet are UTC; email times use America/New_York. Location is captured before rendering; no cookie or redirect is required. Existing forms retain the reference in Formspree, but confirmed conversions are not written back to the tracking sheet.

This small-mailing implementation uses post-response background work with bounded timeouts, without a persistent queue or automatic replay. Outages can lose events or alerts. Resend/Google quotas still apply; this is not an unlimited analytics system. Do not describe it as identifying the recipient or guaranteeing every physical scan is recorded.

To stop tracking, set `QR_TRACKING_ENABLED=false` and redeploy. The verification page and form remain usable.
