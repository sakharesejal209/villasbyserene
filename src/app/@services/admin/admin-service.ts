import { AdminBookingDTO } from "@/app/@types";
import httpService from "../http-service";

class AdminService {
getAllBookings = () => {
  return httpService<AdminBookingDTO[]>().get("/admin/bookings")
}

}

const adminService = new AdminService();
export default adminService;
