const INITIAL_STATE = {
    articles:[]
}
function articleReducer( state = INITIAL_STATE, action){

    switch(action.type){
        case "LOADARTICLES":{
            return{
                ...state,
                articles:action.payload
            }
        }
    }
    return state;
}
export default articleReducer;

export const getArticles= () => dispatch =>{
    fetch("http://localhost/RestoAfrica/src/views/recettes.php")
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        dispatch({
            type:'LOADARTICLES',
            payload: data
        })

    })
}

export const  getRestaurantes = () => dispatch => {
    fetch('https://refugiadonacozinha.com.br/restaurantes.php')
        .then(response => response.json())
        .then(data => {
            dispatch({
                type:'LOADARTICLES',
                payload: data
            })
        })

}

export const getRecettesAleatoires=()=> dispatch=>{
    fetch('https://refugiadonacozinha.com.br/recettesAleatoire.php')
        .then(response => response.json())
        .then(data => {
            dispatch({
                type:'LOADARTICLES',
                payload: data.recettes
            })
        })

}