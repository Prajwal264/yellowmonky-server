import { registerEnumType } from 'type-graphql';

export enum TeamMemberRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export enum TeamMemberStatus {
  JOINED = 'JOINED',
  INVITED = 'INVITED',
  REJECTED = 'REJECTED',

}

registerEnumType(TeamMemberRole, {
  name: 'TeamMemberRole',
  description: 'The team member role type',
});

registerEnumType(TeamMemberStatus, {
  name: 'TeamMemberStatus',
  description: 'The team member status type',
});
