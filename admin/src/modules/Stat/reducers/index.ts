import { EntityState, generateReducer } from '../../../../../common/reducers/common';
import { actions } from '../actions';
import { StatExtended } from '../../../../../common/contracts/Stat';

export const reducer = generateReducer<StatExtended>(actions);

export type State = EntityState<StatExtended>;
