import { NewsExtended } from '../../../common/contracts/News';
import { switchCase, switchReducer } from '../../../common/utils/reducers/switchReducer';
import {
    actions,
    NewsCreateActionDone,
    NewsCreateActionFail,
    NewsCreateActionInit,
    NewsDeleteActionDone,
    NewsDeleteActionFail,
    NewsDeleteActionInit,
    NewsGetActionDone,
    NewsGetActionFail,
    NewsGetActionInit, NewsListActionDone, NewsListActionFail, NewsListActionInit,
    NewsUpdateActionDone,
    NewsUpdateActionFail,
    NewsUpdateActionInit
} from '../actions/news';

export interface State {
    entity?: NewsExtended;
    news: NewsExtended[];
    count: number;
    isFetching: boolean;
    error?: Error;
}

const initialState: State = {
    entity: null,
    news: [],
    count: 0,
    isFetching: false,
};

export const reducer = switchReducer<State>({
    ...switchCase(actions.create.init)((state:State, action: NewsCreateActionInit): State => ({
        ...state,
        error: undefined,
        entity: undefined,
        isFetching: true,
    })),
    ...switchCase(actions.create.done)((state:State, action: NewsCreateActionDone): State => ({
        ...state,
        isFetching: false,
    })),
    ...switchCase(actions.create.fail)((state:State, action: NewsCreateActionFail): State => ({
        ...state,
        entity: null,
        error: action.error,
        isFetching: false,
    })),

    ...switchCase(actions.get.init)((state:State, action: NewsGetActionInit): State => ({
        ...state,
        error: undefined,
        isFetching: true,
    })),
    ...switchCase(actions.get.done)((state:State, action: NewsGetActionDone): State => ({
        ...state,
        entity: action.response,
        isFetching: false,
    })),
    ...switchCase(actions.get.fail)((state:State, action: NewsGetActionFail): State => ({
        ...state,
        entity: null,
        error: action.error,
        isFetching: false,
    })),

    ...switchCase(actions.update.init)((state:State, action: NewsUpdateActionInit): State => ({
        ...state,
        error: undefined,
        isFetching: true,
    })),
    ...switchCase(actions.update.done)((state:State, action: NewsUpdateActionDone): State => ({
        ...state,
        entity: action.response,
        isFetching: false,
    })),
    ...switchCase(actions.update.fail)((state:State, action: NewsUpdateActionFail): State => ({
        ...state,
        entity: null,
        error: action.error,
        isFetching: false,
    })),

    ...switchCase(actions.remove.init)((state:State, action: NewsDeleteActionInit): State => ({
        ...state,
        error: undefined,
        isFetching: true,
    })),
    ...switchCase(actions.remove.done)((state:State, action: NewsDeleteActionDone): State => ({
        ...state,
        entity: action.response,
        isFetching: false,
    })),
    ...switchCase(actions.remove.fail)((state:State, action: NewsDeleteActionFail): State => ({
        ...state,
        entity: null,
        error: action.error,
        isFetching: false,
    })),
    ...switchCase(actions.list.init)((state:State, action: NewsListActionInit): State => ({
        ...state,
        isFetching: true,
    })),
    ...switchCase(actions.list.done)((state:State, action: NewsListActionDone): State => ({
        ...state,
        news: action.response.result,
        count: action.response.count,
        isFetching: false,
    })),
    ...switchCase(actions.list.fail)((state:State, action: NewsListActionFail): State => ({
        ...state,
        news: initialState.news,
        count: initialState.count,
        isFetching: false,
    })),
}, initialState);
