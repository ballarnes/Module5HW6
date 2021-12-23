import { makeAutoObservable } from "mobx";
import { inject, injectable } from 'inversify';
import ownTypes from "../../ioc/ownTypes";
import type AuthenticationService from "../../services/AuthenticationService";
import t from '../../locales/en/registration.json';
import AuthStore from "../AuthStore";

@injectable()
export default class RegistrationPageStore {
    public id = 0;
    public name = '';
    public lastname = '';
    public gender = '';
    public email = '';
    public password = '';
    public confirm = '';
    public token = '';
    public error = '';
    public date = '';
    public avatar = 'https://cdn.picpng.com/person/user-person-people-profile-53120.png';
    public isLoading = false;

    public constructor(
        @inject(ownTypes.authenticationService) private readonly authenticationService: AuthenticationService,
        @inject(ownTypes.authStore) private readonly authStore: AuthStore
    ) {
        makeAutoObservable(this);
    }

    public register = async () => {
        this.id = 0;
        this.token = '';
        this.error = '';
        try {
            if (!this.CheckValidation()){
                return;
            }
            else {
                this.isLoading = true;
                this.date = new Date().toLocaleDateString();
                const result = await this.authenticationService.register(this.name, this.lastname, this.email, this.password, this.avatar, this.date);
                this.token = result.token;
                this.id = result.id;
                this.authStore.updateAuthorizedState();
            }
          } catch (e) {
            if (e instanceof Error) {
                this.error = e.message;
            }
          }
          this.isLoading = false;
    }

    public changeName = (name: string) => {
        this.name = name;
    }

    public changeLastName = (lastname: string) => {
        this.lastname = lastname;
    }

    public changeEmail = (email: string) => {
        this.email = email;
    }

    public changeGender = (gender: string) : void => {
        this.gender = gender;
    }

    public changePassword = (password: string) => {
        this.password = password;
    }

    public changeConfirmPassword = (text: string) : void => {
        this.confirm = text;
    }

    private CheckValidation() : boolean {
        const regexp = /^[a-z ,.'-]+$/i;
        const emailregexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
        if (this.password !== this.confirm) {
            this.error = t.error.passwordMismatch;
        }
        else if (!regexp.test(this.name) || !regexp.test(this.lastname)) {
            this.error = t.error.nameError;
        }
        else if (!emailregexp.test(this.email)) {
            this.error = t.error.emailError;
        }
        return this.error.length === 0;
    }
}