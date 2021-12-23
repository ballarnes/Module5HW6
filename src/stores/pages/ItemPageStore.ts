import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import ownTypes from "../../ioc/ownTypes";
import type { Item } from "../../models/Item";
import CatalogService from "../../services/CatalogService";

@injectable()
export default class ItemPageStore {

    item : Item | null = null;
    isLoading = false;
    error = '';

    constructor(   
        @inject(ownTypes.catalogService) private readonly catalogService: CatalogService
   ) {
       makeAutoObservable(this);
   }

   
    public init = async (id: string | undefined) => {
        this.error = '';
        try {
            this.isLoading = true;
            const result = await this.catalogService.getById(Number(id));
            this.item = {...result };
          } catch (e) {
            if (e instanceof Error) {
                this.error = e.message;
            }
          }
        this.isLoading = false;
    }

}
