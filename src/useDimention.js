import {useState,useEffect} from 'react';

export default function useDimension(){
const [dimension, setDimension]=useState();
    useEffect(()=>{
        window.addEventListener('resize',actionResize);
        function actionResize(){
            setDimension(window.innerWidth)
        }
        return ()=>{
            window.addEventListener('resize',actionResize)
        }
        
    },[]);

return dimension;
}