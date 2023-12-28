import { createAction, props } from '@ngrx/store';
import { User } from '../../_shared/models/user.model';

export enum ActionTypes {
  Set = '[User] Set',
  Clear = '[User] Clear',
}

export const setUser = createAction(ActionTypes.Set, props<{ user: User }>());
export const getUser = createAction(ActionTypes.Set);
export const clearUser = createAction(ActionTypes.Clear);
