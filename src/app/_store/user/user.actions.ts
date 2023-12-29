import { createAction, props } from '@ngrx/store';
import { IUserProfile } from '../../auth/models/auth.model';

export enum ActionTypes {
  Set = '[USER] Set',
  Get = '[USER] Get',
  Clear = '[USER] Clear',
}

export const setUser = createAction(
  ActionTypes.Set,
  props<{ user: IUserProfile }>()
);
export const getUser = createAction(
  ActionTypes.Get,
  props<{ user: IUserProfile }>()
);
export const clearUser = createAction(ActionTypes.Clear);
