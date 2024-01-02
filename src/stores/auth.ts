import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const username = ref("")

  function setUsername(value: string) {
    username.value = value
  }

  return { username, setUsername }
})
