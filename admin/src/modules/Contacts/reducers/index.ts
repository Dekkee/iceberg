import { actions } from '../actions';
import { ContactsExtended } from '../../../../../common/contracts/Contacts';
import { switchCase, switchReducer } from '../../../../../common/utils/reducers/switchReducer';
import {
    EntityGetActionDone,
    EntityGetActionFail,
    EntityGetActionInit,
    EntityUpdateActionDone,
    EntityUpdateActionFail,
    EntityUpdateActionInit
} from '../../../../../common/actions/common';

export interface EntityState {
    entity?: ContactsExtended;
    isFetching: boolean;
    error?: Error;
}

export const reducer = switchReducer<EntityState>({
    ...switchCase(actions.get.init)((state: EntityState, action: EntityGetActionInit<ContactsExtended>): EntityState => ({
        ...state,
        error: undefined,
        isFetching: true,
    })),
    ...switchCase(actions.get.done)((state: EntityState, action: EntityGetActionDone<ContactsExtended>): EntityState => ({
        ...state,
        entity: action.response,
        isFetching: false,
    })),
    ...switchCase(actions.get.fail)((state: EntityState, action: EntityGetActionFail<ContactsExtended>): EntityState => ({
        ...state,
        entity: null,
        error: action.error,
        isFetching: false,
    })),

    ...switchCase(actions.update.init)((state: EntityState, action: EntityUpdateActionInit<ContactsExtended>): EntityState => ({
        ...state,
        error: undefined,
        isFetching: true,
    })),
    ...switchCase(actions.update.done)((state: EntityState, action: EntityUpdateActionDone<ContactsExtended>): EntityState => ({
        ...state,
        isFetching: false,
    })),
    ...switchCase(actions.update.fail)((state: EntityState, action: EntityUpdateActionFail<ContactsExtended>): EntityState => ({
        ...state,
        entity: null,
        error: action.error,
        isFetching: false,
    }))
}, { isFetching: false });

export type State = EntityState;
