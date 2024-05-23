<template>
  <main>
    <section class="container-lista">
      <h1>Listagem de reservas</h1>
      <table class="container-tabela">
        <thead>
          <tr>
            <th>Número da reserva</th>
            <th>Data check-in</th>
            <th>Data check-out</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reserva in reservas" :key="reserva.reserva_id">
            <td>{{ parseInt(reserva.numero_reserva) }}</td>
            <td>{{ reserva.data_checkin }}</td>
            <td>{{ reserva.data_checkout }}</td>
            <td>{{ reserva.status }}</td>
            <td>
              <button class="btn-update" @click="navigateToUpdate(reserva.reserva_id)">Atualizar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<script>
import reservaService from '@/service/reserva.service';

export default {
  data() {
    return {
      reservas: []
    };
  },
  methods: {
    async listagemReservas() {
      try {
        const reservas = await reservaService.listar();
        return reservas.data;
      } catch (error) {
        alert('Erro ao listar reservas!');
      }
    },
    navigateToUpdate(id) {
      this.$router.push(`/atualizar-reserva/${id}`);
    }
  },
  async mounted() {
    this.reservas = await this.listagemReservas();
  }
};
</script>

<style scoped>
h1 {
  margin-bottom: 32px;
}

.container-lista {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.container-tabela {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.container-tabela th,
.container-tabela td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.container-tabela th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.container-tabela tr:hover {
  background-color: #f1f1f1;
}

.btn-update {
  padding: 6px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-update:hover {
  background-color: #0469d5;
}
</style>
