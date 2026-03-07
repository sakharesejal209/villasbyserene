import httpService from "../http-service";

class UserService {
  getCurrentUser = () => {
    return httpService().get(`/auth/me`);
  };
}

const userService = new UserService();
export default userService;
