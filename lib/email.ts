import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY environment variable is required");
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration based on environment and domain verification status
const getEmailConfig = () => {
  const isDevelopment = process.env.NODE_ENV === "development";
  const hasVerifiedDomain = process.env.RESEND_VERIFIED_DOMAIN === "true";
  const customDomain = process.env.RESEND_CUSTOM_DOMAIN || "sky.eg";

  if (hasVerifiedDomain) {
    // Production configuration with verified domain
    return {
      from: `Sky Insurance <noreply@${customDomain}>`,
      mode: "production",
    };
  } else {
    // Development or production without verified domain
    return {
      from: "Sky Insurance <onboarding@resend.dev>",
      mode: isDevelopment ? "development" : "production-fallback",
    };
  }
};

export interface EmailData {
  userInfo: {
    full_name: string;
    mobile_number: string;
    email?: string;
  };
  carInfo: {
    make: string;
    model: string;
    year: number;
    market_price: number;
    condition: string;
    fuel_type: string;
  };
  selectedOffer: {
    company: string;
    policyType: string;
    annualPremium: number;
    premiumRate: number;
  };
  documents: {
    personal_id_front?: string;
    personal_id_back?: string;
    license_front?: string;
    license_back?: string;
  };
}

export interface AbandonedCartData {
  userInfo: {
    full_name: string;
    mobile_number: string;
    email?: string;
  };
  carInfo: {
    make: string;
    model: string;
    year: number;
    market_price: number;
    condition: string;
    fuel_type: string;
  };
  timestamp: number;
}

