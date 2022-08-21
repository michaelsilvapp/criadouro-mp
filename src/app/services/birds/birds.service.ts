import _ from "lodash";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class BirdsService {
    public baseURL: string =
        "https://wv3bbjeob6.execute-api.us-east-1.amazonaws.com";

    constructor(public http: HttpClient) {}

    async insert(params: any) {
        const headers = new Headers({
            "Content-Type": "application/json"
        });

        const body = JSON.stringify(params);

        return this.http.post(`${this.baseURL}/insert-bird`, body).toPromise();
    }

    async get(query: any) {
        const body = JSON.stringify({});

        const result = await this.http
            .post(`${this.baseURL}/get-birds`, body)
            .toPromise();

        return _.get(result, "result", []);
    }

    async delete(params) {
        const body = JSON.stringify(params);

        return this.http.post(`${this.baseURL}/remove-bird`, body).toPromise();
    }
}
