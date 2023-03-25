import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/layout';
import { LayoutMainPage } from './components/layout-main-page';
import { Terms } from './components/terms';
import { Authorization } from './pages/authorization/auth-page';
import { ForgotPassword } from './pages/forgot-password/forgot-password-page';
import { MainPage } from './pages/main';
import { ProfilePage } from './pages/profile/profile-page';
import { Registration } from './pages/registration/registration-page';
import { SinglePage } from './pages/single-page';
import { store } from './redux/store';
import { ProtectedRoute } from './routing/protected-route';
import { routeNames } from './routing/routs';
import { FormLayout } from './ui/form-layout/form-layout';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route element={<LayoutMainPage />}>
              <Route path='/' element={<Navigate to={routeNames.ROOT_PATH} />} />
              <Route path={routeNames.CATEGORY_BOOKS} element={<MainPage />} />
              <Route path={routeNames.TERMS} element={<Terms contentView='terms' />} />
              <Route path={routeNames.CONTRACT} element={<Terms contentView='contract' />} />
            </Route>
            <Route path={routeNames.SINGLE_PAGE} element={<SinglePage />} />
            <Route path={routeNames.PROFILE_PAGE} element={<ProfilePage />} />
          </Route>
          <Route element={<FormLayout />}>
            <Route path={routeNames.AUTH} element={<Authorization />} />
            <Route path={routeNames.REGISTRATION} element={<Registration />} />
            <Route path={routeNames.FORGOT_PASSWORD} element={<ForgotPassword />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
