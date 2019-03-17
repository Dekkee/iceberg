import { EntityState } from '../../../../../common/reducers/common';
import { NewsExtended } from '../../../../../common/contracts/News';
import { moduleName } from '..';

export const selector = (state: any): EntityState<NewsExtended> => state[ moduleName ];
