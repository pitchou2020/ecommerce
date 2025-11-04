import React, {useState} from 'react';
import './buttons.css'
function Button(){

    const [minhaEscolha, setminhaEscolha] = useState(""); 
    
    console.log(minhaEscolha);
    const fooSim = ()=>{
      setminhaEscolha("sim");
    }
    const fooNao =()=>{
        setminhaEscolha("Não")
    }
    const [dataComponent, setDataComponent]= useState(1);
    const changeState = ()=>{
        setDataComponent(dataComponent + 1)
        
    }
    return(
        <div>
            <div className="input-block">
                        <label htmlFor="opening_on_weekends">Atende fim de semana?</label>
                        <input type="hidden" id="opening_on_weekends" name="opening_on_weekends" value="1" required/>
                        <div className="button-select">
                            <button onClick={fooSim} type="button"className="active">Sim</button>
                            <button onClick={fooNao} type="button">Não</button>
                        </div>
                        <button onClick = {changeState} type="submit" className="primary-button">Confirmar</button>
                </div>
        </div>
    )
}
export default Button;