import { ProfileFormDTO } from "@/app/@types/user";
import httpService from "../http-service";

class UserService {
  getCurrentUser = () => {
    return httpService().get(`/auth/me`);
  };

  updateUser = (data: ProfileFormDTO) => {
    return httpService().put("/auth/me", data)
  }
}

const userService = new UserService();
export default userService;
