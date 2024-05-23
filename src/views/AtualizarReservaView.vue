<template>
  <main>
    <section class="container">
      <h1>Atualizar Reserva</h1>
      <form @submit.prevent="handleForm">
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
        <button class="btn-submit" type="submit">Atualizar</button>
      </form>
    </section>
  </main>
</template>

<script>
import reservaService from '@/service/reserva.service';
import moment from 'moment';

export default {
  data() {
    return {
      data_checkin: null,
      data_checkout: null,
      status: null,
    };
  },
  methods: {
    validarInputs() {
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

      return true;
    },
    async fetchReserva() {
      try {
        const {data} = await reservaService.listarId(this.$route.params.id);
        if (data.length) {
          this.data_checkin = moment(data[0].data_checkin).format('YYYY-MM-DD');
          this.data_checkout = moment(data[0].data_checkout).format('YYYY-MM-DD');
          this.status = data[0].status;
        }
        return data;
      } catch (error) {
        alert('Erro ao buscar reserva!')
      }
    },
    async handleForm() {
      try {
        if (!this.validarInputs()) return;
        await reservaService.atualizarId(this.$route.params.id, {
          data_checkin: this.data_checkin,
          data_checkout: this.data_checkout,
          status: this.status,
        });
        alert('Reserva atualizada com sucesso!');
      } catch (error) {
        console.log(error);
        alert('Erro ao atualizar reserva!');
      }
    }
  },
  async mounted() {
    await this.fetchReserva();
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
</style>
