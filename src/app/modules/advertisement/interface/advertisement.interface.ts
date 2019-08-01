export interface Advertisement {
  cd_advertisement: number;
  title: string;
  ds_advertisement: string;
  price: number;
  cd_user: number;
  cd_address: number;
  cd_category: number;
  advertisement_photo: string;
  cd_advertisement_status: string;
  user: User;
  category: Category;
  advertisement_status: AdvertisementStatus;
  address: Address;
}
export interface User {
  cd_user: number;
  name: string;
  registration: string;
  cpf: string;
  user_photo: string;
  phone_number: string;
  rg: string;
  birth: string;
  email: string;
  cd_university: number;
  cd_address: number;
  cd_profile: number;
}
export interface Category {
  cd_category: number;
  ds_category: string;
}
export interface AdvertisementStatus {
  cd_advertisement_status: string;
  ds_advertisement_status: string;
}
export interface Address {
  cd_address: number;
  public_place: string;
  number: number;
  complement: string;
  neighborhood: string;
  cep: string;
  cd_city: number;
}
