<template>
  <div class="admin-layout">
    <AdminSidebar :collapsed="collapsed" />

    <div class="main-content">
      <AdminHeader @toggleSidebar="toggleSidebar" />

      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AdminHeader from '@/components/admin/Header.vue'
import AdminSidebar from '@/components/admin/Sidebar.vue'

const collapsed = ref(false)

function toggleSidebar() {
  collapsed.value = !collapsed.value
}

function handleResize() {
  collapsed.value = window.innerWidth < 768
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f8f8f8;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

main {
  padding: 20px;
}
</style>
