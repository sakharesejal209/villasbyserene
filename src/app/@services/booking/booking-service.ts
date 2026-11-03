import { UserBookingDTO } from "@/app/@types/user";
import httpService from "../http-service";
import { AuthUser } from "@/hooks/useAuth";

export interface CreateBookingPayload {
  unitId: string;
  propertyId: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  amount: number; // total incl. GST, in INR
  userId: string;
  currency?: "INR";
  adultCount: number;
  kidsCount: number;
  petCount: number;
  rooms: number;
  couponCode?: string;
}

export interface CreateBookingResponse {
  bookingId: string;
  orderId: string; // Razorpay order ID
  amount: number; // in paise
  currency: string;
}

export interface VerifyPaymentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  bookingId: string;
  // Guest details for notification
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  propertyName: string;
  unitName: string;
  adults: number;
  children: number;
  specialRequests?: string; // ← add this
  pets: number;
}

export interface VerifyPaymentResponse {
  success: boolean;
  bookingId: string;
  status: string;
}

// ── Service ───────────────────────────────────────────────────────

class BookingService {
  createBooking(payload: CreateBookingPayload, idempotencyKey: string) {
    return httpService<CreateBookingResponse>().post("/booking", payload, {
      headers: { "idempotency-key": idempotencyKey },
    });
  }

  verifyPayment(payload: VerifyPaymentPayload) {
    return httpService<VerifyPaymentResponse>().post(
      "/payment/verify",
      payload,
    );
  }

  checkAvailability = (
    unitId: string,
    checkIn: string,
    checkOut: string,
    userParam: string,
  ) => {
    return httpService<{ available: boolean }>().get(
      `/booking/check-availability/${unitId}?checkIn=${checkIn}&checkOut=${checkOut}${userParam}`,
    );
  };

  getUserBookings = () => {
    return httpService<UserBookingDTO[]>().get("/booking/my-bookings");
  };

  cancelBooking = (cancelTargetId: string) => {
    return httpService().put(`/booking/${cancelTargetId}/cancel`);
  };

  validateCoupon = (couponInput: string, checkIn: string, userId: string) => {
    return httpService<{
      valid: boolean;
      discountPercent: number;
      message: string;
    }>().post("/booking/validate-coupon", {
      code: couponInput,
      checkIn: checkIn,
      userId: userId,
    });
  };
}

const bookingService = new BookingService();
export default bookingService;
