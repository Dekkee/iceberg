import { moduleName } from '..';
import { action, initActionCreators } from '../../../../../common/utils/actions/actionCreatorFactory';
import { About } from '../../../../../common/contracts/About';

export const actions = {
    get: {
        init: action(() => ({})),
        done: action((response: About) => ({ response })),
        fail: action((error: Error) => ({ error })),
    },
};

initActionCreators(moduleName, actions);
