import { AdminBookingDTO } from "@/app/@types";
import httpService from "../http-service";

class AdminService {
  getAllBookings = () => {
    return httpService<AdminBookingDTO[]>().get("/admin/bookings");
  };

  bulkDeleteFromPool = (deleteSelections) => {
    return httpService().post("/admin/properties/images/pool/bulk-delete", {
      imageIds: Array.from(deleteSelections),
    });
  };
}

const adminService = new AdminService();
export default adminService;
