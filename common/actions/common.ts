import { Action } from 'redux';
import { ListResponse } from '../api/contracts';
import { action, ActionCreator, initActionCreators } from '../utils/actions/actionCreatorFactory';

export interface CrudActions {
    list: AsyncAction;
    create: AsyncAction;
    get: AsyncAction;
    update: AsyncAction;
    remove: AsyncAction;
}

export interface AsyncAction {
    init: ActionCreator<Action<any>>;
    done: ActionCreator<Action<any>>;
    fail: ActionCreator<Action<any>>;
}

export interface EntityListActionInit<T> extends Action {

}

export interface EntityListActionDone<T> extends Action {
    response: ListResponse<T>;
}

export interface EntityListActionFail<T> extends Action {
    error: Error;
}

export interface EntityCreateActionInit<T> extends Action {
    entity: T;
}

export interface EntityCreateActionDone<T> extends Action {
}

export interface EntityCreateActionFail<T> extends Action {
    error: Error;
}

export interface EntityGetActionInit<T> extends Action {
    id: string;
}

export interface EntityGetActionDone<T> extends Action {
    response: T;
}

export interface EntityGetActionFail<T> extends Action {
    error: Error;
}

export interface EntityUpdateActionInit<T> extends Action {
    entity: T;
}

export interface EntityUpdateActionDone<T> extends Action {
}

export interface EntityUpdateActionFail<T> extends Action {
    error: Error;
}

export interface EntityDeleteActionInit<T> extends Action {
    id: string;
}

export interface EntityDeleteActionDone<T> extends Action {
}

export interface EntityDeleteActionFail<T> extends Action {
    error: Error;
}

export const generateActions = <T>(name: string): CrudActions => {
    const actions = {
        list: {
            init: action(() => ({ })),
            done: action((response: ListResponse<T>) => ({ response })),
            fail: action((error: Error) => ({ error })),
        },
        create: {
            init: action((entity: T) => ({ entity })),
            done: action(() => ({ })),
            fail: action((error: Error) => ({ error })),
        },
        get: {
            init: action((id: string) => ({ id })),
            done: action((response: T) => ({ response })),
            fail: action((error: Error) => ({ error })),
        },
        update: {
            init: action((entity: T) => ({ entity })),
            done: action(() => ({ })),
            fail: action((error: Error) => ({ error })),
        },
        remove: {
            init: action((id: string) => ({ id })),
            done: action(() => ({ })),
            fail: action((error: Error) => ({ error })),
        }
    };

    initActionCreators(name, actions);

    return actions;
};
