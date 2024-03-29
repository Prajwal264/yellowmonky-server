// import { validate, validateOrReject } from 'class-validator';
import {
  Field, ID, InterfaceType,
} from 'type-graphql';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  // BeforeUpdate,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import shortid from 'shortid';
import { validateOrReject } from 'class-validator';
// import { MessageFormatter } from 'class-validator-message-formatter/dist';
// import Error from '../types/error.type';
// import errors, { ERROR_TYPE } from '../constants/errors';

/**
 *
 *
 * @export
 * @class EntityWrapper
 * @extends {BaseEntity}
 */
@InterfaceType({ isAbstract: true, description: 'parent entity type. This consists the shared logic and fields for all entities.' })
abstract class EntityWrapper extends BaseEntity {
  /**
   *
   *
   * @type {string}
   * @memberof EntityWrapper
   */
  @Field(() => ID)
  @PrimaryColumn('varchar', {
    length: 40,
  })
    id: string;

  /**
   *
   *
   * @type {Date}
   * @memberof EntityWrapper
   */
  @Field(() => Date)
  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  /**
   *
   *
   * @type {Date}
   * @memberof EntityWrapper
   */
  @Field(() => Date)
  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  /**
   *
   *
   * @memberof EntityWrapper
   */
  @BeforeInsert()
  setId() {
    this.id = this.id || shortid.generate();
  }

  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof EntityWrapper
   */
  @BeforeInsert()
  @BeforeUpdate()
  // eslint-disable-next-line consistent-return
  async validate(): Promise<void> {
    return validateOrReject(this);
  }
}

export default EntityWrapper;
