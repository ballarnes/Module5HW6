import React from 'react'
import { useInjection } from '../ioc/ioc.react'
import { ProfilePage, OwnUserProfilePage } from '../pages/profile';
import '../locales/config';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home';
import CatalogPage from '../pages/catalog';
import Header from '../components/Header';
import ownTypes from '../ioc/ownTypes';
import AuthStore from '../stores/AuthStore';
import { observer } from 'mobx-react';
import LoginPage from '../pages/login';
import BasketPage from '../pages/basket';
import ItemPage from '../pages/item';
import RegistrationPage from '../pages/registration';

const App = observer(() => {
  const store = useInjection<AuthStore>(ownTypes.authStore);

  return (
          <BrowserRouter>
            <Header/>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="*" element={<Navigate replace to="/" />} />
                  {/* <Route path="items" element={<CatalogPage />} />
                    <Route path=":id" element={<ItemPage />} /> */}

                  <Route path="items" element={<CatalogPage />} />
                  <Route path="items/:id" element={<ItemPage />} />
                  <Route path="basket" element={<BasketPage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="registration" element={!store.isAuthorized 
                      ? <RegistrationPage />
                       : <Navigate replace to="/" />} />
                  <Route path="profile" element={<ProfilePage />}>
                    <Route path="me" element={store.isAuthorized 
                      ? <OwnUserProfilePage />
                       : <Navigate replace to="/" />} />
                  </Route>
                </Routes>
            </BrowserRouter>
  )
});

export default App
