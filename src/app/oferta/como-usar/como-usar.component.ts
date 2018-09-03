import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
// Injetamdo o serviço dentro do componente
import { OfertasService } from '../../ofertas.service'


@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [ OfertasService ]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar: string = ''
  // Usando o activate para poder começar a recuperar paramentros.
  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {

    this.route.parent.params.subscribe((parametros: Params) => {
       // Recuperando o id da rota pai e fazendo a consulta na api 
      this.ofertasService.getComoUsarOfertaPorId(parametros.id)
      .then((descricao: string) => {
        this.comoUsar = descricao;
      })
    })
   
  }

}
