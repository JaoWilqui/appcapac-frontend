import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserProfile } from '../../auth/models/auth.model';

export interface UserState extends IUserProfile {}

export const getUserState = createFeatureSelector<UserState>('user');

export const getUser = createSelector(
  getUserState,
  (state: UserState) => state
);
