<template>
  <header class="admin-header">
    <button class="menu-button" @click="$emit('toggleSidebar')">
      ☰
    </button>

    <div class="right-menu">
      <button class="logout-button" @click="handleLogout">
        🚪 Sair
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { logout } from '@/services/authentication-service'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleLogout() {
  logout()
  router.push('/admin/login')
}
</script>

<style scoped>
.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.menu-button {
  background: none;
  border: none;
  font-size: 24px;
  margin-right: 20px;
  cursor: pointer;
  color: #a33861;
}

.right-menu {
  display: flex;
  align-items: center;
}

.logout-button {
  background: none;
  border: none;
  font-size: 18px;
  color: #c94f7c;
  cursor: pointer;
  transition: color 0.3s;
}

.logout-button:hover {
  color: #a33861;
}
</style>
