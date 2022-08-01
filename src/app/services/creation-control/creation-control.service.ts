import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class CreationControlService {
    public baseURL: string =
        "https://i4kx4zz18b.execute-api.us-east-1.amazonaws.com/production";

    constructor(public http: HttpClient) {}

    insert(bird: any): Observable<any> {
        console.log(JSON.stringify(bird));

        const headers = {
            "content-type": "applicastion/json",
            "x-api-key": "d37DXdpSIb9B3xT9wHi4N5do6145zcxk9P42zixM",
            "Access-Control-Allow-Origin": "*"
        };

        return this.http.post(`${this.baseURL}/creation-control`, bird, {
            headers: headers
        });
    }

    async get(query: any) {
        const list = [
            {
                birdsPuppie: [
                    {
                        numberWasher: 5,
                        gander: "Macho",
                        genotype: ["Verde", "Americano", "Fulvo"]
                    },
                    {
                        numberWasher: 6,
                        gander: "Fêmea",
                        genotype: ["Verde", "Fulvo"]
                    },
                    { numberWasher: "", gander: "", genotype: [] },
                    { numberWasher: "", gander: "", genotype: [] },
                    { numberWasher: "", gander: "", genotype: [] },
                    { numberWasher: "", gander: "", genotype: [] }
                ],
                birdCage: 1,
                year: 2022,
                month: "Agosto",
                posture: "1ª Postura",
                male: {
                    _id: "fdsjfasjfsadklfdjsaflsakd",
                    gander: "Macho",
                    code: "OT-305-2018-18",
                    phenotype: "Jade Fulvo",
                    genotype: "Americano, Azul"
                },
                female: {
                    _id: "fdsajklr32u23fkdajklfff",
                    gander: "Fêmea",
                    code: "OT-128-2021-20",
                    phenotype: "Lutino",
                    genotype: "Azul"
                },
                totalEggs: 4,
                totalPuppies: 1
            },

            {
                birdsPuppie: [
                    {
                        numberWasher: 5,
                        gander: "Macho",
                        genotype: ["Verde", "Americano", "Fulvo"]
                    },
                    {
                        numberWasher: 6,
                        gander: "Fêmea",
                        genotype: ["Verde", "Fulvo"]
                    },
                    { numberWasher: "", gander: "", genotype: [] },
                    { numberWasher: "", gander: "", genotype: [] },
                    { numberWasher: "", gander: "", genotype: [] },
                    { numberWasher: "", gander: "", genotype: [] }
                ],
                birdCage: 1,
                year: 2022,
                month: "Outubro",
                posture: "2ª Postura",
                male: {
                    _id: "fdsjfasjfsadklfdjsaflsakd",
                    gander: "Macho",
                    code: "OT-305-2018-18",
                    phenotype: "Jade Fulvo",
                    genotype: "Americano, Azul"
                },
                female: {
                    _id: "fdsajklr32u23fkdajklfff",
                    gander: "Fêmea",
                    code: "OT-128-2021-20",
                    phenotype: "Lutino",
                    genotype: "Azul"
                },
                totalEggs: 6,
                totalPuppies: 1
            }
        ];

        return await list;
    }
}
