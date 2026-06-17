"use client";

import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  IoCheckmarkCircleOutline as CheckIcon,
  IoWarningOutline as WarningIcon,
  IoCloseCircleOutline as CloseIcon,
  IoMailOutline as MailIcon,
  IoLogoWhatsapp as WhatsAppIcon,
} from "react-icons/io5";

interface Section {
  id: string;
  number: string;
  title: string;
}

const sections: Section[] = [
  { id: "overview", number: "1", title: "Policy Overview" },
  { id: "refund-table", number: "2", title: "Refund Schedule" },
  { id: "how-to-cancel", number: "3", title: "How to Cancel" },
  { id: "refund-processing", number: "4", title: "Refund Processing" },
  { id: "no-show", number: "5", title: "No-Show & Early Departure" },
  { id: "partial-payments", number: "6", title: "Partial Payments" },
  { id: "modifications", number: "7", title: "Date Modifications" },
  {
    id: "vbs-cancellation",
    number: "8",
    title: "Cancellation by Villas By Serene",
  },
  { id: "ota-bookings", number: "9", title: "OTA Bookings" },
  { id: "contact", number: "10", title: "Contact Us" },
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

const BodyText = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="body2" sx={{ mb: 1 }}>
    {children}
  </Typography>
);

const BulletItem = ({ text }: { text: string }) => (
  <Box sx={{ display: "flex", gap: 1.5, mb: 0.75, alignItems: "flex-start" }}>
    <Typography
      variant="body2"
      color="primary"
      sx={{ mt: "1px", flexShrink: 0 }}
    >
      —
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {text}
    </Typography>
  </Box>
);

