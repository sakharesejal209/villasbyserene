import { CreateBookingDTO } from "@/types";
import httpService from "../http-service";

class BookingService {
 
  createBooking = (data: CreateBookingDTO) => {
    return httpService().post('booking/', data);
  };
}

const bookingService = new BookingService();
export default bookingService;
