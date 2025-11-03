import'./Cardapio.css'
import React,{useEffect, useState} from 'react'
import Footer from './../../composant/Footer/Footer'
import NavMenu from '../../composant/navMenu/NavMenu';
import Slider from '../../composant/Slider/Slider';
import NavCardapio from '../../composant/navCardapio/NavCardapio';
import FormSearch from '../../composant/FormSearch';


export default function Cardapio() {
  // dias da semana  automatico
  let agora = new Date;
  let diaSem = agora.getDay()
const getdia=()=>{
  switch(diaSem){
    case 0:
    return"Domingo"
    case 1:
    return"Segunda-Feira"
    case 2:
    return"Terça-Feira"
    case 3:
    return"Quarta-Feira"
    case 4:
    return"Quinta-Feira"
    case 5:
    return"Sexta-Feira"
    case 6:
    return"Sábado"
    
  }
}
console.log(getdia())
useEffect(()=>{
let boxs = document.querySelectorAll("section.rodizio .box-container .box")
boxs.forEach(box=>{
  box.classList.remove("active")
  if(box.dataset.dia===getdia()){
    box.classList.add("active")
  }
})

},[])
  return (
    <>
      <NavMenu />
      
      <NavCardapio />
      <Slider />

     
      <section className="cardapio" id="bebidas">
     

        <h3 className="sub-heading">Bebidas</h3>
       
        <h1 className="heading">bebidas</h1>
        <div className="box-container" >
          <h3 className="heading">Drinks,Coquetéis e vinhos da casa</h3>
          <div className="box" >           
            <h3>Tangawisi drink</h3>
            <p>
            Vodka ou cachaça , tangawisi suco, água com gás ,xarope de gengibre
            </p>
            <span>R$27.00</span>
          </div>

          <div className="box" >           
            <h3>bissap drink</h3>
            <p>
            Vodka ou cachaça , bissap suco, água com gás ,xarope de hibisco
            </p>
            <span>R$27.00</span>
          </div>
          <div className="box" >           
            <h3>tomi drink</h3>
            <p>
            Vodka ou cachaça , tomi suco, água com gás ,xarope de tamarindo 
            </p>
            <span>R$27.00</span>
          </div>
    
        </div>

        <div className="box-container" >
          <h3 className="heading">Cervejas</h3>
          <div className="box" >           
            <h3>Longneck</h3>
            <p>Budweiser LogNeck  343 ml</p>
            <span>R$10.00</span>
            <p>Stella Artois 275 ml</p>
            <span>R$10.00</span>
            <p>Original 300 ml </p>
            <span>R$10.00</span>
          </div>

          <div className="box" >           
            <h3>Cervejas 600ml</h3>
            <p>
            Original 600 ml  
            </p>
            <span>R$18.00</span>
            <p>Heineken 600 ml</p><span>R$18.00</span>
            <p>Eisenbahn 600 ml </p><span>R$ 18.00</span>
          </div>    
        </div>

        <div className="box-container" >
          <h3 className="heading">Bebidas não Alcoolicas</h3>
          <div className="box" >           
            <h3>Longneck</h3>
            <p>Budweiser LogNeck  343 ml</p>
            <span>R$10.00</span>
            <p>Stella Artois 275 ml</p>
            <span>R$10.00</span>
            <p>Original 300 ml </p>
            <span>R$10.00</span>
          </div>

          <div className="box" >           
            <h3>Cervejas 600ml</h3>
            <p>
            Original 600 ml  
            </p>
            <span>R$18.00</span>
            <p>Heineken 600 ml</p><span>R$18.00</span>
            <p>Eisenbahn 600 ml </p><span>R$ 18.00</span>
          </div>    
        </div>

      </section>
      <section className="cardapio" id="entradas">

      <h3 className="sub-heading">Entradas</h3>

        <div className="box-container" >
          <div className="box" >
<h3>Sambusas</h3>
<p>Pastelzinhos típicos africanos, recheados com sabores variados de vegetais, acompanha chatini. (assado)</p>

PERGUNTE SABORES DISPONIVEIS (palmitos, abobrinhas, berinjela, espinafre)

<span>R$ 25,00</span>
Observação : Pedido sujeito a disponibilidade do restaurante.
</div><div className="box">
<h3>KACHORI</h3>
<p>Bolinhos feito à base de batatinha de inglesa, shimeji e gengibre (frito).</p>

<span>R$ 25,00</span>
Observação : Pedido sujeito a disponibilidade do restaurante.
</div><div className="box">
<h3>Banana da Terra FRITA</h3>
<p>Banana da Terra da frita com pasta de amendoim</p>

<span>R$ 18,00</span>
Observação : Pedido sujeito a disponibilidade do restaurante.
</div><div className="box">
<h3>Bitumbula</h3>
<p>Acarajé africano, servido na cama de quiabo refogado na pasta de amendoim, tomate fresco e especiarias.</p>

 

<span>R$ 16,00</span>
Observação : Pedido sujeito a disponibilidade do restaurante.

          </div>
    
        </div>
      </section>
      <section className="cardapio" id="pratos">
      <h3 className="sub-heading">Pratos</h3>
        
        <div className="box-container" data-carossel="carossel">
          <div className="box" >
<h3>Feijoada do chef ( somente às Quartas-Feiras e Sábados)</h3>
<p>Feijão preto refogado no azeite de dendê com legumes, mix de cogumelos, acompanha arroz branco cozido no suco de gengibre, farofa de banana da terra e guarnição de couve na mwamba.</p>

 

<span>R$ 30,00</span>
Observação : Pedido sujeito a disponibilidade do restaurante.
</div><div className="box">
<h3>KUKU (somente às Quintas-Feiras)</h3>

<p>Acarajé  na cama de quiabo refogado na mwamba (pasta de amendoim)  acompanha Arroz branco cozido no suco de gengibre, + chips de batata doce.</p>

 

<span>R$ 30,00</span>
Observação : Pedido sujeito a disponibilidade do restaurante.
</div><div className="box">
<h3>SOKOMUTU (Somente às Sextas-Feiras)</h3>

<p>Moqueca de Banana da Terra, acompanha arroz branco, bolinho de feijão fradinho e farofa de amendoim.</p>

<span>R$ 30,00</span>
Observação : Pedido sujeito a disponibilidade do restaurante.
</div><div className="box">
<h3>BATA (Somente aos Domingos)</h3>

<p>Arroz de côco, espinafre refogado com creme de semente de girassol, purê de milho verde fresco, acompanha dadinhos de tofu frito em especiarias.</p>

<span>R$ 30,00</span>
Observação : Pedido sujeito a disponibilidade do restaurante.
</div><div className="box">
<h3>NGOMBE (Todos os Dias)</h3>

<p>Nhoque de banana da terra, com molho de tomates frescos e shimeji.</p>

 

<span>R$ 30,00</span>
Observação : Pedido sujeito a disponibilidade do restaurante.
</div><div className="box">
<h3>MBUZI (Todos os Dias)</h3>

<p>Fufu (polenta africana) de farinha de milho ou arroz, couve na mwamba e banana da terra frita.</p>

 

<span>R$ 30,00</span>
Observação : Pedido sujeito a disponibilidade do restaurante.
</div><div className="box">
<h3>SIMBA (Todos os Dias)</h3>

<p>Arroz Pilao (com vegetais cozido em especiarias e suco de gengibre) couve na mwamba e kachori.</p>

 

<span>R$ 22,00</span>
Observação : Pedido sujeito a disponibilidade do restaurante.
</div><div className="box">

<h3>TEMBO(Todos os Dias)</h3>

<p>Arroz Pilao (com vegetais cozido em especiarias e suco de gengibre), duas sambusas de vegetais e salada do dia.</p>

 

<span>R$ 22,00</span>
Observação : Pedido sujeito a disponibilidade do restaurante.
</div><div className="box">
<h3>NDEKE(somente as terças-feiras)</h3>

<p>Strogonoff de shimeji e shitake no creme de sementes de girassol acompanha arroz branco e mandioca palha</p>

 

<span>R$ 28,00</span>
Observação : Pedido sujeito a disponibilidade do restaurante.
</div><div className="box">
<h3>Kokoliko(somente sábados e aos domingos)</h3>
<p>Mbika (tipo de almondegas a feito a base de semente de abóbora acompanha banana da terra frita e um carboidratos da sua escolha) entre fufu, arroz e kwanga(massa cozida de mandioca fermentada).</p>

 

<span>R$ 38,00</span>
Observação : Pedido sujeito a disponibilidade do restaurante.
</div><div className="box">
<h3>Madesu na Mbika (somente sábados e domingos)</h3>
<p>Mbika (tipo de almondegas a feito a base de semente de abóbora acompanha banana da terra frita e um carboidratos da sua escolha) entre fufu, arroz e kwanga(massa cozida de mandioca fermentada).</p>

 

<span>R$ 43,00</span>
Observação : Prato sujeito a disponibilidade no  restaurante.
</div>
          
    
        </div>

      </section>
      <section className="cardapio" id="sobremesas">
      <h3 className="sub-heading">Sobremesas</h3>
      
        <div className="box-container" >
          <div className="box" >
<h3>Brownie de banana da terra</h3>
<p>Brownie de banana da terra e cacau  acompanha creme de hibisco.</p>

 

<span>R$ 12,00</span>
Observação : Pedido sujeito a disponibilidade do restaurante.
</div><div className="box">
<h3>Mama Anasema</h3>
<p>pastelzinho assado recheado com purê de banana da terra , caramelizado com pasta de amendoim , acompanha creme gelado de hibisco.</p>

 

<span>R$ 12,00</span>
Observação : Pedido sujeito a disponibilidade do restaurante.
</div><div className="box">
<h3>Tortinha de morango</h3>
<p>Torta de morango feita  com amendoim  e creme de hibisco.</p>

 

<span>R$ 12,00</span>
Observação : Pedido sujeito a disponibilidade do restaurante.
</div>
          
    
        </div>

      </section>
      <section className="rodizio" id="rodizio">
      <h3 className="sub-heading">Menu  rodízio {getdia()}</h3>
      <div className="box-container" >
          <div className="box active" data-dia ="Terça-Feira">           
            <h3>Terça- feira</h3>
<p>– Acarajé com quiabo temperado  na pasta de amendoim</p>

<p>– arroz com coco</p>

<p>– macarrão de arroz ( sem glúten) com creme branco de sementes de girassol e epinafre</p>

<p>– Kwanga (massa cozida de mandica fermentada) com madesu (  Feijão branco temperado no dendê, tomate fresco e especiarias).</p>

<p>– Sambusas : Pasteizinhos típicos africanos, recheados com vegetais. (assado)</p>

<p>– kachori : Bolinhos feito à base de batatinha de inglesa, shimeji e gengibre.  (frito).</p>

<p>– fufu ( polenta tipica a base de fubá e água) com couve na mwamba (Couve manteiga refogada na pasta de amendoim)</p>

<p>– MAFÉ veg : Este prato fervido do Mali é uma das especialidades africanas mais populares. Leva o nome da pasta de amendoim que o compõe. Se pode ser preparado com carne, e principalmente com frango, esta receita de mafé vegetariano é feita com cenoura, batata e repolho branco.</p>
<p>Observação : Item sujeito a disponibilidade do restaurante.</p>
          <span>R$ 39,90</span>
          </div>
    <div className="box" data-dia = "Quarta-Feira">
      <h3>Quarta-Feira</h3>
<p>– feijoada do chef ( Feijão preto com legumes e mix de cogumelos, temperados com azeite de dendê e especiarias) com farofa de banana da terra </p>

<p>– arroz pilau (Arroz típico congolês, refogado com legumes em suco de gengibre e especiárias.)</p>

<p>– nhoque de banana da terra acompanha molho de shimeji</p>

<p>– MAFÉ veg : Este prato fervido do Mali é uma das especialidades africanas mais populares. Leva o nome da pasta de amendoim que o compõe. Se pode ser preparado com carne, e principalmente com frango, esta receita de mafé vegetariano é feita com cenoura, batata e repolho branco.</p>

<p>– moqueca de banana da terra com farofa de amendoim</p>

<p>– Sambusas : Pasteizinhos típicos africanos, recheados com vegetais. (assado)</p>

<p>– kachori : Bolinhos feito à base de batatinha de inglesa, shimeji e gengibre.  (frito).</p>
<p>Observação : Item sujeito a disponibilidade do restaurante.</p>
<span>R$ 39,90</span>
    </div>
    <div className="box" data-dia ="Quinta-Feira" >
      <h3>Quinta-Feira</h3>
<p>– fufu ( polenta tipica a base de fubá e água) com couve na mwamba (Couve manteiga refogada na pasta de amendoim)</p>

<p>– Kwanga (massa cozida de mandica fermentada) com madesu (  Feijão branco temperado no dendê, tomate fresco e especiarias).</p>

<p>– Nhoque de banana da terra ao molho de shimeji</p>

<p>– MAFÉ veg : Este prato fervido do Mali é uma das especialidades africanas mais populares. Leva o nome da pasta de amendoim que o compõe. Se pode ser preparado com carne, e principalmente com frango, esta receita de mafé vegetariano é feita com cenoura, batata e repolho branco.</p>

<p>– Acarajé com quiabo temperado  na pasta de amendoim</p>

<p>– Sambusas : Pasteizinhos típicos africanos, recheados com vegetais. (assado)</p>
<p>Observação : Item sujeito a disponibilidade no restaurante.</p>
<span>R$ 39,90</span>
    </div>
    <div className="box" data-dia ="Sexta-Feira">
      <p>Foi desenvolivo o esquema de rodizio com instuito que o cliente possa experimentar a vontade pratos variados do congolinaria</p>
      <h3>ORDEM DE LIBERAÇÃO DOS PRATOS</h3>
      <p>– fufu ( polenta tipica a base de fubá e água) com couve na mwamba (Couve manteiga refogada na pasta de amendoim)</p>

<p>– moqueca de banana da terra com farofa de amendoim</p>

<p>– arroz pilau (Arroz típico congolês, refogado com legumes em suco de gengibre e especiárias.)</p>

<p>– espinafre com macarrão </p>

<p>– Kwanga com molho de almôndegas de sementes de abóbora </p>

<p>– kachori : Bolinhos feito à base de batatinha de inglesa, shimeji e gengibre.  (frito).</p>
<p>Observação : Item sujeito a disponibilidade do restaurante.</p>
<span>R$ 39,90</span>
    </div>
    <div className="box"data-dia ="Sábado">
      <h3>Sábado</h3>
<p>– fufu ( polenta tipica a base de fubá e água) com couve na mwamba (Couve manteiga refogada na pasta de amendoim)</p>

<p>– feijoada do chef com farofa de banana da terra </p>

<p>– arroz pilau (Arroz típico congolês, refogado com legumes em suco de gengibre e especiárias.)</p>

<p>– nhoque de banana da terra </p>

<p>– MAFÉ veg : Este prato fervido do Mali é uma das especialidades africanas mais populares. Leva o nome da pasta de amendoim que o compõe. Se pode ser preparado com carne, e principalmente com frango, esta receita de mafé vegetariano é feita com cenoura, batata e repolho branco.</p>

<p>– moqueca de banana da terra com farofa de amendoim</p>

<p>– Sambusas : Pasteizinhos típicos africanos, recheados com vegetais. (assado)</p>

<p>– kachori : Bolinhos feito à base de batatinha de inglesa, shimeji e gengibre.  (frito).</p>
<p>Observação : Item sujeito a disponibilidade do restaurante.</p>
<span>R$ 39,90</span>
    </div>
    <div className="box" data-dia ="Domingo">
      <h3>Domingo</h3>
<p>– Acarajé com quiabo temperado  na pasta de amendoim</p>

<p>– arroz com coco</p>

<p>– macarrão de arroz ( sem glúten) com creme branco de sementes de girassol e epinafre</p>

<p>– nhoque de banana da terra com molho de shimeji</p>

<p>– Sambusas : Pasteizinhos típicos africanos, recheados com vegetais. (assado)</p>

 
<p>– kachori : Bolinhos feito à base de batatinha de inglesa, shimeji e gengibre.  (frito).</p>
<p>– fufu ( polenta tipica a base de fubá e água) com couve na mwamba (Couve manteiga refogada na pasta de amendoim)</p>

<p>– MAFÉ veg : Este prato fervido do Mali é uma das especialidades africanas mais populares. Leva o nome da pasta de amendoim que o compõe. Se pode ser preparado com carne, e principalmente com frango, esta receita de mafé vegetariano é feita com cenoura, batata e repolho branco.</p>

<p>Observação : Item sujeito a disponibilidade no restaurante.</p>
<span>R$ 39,90</span>
    </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
