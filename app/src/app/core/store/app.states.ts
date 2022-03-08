import { MetaReducer } from '@ngrx/store';
import { hydrationMetaReducer } from './hydration/hydration.reducers';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootState {}

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
