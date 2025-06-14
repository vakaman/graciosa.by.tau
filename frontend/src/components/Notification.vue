<template>
  <div class="notifications">
    <div 
      v-for="(notif, index) in notifications" 
      :key="index"
      :class="['notification', notif.type]"
    >
      {{ notif.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { notifications, removeNotification } from '@/services/notificationService'

let interval: number

onMounted(() => {
  interval = setInterval(() => {
    removeNotification()
  }, 5000)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<style scoped>
.notifications {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.notification {
  padding: 15px 25px;
  border-radius: 8px;
  color: white;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  font-weight: bold;
  min-width: 250px;
  transition: all 0.3s ease;
}

.notification.success { background-color: #28a745; }
.notification.error { background-color: #dc3545; }
</style>
