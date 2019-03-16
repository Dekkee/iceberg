import { actions } from '../actions';
import { AboutExtended } from '../../../../../common/contracts/About';
import { switchCase, switchReducer } from '../../../../../common/utils/reducers/switchReducer';
import {
    EntityGetActionDone,
    EntityGetActionFail,
    EntityGetActionInit,
    EntityUpdateActionDone,
    EntityUpdateActionFail,
    EntityUpdateActionInit
} from '../../../actions/common';

export interface EntityState {
    entity?: AboutExtended;
    isFetching: boolean;
    error?: Error;
}

export const reducer = switchReducer<EntityState>({
    ...switchCase(actions.get.init)((state: EntityState, action: EntityGetActionInit<AboutExtended>): EntityState => ({
        ...state,
        error: undefined,
        isFetching: true,
    })),
    ...switchCase(actions.get.done)((state: EntityState, action: EntityGetActionDone<AboutExtended>): EntityState => ({
        ...state,
        entity: action.response,
        isFetching: false,
    })),
    ...switchCase(actions.get.fail)((state: EntityState, action: EntityGetActionFail<AboutExtended>): EntityState => ({
        ...state,
        entity: null,
        error: action.error,
        isFetching: false,
    })),

    ...switchCase(actions.update.init)((state: EntityState, action: EntityUpdateActionInit<AboutExtended>): EntityState => ({
        ...state,
        error: undefined,
        isFetching: true,
    })),
    ...switchCase(actions.update.done)((state: EntityState, action: EntityUpdateActionDone<AboutExtended>): EntityState => ({
        ...state,
        isFetching: false,
    })),
    ...switchCase(actions.update.fail)((state: EntityState, action: EntityUpdateActionFail<AboutExtended>): EntityState => ({
        ...state,
        entity: null,
        error: action.error,
        isFetching: false,
    }))
}, { isFetching: false });

export type State = EntityState;
