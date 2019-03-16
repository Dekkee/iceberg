import { EntityState, generateReducer } from '../../../reducers/common';
import { actions } from '../actions';
import { ChampExtended } from '../../../../../common/contracts/Champ';

export const reducer = generateReducer<ChampExtended>(actions);

export type State = EntityState<ChampExtended>;
