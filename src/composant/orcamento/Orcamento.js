import React, {useState } from 'react'
import './Orcamento.css'
import axios from 'axios';


export default function Orcamento() {

  const valorTelefone = e => {
    let textoAjustado;
    textoAjustado = e.replace(/(\d{2})(\d{5})(\d{4})/,
      function (regex, arg1, arg2, arg3) {
        return arg1 + ' ' + arg2 + ' ' + arg3;
      });
    e = textoAjustado;
    setTelefone(e)
  }

  const [nome, setNome] = useState([]);
  const [email, setEmail] = useState([]);
  const [telefone, setTelefone] = useState([]);
  const [dataEvento, setDataEvento] = useState([]);
  const [horaEvento, setHoraEvento] = useState([]);
  const [localEvento, setLocalEvento] = useState([]);
  const [numPessoas, setNumPessoas] = useState([]);
  const [mensagem, setMensagem] = useState([]);
  const [statusEnvio, setStatusEnvio] = useState({
    codigo: '',
    type: '',
    mensagem: ''
  })

  const onSubmit = (e) => {
    e.preventDefault();
    let endpoint = "https://congolinaria.com.br/add_orcamento.php";
    axios.post(endpoint, {
      nome: nome,
      email: email,
      whatsapp: telefone,
      mensagem: mensagem,
      data_evento: dataEvento,
      hora_evento: horaEvento,
      endereco_evento: localEvento,
      numero_pessoa: numPessoas
    }).then((res) => {
            console.log(res.data)
      if (res.data.erro) {
        setStatusEnvio({
          codigo: 400,
          type: "error",
          mensagem: res.data.mensagem
        })
      }
      else {
        setStatusEnvio({
          codigo: 200,
          type: "success",
          mensagem: res.data.mensagem
        })
      }

    }).catch(() => {
      setStatusEnvio({
        codigo: 400,
        type: "error",
        mensagem: "tente mais tarde! "
      })
    });

  }

  return (
    <>
      <section className='order' id='order'>

        <h1 className='heading'> <span>Orçamento para sua festa</span> Agora</h1>
        <div className='rowBox'>
          <div className="image">
            <img src="/pratos/chef-pitchou.jpg" alt="" width={300} />

          </div>


          <form action="">
            {statusEnvio.type === 'success' ? <div className='AlertSucess'><span>{statusEnvio.mensagem}</span></div> : ""}
            {statusEnvio.type === 'error' ? <div className='AlertDanger'><span>{statusEnvio.mensagem}</span></div> : ""}
            <div className="inputBox">
              <input type="text" placeholder='Nome completo' name='nome' onChange={e => setNome(e.target.value)} />

            </div>
            <div className="inputBox">
              <input type="email" placeholder='e_mail' name='email' onChange={e => setEmail(e.target.value)} />
              <input type="text" placeholder='whatsApp'
                maxlength="11"
                pattern="[0-9\s]+"
                value={telefone}
                onChange={e => valorTelefone(e.target.value)} />
            </div>
            <div className="inputBox">
              <input type="number" placeholder='Quantas Pessoas' onChange={e => setNumPessoas(e.target.value)} />
              <input type="text" placeholder='Endreço/local da festa' onChange={e => setLocalEvento(e.target.value)} />
            </div>
            <div className="inputBox">
              <input type="date" onChange={e => setDataEvento(e.target.value)} />
              <input type="time" onChange={e => setHoraEvento(e.target.value)} />
            </div>
            <textarea placeholder='Mensagem' name="" id="" cols="30" rows="10" onChange={e => setMensagem(e.target.value)}></textarea>
            <input type="submit" className='btn' name='' id='' value='orçar agora' onClick={onSubmit} />
          </form>

        </div>
      </section>
    </>
  )
}

