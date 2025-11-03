import React from 'react'
import './AddRestaurantes.css'
import  "./css/main.css"
import  "./css/animations.css"
import  "./css/sidebar.css"
import  "./css/map.css"
import  "./css/forms.css"
import "./css/page-create-congolinaria.css"
export default function AddRestaurantes() {
  return (
    <>
      <div id="page-create-congolinaria">
        <aside class="animate-right sidebar">
            <img src="/images/favicon.png" alt=""/>
            <footer>
                <button onclick="history.back()">
                    <i class="fa fa-arrow-left">Voltar</i>
                </button>
            </footer>
        </aside>
        <main class="animate-appear with-sidebar">
            <form action="">
                <fieldset>
                    <legend>Dados</legend>

                    <div class="map-container">
                        <div id="mapid">
                            <input type="hidden" name="lat"/>
                            <input type="hidden" name="lng"/>
                            <footer>
                                <a href="#" id="select-point"> clique no mapa para adicionar a localização

                                </a>

                            </footer>
                        </div>
                    </div>

                    <div class="input-block">
                        <label for="name">Nome</label>
                        <input id="name" name="name" required/>
                    </div>
                    <div class="input-block">
                        <label for="about">Sobre <span>Máximo de 300 caracteres</span></label>
                        <textarea id="about" name="about" required></textarea>
                    </div>
                    <div class="input-block">
                        <label for="whatsapp">Número do whatsApp</label>
                        <input id="whatsapp" name="whatsapp" required/>
                    </div>

                    <div class="input-block images">
                        <label for="images">Foto</label>

                        <div class="images-upload" id="images">

                       <div class="new-upload">
                            <input name="images" placeholder="cole o link da foto aqui" required/>
                            <span onclick="deleteField(event)"><i class="fa fa-plus"></i></span>
                       </div>

                        </div>

                        <button type="button" onclick="addPhotoField()">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Visitação</legend>
                    
                    <div class="input-block">
                        <label for="instructions">Instructions</label>
                        <textarea id="instructions" name="instructions" required></textarea>
                    </div>

                    <div class="input-block">
                        <label for="opening_hours">Horário das visitas</label>
                        <input id="opening_hours" name="opening_hours"required/>
                    </div>
                    <div class="input-block">

                        <label for="opening_on_weekends">Atende fim de semana?</label>
                        <input type="hidden" id="opening_on_weekends" name="opening_on_weekends" value="1" required/>
                        <div class="button-select">
                            <button data-value="1" onclick="toggleSelect(event)" type="button"class="active">Sim</button>
                            <button data-value="0" onclick="toggleSelect(event)" type="button">Não</button>
                        </div>
                        <button type="submit" class="primary-button">Confirmar</button>
                    </div>
                </fieldset>
            </form>
        </main>
      



    </div>
    </>
  )
}
