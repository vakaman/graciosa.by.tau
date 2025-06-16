<template>
  <div class="login-container">
    <div class="login-card">
      <img src="/logo-graciosa.png" alt="Graciosa By Tau" class="logo" />

      <Transition name="fade-slide" mode="out-in">

        <form v-if="!isRecoveryMode" key="login" @submit.prevent="handleLogin">
          <input v-model="email" type="email" placeholder="E-mail" required />
          <input v-model="password" type="password" placeholder="Senha" required />
          <button type="submit">Entrar</button>

          <div class="forgot-password">
            <a href="#" @click.prevent="isRecoveryMode = true">Esqueceu a senha?</a>
          </div>

          <div v-if="error" class="error">{{ error }}</div>
        </form>

        <form v-else key="recover" @submit.prevent="submitRecovery">
          <h3>Recuperar Senha</h3>

          <div v-if="!recoverySent">
            <input v-model="recoveryEmail" type="email" placeholder="Seu e-mail" required />
            <button type="submit">Enviar link</button>
          </div>

          <div v-else class="success-message">
            Se o e-mail informado existir, você receberá o link de recuperação em breve.
          </div>

          <div class="forgot-password">
            <a href="#" @click.prevent="cancelRecovery">Voltar ao login</a>
          </div>
        </form>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { login } from '@/services/authentication-service'

const email = ref('')
const password = ref('')
const error = ref('')
const isRecoveryMode = ref(false)
const recoveryEmail = ref('')
const recoverySent = ref(false)

async function handleLogin() {
  try {
    const token = await login(email.value, password.value)
    localStorage.setItem('jwt', token)
    window.location.href = '/admin/dashboard'
  } catch (e: any) {
    error.value = e.response?.data?.error || 'Erro ao fazer login'
  }
}

async function submitRecovery() {
  try {
    await axios.post('/api/auth/recover', { email: recoveryEmail.value })
    recoverySent.value = true
  } catch (e: any) {
    alert('Erro ao tentar enviar recuperação.')
  }
}

function cancelRecovery() {
  isRecoveryMode.value = false
  recoverySent.value = false
  recoveryEmail.value = ''
}
</script>

<style scoped>
/* Container principal */
.login-container {
  background-color: #fdecef;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Card central */
.login-card {
  background: white;
  padding: 40px 40px;
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

/* Logo */
.logo {
  width: 220px;
  margin-bottom: 40px;
}

/* Inputs */
form input {
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
}

/* Botões */
form button {
  width: 100%;
  padding: 15px;
  background-color: #c94f7c;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  transition: 0.3s;
  cursor: pointer;
}

form button:hover {
  background-color: #a33861;
}

/* Link de recuperação */
.forgot-password {
  margin-top: 10px;
}

.forgot-password a {
  color: #c94f7c;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
}

/* Mensagem de sucesso */
.success-message {
  color: #28a745;
  font-weight: bold;
  margin-top: 20px;
}

/* Mensagem de erro */
.error {
  margin-top: 15px;
  color: #d9534f;
  font-weight: bold;
}

/* Transição suave entre formulários */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
