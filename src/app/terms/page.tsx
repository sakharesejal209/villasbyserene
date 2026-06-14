"use client";

import {
  Box,
  Container,
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

// ── Types ─────────────────────────────────────────────────────────

interface Section {
  id: string;
  number: string;
  title: string;
}

// ── TOC data ──────────────────────────────────────────────────────

const sections: Section[] = [
  { id: "about", number: "1", title: "About Us" },
  { id: "acceptance", number: "2", title: "Acceptance of Terms" },
  { id: "bookings", number: "3", title: "Bookings & Reservations" },
  { id: "pricing", number: "4", title: "Pricing, Payments & Taxes" },
  { id: "cancellation", number: "5", title: "Cancellation & Refund Policy" },
  { id: "checkin", number: "6", title: "Check-in & Check-out" },
  { id: "conduct", number: "7", title: "Property Use & Guest Conduct" },
  { id: "liability", number: "8", title: "Liability & Disclaimers" },
  { id: "insurance", number: "9", title: "Travel Insurance" },
  { id: "privacy", number: "10", title: "Privacy & Data" },
  { id: "ip", number: "11", title: "Intellectual Property" },
  { id: "ota", number: "12", title: "Third-Party Platform Bookings" },
  { id: "disputes", number: "13", title: "Governing Law & Disputes" },
  { id: "amendments", number: "14", title: "Amendments" },
  { id: "contact", number: "15", title: "Contact Us" },
];

// ── Reusable sub-components ───────────────────────────────────────

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
    <Typography variant="h5" fontWeight={700} color="primary">
      {number}. {title}
    </Typography>
  </Box>
);

const SubHeading = ({ title }: { title: string }) => (
  <Typography
    variant="subtitle1"
    fontWeight={700}
    sx={{ mt: 2.5, mb: 0.75 }}
    color="text.primary"
  >
    {title}
  </Typography>
);

const BodyText = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
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

// ── Main page ─────────────────────────────────────────────────────

