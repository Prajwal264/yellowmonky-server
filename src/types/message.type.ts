import { registerEnumType } from 'type-graphql';

export enum MessageSourceType {
  CHANNEL = 'CHANNEL',
  DIRECT_MESSAGE = 'DIRECT_MESSAGE'
}

registerEnumType(MessageSourceType, {
  name: 'MessageSourceType',
  description: 'The source type of the message',
});
