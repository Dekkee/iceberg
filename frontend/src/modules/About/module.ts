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
    // added nonbreakable space
    label: 'О команде'.replace(/ /g, "\u00a0"),
};
