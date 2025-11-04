import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Upload(props) {

    const [selectedImage, setSelectedImage] = useState();

    const onFileChange = (e) => {
        if (e.target.files) {
            setSelectedImage(e.target.files[0]);
            /*let files = e.target.files;
            let fileReader = new FileReader();
            fileReader.readAsDataURL(files[0]);
            fileReader.onload = (event) => {
                setSelectedImage(event.target.result)
                
            }*/

            let files = e.target.files;
            let fileReader = new FileReader();
            fileReader.readAsDataURL(files[0]);
            fileReader.onload = (event) => {
                setSelectedImage(event.target.result)
            }
        }
    }
    const onSubmit = () => {

        //const formData = new FormData();

        const formData = { image: selectedImage }
        let endpoint = "https://refugiadonacozinha.com.br/add_recette.php";
        axios.post(endpoint, {
            image: selectedImage,
            titre: props.titre,
            categorie: props.categorie,
            ingredients: props.ingredients,
            etapes: props.etapes,
            infos: props.infos,
            sinopse: props.sinopse,
            vegan: props.vegan
        }).then((res) => {
            console.log('File uploaded!');
            console.log(res.data);
            console.log(props.titre)
            console.log(props.categorie)
            console.log(props.ingredients)
            console.log(props.etapes)
            console.log(props.infos)
            console.log(props.vegan)
            console.log(formData)

        })

    }



    return (
        
        <div>
            <div className="form-group mb-3">
                <label className="text-white">selecione uma imagem</label>
                <input type="file" className="form-control" name="image" onChange=
                    {onFileChange} />
                <div>
                    {selectedImage}
                </div>
            </div>

            <div className="input-block">
                <button type="submit" className="primary-button" onClick={onSubmit}>Enviar</button>
            </div>

        </div>
    )

}

export default Upload;