import React from 'react'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";


function clientesPDF(recettes) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle = [
        {
            text: 'Clientes',
            fontSize : 15,
            bold: true,
            margin:[15,20,0,45]
        }
    ];
    const dados = [
        
            { text: recettes.id_recettes, style: 'tableHeader' },
            { text: recettes.titre, style: 'tableHeader' },
            { text: recettes.infos, style: 'tableHeader' },
            { text: recettes.ingredients, style: 'tableHeader' },
            { text: recettes.etapes, style: 'tableHeader' },
            { text: recettes.categorie, style: 'tableHeader' }
           
        
    ]
    const details = [
        {
            table: {
                headerRows: 1,
                /*widths:['*','*','*','*'],*/
                body: [
                    [
                        { text: 'código', style: 'tableHeader' },
                        { text: 'Titre', style: 'tableHeader' },
                        { text: 'infos', style: 'tableHeader' },
                        { text: 'ingredients', style: 'tableHeader' },
                        { text: 'Etapes', style: 'tableHeader' },
                        { text: 'Categorie', style: 'tableHeader' }
                    ],
                    [

                        { text: recettes.id_recettes, style: 'tableHeader' },
                        { text: recettes.titre, style: 'tableHeader' },
                        { text: recettes.infos, style: 'tableHeader' },
                        { text: recettes.ingredients, style: 'tableHeader' },
                        { text: recettes.etapes, style: 'tableHeader' },
                        { text: recettes.categorie, style: 'tableHeader' }


                    ]

                ]



        },
        layout: 'headerLinOnly'
    }
    ];
    function Rodape(currentPage, pageCount){
        return[
            {
                text: currentPage + '/'+pageCount,
                alignment:'right',
                fontSize : 9,
                bold: true,
                margin:[0,10,20,0]//left,top,right,bottom
            }
        ]
    }
    const docDefinition = {
        pageSize:'A4',
        pageMargins:[15,50,15,40],

        header:[reportTitle],
        content:[details],
        footer:Rodape
    }
    pdfMake.createPdf(docDefinition).download();
}
export default clientesPDF;