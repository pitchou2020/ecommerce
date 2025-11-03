import React,{useEffect,useState} from 'react'
import './Slider.css'
import sliderData from '../../data/sliderData';
import leftChevron from './../../assets/images/SVG/left-arrow.svg'
import rightChevron from './../../assets/images/SVG/right-arrow.svg'

export default function Slider() {
    const[sliderIndex,setSilderIndex]=useState(1);
function toggleImage(indexPayload){
    //let newState;
    //if(indexPayload+sliderIndex>sliderData.length){newState=1    }
    //else if(indexPayload + sliderIndex<1){
       // newState=sliderData.length
    //}
    //else{
   //     newState=indexPayload+sliderIndex
    //}
    //setSilderIndex(newState)
    setSilderIndex(state=>{
        if(indexPayload+state>sliderData.length){return 1    }
    else if(indexPayload + state<1){
        return sliderData.length
    }
    else{
      return  state +indexPayload
    }
    })
}
useEffect(()=>{
const intervalID = setInterval(()=>toggleImage(1),5000)
return()=>clearInterval(intervalID)
},[])
  return (
    <>
      <section className='home' id='home'>

<div className="home-slider">

    <div className="wrapper">
    
        <div className="slide">
       
            <div className="content">
                <span>CONHEÇA NOSSOS PRATOS</span>
                <h3>{sliderData.find(obj=>obj.id===sliderIndex).titre}</h3>
                <p>{sliderData.find(obj=>obj.id===sliderIndex).description}</p>
                     <a href="#" className='btn'>Saiba mais</a>
            </div>
            <div className="image">
                <img src={sliderData.find(obj=>obj.id===sliderIndex).imagem} alt="previous image" />
            </div>
            <button  onClick={()=>toggleImage(-1)}className="navigation-button prev-button-slider">
                <img src={leftChevron} alt="" />
                 </button>
                 <button onClick={()=>toggleImage(1)} className="navigation-button next-button-slider">
                <img src={rightChevron} alt="next image" />
                 </button>

        </div>
        
        
    </div>
</div>
</section>
    </>
  )
}
