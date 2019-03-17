import { EntityState } from '../../../../../common/reducers/common';
import { UserExtended } from '../../../../../common/contracts/User';
import { moduleName } from '..';

export const selector = (state: any): EntityState<UserExtended> => state[ moduleName ];
