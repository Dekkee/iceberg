import { moduleName } from '..';
import { action, initActionCreators } from '../../../../../common/utils/actions/actionCreatorFactory';
import { News } from '../../../../../common/contracts/News';
import { ListResponse } from '../../../../../common/api/contracts';

export const actions = {
    list: {
        init: action(() => ({})),
        done: action((response: ListResponse<News>) => ({ response })),
        fail: action((error: Error) => ({ error })),
    },
    get: {
        init: action(() => ({})),
        done: action((response: News) => ({ response })),
        fail: action((error: Error) => ({ error })),
    },
};

initActionCreators(moduleName, actions);
