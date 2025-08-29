"use client";

import { useState } from "react";
import { Button, styled, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { WhatsApp } from "@mui/icons-material";
import { PickerValue } from "@mui/x-date-pickers/internals";

interface EnquiryFormProps {
  propertyName: string;
  whatsappNumber: string;
}

const EnquiryForm = ({ propertyName, whatsappNumber }: EnquiryFormProps) => {
  const [form, setForm] = useState<{
    name: string;
    checkIn: PickerValue;
    checkOut: PickerValue;
    guests: string;
  }>({
    name: "",
    checkIn: null,
    checkOut: null,
    guests: "",
  });

  const handleSubmit = () => {
    const message = `📌 New Property Enquiry
🏡 Property: ${propertyName}
👤 Name: ${form.name}
📅 Check-in: ${form.checkIn}
📅 Check-out: ${form.checkOut}
👥 Guests: ${form.guests}`;

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(url, "_blank");
  };

  const CustomDatePicker = styled(DatePicker)({
    "& label.Mui-focused": {
      color: "#A0AAB4",
    },
  });

  return (
    <div className="flex flex-col justify-center gap-4 px-6 py-8">
      <TextField
        name="name"
        label="Your Name"
        color="primary"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <CustomDatePicker
        label="Checkin Date"
        value={form.checkIn}
        onChange={(newVal) => setForm({ ...form, checkIn: newVal })}
        slotProps={{
          textField: { fullWidth: true },
        }}
        format="DD/MM/YYYY"
        disablePast
      />
      <CustomDatePicker
        label="Checkout Date"
        value={form.checkOut}
        onChange={(newVal) => setForm({ ...form, checkOut: newVal })}
        format="DD/MM/YYYY"
        shouldDisableDate={(date) => {
          return form.checkIn ? date.isBefore(form.checkIn, "day") : false;
        }}
      />
      <TextField
        name="guests"
        label="Guests Count"
        type="number"
        value={form.guests}
        onChange={(e) => setForm({ ...form, guests: e.target.value })}
        required
      />
      <Button variant="contained" onClick={handleSubmit}>
        Send Enquiry on WhatsApp <WhatsApp className="ml-1" />
      </Button>
    </div>
  );
};

export default EnquiryForm;
