import { MessageFormatter } from 'class-validator-message-formatter';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import errors, { ERROR_TYPE } from '../constants/errors';

/**
 *
 *
 * @param {GraphQLError} error
 * @return {*}  {GraphQLFormattedError}
 */
export const formatError = (error: GraphQLError): GraphQLFormattedError => {
  if (error.extensions?.exception?.validationErrors) {
    const formattedErrors = MessageFormatter.format(error.extensions?.exception?.validationErrors);
    if (formattedErrors.length) {
      const formattedError = {} as any;
      formattedError.message = formattedErrors[0].message;
      formattedError.extensions = {
        field: formattedErrors[0].field,
        code: errors[ERROR_TYPE.BAD_REQUEST].statusCode,
      };
      return formattedError as GraphQLFormattedError;
    }
  }
  return error;
};
