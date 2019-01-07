import { State as UserState } from '../reducers/user';
import { State } from '../reducers';

export const selector = (state: State): UserState => state.user;
