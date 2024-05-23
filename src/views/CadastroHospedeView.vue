<template>
  <main>
    <section class="container">
      <h1>Cadastro de Hóspede</h1>
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
        <button class="btn-submit" type="submit">Cadastrar</button>
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
        await hospedeService.cadastrar({
          nome: this.nome,
          endereco: this.endereco,
          email: this.email,
          telefone: this.telefone
        });
        alert('Hóspede cadastrado com sucesso!');
      } catch (error) {
        alert('Erro ao cadastrar hóspede!');
      }
    }
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
</style>