import i18n from 'i18next';
import app from './en/app.json';
import homePage from './en/homePage.json';
import login from './en/login.json';
import user from './en/user.json';
import header from './en/header.json';
import profilePage from './en/profilePage.json';
import usersPage from './en/usersPage.json';
import registration from './en/registration.json';
import catalogPage from './en/catalogPage.json';
import basketPage from './en/basketPage.json';
import item from './en/item.json';
import itemPage from './en/itemPage.json';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en: {
    app,
    homePage,
    login,
    user,
    header,
    profilePage,
    usersPage,
    registration,
    catalogPage,
    basketPage,
    item,
    itemPage
  },
} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['app','homePage', 'login', 'user', 'header', 'profilePage', 'usersPage', 'registration', 'catalogPage', 'basketPage', 'item', 'itemPage'],
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
});


export default i18n;