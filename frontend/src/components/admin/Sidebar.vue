<template>
  <aside :class="{ collapsed: collapsed }">
    <div v-if="!collapsed" class="logo">
      <img src="/logo-graciosa.png" alt="Logo" />
    </div>

    <nav v-if="!collapsed">
      <div
        v-for="section in menu"
        :key="section.label"
        class="menu-section"
      >
        <div class="menu-title" @click="toggleSection(section.label)">
          {{ section.label }}
          <span class="arrow" :class="{ open: openSections.includes(section.label) }">▾</span>
        </div>

        <transition name="submenu-fade">
          <div v-if="openSections.includes(section.label)" class="submenu">
            <router-link
              v-for="item in section.items"
              :key="item.path"
              :to="item.path"
              class="menu-item"
              active-class="active"
            >
              {{ item.label }}
            </router-link>
          </div>
        </transition>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ collapsed: boolean }>()

const openSections = ref<string[]>([])

function toggleSection(sectionLabel: string) {
  if (openSections.value.includes(sectionLabel)) {
    openSections.value = openSections.value.filter(label => label !== sectionLabel)
  } else {
    openSections.value.push(sectionLabel)
  }
}

const menu = [
  {
    label: 'Dashboard',
    items: [
      { label: 'Início', path: '/admin/dashboard' }
    ]
  },
  {
    label: 'Produtos',
    items: [
      { label: 'Listar Produtos', path: '/admin/products' },
      { label: 'Categorias', path: '/admin/products/categories' },
      { label: 'Variantes', path: '/admin/products/variants' },
      { label: 'Estoque', path: '/admin/products/stocks' }
    ]
  },
  {
    label: 'Compras',
    items: [
      { label: 'Fornecedores', path: '/admin/purchases/suppliers' },
      { label: 'Pedidos de Compra', path: '/admin/purchases/orders' }
    ]
  },
  {
    label: 'Usuários',
    items: [
      { label: 'Gerenciar Usuários', path: '/admin/users' }
    ]
  }
]
</script>

<style scoped>
aside {
  width: 250px;
  background-color: #efc7c7;
  padding: 20px;
  transition: all 0.3s ease;
}

aside.collapsed {
  width: 0;
  padding: 0;
  overflow: hidden;
}

.logo img {
  width: 100%;
  margin-bottom: 30px;
}

.menu-section {
  margin-bottom: 10px;
}

.menu-title {
  font-weight: bold;
  margin-bottom: 8px;
  color: #a33861;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 8px 4px;
}

.arrow {
  transition: transform 0.3s ease;
}

.arrow.open {
  transform: rotate(180deg);
}

.submenu {
  padding-left: 10px;
  margin-bottom: 10px;
}

.menu-item {
  display: block;
  margin: 6px 0;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: 0.3s;
}

.menu-item:hover {
  color: #c94f7c;
}

.menu-item.active {
  color: #c94f7c;
  text-decoration: underline;
}

/* Animação suave do submenu */
.submenu-fade-enter-active,
.submenu-fade-leave-active {
  transition: all 0.3s ease;
}

.submenu-fade-enter-from,
.submenu-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
