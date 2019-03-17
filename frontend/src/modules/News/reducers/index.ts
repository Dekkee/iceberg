import { actions } from '../actions';
import { News } from '../../../../../common/contracts/News';
import { switchCase, switchReducer } from '../../../../../common/utils/reducers/switchReducer';
import {
    EntityGetActionDone,
    EntityGetActionFail,
    EntityGetActionInit, EntityListActionDone, EntityListActionFail, EntityListActionInit,
} from '../../../../../common/actions/common';

export interface EntityState {
    entity?: News;
    list?: News[];
    isFetching: boolean;
    error?: Error;
}

export const reducer = switchReducer<EntityState>({
    ...switchCase(actions.get.init)((state: EntityState, action: EntityGetActionInit<News>): EntityState => ({
        ...state,
        error: undefined,
        isFetching: true,
    })),
    ...switchCase(actions.get.done)((state: EntityState, action: EntityGetActionDone<News>): EntityState => ({
        ...state,
        entity: action.response,
        isFetching: false,
    })),
    ...switchCase(actions.get.fail)((state: EntityState, action: EntityGetActionFail<News>): EntityState => ({
        ...state,
        entity: null,
        error: action.error,
        isFetching: false,
    })),

    ...switchCase(actions.list.init)((state: EntityState, action: EntityListActionInit<News>): EntityState => ({
        ...state,
        entity: null,
        list: null,
        error: undefined,
        isFetching: true,
    })),
    ...switchCase(actions.list.done)((state: EntityState, action: EntityListActionDone<News>): EntityState => ({
        ...state,
        list: action.response.result,
        isFetching: false,
    })),
    ...switchCase(actions.list.fail)((state: EntityState, action: EntityListActionFail<News>): EntityState => ({
        ...state,
        entity: null,
        error: action.error,
        isFetching: false,
    })),

}, { isFetching: false });

export type State = EntityState;
