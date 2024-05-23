<template>
  <main>
    <section class="container">
      <h1>Atualizar Hóspede</h1>
      <form @submit.prevent="handleForm">
        <div class="container-input">
          <label>
            Nome
          </label>
          <input type="text" id="nome" name="nome" v-model="nome" />
        </div>
        <div class="container-input">
          <label>
            Endereço
          </label>
          <input type="text" id="endereco" name="endereco" v-model="endereco" />
        </div>
        <div class="container-input">
          <label>
            Telefone
          </label>
          <input type="text" id="telefone" name="telefone" v-model="telefone" />
        </div>
        <div class="container-input">
          <label>
            Email
          </label>
          <input type="text" id="email" name="email" v-model="email" />
        </div>
        <button class="btn-submit" type="submit">Atualizar</button>
      </form>
    </section>
  </main>
</template>

<script>
import hospedeService from '@/service/hospede.service';
export default {
  data() {
    return {
      nome: null,
      endereco: null,
      email: null,
      telefone: null
    };
  },
  async mounted() {
    const hospede = await this.listarHospedeId();
    this.nome = hospede.nome;
    this.endereco = hospede.endereco;
    this.email = hospede.email;
    this.telefone = hospede.telefone;
  },
  methods: {
    validarInputs() {
      if (!this.nome || this.nome === '') {
        alert('Nome obrigatório');
        return false;
      }

      if (!this.endereco || this.endereco === '') {
        alert('Endereço obrigatório');
        return false;
      }

      if (!this.email || this.email === '') {
        alert('Email obrigatório');
        return false;
      }

      if (!this.telefone || this.telefone === '') {
        alert('Telefone obrigatório');
        return false;
      }

      return true;
    },
    async handleForm() {
      try {
        if (!this.validarInputs()) return;
        await hospedeService.atualizarId(this.$route.params.id, {
          nome: this.nome,
          endereco: this.endereco,
          email: this.email,
          telefone: this.telefone
        });
        alert('Hóspede atualizado com sucesso!');
      } catch (error) {
        alert('Erro ao atualizar hóspede!');
      }
    },

    async listarHospedeId() {
      try {
        const hospede = await hospedeService.listarId(this.$route.params.id)
        return hospede.data[0];
      } catch (error) {
        alert('Erro ao buscar hóspede!')
      }
    }
  }
};
</script>

<style scoped>
  main {
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
  }

  h1 {
    margin-bottom: 32px;
    text-align: center;
  }
</style>