import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'listar-reservas',
      component: () => import('../views/ListarReservasView.vue')
    },
     {
      path: '/cadastro-hospede',
      name: 'cadastro',
      component: () => import('../views/CadastroHospedeView.vue')
    },
    {
      path: '/lista-hospedes',
      name: 'hospede',
      component: () => import('../views/ListarHospedeView.vue')
    },
     {
      path: '/atualizar-hospede/:id',
      name: 'atualizar-hospede',
      component: () => import('../views/AtualizarHospedeView.vue'),
      props: true
    },
    {
      path: '/cadastro-reserva',
      name: 'cadastrar-reserva',
      component: () => import('../views/CadastroReservaView.vue'),
      props: true
    },
    {
      path: '/atualizar-reserva/:id',
      name: 'atualizar-reserva',
      component: () => import('../views/AtualizarReservaView.vue'),
      props: true
    }
  ]
})

export default router
