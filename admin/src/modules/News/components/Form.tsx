import * as React from 'react';
import { Form as FormHoc, FormAction } from '../../../components/Form';
import { InputString } from '../../../components/Form/InputString';
import Typography from '@material-ui/core/Typography';
import { ProgressOverlay } from '../../../components/ProgessOverlay';
import { State as StateProps } from '../reducers';
import { selector } from '../selectors';
import { actions } from '../actions';
import { Action } from 'redux';
import { connect } from '../../../../../common/utils/connect';
import { NewsExtended } from '../../../../../common/contracts/News';
import { history } from '../../../../../common/history';
import { InputUser } from '../../../components/Form/InputUser';

interface DispatchProps {
    getUser?: (id: string) => Action;
    createNews?: (news: NewsExtended) => Action;
    updateNews?: (news: NewsExtended) => Action;
}

type Props = OwnProps & DispatchProps & Partial<StateProps>;

export interface OwnProps {
    action: FormAction,
    id?: string
}

const mapStateToProps = (state): Partial<StateProps> => selector(state);

const mapDispatchToProps: DispatchProps = {
    getUser: actions.get.init,
    createNews: actions.create.init,
    updateNews: actions.update.init,
};

// todo: remove? Its just for typing
class NewsFormWrapper extends FormHoc<NewsExtended> {
}

@connect(mapStateToProps, mapDispatchToProps)
export class Form extends React.Component<Props> {
    constructor (props: Props) {
        super(props);
    }

    componentDidMount (): void {
        const { action, getUser, id } = this.props;
        if (action === FormAction.Edit || action === FormAction.Read) {
            getUser(id);
        }
    }

    onCancel () {
        history.goBack();
    }

    onSubmit (action: FormAction, news: NewsExtended) {
        const { createNews, updateNews } = this.props;
        switch (action) {
            case FormAction.Edit:
                updateNews(news);
                break;
            case FormAction.Add:
                createNews(news);
                break;
        }
    }

    render () {
        const { action, isFetching, entity } = this.props;

        return (<>
            <Typography variant="h5" component="h3">
                { action === FormAction.Add && 'Добавление' }
                { action === FormAction.Edit && 'Редактирование' }
                { action === FormAction.Read && `${ entity && entity.title }` }
            </Typography>
            <ProgressOverlay inProgress={ isFetching }>
                <NewsFormWrapper initial={ entity }
                                 action={ action }
                                 onCancel={ () => this.onCancel() }
                                 onSubmit={ this.onSubmit.bind(this) }>
                    <InputString title="Заголовок" name="title" id="title-input"/>
                    <InputString title="Короткое содержание" name="spoiler" id="spoiler-input"/>
                    <InputString title="Содержание" name="content" id="content-input"/>
                    <InputUser title="Автор" name="author" id="author-input"/>
                </NewsFormWrapper>
            </ProgressOverlay>
        </>);
    }
}
