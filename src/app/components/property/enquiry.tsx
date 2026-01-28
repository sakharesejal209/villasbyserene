"use client";

import { FormEvent } from "react";
import { Button, styled, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { WhatsApp } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import bookingService from "@/services/bookings/bookingService";

interface EnquiryFormProps {
  propertyName: string;
  whatsappNumber: string;
}

interface EnquiryFormData {
  name: string;
  checkIn: dayjs.Dayjs | null;
  checkOut: dayjs.Dayjs | null;
  guests: string;
}

const CustomDatePicker = styled(DatePicker)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
});

const EnquiryForm = ({ propertyName, whatsappNumber }: EnquiryFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    defaultValues: {
      name: "",
      checkIn: null,
      checkOut: null,
      guests: "",
    },
  });

  const checkInValue = watch("checkIn");

  const onSubmit = (data: EnquiryFormData) => {
    const checkIn = data.checkIn
      ? dayjs(data.checkIn).format("DD/MM/YYYY")
      : "N/A";

    const checkOut = data.checkOut
      ? dayjs(data.checkOut).format("DD/MM/YYYY")
      : "N/A";

    const message = `📌 New Property Enquiry
- Property: ${propertyName}
- Name: ${data.name}
- Check-in: ${checkIn}
- Check-out: ${checkOut}
- Guests: ${data.guests}`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(url, "_blank");
  };

  const handleBookNow = () => {
    bookingService.createBooking({
      amount: 12000,
      checkIn: "",
      checkOut: "",
      currency: "INR",
      propertyId: "",
      unitId: "",
      userId: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center gap-4 px-6 py-8 w-full"
    >
      {/* Name */}
      <TextField
        label="Your Name"
        className="w-full"
        {...register("name", { required: "Name is required" })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      {/* Check-in */}
      <Controller
        name="checkIn"
        control={control}
        render={({ field }) => (
          <CustomDatePicker
            label="Check-in Date"
            {...field}
            format="DD/MM/YYYY"
            disablePast
            slotProps={{ textField: { fullWidth: true } }}
          />
        )}
      />

      {/* Check-out */}
      <Controller
        name="checkOut"
        control={control}
        render={({ field }) => (
          <CustomDatePicker
            label="Check-out Date"
            {...field}
            format="DD/MM/YYYY"
            shouldDisableDate={(date) =>
              checkInValue ? date.isBefore(checkInValue, "day") : false
            }
            slotProps={{ textField: { fullWidth: true } }}
          />
        )}
      />

      {/* Guests */}
      <TextField
        label="Guests Count"
        type="number"
        className="w-full"
        {...register("guests", { required: "Guest count is required" })}
        error={!!errors.guests}
        helperText={errors.guests?.message}
      />

      {/* WhatsApp */}
      <Button type="submit" variant="contained">
        Send Enquiry on WhatsApp <WhatsApp className="ml-1" />
      </Button>

      {/* Book now */}
      <Button onClick={handleBookNow}>Book Now</Button>
    </form>
  );
};

export default EnquiryForm;
