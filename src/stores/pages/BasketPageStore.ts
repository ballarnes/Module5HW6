import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import ownTypes from "../../ioc/ownTypes";
import type { Item } from "../../models/Item";
import LocalStorageService, { KeyType } from "../../services/LocalStorageService";

@injectable()
export default class BasketPageStore  {

    items: Item[] = [];
    isLoading = false;
    isEmpty = false;
    currency = '';
    totalPrice = 0;
    quantity = 0;

    constructor(   
        @inject(ownTypes.localStorageService) private readonly localStorageService: LocalStorageService
   ) {
       makeAutoObservable(this);
   }

    public init = async () => {       
        try {
            this.isLoading = true;
            const result = this.localStorageService.get<Item[]>(KeyType.Basket);
            // if (this.authStore.isAuthorized) {
            //     if (result?.length === 0 || result === null) {
            //         this.isEmpty = true;
            //     }
            //     else {
            //         this.items = result;
            //         this.currency = String(this.items![1].currency);
            //         this.getTotalPrice();
            //     }
            // }
            // else {
            //     if (result?.length === 0 || result === null) {
            //         this.isEmpty = true;
            //     }
            //     else {
            //         this.items = result;
            //         this.currency = String(this.items![1].currency);
            //         this.getTotalPrice();
            //     }
            // }
            if (result !== null) {
                this.items = result;
                this.quantity = result.length;
                this.currency = String(this.items[0].currency);
                this.getTotalPrice();
            }

            // if (result?.length == 0 || result === null) {
            //     this.isEmpty = true;
            // }
            // else {
            //     this.items = result;
            //     this.quantity = result.length;
            //     this.currency = String(this.items![1].currency);
            //     this.getTotalPrice();
            // }

          } catch (e) {
            if (e instanceof Error) {
                console.error(e.message);
            }
          }
        this.isLoading = false;
    }

    public updateBasket(items: Item[]) {
        this.isLoading = true;
        this.localStorageService.set(KeyType.Basket, items);
        this.isLoading = false;
    }

    public addItem(item: Item) {
        this.isLoading = true;
        this.items?.push(item);
        this.quantity += 1;
        this.getTotalPrice();
        this.updateBasket(this.items);
        this.isLoading = false;
        // this.items?.push(item);
        // window.console.log(this.items);
        // this.updateBasket();
        // this.getTotalPrice();
    }

    public removeItem(item: Item) {
        this.isLoading = true;
        if ((this.totalPrice - item.price) < 0) {
            this.totalPrice = 0;
        }
        else {
            this.totalPrice -= item.price;
        }
        let foundIndex = 0;
        for (let index = 0; index < this.quantity; index++) {
            if (this.items[index].name == item.name) {
                foundIndex = index;
                break;
            }
        }
        this.items?.splice(foundIndex, 1);
        this.getTotalPrice();
        this.quantity -= 1;
        this.updateBasket(this.items);
        this.isLoading = false;
    } 

    public getTotalPrice() {
        this.isLoading = true;
        this.totalPrice = 0;
        this.items?.forEach(element => {
            this.totalPrice = this.totalPrice + element.price;
        });
        this.isLoading = false;
    }

    public clearBasket() {
        this.isLoading = true;
        this.items = [];
        this.quantity = 0;
        this.updateBasket(this.items);
        this.isLoading = false;
    }
}
