import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
import { Oferta } from './shared/Oferta.model'
import { promise } from 'protractor';

import { URL_API } from './app.api'

//import 'rxjs/add/aperator/toPromise'

@Injectable()
export class OfertasService {

	constructor(private http: Http){}

    public getOfertas(): Promise<Oferta[]> {
		return this.http.get(`${URL_API}/ofertas/?destaque=true`)
			.toPromise()
			.then((response: any) => response.json())
	}
	
	public getOfertasPorCategoria (categoria: string): Promise<Oferta[]>{
		return this.http.get(`${URL_API}/ofertas/?categoria=${categoria}`)
		.toPromise()
		.then((response: any) => response.json())
	}

	public getOfertaPorId (id: number): Promise<Oferta>{
		return this.http.get(`${URL_API}/ofertas/?id=${id}`)
		.toPromise()
		.then((response: any) => {
			return response.json().shift()
		})
	}

	public getComoUsarOfertaPorId(id: number): Promise<string>{
		return this.http.get(`${URL_API}/como-usar?id=${id}`)
		.toPromise()
		.then((resposta: any) => {
			return resposta.json()[0].descricao
		})
	}

	public getOndeFicaOfertaPorId(id: number): Promise<string>{
		return this.http.get(`${URL_API}/onde-fica?id=${id}`)
		.toPromise()
		.then((resposta: any) => {
			return resposta.json()[0].descricao
		})
	}
}