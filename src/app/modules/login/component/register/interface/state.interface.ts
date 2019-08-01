export interface Cities {
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