const TermsPage = () => {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section>
      <div className="container">
        {/* ── Page header ─────────────────────────────────────── */}
        <Box sx={{ my: 3 }}>
          <Typography variant="overline" color="primary" fontWeight={700}>
            Legal
          </Typography>
          <Typography variant="h3" fontWeight={800} sx={{ mt: 0.5, mb: 1 }}>
            Terms & Conditions
          </Typography>
          <Typography variant="body2" color="text.secondary">
            VBS Hospitality Private Limited · villasbyserene.com
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Effective: 1 June 2025 · Last updated: June 2025
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "260px 1fr" },
            gap: 5,
            alignItems: "start",
          }}
        >
          {/* ── Sticky TOC ───────────────────────────────────── */}
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
          </Box>

          {/* ── Content ──────────────────────────────────────── */}
          <Box>
            {/* 1. About Us */}
            <SectionHeading id="about" number="1" title="About Us" />
            <BodyText>
              Villas By Serene is a premium holiday villa rental and management
              platform operated by VBS Hospitality Private Limited, a company
              incorporated under the Companies Act 2013 and registered in India.
              Our platform at villasbyserene.com connects guests with curated
              private villa properties across Maharashtra and neighbouring
              leisure destinations.
            </BodyText>
            <BodyText>
              B-104, Yashonarayan CHS., Takka Rd, Panvel, Raigad, Maharashtra
              410206
            </BodyText>
            <BodyText>GSTIN: 27AALCV7250R1ZD</BodyText>
            <BodyText>
              For support: villasbyserene@gmail.com · WhatsApp: +91 95943 77736
            </BodyText>
            <Divider sx={{ my: 4 }} />

            {/* 2. Acceptance */}
            <SectionHeading
              id="acceptance"
              number="2"
              title="Acceptance of Terms"
            />
            <BodyText>
              By accessing villasbyserene.com, making an enquiry, or completing
              a booking, you confirm that you have read, understood, and agree
              to be bound by these Terms & Conditions in full. If you are
              booking on behalf of a group, you represent that you have the
              authority to bind all group members to these Terms and accept
              personal responsibility for compliance by all guests in your
              party.
            </BodyText>
            <BodyText>
              We reserve the right to update these Terms at any time. The
              version in effect at the time of your booking confirmation governs
              that booking.
            </BodyText>
            <Divider sx={{ my: 4 }} />

            {/* 3. Bookings */}
            <SectionHeading
              id="bookings"
              number="3"
              title="Bookings & Reservations"
            />
            <SubHeading title="3.1  How to Book" />
            <BodyText>
              Bookings may be placed directly through villasbyserene.com, via
              our listed OTA channels (Airbnb, MakeMyTrip), or by contacting our
              team on WhatsApp. A booking is confirmed only upon receipt of a
              booking confirmation email from Villas By Serene and realisation
              of full payment (or deposit, as communicated at the time of
              booking).
            </BodyText>
            <SubHeading title="3.2  Booking Confirmation" />
            <BodyText>
              You will receive a confirmation email containing your booking
              reference, property details, check-in and check-out dates, and
              payment summary. Please review this immediately and notify us
              within 24 hours of any discrepancy.
            </BodyText>
            <SubHeading title="3.3  Minimum Stay" />
            <BodyText>
              Properties may require a minimum stay, particularly on weekends,
              public holidays, and peak seasons. Minimum stay requirements are
              displayed on the listing and communicated at the time of booking.
            </BodyText>
            <SubHeading title="3.4  Guest Responsibility" />
            <BodyText>
              The primary guest making the booking (&quot;Lead Guest&quot;) must
              be at least 18 years of age, must be present at the property
              throughout the stay, and is responsible for the conduct of all
              guests. Villas By Serene reserves the right to refuse entry or
              terminate a stay without refund if this condition is not met.
            </BodyText>
            <SubHeading title="3.5  Accurate Guest Count" />
            <BodyText>
              You must declare the correct number of adults, children, infants,
              and pets at the time of booking. Undeclared additional guests or
              pets may result in termination of the stay without refund and/or
              additional charges at the property. The declared guest count must
              not exceed the maximum occupancy stated in the property listing.
            </BodyText>
            <Divider sx={{ my: 4 }} />

            {/* 4. Pricing */}
            <SectionHeading
              id="pricing"
              number="4"
              title="Pricing, Payments & Taxes"
            />
            <SubHeading title="4.1  Pricing" />
            <BodyText>
              All prices displayed on villasbyserene.com are in Indian Rupees
              (INR) and are inclusive of applicable GST unless explicitly stated
              otherwise. Prices are dynamic and may vary by season, date, and
              occupancy. The price confirmed at the time of booking is the price
              you pay — rate changes after confirmation do not affect existing
              bookings.
            </BodyText>
            <SubHeading title="4.2  Payment" />
            <BodyText>
              Full payment is due at the time of booking unless a partial
              payment arrangement is explicitly agreed in writing. Payments are
              processed securely via Razorpay. Villas By Serene does not store
              your card or payment instrument details.
            </BodyText>
            <SubHeading title="4.3  Security Deposit" />
            <BodyText>
              Certain properties require a refundable security deposit, payable
              directly at the property on check-in. The deposit amount, if
              applicable, is disclosed on the property listing and in your
              booking confirmation. The deposit is refunded within 48–72 hours
              of check-out, subject to the property being returned in
              satisfactory condition. Deductions may be made for damages, excess
              cleaning, or policy violations.
            </BodyText>
            <SubHeading title="4.4  Taxes" />
            <BodyText>
              GST is charged as applicable under Indian law. Your tax invoice
              will reflect the applicable GST component.
            </BodyText>
            <SubHeading title="4.5  Failed Payments" />
            <BodyText>
              If a payment fails, your booking is not confirmed. Please
              reattempt or contact us. Villas By Serene is not liable for
              unavailability of dates arising from a failed payment.
            </BodyText>
            <Divider sx={{ my: 4 }} />

            {/* 5. Cancellation */}
            <SectionHeading
              id="cancellation"
              number="5"
              title="Cancellation & Refund Policy"
            />

            <Paper
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: 0.5,
                p: 2.5,
                mb: 3,
                bgcolor: "action.hover",
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight={700}
                color="primary"
                sx={{ mb: 0.5 }}
              >
                Standard Cancellation Policy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                All refunds are calculated on the total amount paid inclusive of
                taxes and fees.
              </Typography>
            </Paper>

            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 0.5,
                mb: 3,
              }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: "primary.main" }}>
                    {["Cancellation window", "Refund", "Processing time"].map(
                      (h) => (
                        <TableCell key={h}>
                          <Typography
                            variant="caption"
                            fontWeight={700}
                            color="primary.contrastText"
                          >
                            {h}
                          </Typography>
                        </TableCell>
                      ),
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    [
                      "21+ days before check-in",
                      "100% of total paid",
                      "5–7 business days",
                    ],
                    [
                      "14–20 days before check-in",
                      "50% of total paid",
                      "5–7 business days",
                    ],
                    ["Within 14 days of check-in", "No refund", "—"],
                    ["No-show", "No refund", "—"],
                  ].map((row, i) => (
                    <TableRow
                      key={i}
                      sx={{
                        bgcolor:
                          i % 2 === 0 ? "background.paper" : "action.hover",
                      }}
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

            <SubHeading title="5.1  How to Cancel" />
            <BodyText>
              Cancellations must be submitted in writing via email to
              villasbyserene@gmail.com or WhatsApp (+91 95943 77736). The
              cancellation date is the date we receive your written request.
              Verbal requests are not accepted as cancellations.
            </BodyText>
            <SubHeading title="5.2  Refund Processing" />
            <BodyText>
              Approved refunds are processed to the original payment method
              within 5–7 business days. Bank processing times may add an
              additional 2–3 business days. Villas By Serene is not responsible
              for delays caused by payment processors or banks.
            </BodyText>
            <SubHeading title="5.3  Partial Payments" />
            <BodyText>
              Partial or instalment payments are not eligible for partial
              refunds. The full booking amount is used to calculate refund
              entitlement under the policy above.
            </BodyText>
            <SubHeading title="5.4  No-Show" />
            <BodyText>
              Failure to arrive at the property on the check-in date without
              prior written cancellation constitutes a no-show. No refund is
              provided for no-shows, regardless of the reason.
            </BodyText>
            <SubHeading title="5.5  Early Departure" />
            <BodyText>
              If you choose to depart the property before your confirmed
              check-out date, no refund is payable for the unused nights. Early
              departure does not constitute a cancellation.
            </BodyText>
            <SubHeading title="5.6  Force Majeure" />
            <BodyText>
              In exceptional circumstances beyond our control — including but
              not limited to natural disasters, government-mandated
              restrictions, or acts of God — Villas By Serene may offer a date
              change credit in lieu of a cash refund, at its sole discretion. A
              cash refund in such circumstances is not guaranteed.
            </BodyText>
            <SubHeading title="5.7  Cancellation by Villas By Serene" />
            <BodyText>
              In the rare event that we must cancel your booking, we will notify
              you immediately and provide a full refund of the amount paid, or
              an alternative property of equal or greater value. Our liability
              is limited to the refund of amounts paid to us — we are not liable
              for consequential losses such as travel costs or other bookings
              made in anticipation of your stay.
            </BodyText>
            <Divider sx={{ my: 4 }} />

            {/* 6. Check-in */}
            <SectionHeading
              id="checkin"
              number="6"
              title="Check-in & Check-out"
            />
            {[
              "Standard check-in time is as stated in your booking confirmation (typically 2:00 PM). Early check-in is subject to availability and may attract an additional charge.",
              "Standard check-out time is as stated in your booking confirmation (typically 11:00 AM). Late check-out is subject to availability and may attract an additional charge.",
              "Check-in instructions, caretaker contact, and access details are shared via email and WhatsApp 24 hours prior to arrival.",
              "Guests must carry a valid government-issued photo ID (Aadhaar, Passport, Driver's Licence, or Voter ID). All adults staying at the property may be required to submit ID for property records.",
              "Failure to check in on the confirmed date without prior notice constitutes a no-show. The property may be released and no refund will apply.",
            ].map((t, i) => (
              <BulletItem key={i} text={t} />
            ))}
            <Divider sx={{ my: 4 }} />

            {/* 7. Conduct */}
            <SectionHeading
              id="conduct"
              number="7"
              title="Property Use & Guest Conduct"
            />
            <SubHeading title="7.1  Permitted Use" />
            <BodyText>
              Properties are made available for private leisure stays only.
              Commercial photography, film shoots, events (including parties,
              receptions, and functions), or any commercial activity require
              prior written consent from Villas By Serene and may be subject to
              additional charges or separate agreements.
            </BodyText>
            <SubHeading title="7.2  Occupancy" />
            <BodyText>
              The number of guests staying overnight must not exceed the maximum
              occupancy declared in the listing and your booking confirmation.
              Day visitors must be disclosed at the time of booking or prior to
              arrival. Undisclosed visitors may result in the stay being
              terminated without refund.
            </BodyText>
            <SubHeading title="7.3  House Rules" />
            <BodyText>
              Each property has specific house rules disclosed on the listing
              and in your booking confirmation. These commonly include rules on
              noise levels, quiet hours, smoking, single-use plastics, and
              kitchen use. Guests are required to comply with all house rules
              throughout their stay.
            </BodyText>
            <SubHeading title="7.4  Noise & Nuisance" />
            <BodyText>
              Guests must observe quiet hours between 10:00 PM and 7:00 AM.
              Excessive noise, disruptive behaviour, or any act that disturbs
              neighbours, staff, or the local community is grounds for immediate
              termination of the stay without refund. The caretaker is
              authorised to enforce quiet hours on behalf of Villas By Serene.
            </BodyText>
            <SubHeading title="7.5  Smoking" />
            <BodyText>
              Smoking is strictly prohibited inside all Villas By Serene
              properties unless the listing explicitly states otherwise.
              Violation may result in immediate termination of the stay without
              refund and/or deduction from the security deposit for cleaning and
              remediation.
            </BodyText>
            <SubHeading title="7.6  Pets" />
            <BodyText>
              Pets are permitted only at properties explicitly listed as
              pet-friendly and only if declared at the time of booking. An
              additional pet fee applies. Undeclared pets or pets at
              non-pet-friendly properties may result in termination of the stay
              without refund.
            </BodyText>
            <SubHeading title="7.7  Alcohol" />
            <BodyText>
              Consumption of alcohol is at the discretion of the property. House
              rules on the listing will specify any restrictions. Guests are
              responsible for ensuring that consumption is lawful and does not
              disturb neighbours, staff, or the local community.
            </BodyText>
            <SubHeading title="7.8  Narcotics & Controlled Substances" />
            <Paper
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "error.light",
                borderRadius: 0.5,
                p: 2,
                mb: 1.5,
                bgcolor: "error.50",
              }}
            >
              <BodyText>
                The possession, consumption, storage, or distribution of
                narcotics, controlled substances, or any illegal drugs on Villas
                By Serene properties is strictly prohibited and constitutes a
                violation of the Narcotic Drugs and Psychotropic Substances Act,
                1985 (NDPS Act). Any guest found in violation will have their
                stay terminated immediately without refund. Villas By Serene and
                the property caretaker reserve the right to report such activity
                to the relevant law enforcement authorities. VBS Hospitality
                Private Limited accepts no liability for the actions of guests
                in this regard.
              </BodyText>
            </Paper>
            <SubHeading title="7.9  Swimming Pool & Water Body Safety" />
            <BodyText>
              Where a property includes a swimming pool or water body, guests
              acknowledge and accept that use is entirely at their own risk. No
              lifeguard or supervision is provided. Children must be supervised
              by a responsible adult at all times in and around the pool. Villas
              By Serene and the property owner accept no liability for injury,
              accident, or death arising from the use of pool or water
              facilities.
            </BodyText>
            <SubHeading title="7.10  Photography & Social Media" />
            <BodyText>
              Guests consent to sharing photographs and videos taken at the
              property on personal social media, provided that Villas By Serene
              is tagged where the content is publicly shared. Drone photography
              requires prior written approval from Villas By Serene and must
              comply with DGCA regulations. By sharing tagged content, guests
              grant Villas By Serene a non-exclusive, royalty-free licence to
              repost or feature such content in our marketing.
            </BodyText>
            <SubHeading title="7.11  Damages" />
            <BodyText>
              Guests are financially responsible for any damage to the property,
              fixtures, fittings, or equipment caused during their stay beyond
              normal wear and tear. Villas By Serene reserves the right to
              charge the Lead Guest for the cost of repairs, replacements, or
              additional cleaning required.
            </BodyText>
            <SubHeading title="7.12  Waste & Property Care" />
            <BodyText>
              Guests are required to leave the property in reasonable condition,
              dispose of waste responsibly, and follow any waste segregation
              instructions provided. Exposed food and improper disposal
              attracting pests may result in deductions from the security
              deposit.
            </BodyText>
            <SubHeading title="7.13  Right of Entry" />
            <BodyText>
              The caretaker and/or authorised representatives of Villas By
              Serene reserve the right to enter the property at any time in an
              emergency, and at reasonable notice for maintenance or inspection
              purposes.
            </BodyText>
            <Divider sx={{ my: 4 }} />

            {/* 8. Liability */}
            <SectionHeading
              id="liability"
              number="8"
              title="Liability & Disclaimers"
            />
            <SubHeading title="8.1  Property Manager Role" />
            <BodyText>
              Villas By Serene acts as the professional property manager on
              behalf of property owners. We are not the owner of most properties
              listed on our platform. Our representations regarding the property
              are made in good faith based on information provided by owners and
              our own inspections.
            </BodyText>
            <SubHeading title="8.2  Accuracy of Listings" />
            <BodyText>
              We endeavour to ensure that all listing information — photographs,
              descriptions, amenity lists, and pricing — is accurate and up to
              date. Minor variations from photographs do not constitute material
              misrepresentation.
            </BodyText>
            <SubHeading title="8.3  Personal Belongings" />
            <BodyText>
              Villas By Serene and the property owner are not responsible for
              loss, theft, or damage to guests&apos; personal belongings during
              the stay. Guests are advised to obtain appropriate travel
              insurance.
            </BodyText>
            <SubHeading title="8.4  Caretaker" />
            <BodyText>
              The property caretaker is a third-party representative and not an
              employee of VBS Hospitality Private Limited. Villas By Serene is
              not vicariously liable for the independent acts or omissions of
              the caretaker outside the scope of property management duties.
            </BodyText>
            <SubHeading title="8.5  Accessibility" />
            <BodyText>
              Properties are private residences and may not be accessible to
              guests with mobility impairments. Features such as staircases,
              uneven terrain, and pool steps are inherent to the property&apos;s
              construction. Guests with specific accessibility requirements
              should contact us before booking to assess suitability.
            </BodyText>
            <SubHeading title="8.6  Force Majeure" />
            <BodyText>
              We are not liable for any failure to perform our obligations
              caused by circumstances beyond our reasonable control, including
              natural events, power failures, water shortages, or government
              restrictions.
            </BodyText>
            <SubHeading title="8.7  Limitation of Liability" />
            <BodyText>
              To the maximum extent permitted by applicable law, Villas By
              Serene&apos;s aggregate liability to you shall not exceed the
              total amount paid by you for that booking. We are not liable for
              indirect, consequential, or punitive losses including travel
              costs, loss of enjoyment, or lost income.
            </BodyText>
            <SubHeading title="8.8  Severability" />
            <BodyText>
              If any provision of these Terms is found to be unlawful, void, or
              unenforceable, that provision shall be deemed severable and shall
              not affect the validity and enforceability of the remaining
              provisions.
            </BodyText>
            <SubHeading title="8.9  Entire Agreement" />
            <BodyText>
              These Terms, together with the booking confirmation, constitute
              the entire agreement between you and Villas By Serene. They
              supersede any prior verbal representations made by our staff or
              agents.
            </BodyText>
            <Divider sx={{ my: 4 }} />

            {/* 9. Insurance */}
            <SectionHeading
              id="insurance"
              number="9"
              title="Travel Insurance"
            />
            <BodyText>
              Villas By Serene strongly recommends that all guests obtain
              comprehensive travel insurance prior to travel, covering trip
              cancellation, medical emergencies, personal liability, and loss of
              personal belongings. Villas By Serene does not offer travel
              insurance and is not responsible for losses that would have been
              covered by such insurance.
            </BodyText>
            <Divider sx={{ my: 4 }} />

            {/* 10. Privacy */}
            <SectionHeading id="privacy" number="10" title="Privacy & Data" />
            <BodyText>
              We collect and process personal data (name, email, phone number,
              ID documents, payment information) solely for the purposes of
              managing your booking, communicating with you, and complying with
              legal obligations. We do not sell your data to third parties. Data
              is processed in accordance with applicable Indian data protection
              laws.
            </BodyText>
            <SubHeading title="WhatsApp Communications" />
            <BodyText>
              Villas By Serene communicates with guests via WhatsApp for booking
              confirmations, check-in instructions, and support. Written
              communications sent via WhatsApp constitute valid written notice
              under these Terms.
            </BodyText>
            <Divider sx={{ my: 4 }} />

            {/* 11. IP */}
            <SectionHeading id="ip" number="11" title="Intellectual Property" />
            <BodyText>
              All content on villasbyserene.com — including photography, copy,
              branding, and design — is the intellectual property of VBS
              Hospitality Private Limited or its licensors. No content may be
              reproduced, redistributed, or used for commercial purposes without
              prior written consent.
            </BodyText>
            <Divider sx={{ my: 4 }} />

            {/* 12. OTA */}
            <SectionHeading
              id="ota"
              number="12"
              title="Third-Party Platform Bookings"
            />
            <BodyText>
              If you book through Airbnb, MakeMyTrip, or any other third-party
              platform, that platform&apos;s own terms and conditions will apply
              in addition to these Terms. In the event of any conflict regarding
              the booking process, payment, or cancellation, the platform&apos;s
              terms will prevail for that booking. These Terms continue to
              govern guest conduct, property use, and all on-property matters.
            </BodyText>
            <Divider sx={{ my: 4 }} />

            {/* 13. Disputes */}
            <SectionHeading
              id="disputes"
              number="13"
              title="Governing Law & Dispute Resolution"
            />
            <BodyText>
              These Terms are governed by the laws of India. Any dispute arising
              out of or in connection with a booking shall first be attempted to
              be resolved amicably by written communication to
              villasbyserene@gmail.com within 30 days of the dispute arising.
            </BodyText>
            <BodyText>
              If the dispute is not resolved amicably, it shall be subject to
              the exclusive jurisdiction of the courts at Navi Mumbai,
              Maharashtra, India.
            </BodyText>
            <Divider sx={{ my: 4 }} />

            {/* 14. Amendments */}
            <SectionHeading id="amendments" number="14" title="Amendments" />
            <BodyText>
              Villas By Serene reserves the right to amend these Terms at any
              time. The updated Terms will be published at
              villasbyserene.com/terms with a revised effective date. Bookings
              made prior to any update remain governed by the Terms in force at
              the time of booking confirmation.
            </BodyText>
            <Divider sx={{ my: 4 }} />

            {/* 15. Contact */}
            <SectionHeading id="contact" number="15" title="Contact Us" />
            <Paper
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 0.5,
                overflow: "hidden",
              }}
            >
              {[
                { label: "Company", value: "VBS Hospitality Private Limited" },
                { label: "Website", value: "villasbyserene.com" },
                { label: "Email", value: "villasbyserene@gmail.com" },
                { label: "WhatsApp", value: "+91 95943 77736" },
                { label: "GSTIN", value: "27AALCV7250R1ZD" },
              ].map((row, i) => (
                <Box
                  key={row.label}
                  sx={{
                    display: "flex",
                    px: 2.5,
                    py: 1.5,
                    gap: 3,
                    alignItems: "baseline",
                    borderTop: i === 0 ? "none" : "1px solid",
                    borderColor: "divider",
                    bgcolor: i % 2 === 0 ? "background.paper" : "action.hover",
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color="text.secondary"
                    sx={{ minWidth: 100 }}
                  >
                    {row.label}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    {row.value}
                  </Typography>
                </Box>
              ))}
            </Paper>

            <Box
              sx={{
                mt: 6,
                pt: 3,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                © 2025 VBS Hospitality Private Limited. All rights reserved.
              </Typography>
            </Box>
          </Box>
        </Box>
      </div>
    </section>
  );
};

export default TermsPage;
