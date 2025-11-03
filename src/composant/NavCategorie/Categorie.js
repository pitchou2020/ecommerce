import React from 'react'
import './Categorie.css'
import { useEffect, useRef,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getArticles } from './../../redux/articles/articleReducer'
import { Link } from 'react-router-dom'
import spinner from './../../assets/images/spinner.gif'
import leftChevron from './../../assets/images/SVG/left-arrow.svg'
import rightChevron from './../../assets/images/SVG/right-arrow.svg'
import { getRecettesFromAPI } from './../../pages/Recettes/recettesReducer';

export default function Categorie() {

    const { articles } = useSelector(state => ({
        ...state.articleReducer
    }))
    const dispatch = useDispatch()
    const carousel = useRef(null);

    const [APIState, setAPIState]= useState({
        loading:false,
        error:true,
        data:undefined
      })

    const handleLeftClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft -= carousel.current.offsetWidth;
    }
    const handleRightClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft += carousel.current.offsetWidth;
    }

    const categorieUnico = new Map();

 
    articles.forEach((cat) => {
        if (!categorieUnico.has(cat.categorie)) {
            categorieUnico.set(cat.categorie, cat)
        }

    });
    const cat = [...categorieUnico.keys()]
   
    const removeSelectCategorie = () => {
		//ativar o item do menu selecionado
		const buttons = document.querySelectorAll(".item-categorie a")

		let url = window.location.href;
		buttons.forEach((button) => {
			button.classList.remove("active")

			if (button.href === url) {
				button.classList.add("active")
			}
			else if (button.href != url) {
				button.classList.remove("active")

			}
		})
	}
    useEffect(() => {
        setAPIState({...APIState, loading: true})
        removeSelectCategorie()

        if (articles?.length === 0) {
            dispatch(getArticles());
        }
        else if(articles?.length>0){
            setAPIState({loading:false,error:false,data:cat})
        }
        else if(articles?.length=== undefined){
            setAPIState({loading:false,error:true,data:undefined})
        }
    }, [removeSelectCategorie]);

    let content;
    if(APIState.loading) content = <img src={spinner} width={50} alt="icone de chargement"/>
    else if(APIState.error) content = <p> Une erreur est survenue</p>
    else if(APIState.data?.length > 0){
     content = 
       (APIState.data).map(result =>
        <div className='item-categorie'>
            <Link
                to={`/recettesCategory/${result.trim().replace(/\s+/g, '-')}`}
                state={{categorie: result }}>
                {result}
            </Link>
        </div>
    )
}

    return (
        <>
            <div className='contenair-categorie'>
                
                <div className='nav-categorie' ref={carousel}>
                    <div className='item-categorie'>
                   
                        <Link to={`/receitas`}> Tudo</Link>
                    </div>
                    {content }
                </div>

                <button onClick={handleLeftClick} className="navigation-button prev-button">
                <img src={leftChevron} alt="" /></button>
                <button  onClick={handleRightClick} className="navigation-button next-button">
                <img src={rightChevron} alt="next image" />
                </button>
            </div>
        </>
    )
}
