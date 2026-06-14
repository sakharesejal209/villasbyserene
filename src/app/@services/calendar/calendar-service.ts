import { BlockedRangeDTO, CreateBlockDTO, FeedSourceDTO, UnitCalendarDTO } from "@/app/@types";
import httpService from "../http-service";

class CalendarService {
  getCalendarData = (selectedProp: string) => {
    return httpService<UnitCalendarDTO[]>().get(
      `/calendar/admin/${selectedProp}`,
    );
  };

  getBlockedDates = (unitId: string) => {
    return httpService<BlockedRangeDTO[]>().get(`calendar/blocked/${unitId}`)
  }

  createBlock = (data: CreateBlockDTO) => {
    return httpService().post("/calendar/blocks", data);
  };

  deleteBlock = (id: string) => {
    return httpService().delete(`/calendar/blocks/${id}`);
  };

  getSources = (selectedUnit: string) => {
    return httpService<FeedSourceDTO[]>().get(
      `/calendar/sources/${selectedUnit}`,
    );
  };

  addSource = (data: {
    unit_id: string;
    source_name: string;
    ical_url: string;
  }) => {
    return httpService().post("/calendar/sources", data);
  };

  deleteSource = (id: string) => {
    return httpService().delete(`/calendar/sources/${id}`);
  };

  syncUnit = (selectedUnit: string) => {
    return httpService().post(`/calendar/sources/sync/${selectedUnit}`);
  };
}
const calendarService = new CalendarService();
export default calendarService;
