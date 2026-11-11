# VERTEX Construction Website

Premium responsive construction website with:
- Interactive Three.js 3D building + crane. Move the mouse to influence the model; drag to rotate.
- Custom animated cursor.
- Responsive sections, service list, project gallery and contact form.
- Node.js + Express contact endpoint at `POST /api/contact`.
- Optional SMTP email notifications using Nodemailer.

## Run locally
1. Install Node.js (LTS).
2. Open a terminal in this project folder.
3. Run `npm install`.
4. Copy `.env.example` to `.env`.
5. Run `npm start`.
6. Open `http://localhost:3000`.

The contact endpoint works in local preview without SMTP: submissions are logged in the terminal and the form shows a success response. To receive emails, fill in the SMTP values in `.env` and set `CONTACT_TO` to the inbox that should receive enquiries.

## Gmail SMTP
For Gmail, enable 2-Step Verification and create a Google App Password. Use that App Password as `SMTP_PASS` (not your normal Gmail password). Keep `.env` private and never upload it to public hosting or GitHub.

## Before publishing
- Replace VERTEX name, logo, email, phone and address with the real company details.
- Replace sample portfolio images/text with the company's own work.
- Configure SMTP credentials and `CONTACT_TO`.
- Deploy to a Node.js hosting provider (the host must support running an Express server).
- Three.js and Google Fonts currently load from CDNs, so internet access is needed for those visual assets.
- Add spam protection/rate limiting and HTTPS before using the form publicly.

The form is connected to the backend route. It is not connected to any real inbox until SMTP settings are configured.