export async function sendAbandonedCartEmail(data: AbandonedCartData) {
  try {
    const emailConfig = getEmailConfig();
    const timeAgo = Math.round((Date.now() - data.timestamp) / (1000 * 60));

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Abandoned Insurance Quote</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 700px; margin: 0 auto; background: #ffffff; }
          .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .section { background: #fef3c7; margin: 25px 0; padding: 25px; border-radius: 12px; border-left: 5px solid #f59e0b; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0; }
          .info-item { background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; }
          .info-label { font-weight: 600; color: #64748b; font-size: 14px; margin-bottom: 5px; }
          .info-value { color: #1e293b; font-size: 16px; }
          .footer { text-align: center; color: #64748b; font-size: 14px; margin-top: 40px; padding: 20px; background: #f1f5f9; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">⚠️ Abandoned Insurance Quote</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Customer left ${timeAgo} minutes ago</p>
          </div>
          
          <div class="content">
            <div class="section">
              <h3>Follow-up Required</h3>
              <p style="margin: 0; font-weight: 600;">Customer started but didn't complete quote process. Contact immediately at ${data.userInfo.mobile_number}.</p>
            </div>

            <div class="section">
              <h3>👤 Customer Information</h3>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Full Name</div>
                  <div class="info-value">${data.userInfo.full_name}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Mobile Number</div>
                  <div class="info-value">${data.userInfo.mobile_number}</div>
                </div>
                ${
                  data.userInfo.email
                    ? `<div class="info-item" style="grid-column: 1 / -1;">
                  <div class="info-label">Email Address</div>
                  <div class="info-value">${data.userInfo.email}</div>
                </div>`
                    : ""
                }
              </div>
            </div>

            <div class="section">
              <h3>🚗 Vehicle Information</h3>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Make & Model</div>
                  <div class="info-value">${data.carInfo.make} ${data.carInfo.model}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Year</div>
                  <div class="info-value">${data.carInfo.year}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Market Price</div>
                  <div class="info-value">${Math.round(data.carInfo.market_price).toLocaleString()} EGP</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Condition & Fuel</div>
                  <div class="info-value">${data.carInfo.condition} • ${data.carInfo.fuel_type}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="footer">
            <p><strong>Sky Insurance</strong> - Abandoned Cart Alert</p>
            <p>Customer abandoned quote ${timeAgo} minutes ago</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: emailConfig.from,
      to: ["website@sky.eg"],
      subject: `ABANDONED QUOTE: ${data.userInfo.full_name} - ${data.carInfo.make} ${data.carInfo.model}`,
      html: emailHtml,
    });

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function sendInsuranceQuoteEmail(data: EmailData) {
  try {
    console.log("Starting email send process...");
    const emailConfig = getEmailConfig();

    // Fetch documents as attachments (only if they exist)
    const attachments = await Promise.all([
      data.documents.personal_id_front
        ? fetchFileAsAttachment(
            data.documents.personal_id_front,
            "personal_id_front.jpg"
          )
        : null,
      data.documents.personal_id_back
        ? fetchFileAsAttachment(
            data.documents.personal_id_back,
            "personal_id_back.jpg"
          )
        : null,
      data.documents.license_front
        ? fetchFileAsAttachment(
            data.documents.license_front,
            "license_front.jpg"
          )
        : null,
      data.documents.license_back
        ? fetchFileAsAttachment(data.documents.license_back, "license_back.jpg")
        : null,
    ]);

    console.log(
      "Documents processed for attachments:",
      attachments.filter(Boolean).length
    );
    console.log("Email configuration:", emailConfig.mode);

    // Send email to sales team only (omar.khaled@sky.eg)
    const salesEmailResult = await sendSalesNotification(
      data,
      attachments.filter(Boolean),
      emailConfig
    );

    console.log("Sales email result:", salesEmailResult.success);

    return {
      success: salesEmailResult.success,
      salesEmail: salesEmailResult,
      emailConfig: emailConfig,
      note: "Sales team notification sent successfully. Customer will be contacted directly by phone.",
    };
  } catch (error) {
    console.error("Email sending failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      details: error,
    };
  }
}

async function sendSalesNotification(
  data: EmailData,
  attachments: any[],
  emailConfig: any
) {
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Insurance Quote Request</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 700px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .section { background: #f8fafc; margin: 25px 0; padding: 25px; border-radius: 12px; border-left: 5px solid #3b82f6; }
        .section h3 { margin-top: 0; color: #1e293b; font-size: 18px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0; }
        .info-item { background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; }
        .info-label { font-weight: 600; color: #64748b; font-size: 14px; margin-bottom: 5px; }
        .info-value { color: #1e293b; font-size: 16px; }
        .highlight { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 12px; margin: 25px 0; border-left: 5px solid #f59e0b; }
        .offer-highlight { background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 5px solid #10b981; text-align: center; }
        .footer { text-align: center; color: #64748b; font-size: 14px; margin-top: 40px; padding: 20px; background: #f1f5f9; }
        .priority { background: #fee2e2; border-left-color: #ef4444; }
        .steps { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; }
        .steps ol { margin: 0; padding-left: 20px; }
        .steps li { margin: 8px 0; }
        .email-config { background: #e0f2fe; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0284c7; }
        .customer-note { background: #f0f9ff; padding: 20px; border-radius: 12px; margin: 25px 0; border-left: 5px solid #0ea5e9; }
        @media (max-width: 600px) {
          .info-grid { grid-template-columns: 1fr; }
          .container { margin: 0; }
          .content { padding: 20px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 28px;">New Insurance Quote Request</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Priority: High - Customer Waiting</p>
        </div>
        
        <div class="content">
          <div class="email-config">
            <h4 style="margin-top: 0; color: #0369a1;">📧 Email Configuration</h4>
            <p style="margin: 0; color: #0369a1; font-size: 14px;">
              <strong>Mode:</strong> ${emailConfig.mode}<br>
              <strong>From:</strong> ${emailConfig.from}<br>
              <strong>Customer Email:</strong> ${data.userInfo.email || "Not provided"}
            </p>
          </div>

          <div class="customer-note">
            <h4 style="margin-top: 0; color: #0369a1;">📞 Customer Contact Method</h4>
            <p style="margin: 0; color: #0369a1; font-size: 14px;">
              <strong>Note:</strong> Customer confirmation emails have been disabled. Please contact the customer directly at <strong>${data.userInfo.mobile_number}</strong>${data.userInfo.email ? ` or <strong>${data.userInfo.email}</strong>` : ""} to confirm their quote and proceed with the insurance process.
            </p>
          </div>

          <div class="section priority">
            <h3>⚡ Immediate Action Required</h3>
            <p style="margin: 0; font-weight: 600;">New customer quote submitted. Please contact customer within 24 hours at ${data.userInfo.mobile_number}.</p>
          </div>

          <div class="section">
            <h3>👤 Customer Information</h3>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Full Name</div>
                <div class="info-value">${data.userInfo.full_name}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Mobile Number</div>
                <div class="info-value">${data.userInfo.mobile_number}</div>
              </div>
              ${
                data.userInfo.email
                  ? `<div class="info-item" style="grid-column: 1 / -1;">
                <div class="info-label">Email Address</div>
                <div class="info-value">${data.userInfo.email}</div>
              </div>`
                  : ""
              }
            </div>
          </div>

          <div class="section">
            <h3>🚗 Vehicle Information</h3>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Make & Model</div>
                <div class="info-value">${data.carInfo.make} ${data.carInfo.model}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Year</div>
                <div class="info-value">${data.carInfo.year}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Market Price</div>
                <div class="info-value">${data.carInfo.market_price.toLocaleString()} EGP</div>
              </div>
              <div class="info-item">
                <div class="info-label">Condition & Fuel</div>
                <div class="info-value">${data.carInfo.condition.charAt(0).toUpperCase() + data.carInfo.condition.slice(1)} • ${data.carInfo.fuel_type.charAt(0).toUpperCase() + data.carInfo.fuel_type.slice(1)}</div>
              </div>
            </div>
          </div>

          <div class="offer-highlight">
            <h3 style="margin-top: 0; color: #065f46;">🎯 Selected Insurance Offer</h3>
            <div style="font-size: 24px; font-weight: bold; color: #065f46; margin: 10px 0;">
              ${data.selectedOffer.company}
            </div>
            <div style="font-size: 18px; margin: 5px 0;">${data.selectedOffer.policyType}</div>
            <div style="font-size: 32px; font-weight: bold; color: #059669; margin: 15px 0;">
              ${data.selectedOffer.annualPremium.toLocaleString()} EGP
            </div>
            <div style="font-size: 14px; color: #047857;">
              Premium Rate: ${(data.selectedOffer.premiumRate * 100).toFixed(2)}% annually
            </div>
          </div>

          ${
            attachments.filter(Boolean).length > 0
              ? `
          <div class="highlight">
            <h4 style="margin-top: 0; color: #92400e;">📎 Documents Attached</h4>
            <p style="margin: 0; color: #92400e;">
              Customer documents are attached to this email for verification:
              ${data.documents.personal_id_front ? "<br>• Personal ID (Front)" : ""}
              ${data.documents.personal_id_back ? "<br>• Personal ID (Back)" : ""}
              ${data.documents.license_front ? "<br>• Driver License (Front)" : ""}
              ${data.documents.license_back ? "<br>• Driver License (Back)" : ""}
            </p>
          </div>`
              : `
          <div class="highlight">
            <h4 style="margin-top: 0; color: #92400e;">📋 Documents Status</h4>
            <p style="margin: 0; color: #92400e;">
              No documents were uploaded by the customer. Please request documents during phone contact.
            </p>
          </div>`
          }

          <div class="section">
            <h3>📋 Next Steps</h3>
            <div class="steps">
              <ol>
                <li><strong>Immediate:</strong> Review customer information and documents</li>
                <li><strong>Within 2 hours:</strong> Verify vehicle details and market price</li>
                <li><strong>Within 24 hours:</strong> Contact customer at ${data.userInfo.mobile_number}</li>
                <li><strong>Follow-up:</strong> Prepare insurance policy documentation</li>
                <li><strong>Closing:</strong> Schedule policy activation upon payment</li>
              </ol>
            </div>
          </div>
        </div>

        <div class="footer">
          <p><strong>Sky Insurance</strong> - Sales Team Notification</p>
          <p>This email was generated automatically by the Sky Insurance quote system.</p>
          <p>Timestamp: ${new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" })} (Cairo Time)</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const result = await resend.emails.send({
      from: emailConfig.from,
      to: ["website@sky.eg"],
      subject: `URGENT: New Quote Request - ${data.userInfo.full_name} (${data.selectedOffer.company} - ${data.selectedOffer.annualPremium.toLocaleString()} EGP)`,
      html: emailHtml,
      attachments: attachments,
    });

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

async function fetchFileAsAttachment(url: string, filename: string) {
  try {
    // Handle base64 data URLs
    if (url.startsWith("data:")) {
      const [header, base64Data] = url.split(",");
      const mimeType =
        header.match(/data:([^;]+)/)?.[1] || "application/octet-stream";

      return {
        filename,
        content: Buffer.from(base64Data, "base64"),
        type: mimeType,
      };
    }

    // Handle regular URLs
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Failed to fetch ${filename}: ${response.statusText}`);

    const buffer = await response.arrayBuffer();
    return {
      filename,
      content: Buffer.from(buffer),
      type: response.headers.get("content-type") || "application/octet-stream",
    };
  } catch (error) {
    console.error(`Failed to fetch attachment ${filename}:`, error);
    return null;
  }
}
