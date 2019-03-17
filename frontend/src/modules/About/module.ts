import { reducer } from './reducers';
import { saga } from './sagas';
import { component } from './components';
import { ModuleDeclaration } from '../index';
import { moduleName } from './index';

export const moduleDeclaration: ModuleDeclaration = {
    saga,
    reducer,
    component,
    name: moduleName,
    label: 'About',
};
