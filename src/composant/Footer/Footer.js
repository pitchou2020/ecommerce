import React from "react";
import congolinaria from "../../assets/images/horizontal/negativo.png";
import pagamento from "../../assets/images/forma_pagamento.png";
import selo from "../../assets/images/selossl.png";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-gray-100 pt-10 pb-4 px-6 md:px-16">
      {/* Seções principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        
        {/* Navegação */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">Navegar</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/sobre" className="hover:text-yellow-300 transition"><i className="fa-solid fa-caret-right mr-2"></i>Sobre Congolinaria</a></li>
            <li><a href="/" className="hover:text-yellow-300 transition"><i className="fa-solid fa-caret-right mr-2"></i>Início</a></li>
            <li><a href="/loja" className="hover:text-yellow-300 transition"><i className="fa-solid fa-caret-right mr-2"></i>Loja</a></li>
            <li><a href="/redirect_cardapio" className="hover:text-yellow-300 transition"><i className="fa-solid fa-caret-right mr-2"></i>Cardápio</a></li>
            <li><a href="/receitas" className="hover:text-yellow-300 transition"><i className="fa-solid fa-caret-right mr-2"></i>Receitas</a></li>
            <li><a href="/contato" className="hover:text-yellow-300 transition"><i className="fa-solid fa-caret-right mr-2"></i>Contato</a></li>
            <li><a href="/noticias" className="hover:text-yellow-300 transition"><i className="fa-solid fa-caret-right mr-2"></i>Notícias</a></li>
            <li><a href="/#order" className="hover:text-yellow-300 transition"><i className="fa-solid fa-caret-right mr-2"></i>Orçamento / Festa / Eventos</a></li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">Central de Atendimento</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="tel:+5511980451471" className="hover:text-yellow-300 transition">+55 (11) 98045-1471</a></li>
            <li><a href="mailto:pitchouluambo@gmail.com" className="hover:text-yellow-300 transition">pitchouluambo@gmail.com</a></li>
            <li><a href="mailto:congolinaria.sp@gmail.com" className="hover:text-yellow-300 transition">congolinaria.sp@gmail.com</a></li>
            <li>Av. Professor Alfonso Bovero, 382 — Próx. Metrô Sumaré - SP</li>
            <li>Rua Caquito, 251 — Próx. Mercado Municipal Penha - SP</li>
          </ul>
        </div>

        {/* Redes Sociais */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">Redes Sociais</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="https://www.facebook.com/congolinaria" className="hover:text-yellow-300 transition"><i className="fa-brands fa-facebook mr-2"></i>Facebook</a></li>
            <li><a href="https://www.instagram.com/congolinaria" className="hover:text-yellow-300 transition"><i className="fa-brands fa-instagram mr-2"></i>Instagram</a></li>
            <li><a href="https://www.youtube.com/pitchoubresil" className="hover:text-yellow-300 transition"><i className="fa-brands fa-youtube mr-2"></i>YouTube</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition"><i className="fa-brands fa-twitter mr-2"></i>Twitter</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition"><i className="fa-brands fa-linkedin mr-2"></i>LinkedIn</a></li>
          </ul>
        </div>
      </div>

      {/* Segunda linha */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-neutral-700 pt-10">
        {/* Logo + Descrição */}
        <div>
          <img src={congolinaria} alt="Logo Congolinaria" className="w-56 mb-4" />
          <p className="text-sm leading-relaxed text-gray-300">
            O Congolinária é um restaurante familiar que serve comida típica da República Democrática do Congo,
            privilegiando ingredientes naturais. Fundado em 2016, é reconhecido por oferecer uma das melhores
            experiências afro-veganas de São Paulo, agora também com linha de congelados e molhos artesanais do
            Chef Pitchou.
          </p>
        </div>

        {/* Forma de pagamento */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">Formas de Pagamento</h3>
          <img src={pagamento} alt="Formas de pagamento" className="w-64 rounded-md" />
        </div>

        {/* Selo de segurança */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">Selo de Segurança</h3>
          <img src={selo} alt="Selo de segurança" className="w-56" />
        </div>
      </div>

      {/* Rodapé final */}
      <div className="text-center mt-10 text-xs text-gray-400 border-t border-neutral-800 pt-4">
        © 2023 - <span className="text-yellow-400 font-semibold">Congolinaria: Descobrindo Sabores do Congo</span> — Todos os direitos reservados
      </div>
    </footer>
  );
}
