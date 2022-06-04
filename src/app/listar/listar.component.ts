import { Component, OnInit } from '@angular/core';
import { Produto } from '../Produto';
import { WebService } from '../web.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  listaProdutos: Produto[];
  
  produto = {_id:"" ,title : "", price: 0.0, description: ""};
  prodToAtt: Produto;

  constructor(private web : WebService) { }

  carregarProdutos() : void {
    this.web.getProdutos().subscribe(res => {
      this.listaProdutos = res;
    });
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  deletarProd(produto: Produto): void{
    this.web.deletarProduto(produto).subscribe(res => {
      if (res.ok){
        this.carregarProdutos();
        alert(res.body.msg);
      }
      else {
        alert("Não foi possivel deletar o produto: " + res.body.msg);
      }
    })
  }

  atualizarProd(): void {
    console.log(this.produto);
    this.web.atualizarProduto(this.produto).subscribe(res => {
      console.log(res);
      if (res.ok){
        this.carregarProdutos();
        alert(res.body.msg);
      }
      else{
        alert("Não foi possivel atualizar o produto: " + res.body.msg);
      }
    })
  }

  changeVar(prod: Produto): void{
    this.prodToAtt = prod;
    this.produto = prod;
    console.log(this.prodToAtt);
  }


}
