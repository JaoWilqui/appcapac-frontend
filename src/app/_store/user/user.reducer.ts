import { createReducer, on } from '@ngrx/store';
import { User } from '../../_shared/models/user.model';
import { clearUser, getUser, setUser } from './user.actions';

const INITIAL_STATE: User = new User();

export const _userReducer = createReducer(
  INITIAL_STATE,
  on(setUser, (state, { user }) => user),
  on(getUser, (state) => state),
  on(clearUser, (state) => INITIAL_STATE)
);
