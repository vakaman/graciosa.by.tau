import { reactive } from 'vue'

interface Notification {
  message: string
  type: 'success' | 'error'
}

export const notifications = reactive<Notification[]>([])

export function notifySuccess(message: string) {
  notifications.push({ message, type: 'success' })
}

export function notifyError(message: string) {
  notifications.push({ message, type: 'error' })
}

export function removeNotification() {
  if (notifications.length > 0) {
    notifications.shift()
  }
}
