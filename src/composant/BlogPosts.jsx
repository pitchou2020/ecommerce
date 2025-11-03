import React from "react";

const blogPosts = [
  {
    id: 1,
    titulo: "Sabores do Congo: Gastronomia e Resistência",
    descricao: "Descubra como a culinária afrovegana celebra a ancestralidade e promove um futuro mais sustentável.",
    imagem: "/blog/congo-sabores.jpg",
    link: "/blog/sabores-do-congo",
  },
  {
    id: 2,
    titulo: "Plant-Based na Cultura Africana",
    descricao: "Muito antes de virar tendência, a base vegetal sempre foi raiz na alimentação de vários povos africanos.",
    imagem: "/blog/plant-based-africa.jpg",
    link: "/blog/plant-based-na-africa",
  },
  {
    id: 3,
    titulo: "O Poder dos Ingredientes Afrodisíacos Naturais",
    descricao: "Conheça os ingredientes da floresta africana que esquentam a alma e nutrem o corpo.",
    imagem: "/blog/ingredientes-afrodisiacos.jpg",
    link: "/blog/ingredientes-afrodisiacos",
  },
];

const BlogPosts = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Do Nosso Blog
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              className="block bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              <img
                src={post.imagem}
                alt={post.titulo}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.titulo}
                </h3>
                <p className="text-gray-600 text-sm">{post.descricao}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;
