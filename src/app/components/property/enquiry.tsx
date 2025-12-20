"use client";

import { FormEvent, useState } from "react";
import { Button, styled, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { WhatsApp } from "@mui/icons-material";
import { PickerValue } from "@mui/x-date-pickers/internals";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
interface EnquiryFormProps {
  propertyName: string;
  whatsappNumber: string;
}

const EnquiryForm = ({ propertyName, whatsappNumber }: EnquiryFormProps) => {
  const [errors, setErrors] = useState<{ name?: string; guests?: string }>({});
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

  const validate = () => {
    const newErrors: { name?: string; guests?: string } = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.guests.trim()) newErrors.guests = "Guest count is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const checkIn = form.checkIn
      ? dayjs(form.checkIn).format("DD/MM/YYYY")
      : "N/A";

    const checkOut = form.checkOut
      ? dayjs(form.checkOut).format("DD/MM/YYYY")
      : "N/A";

    const message = `📌 New Property Enquiry
- Property: ${propertyName}
- Name: ${form.name}
- Check-in: ${checkIn}
- Check-out: ${checkOut}
- Guests: ${form.guests}`;

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
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col justify-center gap-4 px-6 py-8 w-full"
    >
      <div>
        <TextField
          name="name"
          label="Your Name"
          color="primary"
          value={form.name}
          className="w-full"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        {errors.name && (
          <Typography className="block pl-1" variant="caption" color="error">
            {errors.name}
          </Typography>
        )}
      </div>

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
      <div>
        <TextField
          name="guests"
          label="Guests Count"
          type="number"
          className="w-full"
          value={form.guests}
          onChange={(e) => setForm({ ...form, guests: e.target.value })}
          required
        />
        {errors.guests && (
          <Typography className="block pl-1" variant="caption" color="error">
            {errors.guests}
          </Typography>
        )}
      </div>
      <Button type="submit" variant="contained" onClick={handleSubmit}>
        Send Enquiry on WhatsApp <WhatsApp className="ml-1" />
      </Button>
    </form>
  );
};

export default EnquiryForm;
