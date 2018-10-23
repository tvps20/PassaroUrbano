import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OfertasService } from '../ofertas.service'
import { CarrinhoService } from '../carrinho.service'

import { Oferta } from '../shared/oferta.model'
// Para usar os operadores Ex: .interval()
import 'rxjs/rx'


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta
  
  constructor(private route: ActivatedRoute, 
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService) { }

  ngOnDestroy(): void { }

  ngOnInit() {
    
    this.route.params.subscribe((parametros: Params) => {
      
      this.ofertasService.getOfertaPorId(parametros.id)
      .then((oferta: Oferta) => {
        this.oferta = oferta
      })
  
    })
  }

  public adicionarItemCarrinho(): void {
    this.carrinhoService.incluirItem(this.oferta);
  }

}

// Teste com Observables

// export class OfertaComponent implements OnInit, OnDestroy {
  
//   private tempoObservableSubscription: Subscription;
//   private meuObservableSubscription: Subscription;

//   public oferta: Oferta
  
//   constructor(private route: ActivatedRoute, 
//     private ofertasService: OfertasService) { }

//   ngOnDestroy(): void {
//     // Tirando a inscricao do observable
//      this.tempoObservableSubscription.unsubscribe();
//      this.meuObservableSubscription.unsubscribe();
//   }

//   ngOnInit() {   
//     this.ofertasService.getOfertaPorId(this.route.snapshot.params['id'])
//     .then((oferta: Oferta) => {
//       this.oferta = oferta
//     })

//     // Observables
//     // this.route.params.subscribe(
//     //   (parametro: any) => { console.log(parametro); }, 
//     //   (erro: any) => console.log(erro),
//     //   () => console.log("Foi classificado como concluido"))

//     let tempo = Observable.interval(2000);

//     this.tempoObservableSubscription = tempo.subscribe((intervalo: number) => {
//       console.log(intervalo)
//     })

//     // Observable (Observavel)
//     let meuObservable = Observable.create((observer: Observer<number>) => {
//       observer.next(1);
//       observer.next(2);
//       // observer.error('Encontrou um erro');
//       observer.complete();
//       observer.next(3);
//     })

//     // Observable (Observador)
//     this.meuObservableSubscription = meuObservable.subscribe(
//       (resultado: any) =>  console.log(resultado) ,
//       (erro: string) => console.log(erro),
//       () => console.log("Foi finalizado")
//     )
//   }

// }


