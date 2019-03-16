import { EntityState } from '../../../reducers/common';
import { ChampExtended } from '../../../../../common/contracts/Champ';
import { moduleName } from '..';

export const selector = (state: any): EntityState<ChampExtended> => state[ moduleName ];
