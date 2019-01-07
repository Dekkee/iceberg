import { Action } from 'redux';
import { NewsResponse, NewsListResponse } from '../api/contracts';
import { action, initActionCreators } from '../../../common/utils/actions/actionCreatorFactory';
import { NewsExtended } from '../../../common/contracts/News';

export interface NewsListActionInit extends Action {

}

export interface NewsListActionDone extends Action {
    response: NewsListResponse;
}

export interface NewsListActionFail extends Action {
    error: Error;
}

export interface NewsCreateActionInit extends Action {
    user: NewsExtended;
}

export interface NewsCreateActionDone extends Action {
}

export interface NewsCreateActionFail extends Action {
    error: Error;
}

export interface NewsGetActionInit extends Action {
    id: string;
}

export interface NewsGetActionDone extends Action {
    response: NewsResponse;
}

export interface NewsGetActionFail extends Action {
    error: Error;
}

export interface NewsUpdateActionInit extends Action {
    user: NewsExtended;
}

export interface NewsUpdateActionDone extends Action {
    response: NewsResponse;
}

export interface NewsUpdateActionFail extends Action {
    error: Error;
}

export interface NewsDeleteActionInit extends Action {
    id: string;
}

export interface NewsDeleteActionDone extends Action {
    response: NewsResponse;
}

export interface NewsDeleteActionFail extends Action {
    error: Error;
}

export const actions = {
    list: {
        init: action(() => ({ })),
        done: action((response: NewsListResponse) => ({ response })),
        fail: action((error: Error) => ({ error })),
    },
    create: {
        init: action((user: NewsExtended) => ({ user })),
        done: action(() => ({ })),
        fail: action((error: Error) => ({ error })),
    },
    get: {
        init: action((id: string) => ({ id })),
        done: action((response: NewsResponse) => ({ response })),
        fail: action((error: Error) => ({ error })),
    },
    update: {
        init: action((user: NewsExtended) => ({ user })),
        done: action((response: NewsResponse) => ({ response })),
        fail: action((error: Error) => ({ error })),
    },
    remove: {
        init: action((id: string) => ({ id })),
        done: action(() => ({ })),
        fail: action((error: Error) => ({ error })),
    }
};

initActionCreators('news', actions);
