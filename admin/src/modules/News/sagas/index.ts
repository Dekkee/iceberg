import { generateSagas } from '../../../sagas/common';
import { api } from '../api';
import { actions } from '../actions';

export const saga = generateSagas(actions, api);
