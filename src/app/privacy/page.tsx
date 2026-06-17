"use client";

import { Box, Divider, Paper, Typography } from "@mui/material";

interface Section {
  id: string;
  number: string;
  title: string;
}

const sections: Section[] = [
  { id: "who-we-are", number: "1", title: "Who We Are" },
  { id: "what-we-collect", number: "2", title: "What Data We Collect" },
  { id: "how-we-collect", number: "3", title: "How We Collect It" },
  { id: "why-we-collect", number: "4", title: "Why We Use Your Data" },
  { id: "sharing", number: "5", title: "Who We Share It With" },
  { id: "retention", number: "6", title: "How Long We Keep It" },
  { id: "security", number: "7", title: "How We Protect It" },
  { id: "rights", number: "8", title: "Your Rights" },
  { id: "cookies", number: "9", title: "Cookies" },
  { id: "third-party", number: "10", title: "Third-Party Services" },
  { id: "children", number: "11", title: "Children's Privacy" },
  { id: "changes", number: "12", title: "Changes to This Policy" },
  { id: "contact", number: "13", title: "Contact Us" },
];

const SectionHeading = ({
  id,
  number,
  title,
}: {
  id: string;
  number: string;
  title: string;
}) => (
  <Box id={id} sx={{ pt: 1, mb: 1.5, scrollMarginTop: 80 }}>
    <Typography
      variant="h5"
      fontWeight={700}
      color="primary"
      sx={{ fontSize: { xs: "1.15rem", md: "1.5rem" } }}
    >
      {number}. {title}
    </Typography>
  </Box>
);

const SubHeading = ({ title }: { title: string }) => (
  <Typography
    variant="subtitle1"
    fontWeight={700}
    sx={{ mt: 2.5, mb: 0.75, fontSize: { xs: "0.95rem", md: "1rem" } }}
    color="text.primary"
  >
    {title}
  </Typography>
);

const BodyText = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ mb: 1 }}>{children}</Typography>
);

const BulletItem = ({ text }: { text: string }) => (
  <Box sx={{ display: "flex", gap: 1.5, mb: 0.75, alignItems: "flex-start" }}>
    <Typography color="primary" sx={{ mt: "1px", flexShrink: 0 }}>
      —
    </Typography>
    <Typography sx={{ minWidth: 0 }}>{text}</Typography>
  </Box>
);

const DataRow = ({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      flexWrap: "wrap",
      gap: { xs: 0.25, sm: 0 },
      px: { xs: 2, sm: 2.5 },
      py: 1.5,
      alignItems: { xs: "flex-start", sm: "baseline" },
      borderBottom: last ? "none" : "1px solid",
      borderColor: "divider",
    }}
  >
    <Typography
      fontWeight={700}
      sx={{ width: { xs: "auto", sm: "35%" }, flexShrink: 0 }}
    >
      {label}
    </Typography>
    <Typography
      sx={{ width: { xs: "auto", sm: "65%" }, overflowWrap: "break-word" }}
      color="text.primary"
    >
      {value}
    </Typography>
  </Box>
);

// ── Mobile-friendly stacked card for "Why We Use Your Data" ──────

