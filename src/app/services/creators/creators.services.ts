import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class CreatoresServices {
    private creatorsList = [
        { name: "Kiko", code: "OT-305" },
        { name: "Dr. Fernando", code: "JB-012" },
        { name: "Sergio", code: "BH-030" },
        { name: "Ricardo Lucio", code: "IB-110" },
        { name: "Ademar Tallmann", code: "MG-175" },
        { name: "Michael", code: "OT-128" },
        { name: "Jean", code: "ML-345" },
        { name: "Leo", code: "OT-1003" },
        { name: "Kiko & Afonso", code: "ML-924" }
    ];

    constructor() {}

    public getList() {
        return this.creatorsList;
    }
}
