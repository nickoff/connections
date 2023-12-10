export type SigninException =
  | { type: 'InvalidFormDataException'; message: 'Invalid multipart/form-data request' }
  | { type: 'InvalidFormDataException'; message: 'Invalid post data' }
  | { type: 'InvalidFormDataException'; message: 'Parameters "email" and "password" are required.' }
  | { type: 'NotFoundException'; message: "Email and/or password doesn't exist in the system." };
