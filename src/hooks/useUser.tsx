import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { Credentials, login, logout } from '@/store/authSlice';

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  const handleLogin = (credentials: Credentials) => {
    dispatch(login(credentials));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user: authState.user,
    accessToken: authState.accessToken,
    refreshToken: authState.refreshToken,
    status: authState.status,
    error: authState.error,
    login: handleLogin,
    logout: handleLogout,
  };
};
