import { createAction, props } from '@ngrx/store';

export enum ActionTypes {
  Set = '[BREADCRUMB] Set',
  Get = '[BREADCRUMB] Get',
  Clear = '[BREADCRUMB] Clear',
}

export const setBreadcrumb = createAction(
  ActionTypes.Set,
  props<{ breadcrumb: { title: string; link: string }[] }>()
);
export const getBreadcrumb = createAction(
  ActionTypes.Get,
  props<{ breadcrumb: { title: string; link: string }[] }>()
);
export const clearBreadcrumb = createAction(ActionTypes.Clear);
