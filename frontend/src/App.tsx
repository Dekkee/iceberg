import * as React from 'react';
import { Menu } from "./components/Menu";
import { Content } from "./components/Content";

import './App.scss';

export class App extends React.Component<{}> {
    render () {
        return (
            <div>
                <div className="title">
                    <h1>Любительская хоккейная команда</h1>
                    <h1>АЙСБЕРГ</h1>
                </div>
                <Menu/>
                <Content/>
            </div>
        )
    }
}
