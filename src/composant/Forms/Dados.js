export default function Dados(props) {
  return (
    <div>
      <h1>CARDAPIO</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>PRATO</th>
            <th>DESCRIÇÃO</th>
            <th>PREÇO</th>
            <th>VEGANO</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
      </table>
      <ul>
   <li className="border justify-content-between align-items-center d-flex p-2 m-2">
    <div className="p-3">{props.nome}</div>
   </li>
   <li className="border justify-content-between align-items-center d-flex p-2 m-2">
    <div className="p-3">{props.whatsapp}</div>
   </li>
   <li className="border justify-content-between align-items-center d-flex p-2 m-2">
    <div className="p-3">{props.about}</div>
   </li>
   </ul>
    </div>
    
  )
}
