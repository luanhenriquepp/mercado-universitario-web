const emptyString = '';
export const UNMASK_NUMBER = /\D/g;

export const TELEFONE = (rawValue = emptyString) => {
    const REGEX_OITO_DIGITOS = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    const REGEX_NOVE_DIGITOS = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    const rawValueLength = rawValue.replace(/[^\d]/g, '').length;
    return rawValueLength < 11 ? REGEX_OITO_DIGITOS : REGEX_NOVE_DIGITOS;
};
export const MATRICULA = (rawValue = emptyString) => {
    const REGEX_MATRICULA = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    const REGEX_ONZE = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    const rawValueLength = rawValue.replace(/[^\d]/g, '').length;
    return REGEX_MATRICULA;
};
export const FAX = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
export const FAX_UNMASK = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
export const CPF_CNPJ = (rawValue = emptyString) => {
  const REGEX_CPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  const REGEX_CNPJ = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  const rawValueLength = rawValue.replace(/[^\d]/g, '').length;
  return REGEX_CPF;
};
export const DIA_DO_MES = (rawValue = emptyString) => {
  const REGEX_UM_DIGITO = [/[1-9]/];
  const REGEX_DOIS_DIGITOS = [/[1-3]/, /\d/];
  const rawValueLength = rawValue.replace(/[^\d]/g, '').length;
  return rawValueLength < 2 ? REGEX_UM_DIGITO : REGEX_DOIS_DIGITOS;
};
export const UG = (rawValue = emptyString) => {
  const rawValueLength = rawValue.replace(/[^\d]/g, '').length;
  return getCodigoByLength(rawValueLength);
};
export const HORA = [/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/];
export const RG = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/ , /\d/];
export const CPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
export const CNPJ = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
export const CEP = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
export const DV = [/\d/];
export const AGENCIA = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
export const CONTA = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
export const VALOR = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, ',', /\d/, /\d/];
export const AGENCIA_COM_DV = [/\d{0,5}(\-\d{1,2})?/];
export const CONTA_COM_DV = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d{0,6}/, /\-/, /\d{0,1}/];

function getCodigoByLength(size) {
  const REGEX_UM_DIGITO = [/[1-9]/];
  const REGEX_DOIS_DIGITOS = [/[1-9]/, /\d/];
  const REGEX_TRES_DIGITOS = [/[1-9]/, /\d/, /\d/];
  const REGEX_QUATRO_DIGITOS = [/[1-9]/, /\d/, /\d/, /\d/];
  const REGEX_CINCO_DIGITOS = [/[1-9]/, /\d/, /\d/, /\d/, /\d/];
  const REGEX_SEIS_DIGITOS = [/[1-9]/, /\d/, /\d/, /\d/, /\d/ , /\d/];
  const REGEX_SETE_DIGITOS = [/[1-9]/, /\d/, /\d/, /\d/, /\d/ , /\d/, /\d/];
  const REGEX_OITO_DIGITOS = [/[1-9]/, /\d/, /\d/, /\d/, /\d/ , /\d/, /\d/, /\d/];
  const REGEX_NOVE_DIGITOS = [/[1-9]/, /\d/, /\d/, /\d/, /\d/ , /\d/, /\d/, /\d/, /\d/];
  const retorno = [
    {
      length: 1,
      regex: REGEX_UM_DIGITO
    },
    {
      length: 2,
      regex: REGEX_DOIS_DIGITOS
    },
    {
      length: 3,
      regex: REGEX_TRES_DIGITOS
    },
    {
      length: 4,
      regex: REGEX_QUATRO_DIGITOS
    },
    {
      length: 5,
      regex: REGEX_CINCO_DIGITOS
    },
    {
      length: 6,
      regex: REGEX_SEIS_DIGITOS
    },
    {
      length: 7,
      regex: REGEX_SETE_DIGITOS
    },
    {
      length: 8,
      regex: REGEX_OITO_DIGITOS
    },
    {
      length: 9,
      regex: REGEX_NOVE_DIGITOS
    },
  ];
  let registry = retorno.find((element) => {
    return element.length === size;
  });
  if (!registry) {
    registry = retorno[retorno.length - 1];
  }
  return registry.regex;
}
