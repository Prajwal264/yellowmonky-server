import { ApolloError } from 'apollo-server-core';
import errors, { ERROR_TYPE } from '../constants/errors';
import Error from './error.type';

class CustomError extends Error {
  constructor(errorType: ERROR_TYPE, field: string, customMessage?: string) {
    super();
    const error = errors[errorType];
    throw new ApolloError(customMessage || error.message, String(error.statusCode), {
      field,
    });
  }
}

export { CustomError };
