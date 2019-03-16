import { moduleName } from '..';
import { action, initActionCreators } from '../../../../../common/utils/actions/actionCreatorFactory';
import { ContactsExtended } from '../../../../../common/contracts/Contacts';

export const actions = {
    get: {
        init: action(() => ({})),
        done: action((response: ContactsExtended) => ({ response })),
        fail: action((error: Error) => ({ error })),
    },
    update: {
        init: action((entity: ContactsExtended) => ({ entity })),
        done: action(() => ({})),
        fail: action((error: Error) => ({ error })),
    },
};

initActionCreators(moduleName, actions);
