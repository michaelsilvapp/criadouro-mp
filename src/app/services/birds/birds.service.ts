import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class BirdsService {
    public baseURL: string =
        "https://wv3bbjeob6.execute-api.us-east-1.amazonaws.com/dev";

    constructor(public http: HttpClient) {}

    // getPeople(): Observable<Person[]> {
    //     console.log("getPeople " + this.baseURL + "people");
    //     return this.http.get<Person[]>(this.baseURL + "people");
    // }

    async insert(params: any) {
        // const headers = {
        //     "content-type": "application/json",
        //     "Access-Control-Allow-Origin": "*"
        // };

        // return this.http.post(`${this.baseURL}/insert-bird`, bird, {
        //     headers: headers
        // });

        //   async call(endpoint, params = {}) {
        // const headers = new Headers({
        //     "Content-Type": "application/json",

        //     "x-api-key": this.xApiKey
        // });

        const headers = new Headers({
            "Content-Type": "application/json"
        });

        const body = JSON.stringify(params);

        return this.http
            .post(
                "https://wv3bbjeob6.execute-api.us-east-1.amazonaws.com/dev/insert-bird",
                body
            )
            .toPromise();
    }

    async get(query: any) {
        const list = [
            {
                _id: "fdsjfasjfsadklfdjsaflsakd",
                washer: "18",
                year: "2018",
                creator: { name: "Kiko", code: "OT-305" },
                gander: "Macho",
                weight: "40,5",
                lineage: "Verde",
                phenotype1: "Jade",
                phenotype2: "Fulvo",
                genotype1: "Americano",
                genotype2: "Azul"
            },
            {
                _id: "fdsafjksdlafjsdkafji352",
                washer: "19",
                year: "2022",
                creator: { name: "Sergio", code: "BH-030" },
                gander: "Macho",
                weight: "40,5",
                lineage: "Verde",
                phenotype1: "Oliva",
                phenotype2: "Fulvo",
                genotype1: "Cinza",
                genotype2: "Lutino"
            },
            {
                _id: "fdsajklr32u23fkdajklfff",
                washer: "20",
                year: "2021",
                creator: { name: "Michael", code: "OT-128" },
                gander: "Fêmea",
                weight: "40,5",
                lineage: "Verde",
                phenotype1: "Lutino",
                genotype1: "Azul"
            },
            {
                _id: "fdsajklr32u23fkdajklfff",
                washer: "20",
                year: "2021",
                creator: { name: "Michael", code: "OT-128" },
                gander: "Fêmea",
                weight: "40,5",
                lineage: "Azul",
                phenotype1: "Cobalto",
                genotype1: "Fulvo"
            }
        ];

        return await list;
    }
}
