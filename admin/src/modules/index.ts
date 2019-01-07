import * as React from 'react';
import { ForkEffect } from 'redux-saga/effects';
import { Reducer } from 'redux';

export interface ModuleDeclaration {
    saga: () => IterableIterator<ForkEffect>;
    reducer: Reducer;
    component: React.ComponentClass;
    name: string;
    label: string;
}

function importAll (r) {
    const modules = [];
    r.keys().forEach(key => modules.push(r(key).moduleDeclaration));
    return modules;
}

export const modules: ModuleDeclaration[] = importAll(require.context('./', true, /\/module.ts$/));
