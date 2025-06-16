<template>
  <div class="product-manage-page">
    <h1>Gerenciar Produto</h1>

    <div v-if="product">
      <h2>{{ product.name }}</h2>
      <p><strong>Descrição:</strong> {{ product.description }}</p>
      <p><strong>Categoria:</strong> {{ getCategoryName(product.categoryId) }}</p>
    </div>

    <h3>Variações</h3>

    <table v-if="product?.variants?.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Cor</th>
          <th>Tamanho</th>
          <th>SKU</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="variant in product.variants"
          :key="variant.id"
          @click="goToVariantManagement(variant.id)"
          class="clickable-row"
        >
          <td>{{ variant.id }}</td>
          <td>{{ variant.color }}</td>
          <td>{{ variant.size }}</td>
          <td>{{ variant.sku }}</td>
        </tr>
      </tbody>
    </table>

    <div v-else>
      <p>Nenhuma variação cadastrada.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProductDetails, type ProductWithVariants } from '@/services/product.service'
import { getCategories, type Category } from '@/services/category-service'

const route = useRoute()
const router = useRouter()

const product = ref<ProductWithVariants | null>(null)
const categories = ref<Category[]>([])

async function loadData() {
  const productId = parseInt(route.params.productId as string)
  product.value = await getProductDetails(productId)
  categories.value = await getCategories()
}

function getCategoryName(categoryId: number): string {
  const category = categories.value.find(c => c.id === categoryId)
  return category ? category.name : 'N/A'
}

function goToVariantManagement(variantId: number) {
  const productId = parseInt(route.params.productId as string)
  router.push(`/admin/products/${productId}/variant/${variantId}/manage`)
}

onMounted(loadData)
</script>

<style scoped>
.product-manage-page {
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

tr.clickable-row {
  cursor: pointer;
  transition: background-color 0.2s;
}

tr.clickable-row:hover {
  background-color: #f3f3f3;
}
</style>
