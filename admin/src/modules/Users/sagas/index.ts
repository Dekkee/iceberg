import { generateSagas } from '../../../../../common/sagas/common';
import { api } from '../api';
import { actions } from '../actions';
import { moduleName } from '../';

export const saga = generateSagas(moduleName, actions, api);
