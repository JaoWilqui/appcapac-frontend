import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface BreadcrumbState {
  title: string;
  link: string;
}

export const getBreadcrumbState =
  createFeatureSelector<BreadcrumbState[]>('breadcrumb');

export const getBreadcrumbs = createSelector(
  getBreadcrumbState,
  (state: BreadcrumbState[]) => state
);
