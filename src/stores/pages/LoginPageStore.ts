import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import ownTypes from "../../ioc/ownTypes";
import type AuthenticationService from "../../services/AuthenticationService";
import AuthStore from "../AuthStore";

@injectable()
export default class LoginPageStore {

    email = '';
    password = '';
    isLoading = false;
    error = '';
    token = '';

    constructor(   
        @inject(ownTypes.authenticationService) private readonly authenticationService: AuthenticationService,
        @inject(ownTypes.authStore) private readonly authStore: AuthStore
   ) {
       makeAutoObservable(this);
   }

    
    public login = async () => {
        this.token = '';
        this.error = '';
        try {
            this.isLoading = true;
            const result = await this.authenticationService.login(this.email, this.password);
            this.token = result.token;
            this.authStore.updateAuthorizedState();   
          } catch (e) {
            if (e instanceof Error) {
                this.error = e.message;
            }
          }
          this.isLoading = false;
    }

    
    public changeEmail = (text: string) : void => {
      this.email = text;
    }

    
    public changePassword = (text: string) : void => {
      this.password = text;
    }
}