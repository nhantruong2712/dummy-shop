import { createReducer, on } from '@ngrx/store';
import { User } from '@models/user.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const getStoredToken = (): string | null => {
  try {
    return typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  } catch {
    return null;
  }
};

export const initialState: AuthState = {
  user: null,
  token: getStoredToken(),
  isLoading: false,
  error: null,
  isAuthenticated: !!getStoredToken()
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    isLoading: false,
    error: null,
    isAuthenticated: true
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
    isAuthenticated: false
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
    token: null,
    isAuthenticated: false,
    error: null
  })),
  on(AuthActions.clearError, (state) => ({
    ...state,
    error: null
  }))
); 