import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class BirdsService {
    public baseURL: string =
        "https://i4kx4zz18b.execute-api.us-east-1.amazonaws.com/production";

    constructor(public http: HttpClient) {}

    // getPeople(): Observable<Person[]> {
    //     console.log("getPeople " + this.baseURL + "people");
    //     return this.http.get<Person[]>(this.baseURL + "people");
    // }

    insert(bird: any): Observable<any> {
        console.log(JSON.stringify(bird));

        const headers = {
            "content-type": "application/json",
            "x-api-key": "d37DXdpSIb9B3xT9wHi4N5do6145zcxk9P42zixM",
            "Access-Control-Allow-Origin": "*"
        };

        return this.http.post(`${this.baseURL}/insert-bird`, bird, {
            headers: headers
        });
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
