import { createReducer, on } from '@ngrx/store';
import { IUserProfile } from '../../auth/models/auth.model';
import { clearUser, getUser, setUser } from './user.actions';

const USER_STATE: IUserProfile = new IUserProfile();

export const _userReducer = createReducer(
  USER_STATE,
  on(setUser, (state, { user }) => user),
  on(getUser, (state) => state),
  on(clearUser, (state) => new IUserProfile())
);
