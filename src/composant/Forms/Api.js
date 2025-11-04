

export default {

    enviar:async (pratos,descricao,preco)=>{
        let menu ={
          pratos,descricao,preco
        }
    
        let requisicao = {
          method: 'POST',
          Headers: { 'Content-Type' : 'application/json'},
          body: JSON.stringify(menu)
        }
    
        const response = await fetch('http://refugiadonacozinha.com.br/cadastrarCardapio');
        const data = await response.json();
        return data.msg
      }
}


