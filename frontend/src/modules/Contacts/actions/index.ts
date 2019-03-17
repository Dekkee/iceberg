import { moduleName } from '..';
import { action, initActionCreators } from '../../../../../common/utils/actions/actionCreatorFactory';
import { Contacts } from '../../../../../common/contracts/Contacts';

export const actions = {
    get: {
        init: action(() => ({})),
        done: action((response: Contacts) => ({ response })),
        fail: action((error: Error) => ({ error })),
    },
};

initActionCreators(moduleName, actions);
