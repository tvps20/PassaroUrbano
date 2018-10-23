import { BrowserModule } from '@angular/platform-browser';
// Ajustando os numbes para o padrão brasileiro
import { NgModule, LOCALE_ID } from '@angular/core';
import localePt from "@angular/common/locales/pt";
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
//import { FormsModule } from '@angular/forms'

import { CarrinhoService } from './carrinho.service'

// Importando o mapa de rotas
import { ROUTES } from './app.routes'

// Pipe
import { DescricaoReduzida } from './shared/descricao-reduzida.pipe'

import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { HomeComponent } from './home/home.component';
import { RodapeComponent } from './rodape/rodape.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { DiversaoComponent } from './diversao/diversao.component';
import { OfertaComponent } from './oferta/oferta.component';
import { ComoUsarComponent } from './oferta/como-usar/como-usar.component';
import { OndeFicaComponent } from './oferta/onde-fica/onde-fica.component';
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component';
import { OrdemCompraSucessoComponent } from './ordem-compra-sucesso/ordem-compra-sucesso.component';
import { registerLocaleData } from '../../node_modules/@angular/common';




@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    HomeComponent,
    RodapeComponent,
    RestaurantesComponent,
    DiversaoComponent,
    OfertaComponent,
    ComoUsarComponent,
    OndeFicaComponent,
    DescricaoReduzida,
    OrdemCompraComponent,
    OrdemCompraSucessoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  // { provide: CarrinhoService, useValue: CarrinhoService }
  providers: [ CarrinhoService, { provide:LOCALE_ID, useValue: 'pt' } ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}

registerLocaleData(localePt);