import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Item } from '../model/item';
import { Cesta } from '../model/cesta';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.css'
})
export class BuscaComponent {
  public mensagem: string = "";
  public filtro: string = "";
  public lista: Produto[] = [
    {codigo:1, nome:"Martelo", descritivo:"martelo cabo de borracha",
      valor:30.00, quantidade:10, keywords:"ferramentas manuais"},
    {codigo:2, nome:"Picareta", descritivo:"picareta cabo de borracha",
    valor:40.00, quantidade:10, keywords:"ferramentas manuais"},
    {codigo:3, nome:"Pa", descritivo:"pa cabo de borracha",
    valor:50.00, quantidade:10, keywords:"ferramentas manuais"},
    {codigo:4, nome:"Machado", descritivo:"machado cabo de borracha",
    valor:60.00, quantidade:0, keywords:"ferramentas manuais"} 
  ];

  public verDetalhe(item:Produto){
    localStorage.setItem("produto", JSON.stringify(item));
    window.location.href = "./detalhe";  
  }

  public adicionarItem(obj:Produto){
      let json = localStorage.getItem("cesta");
      let jsonCliente = localStorage.getItem("cliente");
      let cesta: Cesta = new Cesta();
      let item: Item = new Item();
      if(json==null){      //CESTA NAO EXISTE     
          item.codigo=obj.codigo;
          item.produto=obj;
          item.quantidade=1;
          item.valor= obj.valor;          
          cesta.codigo = 1;
          cesta.total = obj.valor;
          cesta.itens.push(item);          
          if(jsonCliente!=null) cesta.cliente = JSON.parse(jsonCliente);          
      } else {  //CESTA EXISTE
        let achou = false;
        cesta = JSON.parse(json);
        for(let i=0; i<cesta.itens.length; i++){
          if(cesta.itens[i].codigo==obj.codigo){  //ITEM JA EXISTE
            cesta.itens[i].quantidade = cesta.itens[i].quantidade + 1;
            cesta.itens[i].valor =  cesta.itens[i].quantidade * cesta.itens[i].produto.valor;
            achou = true;
            break;
          }            
        }
        if(!achou){  //ITEM NAO EXISTE
          item.codigo=obj.codigo;
          item.produto=obj;
          item.quantidade=1;
          item.valor= obj.valor;    
          cesta.itens.push(item);      
        }
      }

      cesta.total = 0; //ATUALIZA O VALOR TOTAL DA CESTA
      for(let i=0; i<cesta.itens.length; i++){
        cesta.total= cesta.itens[i].valor + cesta.total;
      }

      localStorage.setItem("cesta", JSON.stringify(cesta));
      window.location.href = "./cesta";
  }
}
