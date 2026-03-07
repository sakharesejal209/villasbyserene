"use client";

import { Button, styled, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { WhatsApp } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import bookingService from "@/services/bookings/bookingService";
import { CreateBookingDTO } from "@/types";
import { uniqueId } from "lodash";
import { v4 as uuidv4 } from 'uuid';


interface EnquiryFormProps {
  propertyName: string;
  propertyId: string;
  whatsappNumber: string;
}

interface EnquiryFormData {
  name: string;
  checkIn: dayjs.Dayjs | null;
  checkOut: dayjs.Dayjs | null;
  adultCount: number;
  kidsCount: number;
  petCount: number;
}

const CustomDatePicker = styled(DatePicker)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
});

const EnquiryForm = ({
  propertyName,
  whatsappNumber,
  propertyId,
}: EnquiryFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    defaultValues: {
      checkIn: null,
      checkOut: null,
      adultCount: 1,
      kidsCount: 0,
      petCount: 0,
    },
  });

  const checkInValue = watch("checkIn");

  const idempotencyKey = uuidv4();

  const onSubmit = (data: EnquiryFormData) => {
    console.log("data:", data);

    // const checkIn = data.checkIn
    //   ? dayjs(data.checkIn).format("DD/MM/YYYY")
    //   : "N/A";
    // const checkOut = data.checkOut
    //   ? dayjs(data.checkOut).format("DD/MM/YYYY")
    //   : "N/A";

    //     const message = `📌 New Property Enquiry
    // - Property: ${propertyName}
    // - Name: ${data.name}
    // - Check-in: ${checkIn}
    // - Check-out: ${checkOut}
    // - Guests: ${data.guests}`;
    //     const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    //       message,
    //     )}`;
    // window.open(url, "_blank");
  };

  const handleBookNow = () => {
    bookingService.createBooking(
      {
        amount: 12000,
        checkIn: "10/02/2026",
        checkOut: "11/02/2026",
        currency: "INR",
        propertyId: propertyId,
        unitId: "c6a902e7-72d6-42a8-970c-10f77080e153",
        userId: "37b3d6bc-6b58-417e-8897-377337f1c637",
        adultCount: 1,
        kidsCount: 0,
        petCount: 0,
      },
      idempotencyKey,
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center gap-4 px-4 py-6 w-full"
    >
      {/* Name */}
      {/* <TextField
        label="Your Name"
        className="w-full"
        {...register("name", { required: "Name is required" })}
        error={!!errors.name}
        helperText={errors.name?.message}
      /> */}

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
      <div className="grid md:grid-cols-3 gap-4 md:gap-2">
        <TextField
          label="Adult Count"
          type="number"
          className="w-full"
          {...register("adultCount", { required: "Guest count is required" })}
          error={!!errors.adultCount}
          helperText={errors.adultCount?.message}
        />
        <TextField
          label="Kids Count"
          type="number"
          className="w-full"
          {...register("kidsCount")}
        />
        <TextField
          label="Pet Count"
          type="number"
          className="w-full"
          {...register("petCount")}
        />
      </div>

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
