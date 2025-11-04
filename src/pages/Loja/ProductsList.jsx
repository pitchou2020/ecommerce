import{useSelector, useDispatch} from "react-redux"
import { getProductsLists } from "./products"
import { useEffect,useState } from "react";
import { addOneToCart,addCart, getCarrinho } from "./../../redux/cartReducer";
import sliderData from '../../data/sliderData';
import Data from '../../data/data'
import { isEmpty } from "../../composant/Utils";
import { Link } from 'react-router-dom'
export default function ProductsList(){

    const dispatch = useDispatch()
    const products = useSelector(state=>state.products)
    console.log(products.items)
    const [APIState, setAPIState]= useState({
        loading:false,
        error:true,
        data:undefined
      })
      const productsUnicos = [];
     
    let content
      if(!products.items && !products.loading && !products.error){
          dispatch(getProductsLists())
      }
      else if(products.loading){
          //content = <img src={spinner} alt='spinning loader'/>
      }
      else if(products.error){
          content = <p> An error has occured</p>
      }
      else if(products.items){
          Object.values(products.items).forEach((item) => {
              var duplicated = productsUnicos.findIndex(redItem => {
                  return item.nome === redItem.nome;
              }) > -1
              if (!duplicated) {
                productsUnicos.push(item);
              }
      
          });
      }
     
      
      
const addCArrinho=()=>{

}
    const selectCarousel = (e) => {
        const boxs = document.querySelectorAll(".box-container")
        document.querySelector('#imagem-caroussel').classList.add('active');
        const box = e.currentTarget
        const image = box.children[2]
        const title = box.children[4]
        const content = box.children[5]
        const imageContainer = document.querySelector('#imagem-caroussel .box >img')
        const titreContainer = document.querySelector('#imagem-caroussel .box >h3')
        const contentContainer = document.querySelector('#imagem-caroussel .box >p')
        imageContainer.src = image.src
        titreContainer.innerHTML = title.innerText
        contentContainer.innerHTML = content.innerText
    }
    const selectCloseCarousel = () => {
        document.querySelector('#imagem-caroussel').classList.remove('active');
    }
const form={}
useEffect(() => {
}, []);
console.log(productsUnicos)
return(
    <>
     <h1 className="heading">Nossos Produtos</h1>
    <div className="box-container" data-carossel="carossel">
                    {(!isEmpty(productsUnicos) && productsUnicos.map(item =>
                     
                        <div className="box" key={item.id_produto} /*onClick={selectCarousel}*/>
                               <Link to={
                            `/singleProduct/${item.nome.trim().replace(/\s+/g, '-')}`
                        }
                        state={{
                            nome: item.nome,
                            descricao: item.descricao,
                            price: item.price,
                            imagem: item.imagem,
                            id_produto: item.id_produto

                        }}>
                            <a href="#" className='heart'>
                                <i class="fa-solid fa-heart"></i>
                            </a>
                            <a href="#" className='eye'>
                                <i class="fa-solid fa-eye"></i>
                            </a>
                            <img src={"http://localhost/RestoAfrica/src/views/"+item.imagem} alt="" />
                            <div className="stars">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star-half-alt"></i>
                            </div>
                            <h3>{item.nome}</h3>
                            </Link>
                            <span>R$ {item.price}</span>
                          
                            <button 

                            onClick = {async ()=> {
                                const form ={
                                    user_id:localStorage.getItem('idUser'),
                                    product_id:item.id_produto,
                                    quantity:1,
                                    price:item.price,
                                    
                                };
                                
                                
                               //dispatch(addOneToCart(prato.id_produto))
                               await dispatch(addCart(form,item.id_produto)); dispatch(getCarrinho)
                               }} className={`${item.picked ? "btn": "btn"}`}>
                                {item.picked==="1" ? "ver carrinho" :"Adicionar ao carrinho" }</button>
                        </div>
                        
                    ))}
                    <div id="imagem-caroussel">
                        <div className="box">
                            <h3></h3>
                            <img src="" alt="" />
                            <p>´teste</p>

                        </div>
                        <i className="fas fa-times" id="close" onClick={selectCloseCarousel}></i>
                    </div>

                </div>
    
    </>
)
}