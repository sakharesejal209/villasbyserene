import httpService from "../http-service";

class PropertiesService {
  fetchAllProperties = () => {
    return httpService().get("/users");
  };

  fetchPropertyDetails = (propId: string) => {
    return httpService().get(`/users/${propId}`);
  };
}

const propertiesService = new PropertiesService();
export default propertiesService;