const PurposeCards = () => {
  const rows = [
    { purpose: "Process and manage your booking", basis: "Contract" },
    {
      purpose: "Send booking confirmations and check-in details",
      basis: "Contract",
    },
    { purpose: "Process payments via Razorpay", basis: "Contract" },
    {
      purpose: "Respond to support queries and complaints",
      basis: "Legitimate interest",
    },
    {
      purpose: "Send booking-related WhatsApp communications",
      basis: "Contract",
    },
    {
      purpose: "Comply with legal and tax obligations",
      basis: "Legal obligation",
    },
    {
      purpose: "Improve our website and service",
      basis: "Legitimate interest",
    },
    {
      purpose: "Prevent fraud and ensure platform security",
      basis: "Legitimate interest",
    },
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
      {rows.map((row, i) => (
        <Paper
          key={i}
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 0.5,
            p: 1.75,
            bgcolor: i % 2 === 0 ? "background.paper" : "action.hover",
          }}
        >
          <Typography sx={{ mb: 0.5 }}>{row.purpose}</Typography>
          <Typography variant="caption" fontWeight={700} color="primary">
            {row.basis}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

const PurposeTable = () => {
  const rows = [
    { purpose: "Process and manage your booking", basis: "Contract" },
    {
      purpose: "Send booking confirmations and check-in details",
      basis: "Contract",
    },
    { purpose: "Process payments via Razorpay", basis: "Contract" },
    {
      purpose: "Respond to support queries and complaints",
      basis: "Legitimate interest",
    },
    {
      purpose: "Send booking-related WhatsApp communications",
      basis: "Contract",
    },
    {
      purpose: "Comply with legal and tax obligations",
      basis: "Legal obligation",
    },
    {
      purpose: "Improve our website and service",
      basis: "Legitimate interest",
    },
    {
      purpose: "Prevent fraud and ensure platform security",
      basis: "Legitimate interest",
    },
  ];
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 0.5,
        overflow: "hidden",
        mb: 2,
      }}
    >
      {rows.map((row, i) => (
        <Box
          key={i}
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 1,
            px: 2.5,
            py: 1.25,
            borderTop: i === 0 ? "none" : "1px solid",
            borderColor: "divider",
            bgcolor: i % 2 === 0 ? "background.paper" : "action.hover",
          }}
        >
          <Typography>{row.purpose}</Typography>
          <Typography fontWeight={600} color="text.primary">
            {row.basis}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
};

// ── Mobile-friendly stacked card for cookies table ────────────────

const CookieCards = () => {
  const rows = [
    {
      name: "Session cookie",
      purpose: "Keeps you logged in during your visit",
      duration: "Session (cleared on close)",
      type: "Functional",
    },
    {
      name: "Auth token",
      purpose: "Authenticates your Google Sign-In session",
      duration: "Up to 30 days",
      type: "Functional",
    },
    {
      name: "Next.js internal",
      purpose: "Routing and server-side rendering functionality",
      duration: "Session",
      type: "Functional",
    },
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
      {rows.map((row, i) => (
        <Paper
          key={i}
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 0.5,
            p: 1.75,
            bgcolor: i % 2 === 0 ? "background.paper" : "action.hover",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 0.5,
            }}
          >
            <Typography fontWeight={600} color="text.primary">
              {row.name}
            </Typography>
            <Typography variant="caption" fontWeight={700} color="primary">
              {row.type}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mb: 0.25 }}>
            {row.purpose}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {row.duration}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

const CookieTable = () => {
  const rows = [
    {
      name: "Session cookie",
      purpose: "Keeps you logged in during your visit",
      duration: "Session (cleared on close)",
      type: "Functional",
    },
    {
      name: "Auth token",
      purpose: "Authenticates your Google Sign-In session",
      duration: "Up to 30 days",
      type: "Functional",
    },
    {
      name: "Next.js internal",
      purpose: "Routing and server-side rendering functionality",
      duration: "Session",
      type: "Functional",
    },
  ];
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 0.5,
        overflow: "hidden",
        mb: 2,
      }}
    >
      {rows.map((row, i) => (
        <Box
          key={i}
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 130px 90px",
            px: 2.5,
            py: 1.25,
            gap: 1,
            borderTop: i === 0 ? "none" : "1px solid",
            borderColor: "divider",
            bgcolor: i % 2 === 0 ? "background.paper" : "action.hover",
          }}
        >
          <Typography fontWeight={600} color="text.primary">
            {row.name}
          </Typography>
          <Typography>{row.purpose}</Typography>
          <Typography>{row.duration}</Typography>
          <Typography fontWeight={600} color="primary">
            {row.type}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
};

// ── Mobile-friendly stacked card for third-party services ────────

const ThirdPartyCards = () => {
  const rows = [
    {
      service: "Razorpay",
      purpose: "Payment processing",
      policy: "razorpay.com/privacy",
    },
    {
      service: "Google OAuth",
      purpose: "User authentication (Sign in with Google)",
      policy: "policies.google.com/privacy",
    },
    {
      service: "Google Ads",
      purpose:
        "Paid advertising to acquire new users (no pixel on this website)",
      policy: "policies.google.com/privacy",
    },
    {
      service: "Resend",
      purpose: "Transactional email delivery (booking confirmations, receipts)",
      policy: "resend.com/privacy",
    },
    {
      service: "WhatsApp Business",
      purpose: "Booking communications and customer support",
      policy: "whatsapp.com/legal/privacy-policy",
    },
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
      {rows.map((row, i) => (
        <Paper
          key={i}
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 0.5,
            p: 1.75,
            bgcolor: i % 2 === 0 ? "background.paper" : "action.hover",
          }}
        >
          <Typography fontWeight={600} color="text.primary" sx={{ mb: 0.5 }}>
            {row.service}
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.25 }}>
            {row.purpose}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ wordBreak: "break-all" }}
          >
            {row.policy}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

const ThirdPartyTable = () => {
  const rows = [
    {
      service: "Razorpay",
      purpose: "Payment processing",
      policy: "razorpay.com/privacy",
    },
    {
      service: "Google OAuth",
      purpose: "User authentication (Sign in with Google)",
      policy: "policies.google.com/privacy",
    },
    {
      service: "Google Ads",
      purpose:
        "Paid advertising to acquire new users (no pixel on this website)",
      policy: "policies.google.com/privacy",
    },
    {
      service: "Resend",
      purpose: "Transactional email delivery (booking confirmations, receipts)",
      policy: "resend.com/privacy",
    },
    {
      service: "WhatsApp Business",
      purpose: "Booking communications and customer support",
      policy: "whatsapp.com/legal/privacy-policy",
    },
  ];
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 0.5,
        overflow: "hidden",
        mb: 2,
      }}
    >
      {rows.map((row, i) => (
        <Box
          key={i}
          sx={{
            display: "grid",
            gridTemplateColumns: "130px 1fr 1fr",
            px: 2.5,
            py: 1.25,
            borderTop: i === 0 ? "none" : "1px solid",
            borderColor: "divider",
            bgcolor: i % 2 === 0 ? "background.paper" : "action.hover",
          }}
        >
          <Typography fontWeight={600} color="text.primary">
            {row.service}
          </Typography>
          <Typography>{row.purpose}</Typography>
          <Typography sx={{ wordBreak: "break-all" }}>{row.policy}</Typography>
        </Box>
      ))}
    </Paper>
  );
};

