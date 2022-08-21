import _ from "lodash";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class UserService {
    public baseURL: string =
        "https://wv3bbjeob6.execute-api.us-east-1.amazonaws.com";

    constructor(public http: HttpClient) {}

    async login({ email, password }) {
        const headers = new Headers({
            "Content-Type": "application/json"
        });

        const body = JSON.stringify({ email, password });

        return this.http.post(`${this.baseURL}/login-user`, body).toPromise();
    }

    async checkLogin({ email, token }) {
        const body = JSON.stringify({ email, token });

        const result = await this.http
            .post(`${this.baseURL}/checklogin-user`, body)
            .toPromise();

        return _.get(result, "result", []);
    }
}
