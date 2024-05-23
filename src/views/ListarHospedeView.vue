<template>
  <main>
    <section class="container-lista">
      <h1>Listagem de hóspedes</h1>
      <table class="container-tabela">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hospede in hospedes" :key="hospede.id">
            <td>{{ hospede.nome }}</td>
            <td>{{ hospede.email }}</td>
            <td>{{ hospede.telefone }}</td>
            <td>{{ hospede.endereco }}</td>
            <td>
              <button class="btn-update" @click="navigateToUpdate(hospede.id)">Atualizar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<script>
import hospedeService from '@/service/hospede.service';

export default {
  data() {
    return {
      hospedes: []
    };
  },
  methods: {
    async listagemHospedes() {
      try {
        const hospedes = await hospedeService.listar();
        return hospedes.data;
      } catch (error) {
        alert('Erro ao listar hóspedes!');
      }
    },
    navigateToUpdate(id) {
      this.$router.push(`/atualizar-hospede/${id}`);
    }
  },
  async mounted() {
    this.hospedes = await this.listagemHospedes();
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
