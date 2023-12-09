export enum AuthErrors {
  symbolRequired = 'symbolRequired',
  upperCaseRequired = 'upperCaseRequired',
  numericRequired = 'numericRequired',
  lengthRequired = 'lengthRequired'
}

export enum AuthEmailErrors {
  required = 'required',
  invalidEmail = 'email'
}

export enum AuthPasswordErrors {
  required = 'required',
  invalidPassword = 'validatePasswordStrength'
}
