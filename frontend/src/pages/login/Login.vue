<template>
  <div class="login-container">
    <h1>Login Admin</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="E-mail" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <button type="submit">Entrar</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { login } from '@/services/authService'

const email = ref('')
const password = ref('')
const error = ref('')

async function handleLogin() {
  try {
    const token = await login(email.value, password.value)
    localStorage.setItem('jwt', token)
    window.location.href = '/admin/dashboard' // ou navegação via router
  } catch (e: any) {
    error.value = e.response?.data?.error || 'Erro ao fazer login'
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
}
.error {
  color: red;
}
</style>
