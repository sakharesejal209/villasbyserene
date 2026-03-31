export default interface FoodMenuDTO {
  menu_id: string;
  description: string;
  is_veg: boolean;
  is_non_veg: boolean;
  is_jain: boolean;
  menu_url: string;
  breakfast_time: string;
  lunch_time: string;
  dinner_time: string;
  hightea_time: string;
}
