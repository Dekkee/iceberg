import { EntityState, generateReducer } from '../../../reducers/common';
import { actions } from '../actions';
import { NewsExtended } from '../../../../../common/contracts/News';

export const reducer = generateReducer<NewsExtended>(actions);

export type State = EntityState<NewsExtended>;
