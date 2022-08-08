import _ from "lodash";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class MutationsServices {
    private mutationsList = [
        { name: "", phenotype: true, genotype: true },
        { name: "Azul", phenotype: true, genotype: true },
        { name: "Verde", phenotype: true, genotype: true },
        { name: "Turquesa", phenotype: true, genotype: false },
        { name: "Arlequim", phenotype: true, genotype: false },
        { name: "Cobalto", phenotype: true, genotype: false },
        { name: "Malva", phenotype: true, genotype: false },
        { name: "Jade", phenotype: true, genotype: false },
        { name: "Oliva", phenotype: true, genotype: false },
        { name: "Americano", phenotype: true, genotype: true },
        { name: "Pastel Tipo 1", phenotype: true, genotype: true },
        { name: "Pastel Tipo 2", phenotype: true, genotype: true },
        { name: "Fulvo", phenotype: true, genotype: true },
        { name: "Canela", phenotype: true, genotype: true },
        { name: "Cinza", phenotype: true, genotype: true },
        { name: "Albino", phenotype: true, genotype: false },
        { name: "Lutino", phenotype: true, genotype: false },
        { name: "Cremino", phenotype: true, genotype: false },
        { name: "INO", phenotype: false, genotype: true }
    ];

    constructor() {}

    public getList(phenotype, genotype) {
        if (phenotype) {
            return this.mutationsList.filter((m) => m.phenotype);
        }

        if (genotype) {
            return this.mutationsList.filter((m) => m.genotype);
        }
    }

    public getProps(bird, prop, separator = " ") {
        const r = [1, 2, 3, 4].map((i) => _.get(bird, `${prop}${i}`));

        return r.filter((r) => r).join(separator);
    }
}
