import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsLists } from "../../redux/blogReducer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../../composant/Footer/Footer";
import Orcamento from "../../composant/orcamento/Orcamento";
import Pitchou from "./../Admin/img/people.png";

export default function HomePageTailwind() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.blogReducer || {});
  const [pratosPopulares, setPratosPopulares] = useState([]);
  const [heroImage, setHeroImage] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroButtonText, setHeroButtonText] = useState("");
  const [heroButtonLink, setHeroButtonLink] = useState("/redirect_cardapio");

  // === BLOG ===
  useEffect(() => {
    if (!Array.isArray(posts.items) || posts.items.length === 0)
      dispatch(getPostsLists());
  }, [dispatch, posts.items]);

  const postsUnicos =
    Array.isArray(posts.items) && posts.items.length > 0
      ? [
          ...new Set(posts.items.map((p) => p.titre_post)),
        ].map((titre) => posts.items.find((p) => p.titre_post === titre))
      : [];

  // === PRATOS POPULARES ===
  useEffect(() => {
    fetch("https://congolinaria.com.br/api/pratos_populares.php")
      .then((r) => r.json())
      .then(setPratosPopulares)
      .catch((e) => console.error("Erro ao carregar pratos:", e));
  }, []);

  // === HERO ===
  useEffect(() => {
    fetch("https://congolinaria.com.br/api/home_hero.php")
      .then((r) => r.json())
      .then((data) => {
        if (data?.imagem)
          setHeroImage(`https://congolinaria.com.br/${data.imagem}`);
        if (data?.titulo) setHeroTitle(data.titulo);
        if (data?.botao_texto) setHeroButtonText(data.botao_texto);
        if (data?.botao_link) setHeroButtonLink(data.botao_link);
      })
      .catch((e) => console.error("Erro ao carregar hero:", e));
  }, []);
const [mostrarEvento, setMostrarEvento] = React.useState(true);

  return (
    <>
      {/* ===== HERO PRINCIPAL ===== */}
      <section
        className="relative h-[90vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage || "/img/banner-afroveg.png"})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70"></div>
        <motion.div
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold text-yellow-400 drop-shadow-md mb-4">
            {heroTitle || "AfroVeg do Congo ao seu prato"}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-6">
            Sabores ancestrais com alma plant-based e cultura viva africana.
          </p>
          <Link
            to={heroButtonLink}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            {heroButtonText || "Ver Cardápio"}
          </Link>
        </motion.div>
      </section>

      {/* ===== EVENTO EM FOCO (fechável) ===== */}
{/** Hook local para controlar visibilidade */}

  

   {/* ===== EVENTO EM FOCO (fechável) ===== */}
{mostrarEvento && (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6 }}
    className="relative py-14 px-6 bg-gradient-to-r from-yellow-50 to-yellow-100 text-center shadow-md"
  >
    {/* Botão fechar */}
    <button
      onClick={() => setMostrarEvento(false)}
      className="absolute top-3 right-3 bg-orange-200 hover:bg-orange-300 text-orange-800 rounded-full px-3 py-1 text-xs font-semibold transition"
    >
      ✕ Fechar
    </button>

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-3xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-orange-700 mb-3">
        📅 Evento <span className="underline">Congo em Foco</span> — 27 a 30 de Junho de 2025
      </h2>
      <p className="text-gray-700 mb-5">
        Celebre a independência do Congo com cultura, debates, food shows e gastronomia AfroVeg autêntica!
      </p>
      <a
        href="/evento-congo-em-foco"
        className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-semibold shadow"
      >
        Ver programação completa
      </a>
    </motion.div>
  </motion.section>
)}




      {/* ===== PRATOS POPULARES ===== */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-extrabold text-center text-gray-800 mb-10"
        >
          Pratos Populares
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {pratosPopulares.map((prato, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
            >
              <img
                src={`https://congolinaria.com.br/${prato.imagem}`}
                alt={prato.titulo}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-bold text-orange-700 mb-2">
                  {prato.titulo}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {prato.descricao}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== LOCALIZAÇÕES ===== */}
      <section className="bg-orange-50 py-20 px-6">
        <h2 className="text-3xl font-bold text-center text-orange-800 mb-10">
          Onde Estamos
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Zona Oeste */}
          <div className="text-center bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-orange-700 mb-2">
              Congolinaria Zona Oeste
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Av. Prof. Alfonso Bovero, 382 – Sumaré (SP)
            </p>
            <iframe
  title="Mapa Zona Oeste"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.232733744853!2d-46.68443048543104!3d-23.592711184666373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59d21b30cd7f%3A0x5e6a0b23c18aa3b9!2sAv.%20Prof.%20Alfonso%20Bovero%2C%20382%20-%20Sumar%C3%A9%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2005426-000!5e0!3m2!1spt-BR!2sbr!4v1709575012345!5m2!1spt-BR!2sbr"
  width="100%"
  height="250"
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="rounded-lg"
/>
            <a
              href="https://www.google.com/maps/place/Av.+Prof.+Alfonso+Bovero,+382"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 text-sm mt-2 inline-block hover:underline"
            >
              Ver no Google Maps
            </a>
          </div>

          {/* Zona Leste */}
          <div className="text-center bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-orange-700 mb-2">
              Congolinaria Zona Leste
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Rua Caquito, 251 – Penha (SP)
            </p>
       <iframe
  title="Mapa Zona Leste"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.324113935658!2d-46.54020108543022!3d-23.58922098466702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5edda17e1d8f%3A0x2f697e1585f28238!2sR.%20Caquito%2C%20251%20-%20Penha%20de%20Fran%C3%A7a%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003631-010!5e0!3m2!1spt-BR!2sbr!4v1709575071234!5m2!1spt-BR!2sbr"
  width="100%"
  height="250"
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="rounded-lg"
/>
            <a
              href="https://www.google.com/maps/place/R.+Caquito,+251"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 text-sm mt-2 inline-block hover:underline"
            >
              Ver no Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* ===== BLOG ===== */}
      {postsUnicos.length > 0 && (
        <section className="bg-yellow-100 py-20 px-6">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-10">
            Últimas do Blog
          </h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {postsUnicos.map((post, i) => (
              <Link
                to={`/single_blog/${post.titre_post.replace(/\s+/g, "-")}`}
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={`https://congolinaria.com.br/${post.imagem_post}`}
                  alt={post.titre_post}
                  className="w-full h-52 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2 text-orange-700">
                    {post.titre_post}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {post.resumo_post}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ===== CHEF PITCHOU ===== */}
      <section className="py-20 bg-white text-center px-6">
        <img
          src={Pitchou}
          alt="Chef Pitchou"
          className="mx-auto w-28 h-28 object-cover rounded-full border-4 border-yellow-400 shadow-lg mb-4"
        />
        <h3 className="text-2xl font-bold text-orange-700 mb-1">
          Chef Pitchou Luambo
        </h3>
        <p className="text-sm text-gray-500 mb-4">Culinária AfroVeg Congolesa</p>
        <p className="max-w-2xl mx-auto text-gray-700 italic leading-relaxed">
          “Congolinária é a possibilidade de mostrar para as pessoas a história
          que os brasileiros desconhecem. Falamos da cultura africana, da
          gastronomia, dos direitos dos animais e da situação dos refugiados.
          Os visitantes entram, comem e saem diferentes.”
        </p>
      </section>

      {/* ===== ORÇAMENTO ===== */}
      <Orcamento />
     
    </>
  );
}
