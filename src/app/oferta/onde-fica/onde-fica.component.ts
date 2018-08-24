import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
// Injetamdo o serviço dentro do componente
import { OfertasService } from '../../ofertas.service'

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [ OfertasService ]
})
export class OndeFicaComponent implements OnInit {

  public ondeFica: string = ''
  // Usando o activate para poder começar a recuperar paramentros.
  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {
   // Recuperando o id da rota pai e fazendo a consulta na api 
   this.ofertasService.getOndeFicaOfertaPorId(this.route.parent.snapshot.params['id'])
   .then((descricao: string) => {
     this.ondeFica = descricao
   })
  }

}