const RefundTierCard = ({
  icon,
  window,
  refund,
  description,
  color,
  bgColor,
  borderColor,
}: {
  icon: React.ReactNode;
  window: string;
  refund: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}) => (
  <Paper
    elevation={0}
    sx={{
      border: "1px solid",
      borderColor,
      borderRadius: 0.5,
      p: { xs: 2, sm: 2.5 },
      bgcolor: bgColor,
      display: "flex",
      flexDirection: "column",
      gap: 0.75,
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box sx={{ color, fontSize: 22, display: "flex", alignItems: "center" }}>
        {icon}
      </Box>
      <Typography
        variant="h6"
        fontWeight={800}
        color={color}
        sx={{ fontSize: { xs: "1.05rem", sm: "1.25rem" } }}
      >
        {refund}
      </Typography>
    </Box>
    <Typography variant="body2" fontWeight={700} color={color}>
      {window}
    </Typography>
    <Typography variant="caption" color="#121111">
      {description}
    </Typography>
  </Paper>
);

const StepCard = ({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) => (
  <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
    <Box
      sx={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        bgcolor: "primary.main",
        color: "primary.contrastText",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        mt: 0.25,
      }}
    >
      <Typography variant="caption" fontWeight={800}>
        {number}
      </Typography>
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography
        variant="body2"
        fontWeight={700}
        color="text.primary"
        sx={{ mb: 0.25 }}
      >
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {body}
      </Typography>
    </Box>
  </Box>
);

// ── Mobile-friendly stacked cards for tables ─────────────────────
// Replaces horizontally-scrolling tables on small screens

const RefundScheduleCards = () => {
  const rows = [
    {
      window: "21+ days before check-in",
      refund: "100% of total paid",
      time: "5–7 business days",
      method: "Original payment method",
    },
    {
      window: "14–20 days before check-in",
      refund: "50% of total paid",
      time: "5–7 business days",
      method: "Original payment method",
    },
    {
      window: "Within 14 days of check-in",
      refund: "No refund",
      time: "—",
      method: "—",
    },
    {
      window: "No-show (no cancellation notice)",
      refund: "No refund",
      time: "—",
      method: "—",
    },
    {
      window: "Early departure",
      refund: "No refund for unused nights",
      time: "—",
      method: "—",
    },
  ];
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 1.25, mb: 3, mt: 2 }}
    >
      {rows.map((r, i) => (
        <Paper
          key={i}
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 0.5,
            p: 2,
            bgcolor: i % 2 === 0 ? "background.paper" : "action.hover",
          }}
        >
          <Typography variant="body2" fontWeight={700} sx={{ mb: 1 }}>
            {r.window}
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                Refund
              </Typography>
              <Typography variant="body2">{r.refund}</Typography>
            </Box>
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                Processing time
              </Typography>
              <Typography variant="body2">{r.time}</Typography>
            </Box>
            <Box sx={{ gridColumn: "1 / -1" }}>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                Method
              </Typography>
              <Typography variant="body2">{r.method}</Typography>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

const OtaPlatformCards = () => {
  const rows = [
    {
      platform: "Airbnb",
      policy: "Governed by Airbnb's cancellation policy selected at listing",
      contact: "Airbnb Help Centre",
    },
    {
      platform: "MakeMyTrip",
      policy: "Governed by MakeMyTrip's cancellation terms",
      contact: "MakeMyTrip customer support",
    },
    {
      platform: "villasbyserene.com",
      policy: "This policy applies in full",
      contact: "villasbyserene@gmail.com",
    },
  ];
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 1.25, mt: 2, mb: 2 }}
    >
      {rows.map((r, i) => (
        <Paper
          key={i}
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 0.5,
            p: 2,
            bgcolor: i % 2 === 0 ? "background.paper" : "action.hover",
          }}
        >
          <Typography variant="body2" fontWeight={700} sx={{ mb: 0.75 }}>
            {r.platform}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {r.policy}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Refund contact: {r.contact}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

// ── Desktop tables (unchanged, shown only on sm and up) ──────────

const RefundScheduleTable = () => (
  <TableContainer
    component={Paper}
    elevation={0}
    sx={{
      border: "1px solid",
      borderColor: "divider",
      borderRadius: 0.5,
      mb: 3,
      mt: 2,
    }}
  >
    <Table size="small">
      <TableHead>
        <TableRow sx={{ bgcolor: "primary.main" }}>
          {[
            "Cancellation window",
            "Refund amount",
            "Processing time",
            "Method",
          ].map((h) => (
            <TableCell key={h}>
              <Typography
                variant="caption"
                fontWeight={700}
                color="primary.contrastText"
              >
                {h}
              </Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {[
          [
            "21+ days before check-in",
            "100% of total paid",
            "5–7 business days",
            "Original payment method",
          ],
          [
            "14–20 days before check-in",
            "50% of total paid",
            "5–7 business days",
            "Original payment method",
          ],
          ["Within 14 days of check-in", "No refund", "—", "—"],
          ["No-show (no cancellation notice)", "No refund", "—", "—"],
          ["Early departure", "No refund for unused nights", "—", "—"],
        ].map((row, i) => (
          <TableRow
            key={i}
            sx={{ bgcolor: i % 2 === 0 ? "background.paper" : "action.hover" }}
          >
            {row.map((cell, j) => (
              <TableCell key={j}>
                <Typography variant="body2" color="text.secondary">
                  {cell}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const OtaPlatformTable = () => (
  <TableContainer
    component={Paper}
    elevation={0}
    sx={{
      border: "1px solid",
      borderColor: "divider",
      borderRadius: 0.5,
      mt: 2,
      mb: 2,
    }}
  >
    <Table size="small">
      <TableHead>
        <TableRow sx={{ bgcolor: "primary.main" }}>
          {["Platform", "Cancellation policy", "Refund contact"].map((h) => (
            <TableCell key={h}>
              <Typography
                variant="caption"
                fontWeight={700}
                color="primary.contrastText"
              >
                {h}
              </Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {[
          [
            "Airbnb",
            "Governed by Airbnb's cancellation policy selected at listing",
            "Airbnb Help Centre",
          ],
          [
            "MakeMyTrip",
            "Governed by MakeMyTrip's cancellation terms",
            "MakeMyTrip customer support",
          ],
          [
            "villasbyserene.com",
            "This policy applies in full",
            "villasbyserene@gmail.com",
          ],
        ].map((row, i) => (
          <TableRow
            key={i}
            sx={{ bgcolor: i % 2 === 0 ? "background.paper" : "action.hover" }}
          >
            {row.map((cell, j) => (
              <TableCell key={j}>
                <Typography variant="body2" color="text.secondary">
                  {cell}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const CancellationPolicyPage = () => {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section>
      <div className="container mt-4">
        <Box sx={{ mb: { xs: 3, md: 5 } }}>
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
            Cancellation Policy
          </Typography>
          <Typography variant="body2" color="text.secondary">
            VBS Hospitality Private Limited · villasbyserene.com
          </Typography>
          <Typography variant="body2" color="text.secondary">
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
          }}
        >
          <Typography variant="body2" color="text.secondary">
            This Cancellation Policy applies to all bookings made directly
            through villasbyserene.com. For bookings made via Airbnb or
            MakeMyTrip, the respective platform&apos;s cancellation policy
            governs the refund process, though Villas By Serene&apos;s
            on-property conduct policies remain in effect. All refund amounts
            are calculated on the{" "}
            <strong>total amount paid inclusive of taxes and fees.</strong>
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
                  color="text.secondary"
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
                    <Typography variant="caption" color="text.secondary">
                      {s.title}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 0.5,
                p: 2,
                mt: 2,
              }}
            >
              <Typography
                variant="caption"
                fontWeight={700}
                color="text.secondary"
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                  display: "block",
                  mb: 1.5,
                }}
              >
                Need to cancel?
              </Typography>
              <Box
                component="a"
                href="mailto:villasbyserene@gmail.com"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
                  textDecoration: "none",
                }}
              >
                <Box
                  sx={{ color: "primary.main", fontSize: 16, display: "flex" }}
                >
                  <MailIcon />
                </Box>
                <Typography variant="caption" color="primary">
                  villasbyserene@gmail.com
                </Typography>
              </Box>
              <Box
                component="a"
                href="https://wa.me/919594377736"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  textDecoration: "none",
                }}
              >
                <Box
                  sx={{ color: "success.main", fontSize: 16, display: "flex" }}
                >
                  <WhatsAppIcon />
                </Box>
                <Typography variant="caption" color="success.main">
                  +91 95943 77736
                </Typography>
              </Box>
            </Paper>
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <SectionHeading id="overview" number="1" title="Policy Overview" />
            <BodyText>
              Villas By Serene operates a tiered cancellation policy based on
              how far in advance of your check-in date you cancel. The earlier
              you cancel, the higher your refund. This policy exists to balance
              guest flexibility with the reality that late cancellations leave
              little time to rebook the property, directly impacting the
              property owner&apos;s livelihood.
            </BodyText>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
                gap: 2,
                my: 3,
              }}
            >
              <RefundTierCard
                icon={<CheckIcon />}
                window="21+ days before check-in"
                refund="100% refund"
                description="Full refund of total amount paid, processed within 5–7 business days."
                color="success.main"
                bgColor="#F0FAF4"
                borderColor="#A8D5B5"
              />
              <RefundTierCard
                icon={<WarningIcon />}
                window="14–20 days before check-in"
                refund="50% refund"
                description="Half the total amount paid is refunded, processed within 5–7 business days."
                color="#B45309"
                bgColor="#FFFBEB"
                borderColor="#FCD34D"
              />
              <RefundTierCard
                icon={<CloseIcon />}
                window="Within 14 days of check-in"
                refund="No refund"
                description="No refund is applicable. This includes no-shows and same-day cancellations."
                color="#B91C1C"
                bgColor="#FEF2F2"
                borderColor="#FECACA"
              />
            </Box>

            <Divider sx={{ my: { xs: 3, md: 4 } }} />

            <SectionHeading
              id="refund-table"
              number="2"
              title="Refund Schedule"
            />
            <BodyText>
              The table below summarises the complete refund schedule for direct
              bookings on villasbyserene.com.
            </BodyText>

            {/* Mobile: stacked cards. Desktop: table */}
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <RefundScheduleCards />
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <RefundScheduleTable />
            </Box>

            <Paper
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "warning.light",
                borderRadius: 0.5,
                p: 2,
                bgcolor: "warning.main",
                mb: 1,
              }}
            >
              <Typography variant="body2" color="#121111">
                <strong>Important:</strong> The cancellation window is
                calculated from 12:00 AM on your check-in date, not from the
                time of check-in. A booking with a check-in of 15 July must be
                cancelled by 11:59 PM on 24 June for a 100% refund, and by 11:59
                PM on 1 July for a 50% refund.
              </Typography>
            </Paper>

            <Divider sx={{ my: { xs: 3, md: 4 } }} />

            <SectionHeading
              id="how-to-cancel"
              number="3"
              title="How to Cancel"
            />
            <BodyText>
              All cancellation requests must be submitted in writing. The date
              and time we receive your written request determines which refund
              tier applies — not the date you intend to cancel. Verbal or phone
              requests are not accepted as valid cancellations.
            </BodyText>

            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, my: 2.5 }}
            >
              <StepCard
                number="1"
                title="Send a written cancellation request"
                body="Email villasbyserene@gmail.com or send a WhatsApp message to +91 95943 77736. Include your booking reference, property name, and check-in date."
              />
              <StepCard
                number="2"
                title="Receive cancellation confirmation"
                body="We will acknowledge your request within 24 hours and confirm your refund entitlement based on the date and time your request was received."
              />
              <StepCard
                number="3"
                title="Refund initiated"
                body="Once confirmed, the refund is processed to your original payment method. Razorpay processes the reversal within 5–7 business days."
              />
              <StepCard
                number="4"
                title="Amount credited"
                body="Your bank or card provider credits the amount within 2–3 additional business days after Razorpay processes it."
              />
            </Box>

            <Divider sx={{ my: { xs: 3, md: 4 } }} />

            <SectionHeading
              id="refund-processing"
              number="4"
              title="Refund Processing"
            />
            {[
              "Refunds are processed to the original payment method only — we cannot issue refunds to a different card, account, or UPI ID",
              "Razorpay processes the reversal within 5–7 business days of our confirmation",
              "Your bank or card provider may take an additional 2–3 business days to credit the amount to your account",
              "Villas By Serene is not responsible for delays caused by Razorpay, your bank, or payment network outages",
              "You will receive an email confirmation once the refund has been initiated from our end",
              "If you do not receive your refund within 10 business days of confirmation, contact us with your booking reference and we will investigate",
            ].map((t, i) => (
              <BulletItem key={i} text={t} />
            ))}

            <Divider sx={{ my: { xs: 3, md: 4 } }} />

            <SectionHeading
              id="no-show"
              number="5"
              title="No-Show & Early Departure"
            />
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ mt: 1, mb: 0.75 }}
              color="text.primary"
            >
              No-Show
            </Typography>
            <BodyText>
              A no-show occurs when the Lead Guest fails to arrive at the
              property on the confirmed check-in date without submitting a prior
              written cancellation request. No refund is provided for no-shows,
              regardless of the reason — including travel delays, medical
              emergencies, or personal circumstances. We strongly recommend
              purchasing travel insurance to cover such eventualities.
            </BodyText>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ mt: 2, mb: 0.75 }}
              color="text.primary"
            >
              Early Departure
            </Typography>
            <BodyText>
              If you choose to check out before your confirmed check-out date
              for any reason, no refund is payable for the unused nights. Early
              departure does not constitute a cancellation and the full booking
              amount remains due.
            </BodyText>

            <Divider sx={{ my: { xs: 3, md: 4 } }} />

            <SectionHeading
              id="partial-payments"
              number="6"
              title="Partial Payments"
            />
            <BodyText>
              Where a partial or instalment payment arrangement has been
              explicitly agreed with Villas By Serene in writing, the following
              applies:
            </BodyText>
            {[
              "Partial payments are not individually eligible for refund — the total booking value is used to calculate refund entitlement",
              "If the total amount paid at the time of cancellation is less than the refundable amount under the applicable tier, only the amount actually paid is refunded",
              "Outstanding instalments remain due regardless of cancellation, unless the cancellation falls within the 100% refund window",
            ].map((t, i) => (
              <BulletItem key={i} text={t} />
            ))}

            <Divider sx={{ my: { xs: 3, md: 4 } }} />

            <SectionHeading
              id="modifications"
              number="7"
              title="Date Modifications"
            />
            <BodyText>
              Requests to modify check-in or check-out dates are treated as a
              cancellation of the original booking and a new booking, subject to
              availability and current pricing. The following conditions apply:
            </BodyText>
            {[
              "Date change requests must be submitted in writing at least 21 days before the original check-in date to avoid any cancellation charge",
              "Date changes within 14–20 days of check-in are subject to the 50% refund window — the difference between the original and new booking cost is settled accordingly",
              "Date changes within 14 days of check-in are treated as a no-refund cancellation of the original booking",
              "The new booking is priced at rates applicable at the time of the change request, not the original booking rate",
              "All date changes are subject to availability and are not guaranteed",
            ].map((t, i) => (
              <BulletItem key={i} text={t} />
            ))}

            <Divider sx={{ my: { xs: 3, md: 4 } }} />

            <SectionHeading
              id="vbs-cancellation"
              number="8"
              title="Cancellation by Villas By Serene"
            />
            <BodyText>
              In the rare event that Villas By Serene must cancel a confirmed
              booking — for example, due to a property becoming uninhabitable, a
              significant safety issue, or circumstances outside our control —
              we will:
            </BodyText>
            {[
              "Notify you as soon as possible via email and WhatsApp",
              "Provide a full refund of all amounts paid, processed within 5–7 business days",
            ].map((t, i) => (
              <BulletItem key={i} text={t} />
            ))}
            <BodyText>
              Our liability is strictly limited to the refund of amounts paid to
              us. Villas By Serene is not responsible for consequential losses
              including flights, other accommodation booked, transport, or loss
              of enjoyment arising from our cancellation.
            </BodyText>

            <Divider sx={{ my: { xs: 3, md: 4 } }} />

            <SectionHeading id="ota-bookings" number="9" title="OTA Bookings" />
            <BodyText>
              Bookings made through third-party platforms are governed by that
              platform&apos;s cancellation and refund policy, not this one.
              Villas By Serene has no ability to override or modify refunds
              processed by these platforms.
            </BodyText>

            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <OtaPlatformCards />
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <OtaPlatformTable />
            </Box>

            <Divider sx={{ my: { xs: 3, md: 4 } }} />

            <SectionHeading id="contact" number="10" title="Contact Us" />
            <BodyText>
              For all cancellation requests, refund queries, or policy
              clarifications:
            </BodyText>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
                mt: 2,
              }}
            >
              <Paper
                elevation={0}
                component="a"
                href="mailto:villasbyserene@gmail.com"
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 0.5,
                  p: { xs: 2, sm: 2.5 },
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  textDecoration: "none",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <Box
                  sx={{
                    color: "primary.main",
                    fontSize: 24,
                    display: "flex",
                    flexShrink: 0,
                  }}
                >
                  <MailIcon />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color="text.primary"
                  >
                    Email
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ wordBreak: "break-word" }}
                  >
                    villasbyserene@gmail.com
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Response within 24 hours
                  </Typography>
                </Box>
              </Paper>

              <Paper
                elevation={0}
                component="a"
                href="https://wa.me/919594377736?text=Hi%2C%20I%20need%20help%20with%20my%20cancellation."
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 0.5,
                  p: { xs: 2, sm: 2.5 },
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  textDecoration: "none",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <Box
                  sx={{
                    color: "success.main",
                    fontSize: 24,
                    display: "flex",
                    flexShrink: 0,
                  }}
                >
                  <WhatsAppIcon />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color="text.primary"
                  >
                    WhatsApp
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    +91 95943 77736
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Quickest for urgent requests
                  </Typography>
                </Box>
              </Paper>
            </Box>

            <Box
              sx={{
                mt: 6,
                pt: 3,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                © 2025 VBS Hospitality Private Limited. All rights reserved. ·
                This policy forms part of our{" "}
                <Box
                  component="a"
                  href="/terms"
                  sx={{ color: "primary.main", textDecoration: "none" }}
                >
                  Terms & Conditions
                </Box>
                .
              </Typography>
            </Box>
          </Box>
        </Box>
      </div>
    </section>
  );
};

export default CancellationPolicyPage;
