<template>
  <div class="dashboard">
    <h1>Bem-vindo(a) ao Painel Graciosa By Tau!</h1>

    <div class="cards">
      <div class="card">
        <h3>Pedidos de Hoje</h3>
        <p>12</p>
      </div>

      <div class="card">
        <h3>Produtos Ativos</h3>
        <p>254</p>
      </div>

      <div class="card">
        <h3>Clientes Ativos</h3>
        <p>87</p>
      </div>

      <div class="card">
        <h3>Vendas do Mês</h3>
        <p>R$ 18.750,00</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// (por enquanto vazio, depois vamos puxar dados reais)
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

h1 {
  margin-bottom: 30px;
  color: #333;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.card h3 {
  margin-bottom: 10px;
  color: #c94f7c;
}

.card p {
  font-size: 24px;
  font-weight: bold;
}
</style>
