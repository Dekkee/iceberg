import { EntityState } from '../../../../../common/reducers/common';
import { News } from '../../../../../common/contracts/News';
import { moduleName } from '..';

export const selector = (state: any): EntityState<News> => state[ moduleName ];
