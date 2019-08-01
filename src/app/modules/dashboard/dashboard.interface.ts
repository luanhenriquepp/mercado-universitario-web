export interface Advertisement {
  cd_advertisement: number;
  title: string;
  ds_advertisement: string;
  price: number;
  cd_user: number;
  cd_category: number;
  cd_advertisement_status: string;
  user: User;
  category: Category;
  advertisement_status: AdvertisementStatus;
}
export interface User {
  cd_user: number;
  name: string;
  registration: string;
  cpf: string;
  rg: string;
  birth: string;
  email: string;
  phone_number: string;
  cd_university: number;
  cd_address: number;
  cd_profile: number;
  address: Address;
  universities: Universities;
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
export interface Universities {
  cd_university: number;
  university_name: string;
  course: string;
  semester: string;
}
export interface Category {
  cd_category: number;
  ds_category: string;
}
export interface AdvertisementStatus {
  cd_advertisement_status: string;
  ds_advertisement_status: string;
}
