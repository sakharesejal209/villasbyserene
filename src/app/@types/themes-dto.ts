export default interface ThemesDTO {
  property_id: string;
  theme_id: string;
  propertyName: string;
  theme: {
    theme_id: string;
    name: string;
  };
}
