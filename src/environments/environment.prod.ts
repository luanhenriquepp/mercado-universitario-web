export enum AuthMethod {
  NONE,
  PASSWORD
}

export const environment = {
  production: true,
  api: 'http://127.0.0.1:8000/api',
  auth_method: AuthMethod.PASSWORD,
  client_name: 'Mercado Universitário',
  system_name: 'Mercado Universitário',
  system_version: '1.0.0',
  theme: 'ebonyClay',
  themeAutoContraste: 'ebonyClayAutoContraste',
  login_info: 'Ajuda'
};
