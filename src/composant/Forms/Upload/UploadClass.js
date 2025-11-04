import React, { useEffect } from 'react'
import axios from 'axios';
 
class Upload extends React.Component{
 
    constructor(props){
      
        super(props);
        this.state = {
            selectedImage: '',
            titre: '',
            categorie: '',
            ingredients: '',
            etapes: '',
            infos: '',
            sinopse:"",
            vegan:"",
        } 
        
        this.onFileChange = this.onFileChange.bind(this);
        
    }
    
    onFileChange(e) {
       console.log(e.target.files)
     
        let files = e.target.files;
       
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
        fileReader.onload = (event) => {
            this.setState({
                selectedImage: event.target.result,
            })
        }
    }
 
    onSubmit(){
     
      //const formData = new FormData();
      console.log(this.props.newIngredientes)
      
        const formData = { image: this.state.selectedImage }
        let endpoint = "http://localhost/RestoAfrica/src/views/add_recette.php";
         axios.post(endpoint, {
          image : this.state.selectedImage,
          titre:this.props.titre,
          categorie:this.props.categorie,
          ingredients:this.props.newIngredientes.toString(),
          etapes:this.props.etapes,
          infos:this.props.infos,
          sinopse:this.props.sinopse,
          vegan:this.props.vegan

         }).then((res) => {
            console.log('File uploaded!');
           
            console.log(res)
            

        })
        
    }
    
    
    
    render(){
        return(
            <div>
                <div className="form-group mb-3">
                    <label className="text-white">selctione uma imagem</label>
                    <input type="file" className="form-control" name="image" onChange={this.onFileChange} />
                </div>
                
                <div className="input-block">
                   <button type="submit" className="primary-button" onClick={()=>this.onSubmit()}>Enviar</button>
                </div>
               
            </div>
        )
    }
}
 
export default Upload;