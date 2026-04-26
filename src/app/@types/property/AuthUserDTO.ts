export default interface AuthUserDTO {
  id:            string;
  full_name:     string;
  email:         string;
  profile_image: string | null;
  phone:         string | null;
  is_admin:      boolean;
}
