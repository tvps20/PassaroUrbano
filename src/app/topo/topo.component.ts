import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable, Subject } from '../../../node_modules/rxjs';
import { Oferta } from '../shared/oferta.model'

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa // retorno[]
      .debounceTime(1000) // executa a acao do switchMap apos 1 segundo
      .distinctUntilChanged() // Não faz uma nova requisição se a nova for igual a anterior
    // Evita varias pesquisas e se descreve dos observable mais antigos
      .switchMap((termo: string) => {
        if(termo.trim() === ''){
          // retornar um observable de array de ofertas vazio
          return Observable.of<Oferta[]>([])
        }

        return this.ofertasService.pesquisaOfertas(termo);
      })
      .catch((erro: any) => {
        return Observable.of<Oferta[]>([])
      })
  }

  // public pesquisa(event: Event){
  //   // Para poder acessar o value
  //   console.log((<HTMLInputElement>event.target).value)
  // }

  public pesquisa(termoDaBusca: string){
    this.subjectPesquisa.next(termoDaBusca);
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('');
  }

}
