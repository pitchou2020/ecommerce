export const MenuData = [
    
    {
        title: "Seu Perfil",
        url: "../perfil/"+ localStorage.getItem('idUser'),
        cName : 'nav-links',
        icone : "fa-solid fa-user"
    },
    {
        title: "Salvos",
        url: "oficinas",
        cName : 'nav-links',
        icone:"fa-solid fa-bookmark"
    },
    {
        title: "Historico",
        url: "recettes",
        cName : 'nav-links',
        icone :"fa-solid fa-clock-rotate-left" 
    },
    {
        title: "Enviados",
        url: "cursos",
        cName : 'nav-links',
        icone :"fa-solid fa-upload" 
    },
    {
        title: "Configurações",
        url: "restaurantes",
        cName : 'nav-links',
        icone : "fa-solid fa-gear"
    },

    {
        title: "Central de ajuda",
        url: "./login",
        cName : 'nav-links',
        icone : "fa-solid fa-question"
    },
    {
        title: "Sair",
        url: "./login",
        cName : 'nav-links',
        icone:'fa-solid fa-right-from-bracket'
       
    },
    
    
]

