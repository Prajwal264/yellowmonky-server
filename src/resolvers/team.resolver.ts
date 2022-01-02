import { Resolver } from 'type-graphql';
import { Service } from 'typedi';
import Team from '../entities/team.entity';

@Service()
@Resolver(() => Team)
class TeamResolver {

}

export default TeamResolver;
