import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import { KeyType } from "../../src/services/LocalStorageService";
import type { LocalStorageService } from "../../src/services/LocalStorageService";
import type { AuthenticationService } from "../../src/services/AuthenticationService";
import ownTypes from "../ioc/ownTypes";

@injectable()
export default class AuthStore {

    isAuthorized = false;
    id = -1;

    constructor(   
        @inject(ownTypes.localStorageService) private readonly localStorageService: LocalStorageService,
        @inject(ownTypes.authenticationService) private readonly authenticationService: AuthenticationService
   ) {
       makeAutoObservable(this);
       this.updateAuthorizedState();
   }

    
    public updateAuthorizedState = () : void => {
      this.isAuthorized = !!this.localStorageService.get<string>(KeyType.Token);
      this.id = Number(this.localStorageService.get<string>(KeyType.Id));
    }

    
    public logout = () : void => {
        const token = this.localStorageService.get<string>(KeyType.Token);
        this.localStorageService.remove(KeyType.Token);
        this.updateAuthorizedState();
        this.authenticationService.logout(String(token));
    }
}
