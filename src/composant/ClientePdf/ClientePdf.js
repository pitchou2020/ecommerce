import React from 'react'
import pdfMake from "pdfmake/build/pdfmake";
import { useEffect, useState, useRef } from "react";
import pdfFonts from "pdfmake/build/vfs_fonts";

const ClientePdf = ({
    dataCardapio, 
    showModalPdf,
    setShowModalPdf,
    setShowModalDeslike,
    setShowModalSave,
    setShowModalLike,
     }) => {
    const newIngredients = dataCardapio.ingredients?.replaceAll("<br/>", "\n")
    const newEtapes = dataCardapio.etapes?.replaceAll("<br/>", "")

    function getBase64ImageFromURL(url) {
        return new Promise((resolve, reject) => {
            var img = new Image();
            img.setAttribute("crossOrigin", "anonymous");

            img.onload = () => {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;

                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                var dataURL = canvas.toDataURL("image/png");

                resolve(dataURL);
            };

            img.onerror = error => {
                reject(error);
            };

            img.src = url;
        });
    }

    const clientesPDF = async () => {
        if (!localStorage.getItem('idUser')) {
            setShowModalPdf(!showModalPdf)
            setShowModalDeslike(false)
            setShowModalSave(false)
            setShowModalLike(false)
            
           

        } else {
            pdfMake.vfs = pdfFonts.pdfMake.vfs;

            const reportTitle = [
                {
                    text: 'Receita',
                    fontSize: 15,
                    bold: true,
                    margin: [15, 20, 0, 45]
                }
            ];
            const details = [
                {
                    image: await getBase64ImageFromURL(
                        'https://refugiadonacozinha.com.br/img_upload/'+dataCardapio.imagem
                    ),
                    width: 300
                },
                {
                    text: dataCardapio.titre,
                    style: 'header'
                },
                '\n\nINGREDIENTES\n\n\n',
                {
                    text: newIngredients,
                    style: 'subheader'
                },
                '\n\n MODO DE PREPARO\n\n\n',
                {
                    text: newEtapes,
                    style: 'subheader'
                },

            ];
            function Rodape(currentPage, pageCount) {
                return [
                    {

                        text: 'Receitas reservada para iCuisine' + currentPage + '/' + pageCount,
                        alignment: 'right',
                        fontSize: 9,
                        bold: true,
                        margin: [0, 10, 20, 0]//left,top,right,bottom
                    },

                ]
            }

            const docDefinition = {
                pageSize: 'A4',
                pageMargins: [15, 50, 15, 40],
                header: [reportTitle],
                content: [details],
                footer: Rodape
            }
            pdfMake.createPdf(docDefinition).open();
        }
    }
    return (
        <div>
            <button className='btn_download' onClick={clientesPDF}>
                <i class='bx bxs-cloud-download' > Download PDF</i>
            </button>
        </div>
    )
}

export default ClientePdf
