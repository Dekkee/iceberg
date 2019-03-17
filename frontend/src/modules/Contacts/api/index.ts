import { createPublicGetListApi } from '../../../../../common/api/common';
import { moduleName } from '..';

export const api = createPublicGetListApi('', moduleName);

// remove unsupported methods
api.get = api.list;
