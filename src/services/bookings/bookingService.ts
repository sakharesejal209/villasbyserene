import { CreateBookingDTO } from "@/types";
import httpService from "../http-service";

class BookingService {
  createBooking = (data: CreateBookingDTO, idempotencyKey: string) => {
    return httpService().post("booking/", data, {
      headers: {
        idempotencyKey: idempotencyKey,
      },
    });
  };
}

const bookingService = new BookingService();
export default bookingService;
