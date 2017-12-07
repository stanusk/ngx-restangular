import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
export declare class RestangularHttp {
    http: Http;
    constructor(http: Http);
    createRequest(options: any): Observable<any>;
    request(request: any): Observable<any>;
}
