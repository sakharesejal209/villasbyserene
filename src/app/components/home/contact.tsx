"use client";

import {
  Button,
  Card,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import {
  ChatOutlined as Message,
  PhoneOutlined as Phone,
  EmailOutlined as Mail,
  LocationOnOutlined as MapPin,
  CloseOutlined as CloseIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import ContactBg from "../../../../public/assets/contact.png";
import Image from "next/image";
import { PickerValue } from "@mui/x-date-pickers/internals";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    checkIn: null,
    checkOut: null,
    guests: "",
    message: "",
  });
  const [openWarningToast, setOpenWarningToast] = React.useState(false);
  const [openSuccessToast, setOpenSuccessToast] = React.useState(false);

  const handleClose = () => {
    setOpenWarningToast(false);
  };

  const handleInputChange = (field: string, value: string | PickerValue) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateWhatsAppMessage = () => {
    let message = `Hi! I'm interested in booking a vacation rental.\n\n`;
    message += `📋 Booking Details:\n`;
    message += `Name: ${formData.name}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Number of guests: ${formData.guests}\n`;

    if (formData.checkIn !== null) message += `Check-in: ${formData.checkIn}\n`;
    if (formData.checkOut !== null)
      message += `Check-out: ${formData.checkOut}\n`;
    if (formData.location !== null)
      message += `Preffered Location: ${formData.location}\n`;
    if (formData.message !== null) {
      message += `\n💬 Additional message:\n${formData.message}`;
    }

    message += `\n\nI would appreciate more information about availability and pricing. Thank you!`;

    return message;
  };

  const handleWhatsAppSubmit = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.guests
    ) {
      setOpenWarningToast(true);
      return;
    }

    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/9594377736?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
    setOpenSuccessToast(true);
  };

  const CustomDatePicker = styled(DatePicker)({
    "& label.Mui-focused": {
      color: "#A0AAB4",
    },
  });

  const CustomSection = styled("section")({
    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/contact.png')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100%",
  });

  return (
    <CustomSection>
      <div className="py-0">
        <div className="container">
          <div className="flex flex-col justify-center items-center mt-5 mb-8 md:mb-12 text-white">
            <Typography variant="h3" className="mb-4">
              Contact Us
            </Typography>
            <Typography variant="subtitle1" className="w-full md:w-1/2 text-center">
              Ready to book your perfect vacation? Fill out the form below and
              we&apos;ll get back to you instantly via WhatsApp
            </Typography>
          </div>

          <div className="w-full grid lg:grid-cols-2 gap-4 md:gap-8">
            {/* Contact Form */}
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Message className="w-5 h-5 mt-1.5" />
                <Typography variant="h5">Send us a message</Typography>
              </div>

              <div className="mt-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <TextField
                    name="name"
                    label="Full Name *"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                  <TextField
                    name="email"
                    type="email"
                    label="Email Address *"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                  <TextField
                    name="phone"
                    label="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full"
                  />
                  <TextField
                    name="location"
                    label="Preferred Location"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4 my-4">
                  <CustomDatePicker
                    name="checkin"
                    label="Check-in"
                    value={formData.checkIn}
                    onChange={(newval) => handleInputChange("checkIn", newval)}
                    format="DD/MM/YYYY"
                    disablePast
                  />
                  <CustomDatePicker
                    name="checkout"
                    label="Check-out"
                    value={formData.checkOut}
                    onChange={(newval) => handleInputChange("checkIn", newval)}
                    format="DD/MM/YYYY"
                    disablePast
                  />
                  <TextField
                    name="guests"
                    label="Guests Count"
                    type="number"
                    value={formData.guests}
                    onChange={(e) =>
                      handleInputChange("guests", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="my-4">
                  <TextField
                    className="w-full"
                    name="message"
                    placeholder="Tell us about your vacation plans, special requests, or any questions you have..."
                    label="Additional Message (Optional)"
                    rows={2}
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    multiline
                  />
                </div>

                <Button
                  className="w-full"
                  size="large"
                  variant="outlined"
                  onClick={handleWhatsAppSubmit}
                >
                  <Message className="w-4 h-4 mr-2" />
                  Send Inquiry via WhatsApp
                </Button>

                <Typography
                  variant="caption"
                  className="block text-center !mt-4"
                >
                  * Required fields. We&apos;ll respond to your inquiry within
                  minutes via WhatsApp.
                </Typography>
              </div>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <div className="p-4 md:p-6">
                  <Typography variant="h5" className="mb-4">
                    Get in Touch
                  </Typography>
                  <div className="my-4">
                    <div className="flex items-center">
                      <div className="w-[20%] flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div className="w-[80%]">
                        <Typography className="font-semibold">
                          WhatsATypography
                        </Typography>
                        <Typography className="text-muted-foreground">
                          +91 95943 77736
                        </Typography>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-[20%] flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div className="w-[80%]">
                        <Typography className="font-semibold">Email</Typography>
                        <Typography className="text-muted-foreground">
                          villasbyserene@gmail.com
                        </Typography>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-[20%] flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div className="w-[80%]">
                        <Typography>Office</Typography>
                        <Typography>
                          Raj Avenue, MCCH Society, Panvel, Raigad Maharashtra,
                          410206
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-4 md:p-6">
                  <Typography variant="h5" className="!mb-4">
                    Why Choose WhatsApp?
                  </Typography>
                  <div className="flex flex-col items-start gap-1">
                    <Typography className="block">
                      Instant response within minutes
                    </Typography>
                    <Typography className="block">
                      Share photos and documents easily
                    </Typography>
                    <Typography className="block">
                      Real-time communication
                    </Typography>
                    <Typography className="block">Available 24/7</Typography>
                    <Typography className="block">
                      Secure and private messaging
                    </Typography>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-4 md:p-6">
                  <Typography variant="h5" className="!mb-4">
                    Office Hours
                  </Typography>
                  <div>
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="text-muted-foreground">
                        9:00 AM - 8:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="text-muted-foreground">
                        10:00 AM - 6:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-muted-foreground">
                        12:00 PM - 5:00 PM
                      </span>
                    </div>
                    <div className="mt-3 bg-muted/50 rounded text-xs">
                      WhatsApp support is available 24/7 for urgent inquiries
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <Snackbar
          color="warning"
          open={openWarningToast}
          autoHideDuration={5000}
          onClose={handleClose}
          message="Please fill in all required fields (Name, Email, Phone, Guests)"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
        <Snackbar
          open={openSuccessToast}
          autoHideDuration={5000}
          onClose={handleClose}
          message="Please fill in all required fields (Name, Email, Phone)"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </div>
    </CustomSection>
  );
};

export default Contact;
