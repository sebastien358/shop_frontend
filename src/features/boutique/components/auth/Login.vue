<script setup lang="ts">
import AlertMessage from '@/templates/alertMessage/AlertMessage.vue'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useAuthStore } from '@/stores/authStore.ts'
import * as z from 'zod'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()

const router = useRouter()

const schema = z.object({
  email: z
    .string({ message: 'Email requis' }).email(),
  password: z
    .string({ message: 'Mot de passe requis' })
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema)
})

const { value: email, errorMessage: errorEmail } = useField('email')
const { value: password, errorMessage: errorPassword } = useField('password')

const onSubmit = handleSubmit(async (dataLogin, {resetForm}) => {
  try {
    const response = await authStore.emailExistingLogin(dataLogin)
    if (response.exists) {
      await authStore.login(dataLogin)
      const isLoggedIn = authStore.isLoggedIn
      if (isLoggedIn) {
        setSuccessMessage('Vos êtes connecté', resetForm)
        router.push({ path: '/boutique' })
      } else {
        setErrorMessage('Identifiant ou mot de passe invalid')
      }
    } else {
      setErrorMessage('Aucun compte n\'existe avec cet email')
    }
  } catch(e) {
    console.error(e)
  }
})

const successMessage = ref('')
const errorMessage = ref('')

function setSuccessMessage(message: string, resetForm: () => void) {
  successMessage.value = message
  resetForm()
}

function setErrorMessage(message: string) {
  errorMessage.value = message
}

function closeAlert() {
  successMessage.value = ''
  errorMessage.value = ''
}
</script>

<template>
  <div class="d-flex align-items-center justify-content-center login">
    <div class="container-form">
      <form @submit.prevent="onSubmit">
        <div class="d-flex flex-column form-group">
          <label for="email">Email</label>
          <input v-model="email" type="text" />
          <span v-if="errorEmail" class="error-field">
            {{ errorEmail }}
          </span>
        </div>
        <div class="d-flex flex-column">
          <label for="password">Mot de passe</label>
          <input v-model="password" type="password" />
          <span v-if="errorPassword" class="error-field">
            {{ errorPassword }}
          </span>
        </div>
        <div class="text-center">
          <AlertMessage v-if="successMessage" :message="successMessage" type="success" @close="closeAlert()" />
          <AlertMessage v-if="errorMessage" :message="errorMessage" type="error" @close="closeAlert()" />
        </div>
        <button class="btn btn-primary" :disabled="isSubmitting">
          Soumettre
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  height: 100%;
}
</style>
