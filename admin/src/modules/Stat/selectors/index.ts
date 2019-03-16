import { EntityState } from '../../../reducers/common';
import { StatExtended } from '../../../../../common/contracts/Stat';
import { moduleName } from '..';

export const selector = (state: any): EntityState<StatExtended> => state[ moduleName ];
