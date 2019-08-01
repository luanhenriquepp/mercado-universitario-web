
export interface AdvertisementManagement {
  cd_advertisement: number;
  title: string;
  ds_advertisement: string;
  price: number;
  cd_user: number;
  advertisement_photo: string;
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
  user_photo: string;
  email: string;
  phone_number: string;
  cd_university: number;
  cd_address: number;
  cd_profile: number;
}
export interface AdvertisementStatus {
  cd_advertisement_status: string;
  ds_advertisement_status: string;
}

export interface Category {
  cd_category: number;
  ds_category: string;
}
