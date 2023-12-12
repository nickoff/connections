export type ServerException =
  | { type: 'InvalidFormDataException'; message: 'Invalid multipart/form-data request' }
  | { type: 'InvalidFormDataException'; message: 'Invalid post data' }
  | { type: 'InvalidFormDataException'; message: 'Parameters "email" and "password" are required.' }
  | { type: 'InvalidFormDataException'; message: 'Parameters "email", "name" and "password" are required.' }
  | {
      type: 'InvalidFormDataException';
      message: 'You have to pass "name" field.';
    }
  | {
      type: 'InvalidFormDataException';
      message: 'Parameter "name" should define conversation name.';
    }
  | {
      type: 'InvalidFormDataException';
      message: '"groupID" parameter should be in query list.';
    }
  | {
      type: 'InvalidFormDataException';
      message: 'Parameter "companion" should be defined.';
    }
  | {
      type: 'InvalidFormDataException';
      message: '"conversationID" parameter should be in query list.';
    }
  | { type: 'NotFoundException'; message: "Email and/or password doesn't exist in the system." }
  | { type: 'PrimaryDuplicationException'; message: 'User {email} already exists' }
  | {
      type: 'InvalidUserDataException';
      message: 'Header should contain "rs-uid", "rs-email" and "Authorization" parameters.';
    }
  | { type: 'InvalidTokenException'; message: 'Header should contain "Authorization" parameter with Bearer code.' }
  | {
      type: 'InvalidTokenException';
      message: 'Current session token is not valid.';
    }
  | { type: 'InvalidIDException'; message: 'User was not found/' }
  | {
      type: 'InvalidIDException';
      message: 'User was not found. Check passed identificators.';
    }
  | {
      type: 'InvalidIDException';
      message: 'Group with id {groupID} does not exist or was removed before.';
    }
  | {
      type: 'InvalidIDException';
      message: 'Conversation with id "{conversationID}" does not exist or was deleted before.';
    }
  | {
      type: 'DuplicationNotAllowedException';
      message: 'Conversation already exists.';
    }
  | {
      type: 'InvalidPostData';
      message: 'Post data should contain valid "groupID", "message" parameters.';
    };
