import { generateSagas } from '../../../sagas/common';
import { api } from '../api';
import { actions } from '../actions';
import { moduleName } from '../index';

export const saga = generateSagas(moduleName, actions, api);
