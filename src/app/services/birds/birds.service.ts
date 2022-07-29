import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class BirdsService {
    public baseURL: string =
        "https://zssjt2xieg.execute-api.us-east-1.amazonaws.com/dev";

    constructor(public http: HttpClient) {}

    // getPeople(): Observable<Person[]> {
    //     console.log("getPeople " + this.baseURL + "people");
    //     return this.http.get<Person[]>(this.baseURL + "people");
    // }

    insert(bird: any): Observable<any> {
        const headers = {
            "content-type": "application/json",
            "x-api-key": "d37DXdpSIb9B3xT9wHi4N5do6145zcxk9P42zixM",
            "Access-Control-Allow-Origin": "*"
        };

        const body = JSON.stringify(bird);

        console.log(body);
        return this.http.post(`${this.baseURL}/birds-insert`, body, {
            headers: headers
        });
    }
}
