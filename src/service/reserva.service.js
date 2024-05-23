import api from './api'

export default {
  cadastrar(body) {
    console.log(body);
    return api().post('/reserva/', body);
  },

  listar() {
    return api().get('/reserva/');
  },

  listarId(id) {
    return api().get(`/reserva/${id}`);
  },

  atualizarId(id, data) {
    return api().patch(`/reserva/${id}`, data);
  },
}