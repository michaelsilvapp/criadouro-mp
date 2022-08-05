import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class MutationsServices {
    private mutationsList = [
        { name: "" },
        { name: "Azul" },
        { name: "Verde" },
        { name: "Turquesa" },
        { name: "Arlequim" },
        { name: "Cobalto" },
        { name: "Malva" },
        { name: "Jade" },
        { name: "Oliva" },
        { name: "Americano" },
        { name: "Pastel Tipo 1" },
        { name: "Pastel Tipo 2" },
        { name: "Fulvo" },
        { name: "Canela" },
        { name: "Cinza" },
        { name: "Albino" },
        { name: "Lutino" },
        { name: "Cremino" },
        { name: "INO" }
    ];

    constructor() {}

    public getList() {
        return this.mutationsList;
    }
}