const PrivacyPolicyPage = () => {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section>
      <div className="container">
        <Box sx={{ my: { xs: 2, md: 3 } }}>
          <Typography variant="overline" color="primary" fontWeight={700}>
            Legal
          </Typography>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              mt: 0.5,
              mb: 1,
            }}
          >
            Privacy Policy
          </Typography>
          <Typography>
            VBS Hospitality Private Limited · villasbyserene.com
          </Typography>
          <Typography>
            Effective: 1 June 2025 · Last updated: June 2025
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "primary.main",
            borderRadius: 0.5,
            p: { xs: 2, sm: 2.5 },
            mb: { xs: 3, md: 5 },
            bgcolor: "action.hover",
            width: "100%",
          }}
        >
          <Typography>
            This Privacy Policy explains how VBS Hospitality Private Limited
            (&quot;Villas By Serene&quot;, &quot;we&quot;, &quot;our&quot;,
            &quot;us&quot;) collects, uses, stores, and protects your personal
            data when you use our website at villasbyserene.com or make a
            booking with us. It is governed by India&apos;s Digital Personal
            Data Protection Act 2023 (DPDPA). By using our platform, you consent
            to the practices described in this policy.
          </Typography>
        </Paper>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "260px 1fr" },
            gap: { xs: 3, md: 5 },
            alignItems: "start",
          }}
        >
          {/* Sticky TOC */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              position: "sticky",
              top: 80,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 0.5,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography
                  variant="caption"
                  fontWeight={700}
                  sx={{ textTransform: "uppercase", letterSpacing: 0.8 }}
                >
                  Contents
                </Typography>
              </Box>
              <Box sx={{ py: 1 }}>
                {sections.map((s) => (
                  <Box
                    key={s.id}
                    onClick={() => handleScrollTo(s.id)}
                    sx={{
                      px: 2,
                      py: 0.75,
                      cursor: "pointer",
                      display: "flex",
                      gap: 1.5,
                      alignItems: "baseline",
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="primary"
                      fontWeight={700}
                      sx={{ minWidth: 18 }}
                    >
                      {s.number}
                    </Typography>
                    <Typography variant="caption">{s.title}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Box>

          {/* Content */}
          <Box sx={{ minWidth: 0 }}>
            {/* 1 */}
            <SectionHeading id="who-we-are" number="1" title="Who We Are" />
            <BodyText>
              Villas By Serene is a premium holiday villa rental and management
              platform operated by VBS Hospitality Private Limited, incorporated
              under the Companies Act 2013, India. We are the data fiduciary
              responsible for your personal data collected through
              villasbyserene.com and associated booking communications.
            </BodyText>
            <Paper
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 0.5,
                overflow: "hidden",
                mt: 2,
              }}
            >
              <DataRow
                label="Company"
                value="VBS Hospitality Private Limited"
              />
              <DataRow label="GSTIN" value="27AALCV7250R1ZD" />
              <DataRow label="Email" value="villasbyserene@gmail.com" />
              <DataRow label="WhatsApp" value="+91 95943 77736" />
              <DataRow label="Website" value="villasbyserene.com" last />
            </Paper>
            <Divider sx={{ my: { xs: 3, md: 4 } }} />

            {/* 2 */}
            <SectionHeading
              id="what-we-collect"
              number="2"
              title="What Data We Collect"
            />
            <SubHeading title="2.1  Identity & Contact Data" />
            {[
              "Full name",
              "Email address",
              "Mobile phone number",
              "Government-issued photo ID (Aadhaar, Passport, Driver's Licence, or Voter ID) — collected at check-in by the property caretaker, not stored on our servers",
            ].map((t, i) => (
              <BulletItem key={i} text={t} />
            ))}
            <SubHeading title="2.2  Booking Data" />
            {[
              "Check-in and check-out dates",
              "Property selected, number of guests, special requests",
              "Booking reference and payment status",
              "Communications related to your booking (email, WhatsApp messages)",
            ].map((t, i) => (
              <BulletItem key={i} text={t} />
            ))}
            <SubHeading title="2.3  Payment Data" />
            <BodyText>
              Payment transactions are processed by Razorpay. We do not collect,
              store, or have access to your full card number, CVV, or banking
              credentials. We retain only the transaction reference, amount, and
              payment status returned by Razorpay after a transaction.
            </BodyText>
            <SubHeading title="2.4  Technical Data" />
            {[
              "IP address and approximate geographic location",
              "Browser type and version",
              "Pages visited and time spent on our website",
              "Device type (mobile, desktop, tablet)",
            ].map((t, i) => (
              <BulletItem key={i} text={t} />
            ))}
            <SubHeading title="2.5  Authentication Data" />
            <BodyText>
              If you sign in using Google (OAuth), we receive your name, email
              address, and profile picture from Google. We do not receive your
              Google password. The data shared is governed by Google&apos;s own
              Privacy Policy in addition to ours.
            </BodyText>
            <Divider sx={{ my: { xs: 3, md: 4 } }} />

            {/* 3 */}
            <SectionHeading
              id="how-we-collect"
              number="3"
              title="How We Collect It"
            />
            {[
              "Directly from you when you fill in the booking form, create an account, or contact us via WhatsApp or email",
              "Automatically via our website server when you browse villasbyserene.com (IP address, device, and page data)",
              "From Google when you choose to sign in using your Google account",
              "From Razorpay when a payment transaction is completed or attempted",
              "From third-party booking platforms (Airbnb, MakeMyTrip) when a booking is made through those channels and relayed to us",
            ].map((t, i) => (
              <BulletItem key={i} text={t} />
            ))}
            <Divider sx={{ my: { xs: 3, md: 4 } }} />

            {/* 4 */}
            <SectionHeading
              id="why-we-collect"
              number="4"
              title="Why We Use Your Data"
            />
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <PurposeCards />
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <PurposeTable />
            </Box>
            <BodyText>
              We do not use your personal data for automated decision-making or
              profiling.
            </BodyText>
            <Divider sx={{ my: { xs: 3, md: 4 } }} />

            {/* 5 */}
            <SectionHeading
              id="sharing"
              number="5"
              title="Who We Share It With"
            />
            <BodyText>
              We do not sell, rent, or trade your personal data. We share it
              only in the following circumstances:
            </BodyText>
            <SubHeading title="5.1  Property Owners & Caretakers" />
            <BodyText>
              Your name, contact number, and booking details are shared with the
              property owner and on-site caretaker solely to facilitate your
              stay. They are not permitted to use this data for any other
              purpose.
            </BodyText>
            <SubHeading title="5.2  Payment Processor" />
            <BodyText>
              Razorpay receives the data necessary to process your payment.
              Their privacy policy is available at razorpay.com/privacy.
            </BodyText>
            <SubHeading title="5.3  Google (Authentication)" />
            <BodyText>
              If you sign in with Google, Google processes your authentication
              data under their own privacy policy at
              policies.google.com/privacy.
            </BodyText>
            <SubHeading title="5.4  Legal Obligations" />
            <BodyText>
              We may disclose your data to law enforcement or regulatory
              authorities where required by law, court order, or to protect the
              rights and safety of our guests, staff, or the public.
            </BodyText>
            <SubHeading title="5.5  Business Transfer" />
            <BodyText>
              In the event of a merger, acquisition, or sale of VBS Hospitality
              Private Limited, your data may be transferred to the acquiring
              entity. You will be notified of any such change via email.
            </BodyText>
            <Divider sx={{ my: { xs: 3, md: 4 } }} />

            {/* 6 */}
            <SectionHeading
              id="retention"
              number="6"
              title="How Long We Keep It"
            />
            {[
              "Booking records and guest data: 7 years from the date of stay, to comply with Indian tax and accounting obligations",
              "Account data: for as long as your account is active, or until you request deletion",
              "WhatsApp and email communications: 2 years from the date of last communication",
              "Payment transaction records: 7 years, as required by Razorpay and Indian GST law",
              "Technical/server logs: 90 days",
            ].map((t, i) => (
              <BulletItem key={i} text={t} />
            ))}
            <BodyText>
              After the applicable retention period, data is securely deleted or
              anonymised.
            </BodyText>
            <Divider sx={{ my: { xs: 3, md: 4 } }} />

            {/* 7 */}
            <SectionHeading
              id="security"
              number="7"
              title="How We Protect It"
            />
            {[
              "All data transmission between your browser and our servers is encrypted using HTTPS/TLS",
              "Passwords are never stored in plain text",
              "Payment data never passes through our servers — handled entirely by Razorpay's PCI-DSS compliant infrastructure",
              "Access to booking data is restricted to authorised VBS staff only",
              "Checkout URLs are AES-encrypted to prevent parameter tampering",
            ].map((t, i) => (
              <BulletItem key={i} text={t} />
            ))}
            <BodyText>
              No method of transmission over the internet is 100% secure. While
              we take all reasonable precautions, we cannot guarantee absolute
              security. In the event of a data breach that affects your rights,
              we will notify you as required by law.
            </BodyText>
            <Divider sx={{ my: { xs: 3, md: 4 } }} />

            {/* 8 */}
            <SectionHeading id="rights" number="8" title="Your Rights" />
            <BodyText>
              Under India&apos;s Digital Personal Data Protection Act 2023, you
              have the following rights regarding your personal data:
            </BodyText>
            {[
              "Right to access — you may request a copy of the personal data we hold about you",
              "Right to correction — you may request that inaccurate or incomplete data be corrected",
              "Right to erasure — you may request deletion of your data, subject to our legal retention obligations",
              "Right to grievance redressal — you may raise a complaint with us directly",
              "Right to nominate — you may nominate another individual to exercise your rights on your behalf in the event of death or incapacity",
            ].map((t, i) => (
              <BulletItem key={i} text={t} />
            ))}
            <BodyText>
              To exercise any of these rights, contact us at
              villasbyserene@gmail.com or WhatsApp +91 95943 77736. We will
              respond within 30 days. We may ask you to verify your identity
              before processing your request.
            </BodyText>
            <BodyText>
              If you are unsatisfied with our response, you may escalate your
              complaint to India&apos;s Data Protection Board once it is
              established under the DPDPA 2023.
            </BodyText>
            <Divider sx={{ my: { xs: 3, md: 4 } }} />

            {/* 9 */}
            <SectionHeading id="cookies" number="9" title="Cookies" />
            <Paper
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: 0.5,
                p: { xs: 2, sm: 2.5 },
                mb: 2.5,
                bgcolor: "action.hover",
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight={700}
                color="primary"
                sx={{ mb: 0.5 }}
              >
                We do not use advertising or tracking cookies.
              </Typography>
              <Typography>
                No third-party advertising pixels, retargeting scripts, or
                behavioural tracking tools are installed on villasbyserene.com.
              </Typography>
            </Paper>
            <BodyText>
              Our website uses only the following functional cookies, which are
              strictly necessary for the site to operate:
            </BodyText>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <CookieCards />
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <CookieTable />
            </Box>
            <BodyText>
              Because we use only functional cookies, we do not display a cookie
              consent banner. You can disable cookies in your browser settings,
              but doing so may prevent you from logging in or completing a
              booking.
            </BodyText>
            <Divider sx={{ my: { xs: 3, md: 4 } }} />

            {/* 10 */}
            <SectionHeading
              id="third-party"
              number="10"
              title="Third-Party Services"
            />
            <BodyText>
              Our website integrates with the following third-party services.
              Each operates under its own privacy policy:
            </BodyText>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <ThirdPartyCards />
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ThirdPartyTable />
            </Box>
            <BodyText>
              We run Google Ads campaigns to reach new audiences. These
              campaigns operate on Google&apos;s platform and do not place any
              tracking pixel or retargeting cookie on villasbyserene.com.
              Visitors to our website are not tracked for advertising purposes.
            </BodyText>
            <Divider sx={{ my: { xs: 3, md: 4 } }} />

            {/* 11 */}
            <SectionHeading
              id="children"
              number="11"
              title="Children's Privacy"
            />
            <BodyText>
              Our services are directed at adults aged 18 and above. We do not
              knowingly collect personal data from children under the age of 18.
              Bookings must be made by an adult Lead Guest. If you believe a
              minor has submitted personal data to us without parental consent,
              please contact us immediately at villasbyserene@gmail.com and we
              will delete it promptly.
            </BodyText>
            <Divider sx={{ my: { xs: 3, md: 4 } }} />

            {/* 12 */}
            <SectionHeading
              id="changes"
              number="12"
              title="Changes to This Policy"
            />
            <BodyText>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices, technology, or legal requirements. The
              updated policy will be published at villasbyserene.com/privacy
              with a revised effective date. For material changes, we will
              notify you via email or a notice on our website. Your continued
              use of our platform after the effective date constitutes
              acceptance of the revised policy.
            </BodyText>
            <Divider sx={{ my: { xs: 3, md: 4 } }} />

            {/* 13 */}
            <SectionHeading id="contact" number="13" title="Contact Us" />
            <BodyText>
              For any questions, requests, or complaints regarding this Privacy
              Policy or your personal data, please contact our privacy point of
              contact:
            </BodyText>
            <Paper
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 0.5,
                overflow: "hidden",
                mt: 2,
              }}
            >
              <DataRow
                label="Company"
                value="VBS Hospitality Private Limited"
              />
              <DataRow label="Email" value="villasbyserene@gmail.com" />
              <DataRow label="WhatsApp" value="+91 95943 77736" />
              <DataRow
                label="Response time"
                value="Within 30 days of receipt"
                last
              />
            </Paper>

            <Box
              sx={{
                mt: 6,
                pt: 3,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="caption">
                © 2025 VBS Hospitality Private Limited. All rights reserved.
              </Typography>
            </Box>
          </Box>
        </Box>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;
