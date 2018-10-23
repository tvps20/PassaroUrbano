// Está apto a receber serviços externos
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable'
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';

import { URL_API } from './app.api'

import { Pedido } from './shared/pedido.model';


@Injectable()
export class OrdemCompraService {

    constructor(private http: Http){}
    
    public efetivarCompra(pedido: Pedido): Observable<number> {
        let headers: Headers = new Headers();

        headers.append('Content-type', 'application/json');

        // Precisa receber uma string, entao stringify retorna uma string do objeto
        return this.http.post(`${URL_API}/pedidos`, JSON.stringify(pedido), new RequestOptions({ headers: headers })) 
        .pipe(map((resposta: Response)=>  resposta.json().id))
    }
}