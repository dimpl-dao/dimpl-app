export type PickedDeliveryAddress = {
  address: string;
  addressEnglish: string;
  zonecode: string;
  buildingName: string;
};

export type DeliveryAddress = {
  id: string;
  address_ko: string;
  address_en: string;
  zonecode: string;
  specifics: string;
  name: string;
};
