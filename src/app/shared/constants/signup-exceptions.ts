export type SignupException =
  | { type: 'InvalidFormDataException'; message: 'Invalid multipart/form-data request' }
  | { type: 'InvalidFormDataException'; message: 'Invalid post data' }
  | { type: 'InvalidFormDataException'; message: 'Parameters "email", "name" and "password" are required.' }
  | { type: 'PrimaryDuplicationException'; message: 'User {email} already exists' };
