This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contact form configuration

The `/contact` form posts to `/api/contact`, which sends the inquiry through a
single-tenant Microsoft Entra application and Microsoft Graph. Copy
`.env.example` to `.env.local` for local development and provide these values in
the production process environment:

```text
MICROSOFT_TENANT_ID
MICROSOFT_CLIENT_ID
MICROSOFT_CLIENT_SECRET
MICROSOFT_MAILBOX_ADDRESS
CONTACT_RECIPIENT_EMAIL
```

`MICROSOFT_MAILBOX_ADDRESS` is the shared mailbox used as the sender.
`CONTACT_RECIPIENT_EMAIL` is optional and defaults to that same mailbox. The
Entra application needs the Microsoft Graph `Mail.Send` application permission,
admin consent, and an Exchange Application RBAC scope limited to the shared
mailbox.

This endpoint requires a Node.js server and cannot run from a Next.js static
export. Production therefore uses the normal `npm run build` and `npm start`
flow on Lightsail. The reverse proxy must overwrite `X-Real-IP` with the client
address so the endpoint's rate limit cannot be bypassed with a forged header.
