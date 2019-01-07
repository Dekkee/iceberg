import { NewsExtended } from '../../../common/contracts/News';
import { switchCase, switchReducer } from '../../../common/utils/reducers/switchReducer';
import {
    CrudActions,
    EntityCreateActionDone,
    EntityCreateActionFail,
    EntityCreateActionInit,
    EntityDeleteActionDone,
    EntityDeleteActionFail,
    EntityDeleteActionInit,
    EntityGetActionDone,
    EntityGetActionFail,
    EntityGetActionInit, EntityListActionDone, EntityListActionFail, EntityListActionInit,
    EntityUpdateActionDone,
    EntityUpdateActionFail,
    EntityUpdateActionInit
} from '../actions/common';

export const initial = {
    entity: undefined,
    list: [],
    count: 0,
    isFetching: false,
};

export interface EntityState<T> {
    entity?: T;
    list: T[];
    count: number;
    isFetching: boolean;
    error?: Error;
}

export const generateReducer = <T extends {}> (actions: CrudActions, initialState: EntityState<T> = initial) => {
    return switchReducer<EntityState<T>>({
        ...switchCase(actions.create.init)((state: EntityState<T>, action: EntityCreateActionInit<T>): EntityState<T> => ({
            ...state,
            error: undefined,
            entity: undefined,
            isFetching: true,
        })),
        ...switchCase(actions.create.done)((state: EntityState<T>, action: EntityCreateActionDone<T>): EntityState<T> => ({
            ...state,
            isFetching: false,
        })),
        ...switchCase(actions.create.fail)((state: EntityState<T>, action: EntityCreateActionFail<T>): EntityState<T> => ({
            ...state,
            entity: null,
            error: action.error,
            isFetching: false,
        })),

        ...switchCase(actions.get.init)((state: EntityState<T>, action: EntityGetActionInit<T>): EntityState<T> => ({
            ...state,
            error: undefined,
            isFetching: true,
        })),
        ...switchCase(actions.get.done)((state: EntityState<T>, action: EntityGetActionDone<T>): EntityState<T> => ({
            ...state,
            entity: action.response,
            isFetching: false,
        })),
        ...switchCase(actions.get.fail)((state: EntityState<T>, action: EntityGetActionFail<T>): EntityState<T> => ({
            ...state,
            entity: null,
            error: action.error,
            isFetching: false,
        })),

        ...switchCase(actions.update.init)((state: EntityState<T>, action: EntityUpdateActionInit<T>): EntityState<T> => ({
            ...state,
            error: undefined,
            isFetching: true,
        })),
        ...switchCase(actions.update.done)((state: EntityState<T>, action: EntityUpdateActionDone<T>): EntityState<T> => ({
            ...state,
            isFetching: false,
        })),
        ...switchCase(actions.update.fail)((state: EntityState<T>, action: EntityUpdateActionFail<T>): EntityState<T> => ({
            ...state,
            entity: null,
            error: action.error,
            isFetching: false,
        })),

        ...switchCase(actions.remove.init)((state: EntityState<T>, action: EntityDeleteActionInit<T>): EntityState<T> => ({
            ...state,
            error: undefined,
            isFetching: true,
        })),
        ...switchCase(actions.remove.done)((state: EntityState<T>, action: EntityDeleteActionDone<T>): EntityState<T> => ({
            ...state,
            isFetching: false,
        })),
        ...switchCase(actions.remove.fail)((state: EntityState<T>, action: EntityDeleteActionFail<T>): EntityState<T> => ({
            ...state,
            entity: null,
            error: action.error,
            isFetching: false,
        })),
        ...switchCase(actions.list.init)((state: EntityState<T>, action: EntityListActionInit<T>): EntityState<T> => ({
            ...state,
            list: [],
            count: 0,
            isFetching: true,
        })),
        ...switchCase(actions.list.done)((state: EntityState<T>, action: EntityListActionDone<T>): EntityState<T> => ({
            ...state,
            list: action.response.result,
            count: action.response.count,
            isFetching: false,
        })),
        ...switchCase(actions.list.fail)((state: EntityState<T>, action: EntityListActionFail<T>): EntityState<T> => ({
            ...state,
            list: initialState.list,
            count: initialState.count,
            isFetching: false,
        })),
    }, initialState);
};
