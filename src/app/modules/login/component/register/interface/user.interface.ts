export interface User {
  cd_user: number;
  name: string;
  registration: string;
  cpf: string;
  user_photo: string;
  rg: string;
  birth: string;
  email: string;
  phone_number: string;
  cd_university: number;
  cd_address: number;
  cd_profile: number;
  universities: Universities;
  address: Address;
  profile: Profile;
}
export interface Universities {
  cd_university: number;
  university_name: string;
  course: string;
  semester: string;
}
export interface Address {
  cd_address: number;
  public_place: string;
  number: number;
  complement: string;
  neighborhood: string;
  cep: string;
  cd_city: number;
  city: City;
}
export interface City {
  cd_city: number;
  city_name: string;
  ibge_code: string;
  cd_state: number;
  state: State;
}
export interface State {
  cd_state: number;
  state_name: string;
  initials: string;
}
export interface Profile {
  cd_profile: number;
  ds_profile: string;
}
