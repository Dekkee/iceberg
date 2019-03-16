import { moduleName } from '..';
import { action, initActionCreators } from '../../../../../common/utils/actions/actionCreatorFactory';
import { AboutExtended } from '../../../../../common/contracts/About';

export const actions = {
    get: {
        init: action(() => ({})),
        done: action((response: AboutExtended) => ({ response })),
        fail: action((error: Error) => ({ error })),
    },
    update: {
        init: action((entity: AboutExtended) => ({ entity })),
        done: action(() => ({})),
        fail: action((error: Error) => ({ error })),
    },
};

initActionCreators(moduleName, actions);
