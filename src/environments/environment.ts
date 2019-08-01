// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export enum AuthMethod {
  NONE,
  PASSWORD
}

export const environment = {
  production: false,
  api: 'http://127.0.0.1:8000/api',
  auth_method: AuthMethod.PASSWORD,
  client_name: 'Mercado Universitário',
  system_name: 'Mercado Universitário',
  system_version: '1',
  theme: 'ebonyClay',
  themeAutoContraste: 'ebonyClayAutoContraste',
  login_info: 'Ajuda'
};
