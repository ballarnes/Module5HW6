import { Container } from 'inversify';
import type { AuthenticationService} from '../services/AuthenticationService';
import DefaultAuthenticationService from '../services/AuthenticationService';
import type { HttpService} from '../services/HttpService';
import DefaultHttpService from '../services/HttpService';
import type { UserService} from '../services/UserService';
import DefaultUserService from '../services/UserService';
import type { CatalogService } from '../services/CatalogService';
import DefaultCatalogService from '../services/CatalogService';
import type { LocalStorageService} from '../services/LocalStorageService';
import DefaultLocalStorageService from '../services/LocalStorageService';
import HomePageStore from '../stores/pages/HomePageStore';
import CatalogPageStore from '../stores/pages/CatalogPageStore';
import BasketPageStore from '../stores/pages/BasketPageStore';
import LoginPageStore from '../stores/pages/LoginPageStore';
import ItemPageStore from '../stores/pages/ItemPageStore';
import RegistrationPageStore from '../stores/pages/RegistrationPageStore'
import AuthStore from '../stores/AuthStore';
import { UserProfilePageStore, OwnUserProfilePageStore } from '../stores/pages/profile';
import { UserStore }  from '../stores/components'
import ownTypes from './ownTypes';

export const container = new Container();
container.bind<HttpService>(ownTypes.httpService).to(DefaultHttpService).inSingletonScope();
container.bind<UserService>(ownTypes.userService).to(DefaultUserService).inSingletonScope();
container.bind<CatalogService>(ownTypes.catalogService).to(DefaultCatalogService).inSingletonScope();
container.bind<AuthenticationService>(ownTypes.authenticationService).to(DefaultAuthenticationService).inSingletonScope();
container.bind<LocalStorageService>(ownTypes.localStorageService).to(DefaultLocalStorageService).inSingletonScope();

container.bind<HomePageStore>(ownTypes.homePageStore).to(HomePageStore).inTransientScope();
container.bind<UserProfilePageStore>(ownTypes.userProfilePageStore).to(UserProfilePageStore).inTransientScope();
container.bind<OwnUserProfilePageStore>(ownTypes.ownUserProfilePageStore).to(OwnUserProfilePageStore).inTransientScope();
container.bind<LoginPageStore>(ownTypes.loginPageStore).to(LoginPageStore).inTransientScope();
container.bind<RegistrationPageStore>(ownTypes.registrationPageStore).to(RegistrationPageStore).inTransientScope();
container.bind<CatalogPageStore>(ownTypes.catalogPageStore).to(CatalogPageStore).inTransientScope();
container.bind<BasketPageStore>(ownTypes.basketPageStore).to(BasketPageStore).inSingletonScope();
container.bind<ItemPageStore>(ownTypes.itemPageStore).to(ItemPageStore).inSingletonScope();

container.bind<UserStore>(ownTypes.userStore).to(UserStore).inTransientScope();

container.bind<AuthStore>(ownTypes.authStore).to(AuthStore).inSingletonScope();

