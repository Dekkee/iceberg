import { EntityState } from '../../../../../common/reducers/common';
import { AboutExtended } from '../../../../../common/contracts/About';
import { moduleName } from '..';

export const selector = (state: any): EntityState<AboutExtended> => state[ moduleName ];
