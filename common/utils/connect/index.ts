import * as React from 'react';
import {
    connect as originalConnect,
    MapDispatchToPropsParam,
    MapStateToPropsParam,
    MergeProps,
    Options,
} from 'react-redux'


export type InferableComponentEnhancerWithProps<IInjectedProps, INeedsProps> =
    <IComponent extends React.ComponentType<IInjectedProps & INeedsProps>>(component: IComponent) => IComponent

export interface IConnect {
    <IStateProps = {}, IDispatchProps = {}, IOwnProps = {}, IState = {}>(
        mapStateToProps?: MapStateToPropsParam<IStateProps, IOwnProps, IState>,
        mapDispatchToProps?: MapDispatchToPropsParam<IDispatchProps, IOwnProps>,
    ): InferableComponentEnhancerWithProps<IStateProps & IDispatchProps, IOwnProps>

    <IStateProps = {}, IDispatchProps = {}, IOwnProps = {}, IMergedProps = {}, IState = {}>(
        mapStateToProps?: MapStateToPropsParam<IStateProps, IOwnProps, IState>,
        mapDispatchToProps?: MapDispatchToPropsParam<IDispatchProps, IOwnProps>,
        mergeProps?: MergeProps<IStateProps, IDispatchProps, IOwnProps, IMergedProps>,
        options?: Options<IStateProps, IOwnProps, IMergedProps>,
    ): InferableComponentEnhancerWithProps<IMergedProps, IOwnProps>

}

export const connect = originalConnect as IConnect;
