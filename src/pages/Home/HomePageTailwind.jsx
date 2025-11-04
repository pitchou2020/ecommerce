import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsLists } from '../../redux/blogReducer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
//import NavMenu from '../../composant/navMenu/NavMenu';
import Footer from '../../composant/Footer/Footer';
import Orcamento from '../../composant/orcamento/Orcamento';
import Pitchou from './../Admin/img/people.png';

export default function HomePageTailwind() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.blogReducer || {});
  const [pratosPopulares, setPratosPopulares] = useState([]);
  const [heroImage, setHeroImage] = useState('');
  const [heroTitle, setHeroTitle] = useState('');
  const [heroButtonText, setHeroButtonText] = useState('');
  const [heroButtonLink, setHeroButtonLink] = useState('/redirect_cardapio');

  useEffect(() => {
    if (!Array.isArray(posts.items) || posts.items.length === 0) dispatch(getPostsLists());
  }, [dispatch, posts.items]);

  const postsUnicos = Array.isArray(posts.items) && posts.items.length > 0
    ? [...new Set(posts.items.map(p => p.titre_post))].map(titre => posts.items.find(p => p.titre_post === titre))
    : [];

  useEffect(() => {
    const fetchPratos = async () => {
      try {
        const response = await fetch('https://congolinaria.com.br/api/pratos_populares.php');
        const data = await response.json();
        setPratosPopulares(data);
      } catch (error) {
        console.error('Erro ao carregar pratos populares:', error);
      }
    };
    fetchPratos();
  }, []);

  useEffect(() => {
    fetch('https://congolinaria.com.br/api/home_hero.php')
      .then(res => res.json())
      .then(data => {
        if (data?.imagem) setHeroImage(`https://congolinaria.com.br/${data.imagem}`);
        if (data?.titulo) setHeroTitle(data.titulo);
        if (data?.botao_texto) setHeroButtonText(data.botao_texto);
        if (data?.botao_link) setHeroButtonLink(data.botao_link);
      })
      .catch(err => console.error('Erro ao carregar conteúdo do hero:', err));
  }, []);

  return (
    <>
      {/*<NavMenu />*/}

      <section className="relative z-20">
  <motion.div
    className="relative text-white py-10 px-6 text-center bg-cover bg-center shadow-md rounded"
    style={{ backgroundImage: "url('/img/banner-afroveg.png')" }}
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    {/* Fundo escuro para contraste */}
    <div className="absolute inset-0 bg-black bg-opacity-60 rounded z-0"></div>

    {/* Conteúdo acima do fundo */}
    <div className="relative z-10 max-w-3xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 drop-shadow-lg">
        📅 Evento <span className="underline">Congo em Foco</span> — 27 a 30 de Junho de 2025
      </h2>
      <p className="mb-4 text-sm sm:text-base drop-shadow-md">
        Participe da celebração da independência do Congo com cultura, gastronomia e música ao vivo!
      </p>
      <a
        href="/evento-congo-em-foco"
        className="inline-block bg-white text-red-600 font-semibold px-6 py-2 rounded shadow hover:bg-yellow-100 transition"
      >
        Ver programação completa
      </a>
    </div>
  </motion.div>
</section>



      <section className="relative h-[85vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0 z-0"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10 text-center px-4"
        >
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow">{heroTitle || 'AfroVeg do Congo ao seu prato'}</h1>
          <Link to={heroButtonLink} className="inline-block mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded shadow">
            {heroButtonText || 'Ver Cardápio'}
          </Link>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Pratos Populares</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pratosPopulares.map((prato, index) => (
            <div key={index} className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
              <img src={`https://congolinaria.com.br/${prato.imagem}`} alt={prato.titulo} className="w-full h-48 object-cover rounded-t" />
              <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{prato.titulo}</h3>
              <p className="text-gray-700 text-sm">{prato.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-yellow-50 py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="mb-6 text-center">
              <p className="mb-2 font-semibold">CONGOLINARIA ZO</p>
              <p className="text-sm mb-2">AV. PROF. ALFONSO BOVERO, próximo ao metrô Sumaré (SP)</p>
              <iframe title="Mapa Zona Oeste" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.2355044864817!2d-46.68370528543018!3d-23.592600284666373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59d21b30cd7f%3A0x5e6a0b23c18aa3b9!2sAv.%20Prof.%20Alfonso%20Bovero%2C%20382%20-%20Sumar%C3%A9%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1656510802171!5m2!1spt-BR!2sbr" width="100%" height="250" className="rounded shadow" allowFullScreen="" loading="lazy"></iframe>
              <a href="https://www.google.com/maps/place/Av.+Prof.+Alfonso+Bovero,+382+-+Sumar%C3%A9,+S%C3%A3o+Paulo+-+SP" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-yellow-600 hover:underline text-sm">Ver no Google Maps</a>
            </div>
            <div className="text-center">
              <p className="mb-2 font-semibold">CONGOLINARIA ZL</p>
              <p className="text-sm mb-2">RUA CAQUITO 251, próximo ao Mercado Municipal da Penha (SP)</p>
              <iframe title="Mapa Zona Leste" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.324113935658!2d-46.54020108543022!3d-23.58922098466702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5edda17e1d8f%3A0x2f697e1585f28238!2sR.%20Caquito%2C%20251%20-%20Penha%20de%20Fran%C3%A7a%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1656510954096!5m2!1spt-BR!2sbr" width="100%" height="250" className="rounded shadow" allowFullScreen="" loading="lazy"></iframe>
              <a href="https://www.google.com/maps/place/R.+Caquito,+251+-+Penha+de+Fran%C3%A7a,+S%C3%A3o+Paulo+-+SP" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-yellow-600 hover:underline text-sm">Ver no Google Maps</a>
            </div>
          </div>
        </div>
      </section>

      {postsUnicos.length > 0 && (
        <section className="bg-yellow-100 py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Últimas do Blog</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {postsUnicos.map((post, i) => (
              <Link to={`/single_blog/${post.titre_post.replace(/\s+/g, '-')}`} key={i} className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden">
                <img src={`https://congolinaria.com.br/${post.imagem_post}`} alt={post.titre_post} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{post.titre_post}</h3>
                  <p className="text-sm text-gray-700 line-clamp-3">{post.resumo_post}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="py-16 bg-white px-4 text-center max-w-3xl mx-auto">
        <img src={Pitchou} alt="Chef Pitchou" className="mx-auto rounded-full w-24 h-24 object-cover mb-4" />
        <h3 className="text-xl font-bold">Pitchou Luambo</h3>
        <p className="text-sm text-gray-500 mb-4">Chef do Congolinaria</p>
        <p className="text-gray-700 italic">
          “Congolinária é a possibilidade de mostrar para as pessoas a história que os brasileiros desconhecem. Falamos da cultura africana, da gastronomia, dos direitos dos animais e da situação dos refugiados. Os visitantes entram, comem e saem diferentes.”
        </p>
      </section>

      <Orcamento />
      
    </>
  );
}
