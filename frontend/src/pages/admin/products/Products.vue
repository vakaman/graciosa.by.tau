<template>
  <div class="products-page">
    <h1>Gerenciamento de Produtos</h1>

    <div class="actions">
      <button v-if="!isCreating" @click="isCreating = true">Novo Produto</button>
      <button v-else @click="isCreating = false">Voltar</button>
    </div>

    <transition name="fade" mode="out-in">
      <div v-if="!isCreating" key="list" class="products-list">
        <p>(Em breve listaremos os produtos)</p>
      </div>

      <div v-else key="form" class="product-form">
        <h2>Novo Produto</h2>
        <form @submit.prevent="submitForm">
          <div>
            <label>Nome:</label>
            <input v-model="productName" type="text" placeholder="Nome do Produto" required />
          </div>

          <div>
            <label>Descrição:</label>
            <textarea v-model="productDescription" placeholder="Descrição" required></textarea>
          </div>

          <div>
            <label>Categoria:</label>
            <select v-model="productCategoryId" required>
              <option disabled value="">Selecione uma categoria</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>

          <button type="submit">Salvar Produto</button>
        </form>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const isCreating = ref(false)

// Estados do formulário
const productName = ref('')
const productDescription = ref('')
const productCategoryId = ref<number | null>(null)
const categories = ref<{ id: number; name: string }[]>([])

// Simula chamada backend (depois conectamos no backend real)
async function fetchCategories() {
  // Substituir depois por: await axios.get('/api/categories')
  categories.value = [
    { id: 1, name: 'Vestidos' },
    { id: 2, name: 'Blusas' },
    { id: 3, name: 'Calças' }
  ]
}

async function submitForm() {
  alert(`Produto "${productName.value}" cadastrado!`)

  // Limpa o form
  productName.value = ''
  productDescription.value = ''
  productCategoryId.value = null
  isCreating.value = false
}

onMounted(() => {
  fetchCategories()
})
</script>

<style scoped>
.products-page {
  padding: 20px;
}

.actions {
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: #c94f7c;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 10px;
}

.products-list p {
  color: #666;
}

.product-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  max-width: 500px;
}

.product-form input,
.product-form textarea,
.product-form select {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

.product-form button {
  width: 100%;
  background-color: #a33861;
}

/* Transição suave */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
