import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import ownTypes from "../../ioc/ownTypes";
import type { Item } from "../../models/Item";
import CatalogService from "../../services/CatalogService";

@injectable()
export default class CatalogPageStore  {

    items : Item[] = [];
    isLoading = false;
    totalPages = 0;
    currentPage = 1;

    constructor(   
        @inject(ownTypes.catalogService) private readonly catalogService: CatalogService
   ) {
       makeAutoObservable(this);
   }

    
    public init = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page');
        this.currentPage = Number(page);
        
        try {
            this.isLoading = true;
            const result = await this.catalogService.getByPage(this.currentPage);
            this.items = result;
            this.totalPages = 2;
            
          } catch (e) {
            if (e instanceof Error) {
                console.error(e.message);
            }
          }
        this.isLoading = false;
    }

    
    public changePage = async (page: number) => {
        this.currentPage = page;
    }
}
