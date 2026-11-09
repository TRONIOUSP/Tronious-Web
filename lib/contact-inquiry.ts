export const DEVICE_TYPES = [
  "Electrotherapy",
  "Photobio-modulation",
  "Pneumatic compression",
  "Massage / non-pneumatic compression",
  "Thermal therapy",
  "Other",
] as const;

export const PROJECT_STAGES = [
  "Idea / concept",
  "Prototype",
  "Design complete, not cleared",
  "Cleared, need a manufacturer",
] as const;

export const ANNUAL_VOLUMES = [
  "Under 1,000",
  "1,000–10,000",
  "10,000–50,000",
  "Over 50,000",
] as const;

const TARGET_MARKETS = new Set(["us", "eu", "au", "other"]);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactInquiry = {
  name: string;
  company: string;
  email: string;
  country: string;
  deviceType: (typeof DEVICE_TYPES)[number];
  projectStage: (typeof PROJECT_STAGES)[number];
  targetMarkets: string[];
  annualVolume: (typeof ANNUAL_VOLUMES)[number];
  targetLaunch: string;
  projectDescription: string;
  requestNda: boolean;
  website: string;
};

type ParseResult =
  | { ok: true; data: ContactInquiry }
  | { ok: false; message: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function cleanString(value: unknown, maximumLength: number) {
  if (typeof value !== "string") return null;

  const cleaned = value.trim();
  if (cleaned.length > maximumLength) return null;
  return cleaned;
}

function isOneOf<T extends readonly string[]>(
  value: string,
  options: T,
): value is T[number] {
  return options.includes(value as T[number]);
}

export function parseContactInquiry(input: unknown): ParseResult {
  if (!isRecord(input)) {
    return { ok: false, message: "Please check the form and try again." };
  }

  const name = cleanString(input.name, 120);
  const company = cleanString(input.company, 160);
  const email = cleanString(input.email, 254)?.toLowerCase() ?? null;
  const country = cleanString(input.country, 120);
  const deviceType = cleanString(input.deviceType, 80);
  const projectStage = cleanString(input.projectStage, 80);
  const annualVolume = cleanString(input.annualVolume, 40);
  const targetLaunch = cleanString(input.targetLaunch, 80);
  const projectDescription = cleanString(input.projectDescription, 5000);
  const website = cleanString(input.website, 200);

  if (!name || !company || !email || !EMAIL_PATTERN.test(email)) {
    return {
      ok: false,
      message: "Enter your name, company and a valid work email.",
    };
  }

  if (
    country === null ||
    targetLaunch === null ||
    projectDescription === null ||
    website === null ||
    !deviceType ||
    !isOneOf(deviceType, DEVICE_TYPES) ||
    !projectStage ||
    !isOneOf(projectStage, PROJECT_STAGES) ||
    !annualVolume ||
    !isOneOf(annualVolume, ANNUAL_VOLUMES)
  ) {
    return { ok: false, message: "Please check the form and try again." };
  }

  const targetMarkets = Array.isArray(input.targetMarkets)
    ? input.targetMarkets.filter(
        (market): market is string =>
          typeof market === "string" && TARGET_MARKETS.has(market),
      )
    : [];

  return {
    ok: true,
    data: {
      name,
      company,
      email,
      country,
      deviceType,
      projectStage,
      targetMarkets: [...new Set(targetMarkets)],
      annualVolume,
      targetLaunch,
      projectDescription,
      requestNda: input.requestNda === true,
      website,
    },
  };
}

const MARKET_LABELS: Record<string, string> = {
  us: "United States",
  eu: "European Union",
  au: "Australia",
  other: "Other",
};

export function formatInquiryMessage(inquiry: ContactInquiry) {
  const markets =
    inquiry.targetMarkets.map((market) => MARKET_LABELS[market]).join(", ") ||
    "Not specified";

  return [
    "A new project inquiry was submitted through tronious.com.",
    "",
    `Name: ${inquiry.name}`,
    `Company: ${inquiry.company}`,
    `Work email: ${inquiry.email}`,
    `Country: ${inquiry.country || "Not specified"}`,
    `Device type: ${inquiry.deviceType}`,
    `Project stage: ${inquiry.projectStage}`,
    `Target markets: ${markets}`,
    `Expected annual volume: ${inquiry.annualVolume}`,
    `Target launch: ${inquiry.targetLaunch || "Not specified"}`,
    `Mutual NDA requested: ${inquiry.requestNda ? "Yes" : "No"}`,
    "",
    "Project description:",
    inquiry.projectDescription || "Not provided",
  ].join("\n");
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

function detailCell(label: string, value: string) {
  return `
    <td width="50%" valign="top" style="padding:0 8px 16px 0;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:16px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#627287;">${escapeHtml(label)}</div>
      <div style="padding-top:4px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;font-weight:600;color:#14212e;">${escapeHtml(value)}</div>
    </td>`;
}

/**
 * Table-based layout and inline styles keep the message dependable in Outlook
 * while still reading cleanly in Gmail, Apple Mail and mobile clients.
 */
export function formatInquiryHtml(inquiry: ContactInquiry) {
  const name = escapeHtml(inquiry.name);
  const company = escapeHtml(inquiry.company);
  const email = escapeHtml(inquiry.email);
  const markets =
    inquiry.targetMarkets.map((market) => MARKET_LABELS[market]).join(", ") ||
    "Not specified";
  const description = escapeHtml(
    inquiry.projectDescription || "Not provided",
  ).replace(/\r?\n/g, "<br>");
  const replySubject = encodeURIComponent(
    `Re: Project inquiry from ${inquiry.company}`,
  );
  const ndaBackground = inquiry.requestNda ? "#fff2db" : "#eaf0f6";
  const ndaColour = inquiry.requestNda ? "#9a5b00" : "#3c4c60";
  const ndaLabel = inquiry.requestNda
    ? "Mutual NDA requested"
    : "No NDA requested";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>New TRONIOUS project inquiry</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f3f5f7;color:#14212e;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">New project inquiry from ${name} at ${company}.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background-color:#f3f5f7;">
      <tr>
        <td align="center" style="padding:32px 12px;">
          <table role="presentation" width="680" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:680px;background-color:#ffffff;border:1px solid #d3dae2;">
            <tr>
              <td style="padding:26px 32px;background-color:#0f2740;border-bottom:4px solid #4fc3e6;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="font-family:Arial,Helvetica,sans-serif;font-size:20px;line-height:26px;font-weight:700;letter-spacing:3px;color:#ffffff;">TRONIOUS</td>
                    <td align="right"><span style="display:inline-block;padding:6px 10px;background-color:#17406b;font-family:Arial,Helvetica,sans-serif;font-size:10px;line-height:14px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#eaf1f8;">Website inquiry</span></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:34px 32px 16px;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#1f5fbf;">New project inquiry</div>
                <h1 style="margin:8px 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:28px;line-height:36px;font-weight:700;color:#14212e;">A new conversation is ready to review</h1>
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:25px;color:#56657a;">${name} from ${company} submitted a project brief through tronious.com.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 32px 24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#eaf0f6;border-left:4px solid #1f5fbf;">
                  <tr>
                    <td style="padding:20px 22px;">
                      <div style="font-family:Arial,Helvetica,sans-serif;font-size:20px;line-height:26px;font-weight:700;color:#14212e;">${name}</div>
                      <div style="padding-top:3px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:21px;color:#56657a;">${company}${inquiry.country ? ` &nbsp;&middot;&nbsp; ${escapeHtml(inquiry.country)}` : ""}</div>
                      <div style="padding-top:10px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;"><a href="mailto:${email}?subject=${replySubject}" style="font-weight:700;color:#1f5fbf;text-decoration:none;">${email}</a></div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 12px;">
                <div style="padding-bottom:15px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#627287;border-bottom:1px solid #d3dae2;">Project snapshot</div>
              </td>
            </tr>
            <tr>
              <td style="padding:4px 32px 12px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>${detailCell("Device type", inquiry.deviceType)}${detailCell("Project stage", inquiry.projectStage)}</tr>
                  <tr>${detailCell("Target markets", markets)}${detailCell("Expected annual volume", inquiry.annualVolume)}</tr>
                  <tr>${detailCell("Target launch", inquiry.targetLaunch || "Not specified")}${detailCell("Country", inquiry.country || "Not specified")}</tr>
                </table>
                <span style="display:inline-block;padding:7px 11px;background-color:${ndaBackground};font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:16px;font-weight:700;color:${ndaColour};">${ndaLabel}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 8px;">
                <div style="padding-bottom:15px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#627287;border-bottom:1px solid #d3dae2;">Project description</div>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 32px 28px;">
                <div style="padding:20px 22px;background-color:#f8fafb;border:1px solid #e4eaf1;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;color:#26364a;">${description}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 36px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td bgcolor="#1f5fbf" style="background-color:#1f5fbf;"><a href="mailto:${email}?subject=${replySubject}" style="display:inline-block;padding:13px 20px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:18px;font-weight:700;color:#ffffff;text-decoration:none;">Reply to ${name}</a></td>
                  </tr>
                </table>
                <p style="margin:13px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#627287;">Outlook&rsquo;s Reply action is also directed to ${email}.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background-color:#14212e;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:18px;color:#a9bcd0;">Submitted securely through <span style="color:#ffffff;">tronious.com/contact</span>. Keep confidential technical material out of email until an NDA is in place.</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
