import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class MutationsServices {
    private mutationsList = [
        { name: "Azul" },
        { name: "Verde" },
        { name: "Turquesa" },
        { name: "Arlequim" },
        { name: "Cobalto" },
        { name: "Malva" },
        { name: "Jade" },
        { name: "Oliva" },
        { name: "Americano" },
        { name: "Pastel tipo 1" },
        { name: "Pastel tipo 2" },
        { name: "Fulvo" },
        { name: "Canela" },
        { name: "Cinza" },
        { name: "Albino" },
        { name: "Lutino" },
        { name: "Cremino" }
    ];

    constructor() {}

    public getList() {
        return this.mutationsList;
    }
}
