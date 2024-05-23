<template>
  <main>
    <section class="container">
      <h1>Cadastro de Reserva</h1>
      <form @submit.prevent="handleForm">
        <div class="container-input">
          <label for="numero_reserva">Número da Reserva</label>
          <input type="number" id="numero_reserva" name="numero_reserva" v-model="numero_reserva" />
        </div>
        <div class="container-input">
          <label for="data_checkin">Data de Check-in</label>
          <input type="date" id="data_checkin" name="data_checkin" v-model="data_checkin" />
        </div>
        <div class="container-input">
          <label for="data_checkout">Data de Check-out</label>
          <input type="date" id="data_checkout" name="data_checkout" v-model="data_checkout" />
        </div>
        <div class="container-input">
          <label for="status">Status</label>
          <input type="text" id="status" name="status" v-model="status" />
        </div>
        <div class="container-input">
          <label for="hospede">Hóspede</label>
          <select id="hospede" v-model="selectedHospede">
            <option v-for="hospede in hospedes" :value="hospede" :key="hospede.id">{{ hospede.nome }}</option>
          </select>
          <button @click="adicionarHospede" type="button" class="btn-add-hospede">Adicionar hospede</button>
          <ul>
            <li v-for="hospede in hospedesSelecionados" :key="hospede.id">
              {{hospede.nome}}
              <button @click="removerHospede(hospede)" type="button">Remover</button>
            </li>
          </ul>
        </div>
        <button class="btn-submit" type="submit">Cadastrar</button>
      </form>
    </section>
  </main>
</template>

<script>
import reservaService from '@/service/reserva.service';
import hospedeService from '@/service/hospede.service';

export default {
  data() {
    return {
      numero_reserva: null,
      data_checkin: null,
      data_checkout: null,
      status: null,
      selectedHospede: null,
      hospedes: [],
      hospedesSelecionados: [],
    };
  },
  methods: {
    async fetchHospedes() {
      try {
        const response = await hospedeService.listar();
        this.hospedes = response.data;
      } catch (error) {
        alert('Erro ao buscar hóspedes!');
      }
    },
    removerHospede(hospedeSelecionado) {
      this.hospedesSelecionados = this.hospedesSelecionados.filter((hospede) => hospede.id !== hospedeSelecionado.id)
    },
    adicionarHospede() {
      const verificarHospedeAdicionado = this.hospedesSelecionados.filter((hospede) => hospede.id === this.selectedHospede.id);
      if (verificarHospedeAdicionado.length) {
        alert('Hóspede já adicionado')
        return
      }
      this.hospedesSelecionados = [...this.hospedesSelecionados, this.selectedHospede]
    },
    validarInputs() {
      if (!this.numero_reserva || this.numero_reserva === '') {
        alert('Número da Reserva obrigatório');
        return false;
      }

      if (!this.data_checkin || this.data_checkin === '') {
        alert('Data de Check-in obrigatória');
        return false;
      }

      if (!this.data_checkout || this.data_checkout === '') {
        alert('Data de Check-out obrigatória');
        return false;
      }

      if (!this.status || this.status === '') {
        alert('Status obrigatório');
        return false;
      }

      if (!this.hospedesSelecionados.length) {
        alert('Adicione pelo menos um hóspede');
        return false;
      }

      return true;
    },
    formatarData(data) {
      const [year, month, day] = data.split('-');
      return `${day}-${month}-${year}`;
    },
    async handleForm() {
      try {
        if (!this.validarInputs()) return;
        await reservaService.cadastrar({
          numero_reserva: Number(this.numero_reserva),
          data_checkin: this.data_checkin,
          data_checkout: this.data_checkout,
          status: this.status,
          hospedes: this.hospedesSelecionados.map((hospede) => hospede.id)
        });
        alert('Reserva cadastrada com sucesso!');
      } catch (error) {
        console.log(error);
        alert('Erro ao cadastrar reserva!');
      }
    }
  },
  async mounted() {
    await this.fetchHospedes();
  }
};
</script>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  margin-bottom: 32px;
  text-align: center;
}

.container-input {
  margin-bottom: 16px;
}

.container-input label {
  display: block;
  margin-bottom: 8px;
}

.container-input input,
.container-input select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.btn-submit {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #0056b3;
}

.btn-add-hospede {
  padding: 12px;
}
</style>
