import api from './api'

export default {
  cadastrar(body){
    return api().post('/hospede/', body);
  },

  listar() {
    return api().get('/hospede/');
  },

  listarId(id) {
    return api().get(`/hospede/${id}`);
  },

  atualizarId(id, data) {
    return api().patch(`/hospede/${id}`, data);
  },
}