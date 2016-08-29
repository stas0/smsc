import { Http, Request, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers } from "@angular/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import "lodash";
declare var _;

@Injectable()
export class HttpInterceptor extends Http {
    constructor(backend:ConnectionBackend, defaultOptions:RequestOptions, private _router:Router) {
        super(backend, defaultOptions);
    }

    request(url:string | Request, options?:RequestOptionsArgs):Observable<Response> {
        return this.intercept(super.request(url, options));
    }

    get(url:string, options?:RequestOptionsArgs):Observable<Response> {
        return this.intercept(super.get(url, options));
    }

    post(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }

    put(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url:string, options?:RequestOptionsArgs):Observable<Response> {
        return this.intercept(super.delete(url, options));
    }

    getRequestOptionArgs(options?:RequestOptionsArgs):RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        return options;
    }

    intercept(observable:Observable<Response>):Observable<Response> {
        return observable.catch((err, source) => {
            if (err.status == 401 && !_.startsWith(err.url, '/orientdb/token')) {
                this._router.navigate(['/login']);
                return Observable.empty();
            } else {
                return Observable.throw(err);
            }
        });
    }
}
