import { registerEnumType } from 'type-graphql';

export enum AccountType {
  CANDIDATE = 'CANDIDATE',
  COMPANY = 'COMPANY'
}

registerEnumType(AccountType, {
  name: 'AccountType',
  description: 'The user account type',
});
