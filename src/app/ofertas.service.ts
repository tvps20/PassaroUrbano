// Response atribui os tipos corretos, se a requisição for realizada de forma correta.
import { Http, Response } from '@angular/http'
import { Injectable } from '@angular/core'
import { Oferta } from './shared/Oferta.model'

import { URL_API } from './app.api'
import { Observable } from '../../node_modules/rxjs';
import { map } from 'rxjs/operators';
import { retry } from 'rxjs/operators';
// http://reactivex.io/documentation/operators.html documentação observable

@Injectable()
export class OfertasService {

	constructor(private http: Http){}

    public getOfertas(): Promise<Oferta[]> {
		return this.http.get(`${URL_API}/ofertas/?destaque=true`)
			.toPromise()
			.then((response: Response) => response.json())
	}
	
	public getOfertasPorCategoria (categoria: string): Promise<Oferta[]>{
		return this.http.get(`${URL_API}/ofertas/?categoria=${categoria}`)
		.toPromise()
		.then((response: Response) => response.json())
	}

	public getOfertaPorId (id: number): Promise<Oferta>{
		return this.http.get(`${URL_API}/ofertas/?id=${id}`)
		.toPromise()
		.then((response: Response) => {
			// O shift retira a primeira posição do array, nessa situação retornava um array.
			return response.json().shift()
		})
	}

	public getComoUsarOfertaPorId(id: number): Promise<string>{
		return this.http.get(`${URL_API}/como-usar?id=${id}`)
		.toPromise()
		.then((resposta: Response) => {
			return resposta.json()[0].descricao
		})
	}

	public getOndeFicaOfertaPorId(id: number): Promise<string>{
		return this.http.get(`${URL_API}/onde-fica?id=${id}`)
		.toPromise()
		.then((resposta: Response) => {
			return resposta.json()[0].descricao
		})
	}

	public pesquisaOfertas(termo: string): Observable<Oferta[]>{
		// Usando o _like faz pesquisas por aproximação
		return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
			// Convertendo os dados
			// retry perminte realizar novas tentativas caso a conecção falhe.
			.pipe(map((resposta: Response)=> resposta.json()), retry(10))
	}
}