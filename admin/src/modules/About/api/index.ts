import { createApi } from '../../../../../common/api/common';
import { moduleName } from '..';

export const api = createApi(moduleName);

// remove unsupported methods
api.get = api.list;
api.update = api.create;
api.delete = (() => {}) as any;
