<template>
  <header class="header">
    <div class="container-header">
      <h1 class="title">Sistema de Reservas</h1>
      <nav class="nav">
        <ul>
          <li><router-link to="/">Listar Reservas</router-link></li>
          <li><router-link to="/cadastro-reserva">Cadastrar Reserva</router-link></li>
          <li><router-link to="/lista-hospedes">Listar Hóspedes</router-link></li>
          <li><router-link to="/cadastro-hospede">Cadastrar Hóspedes</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<style scoped>
.header {
  background-color: #007bff;
  color: white;
  padding: 20px 0;
  margin-bottom: 56px;
}

.container-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 20px;
}

.title {
  margin: 0;
  font-size: 1.5rem;
}

.nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.nav ul li {
  display: inline;
  gap: 20px;
}

.nav a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 700;
}

.nav a:hover {
  text-decoration: underline;
}


</style>
