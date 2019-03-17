import { actions } from '../actions';
import { About } from '../../../../../common/contracts/About';
import { switchCase, switchReducer } from '../../../../../common/utils/reducers/switchReducer';
import {
    EntityGetActionDone,
    EntityGetActionFail,
    EntityGetActionInit,
} from '../../../../../common/actions/common';

export interface EntityState {
    entity?: About;
    isFetching: boolean;
    error?: Error;
}

export const reducer = switchReducer<EntityState>({
    ...switchCase(actions.get.init)((state: EntityState, action: EntityGetActionInit<About>): EntityState => ({
        ...state,
        error: undefined,
        isFetching: true,
    })),
    ...switchCase(actions.get.done)((state: EntityState, action: EntityGetActionDone<About>): EntityState => ({
        ...state,
        entity: action.response,
        isFetching: false,
    })),
    ...switchCase(actions.get.fail)((state: EntityState, action: EntityGetActionFail<About>): EntityState => ({
        ...state,
        entity: null,
        error: action.error,
        isFetching: false,
    })),

}, { isFetching: false });

export type State = EntityState;
