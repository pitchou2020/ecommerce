import'./Cardapio.css'
import React,{useEffect, useState} from 'react'
import Footer from './../../composant/Footer/Footer'
import NavMenu from '../../composant/navMenu/NavMenu';
import NavMenuAdmin from '../../composant/navMenu/NavMenuAdmin';
import Sidebar from '../../composant/Sidebar/Sidebar';
import Slider from '../../composant/Slider/Slider';
import NavCardapio from '../../composant/navCardapio/NavCardapio';
import FormSearch from '../../composant/FormSearch';
import  {dataCardapio}  from './dataCardapio';
import spinner from './../../assets/images/spinner.gif'

export default function CardapioAdmin() {
  // dias da semana  automatico
  const [txt, setTxt]=useState("Ativo");
  const [APIState, setAPIState]= useState({
    loading:false,
    error:true,
    data:undefined
  })
  let agora = new Date();
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
const getBebida=()=>{
 
  setAPIState({...APIState, loading: true})
  fetch("http://localhost/RestoAfrica/src/views/bebidas.php")
    .then((response) => {
      if(!response.ok) throw new Error()
      return response.json()
    
    })
    .then((data) => {
      setAPIState({loading:false,error:false,data:data})
    })
    .catch(()=>{
      setAPIState({loading:false,error:true,data:undefined})
    })

}

useEffect(()=>{
let boxs = document.querySelectorAll("section.rodizio .box-container .box")
console.log(boxs)
let buttons = document.querySelectorAll(".toggle-button")
console.log(buttons)
boxs.forEach(box=>{
  box.classList.remove("active")
  if(box.dataset.dia===getdia()){
    box.classList.add("active")
  }
})

buttons.forEach(button=>{
  if(button.dataset.status==="ATIVADO"){

    button.parentElement.classList.add("active")
    console.log(button)
  }
  
})
getBebida()
},[])




 




const [isChecked, setIsChecked] = useState();

const Animatedtoggle =  (e) => {
 const btn = e.currentTarget.parentElement
 console.log(e.currentTarget.dataset.status)
 
  btn.classList.toggle('active')
  const text = btn.children[1]
  console.log(btn.children[1])
  if(btn.classList.contains("active")){
    text.innerHTML="ATIVADO"
  }
  else{
    text.innerHTML="DESATIVADO"
  }
console.log(btn.innerText)
}

let content;
let categorie;
let cardapio;
 if(APIState.loading) content = <img src={spinner} width={100} alt="icone de chargement"/>
 else if(APIState.error) content = <p> Une erreur est survenue</p>
 else if(APIState.data?.length > 0){
  
  content = 
    
    (APIState.data).map(resto => {     
      return (
      <>
						<tbody >
              <tr>
                <td><h3>{resto.titre}</h3></td>
                <td><span>{resto.price}</span></td>
                <td>
                <div className='switch'>
                          <div className='toggle'>
                            <div className='toggle-button' onClick={Animatedtoggle} data-status = ""></div>
                            <div className='text'></div>
                          </div>
                         
                        </div>
                </td>
                <td>ver/editar/excluir</td>
              </tr>
            </tbody>                 
      </>
      
      
      )
      
    })

 }

 if(APIState.loading) categorie = <img src={spinner} width={100} alt="icone de chargement"/>
 else if(APIState.error) categorie = <p> Une erreur est survenue</p>
 else if(APIState.data?.length > 0){
  const categorieUnico = new Map();
  const categorieUnique = new Map();
  APIState.data.forEach((cat) => {
    if (!categorieUnico.has(cat.sous_categorie)) {
        categorieUnico.set(cat.sous_categorie, cat)
    }
    if(!categorieUnique.has(cat.categorie)){
      categorieUnique.set(cat.categorie,cat)
    }

});
const cat = [...categorieUnico.keys()]
const catUnique=[...categorieUnique.keys()]
  categorie =
  (cat).map(resto => {
    const bebidas =  APIState.data.filter(bebida => bebida.sous_categorie?.includes(resto))
     
    return (
    <>
    <div class="table-data">
				<div class="order">
          
					<div className="head-admin">
						<h3>{resto}  </h3>
            <div className='btn-item'>
             <span> <i className='fa-solid fa-plus'></i> Adicionar Item</span>
						<i class='bx bx-dots-vertical-rounded' ></i>
            </div>
					</div>
          <table  >
						<thead>
							<tr>
								<th>Item</th>
								<th>Preço</th>
								<th>Status de venda</th>
								<th>Ação</th>
							</tr>
						</thead>
          {

(bebidas).map(resto => {
     
  return (
  <>
        <tbody >
          <tr>
            <td><h3>{resto.titre}</h3></td>
            <td><span>{resto.price}</span></td>
            <td>
            <div className='switch'>
                      <div className='toggle'>
                        <div className='toggle-button' onClick={Animatedtoggle} data-status = {resto.status}></div>
                        <div className='text'>{resto.status}</div>
                      </div>
                     
                    </div>
            </td>
            <td>ver/editar/excluir</td>
          </tr>
        </tbody>                 
  </>
  
  
  )
  
})


          }
          </table>
 </div></div>
    
    </>)
    
  });
cardapio = 
catUnique.map(resto => {
  const menus =  APIState.data.filter(menu => menu.categorie?.includes(resto))
  const cardapios =  APIState.data.filter(cardapio => cardapio.sous_categorie?.includes(resto))
  
  
  
   
  return (

    <>
    <section   className="cardapio" id="bebidas ">
      {console.log(cardapios)}

      <h3 className="sub-heading">{resto}</h3>
     
      <h1 className="heading">{resto}</h1>
      
       
        <div class="table-data">
				<div class="order">

            <div className="head-admin">
          
						<h3>{resto}  </h3>
            <div className='btn-item'>
             <span> <i className='fa-solid fa-plus'></i> Adicionar Item</span>
						<i class='bx bx-dots-vertical-rounded' ></i>
            </div>
					</div>
          <table  >
						<thead>
							<tr>
								<th>Item</th>
								<th>Preço</th>
								<th>Status de venda</th>
								<th>Ação</th>
							</tr>
						</thead>
       {
       menus.map(menu=>{
           
           const bebidas =  APIState.data.filter(bebida => bebida.sous_categorie?.includes(menu))
           
           
        return(
          <>
        
         

        <tbody >
       
          <tr>
            <td><h3>{menu.titre}</h3></td>
            <td><span>{menu.price}</span></td>
            <td>
            <div className='switch'>
                      <div className='toggle'>
                        <div className='toggle-button' onClick={Animatedtoggle} data-status = {menu.status}></div>
                        <div className='text'>{menu.status}</div>
                      </div>
                     
                    </div>
            </td>
            <td>ver/editar/excluir</td>
          </tr>
        </tbody>                 
  
  
  

  



         
          
 
          </>
        )
       })}       
             </table> </div></div>
      {/*categorie*/}
           
      

    </section>
    </>
  )
})
}

 
  

  return (
    <>
    <Sidebar/>
<NavMenuAdmin/>
     <div id='content'>
     
      {cardapio}

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
      
      </div>
      
    </>
  )
}
