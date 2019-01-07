import { State as UserState } from '../reducers/news';
import { State } from '../reducers';

export const selector = (state: State): UserState => state.news;
