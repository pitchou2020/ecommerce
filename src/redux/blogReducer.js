// src/redux/blogReducer.js
import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blog',
  initialState: { items: [] },
  reducers: {
    setPosts: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setPosts } = blogSlice.actions;

// 🚫 API /api/posts.php removida — posts carregados localmente
export const getPostsLists = () => async (dispatch) => {
  try {
    const postsLocais = [
      {
        id: 1,
        titulo: 'Bem-vindo à Congolinaria!',
        conteudo:
          'Explore o melhor da culinária AfroVeg com o Chef Pitchou Luambo e a equipe Congolinaria.',
        autor: 'Equipe Congolinaria',
        data: '2025-11-03',
        imagem: '/images/blog1.jpg',
      },
      {
        id: 2,
        titulo: 'Sabores da Terra Africana',
        conteudo:
          'A banana da terra, o amendoim e a mandioca são protagonistas de receitas plant-based cheias de tradição e sabor.',
        autor: 'Chef Pitchou',
        data: '2025-11-02',
        imagem: '/images/blog2.jpg',
      },
      {
        id: 3,
        titulo: 'AfroVeg: um estilo de vida sustentável',
        conteudo:
          'Mais que um cardápio — é uma filosofia de vida que valoriza a natureza, os povos e a cultura africana.',
        autor: 'Congolinaria Empório LTDA',
        data: '2025-11-01',
        imagem: '/images/blog3.jpg',
      },
    ];

    dispatch(setPosts(postsLocais));
    console.info('📰 Posts carregados localmente (sem API).');
  } catch (error) {
    console.error('Erro ao carregar posts locais:', error);
  }
};

export default blogSlice.reducer;
