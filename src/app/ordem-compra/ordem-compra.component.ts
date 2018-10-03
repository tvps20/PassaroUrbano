import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number;

  public endereco: string = '';
  public numero: string = '';
  public complemento: string = '';
  public formaPagamento: string = '';

  // Controle de Validação
  public enderecoValido: boolean;
  public numeroValido: boolean;
  public formaPagamentoValido: boolean;

  // Estados Primitivos
  public enderecoPrimitivo: boolean = true;
  public numeroPrimitivo: boolean = true;
  public formaPagamentoPrimitivo: boolean = true;

  // Controlar botão confirmar compra
  public formEstado: string = 'disabled';

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
    //this.ordemCompraService.efetivarCompra();
  }

  public atualizarEndereco(endereco: string){
    this.endereco = endereco;
    this.enderecoPrimitivo = false;
    
    if(this.endereco.length > 3)
      this.enderecoValido = true;
     else 
      this.enderecoValido = false;

    this.habilitaForm();
    
  }

  public atualizarNumero(numero: string){
    this.numero = numero;
    this.numeroPrimitivo = false;

    if(this.numero.length > 1)
      this.numeroValido = true;
     else 
      this.numeroValido = false;

    this.habilitaForm();
  }

  public atualizarComplemento(complemento: string){
    this.complemento = complemento;
    this.habilitaForm();
  }

  public atualizarFormaPagamento(formaPagamento: string){
    this.formaPagamento = formaPagamento;
    this.formaPagamentoPrimitivo = false;
    
    if(this.formaPagamento.length > 0)
      this.formaPagamentoValido = true;
     else 
      this.formaPagamentoValido = false;

    this.habilitaForm();
  }

  public habilitaForm(): void {
    if(this.enderecoValido === true && this.numeroValido === true && this.formaPagamentoValido === true)
      this.formEstado = '';
     else 
      this.formEstado = 'disabled'    
  }

  public comfirmarCompra(): void {
    let pedido: Pedido = new Pedido(this.endereco, this.numero, this.complemento, this.formaPagamento);

    this.ordemCompraService.efetivarCompra(pedido)
      .subscribe((idPedido: number) => {
        this.idPedidoCompra = idPedido;
      })
   
  }

}
