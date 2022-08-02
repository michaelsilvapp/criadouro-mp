import _ from "lodash";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class CreationControlService {
    public baseURL: string =
        "https://wv3bbjeob6.execute-api.us-east-1.amazonaws.com";

    constructor(public http: HttpClient) {}

    async insert(params: any) {
        const headers = new Headers({
            "Content-Type": "application/json"
        });

        const body = JSON.stringify(params);

        return this.http
            .post(`${this.baseURL}/insert-posture`, body)
            .toPromise();
    }

    async get(query: any) {
        const body = JSON.stringify({});

        const result = await this.http
            .post(`${this.baseURL}/get-posture`, body)
            .toPromise();

        return _.get(result, "result");
    }
}
