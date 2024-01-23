import { createReducer, on } from '@ngrx/store';
import {
  clearBreadcrumb,
  getBreadcrumb,
  setBreadcrumb,
} from './breadcrumb.actions';

const BREADCRUMB_STATE: { title: string; link: string }[] = [
  { title: '', link: '' },
];

export const _breadcrumbReducer = createReducer(
  BREADCRUMB_STATE,
  on(setBreadcrumb, (_state, { breadcrumb }) => breadcrumb),
  on(getBreadcrumb, (state) => {
    return state;
  }),
  on(clearBreadcrumb, (_state) => [])
);
