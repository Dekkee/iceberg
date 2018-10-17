import {State as UsersState} from '../reducers/users';
import {State} from '../reducers';

export const selector = (state: State): UsersState => state.users;
