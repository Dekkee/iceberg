import { EntityState, generateReducer } from '../../../reducers/common';
import { actions } from '../actions';
import { UserExtended } from '../../../../../common/contracts/User';

export const reducer = generateReducer<UserExtended>(actions);

export type State = EntityState<UserExtended>;
