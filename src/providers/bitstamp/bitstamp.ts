import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlatformLocation } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/throw';
import { QuoteBs } from '../common/quoteBs';
import { Utils } from '../utils';
import { OrderbookBs } from '../common/orderbookBs';

@Injectable()
export class BitstampProvider {    
        
    private _reqOptionsArgs = { headers: new HttpHeaders().set( 'Content-Type', 'application/json' ) };
//    private readonly _bitstamp = '/bitstamp';
//    private readonly _bitstamp2 = '/bitstamp2';
    private readonly _bitstamp = 'https://svenloesekann.de:8443/bitstamp';
    private readonly _bitstamp2 = 'https://www.bitstamp.net';
    BTCUSD = 'btcusd';
    ETHUSD = 'ethusd';
    LTCUSD = 'ltcusd';
    XRPUSD = 'xrpusd';
    private _utils = new Utils(); 

    constructor(private http: HttpClient, private pl: PlatformLocation ) { 
    }

    getCurrentQuote(currencypair: string): Observable<QuoteBs> {
        return this.http.get(this._bitstamp+'/'+currencypair+'/current', this._reqOptionsArgs).catch(this._utils.handleError);
    }
     
    getTodayQuotes(currencypair: string): Observable<QuoteBs[]> {
        return this.http.get(this._bitstamp+'/'+currencypair+'/today', this._reqOptionsArgs).catch(this._utils.handleError);
    }
    
    getOrderbook(currencypair: string): Observable<OrderbookBs> {
        return this.http.get(this._bitstamp2+'/api/v2/order_book/'+currencypair+'/', this._reqOptionsArgs).catch(this._utils.handleError);
    }
}