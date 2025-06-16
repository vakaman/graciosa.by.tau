<template>
  <div class="variant-manage-page">
    <h1>Gerenciar Variação</h1>

    <div v-if="variant">
      <h2>ID: {{ variant.id }}</h2>
      <p><strong>Cor:</strong> {{ variant.color }}</p>
      <p><strong>Tamanho:</strong> {{ variant.size }}</p>
      <p><strong>SKU:</strong> {{ variant.sku }}</p>

      <h3>Informações de Preço (Compra, Venda, Lote...)</h3>

      <div v-if="variant.prices && variant.prices.length">
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Fornecedor</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="price in variant.prices" :key="price.id">
              <td>{{ price.type }}</td>
              <td>R$ {{ formatPrice(price.valueInCents) }}</td>
              <td>{{ price.supplierName }}</td>
              <td>{{ formatDate(price.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else>
        <p>Ainda não há preços cadastrados.</p>
      </div>
    </div>

    <div v-else>
      <p>Carregando dados da variação...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getVariantDetails, type VariantDetails } from '@/services/product.service'

const route = useRoute()
const variant = ref<VariantDetails | null>(null)

async function loadData() {
  const productId = parseInt(route.params.productId as string)
  const variantId = parseInt(route.params.variantId as string)
  variant.value = await getVariantDetails(productId, variantId)
}

function formatPrice(valueInCents: number): string {
  return (valueInCents / 100).toFixed(2)
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

onMounted(loadData)
</script>

<style scoped>
.variant-manage-page {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>
