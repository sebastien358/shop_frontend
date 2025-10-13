<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useAuthStore } from '@/stores/authStore.ts'
import AlertMessage from '@/templates/alertMessage/AlertMessage.vue'
import { ref } from 'vue'

const authStore = useAuthStore()

const MESSAGES = {
  SUCCESS_REGISTER: 'Inscription réussie',
  INVALID_CREDENTIALS: 'l\'inscription a échouée',
  EMAIL_FOUND: "Un compte existe avec cet email"
}

const successMessage = ref('')
const errorMessage = ref('')

const schema = z.object({
  email: z
    .string({ message: 'Email requis' }).email(),
  password: z
    .string({ message: 'Mot de passe requis' }),
  passwordConfirm: z
    .string({ message: 'Confirmation de mot de passe requise' })
    .refine((value) => value === password.value, {
      message: 'Les mots de passe ne correspondent pas'
    })
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema)
})

const { value: email, errorMessage: errorEmail } = useField<string>('email')
const { value: password, errorMessage: errorPassword } = useField<string>('password')
const { value: passwordConfirm, errorMessage: errorPasswordConfirm} = useField<string>('passwordConfirm')

const onSubmit = handleSubmit(async(dataRegister, {resetForm}) => {
  try {
    const response = await authStore.emailExistingRegister(dataRegister)
    if (response.exists) {
      setErrorMessage('Un compte existe avec cet email')
    } else {
      const response = await authStore.register(dataRegister)
      setErrorMessage(MESSAGES.EMAIL_FOUND)
      if (response) {
        setSuccessMessage(MESSAGES.SUCCESS_REGISTER, resetForm)
      } else {
        setErrorMessage(MESSAGES.INVALID_CREDENTIALS)
      }
    }
  } catch(e) {
    console.error(e)
  }
})

let reset = () => {}

function setSuccessMessage(message: string, resetForm: () => void) {
  successMessage.value = message
  reset = resetForm
}

function setErrorMessage(message: string) {
  errorMessage.value = message
}

function closeAlert() {
  successMessage.value = ''
  errorMessage.value = ''
}

function handleResetForm() {
  closeAlert()
  reset()
}
</script>

<template>
  <div class="d-flex align-items-center justify-content-center register">
    <div class="container-form">
      <form @submit.prevent="onSubmit">
        <div class="d-flex flex-column form-group">
          <label for="email">Email</label>
          <input v-model="email" type="text" />
          <span v-if="errorEmail" class="errorField">
            {{ errorEmail }}
          </span>
        </div>
        <div class="d-flex flex-column">
          <label for="password">Mot de passe</label>
          <input v-model="password" type="password" />
          <span v-if="errorPassword" class="errorField">
          {{ errorPassword }}
          </span>
        </div>
        <div class="d-flex flex-column">
          <label for="password">Mot de passe</label>
          <input v-model="passwordConfirm" type="password" />
          <span v-if="errorPasswordConfirm" class="errorField">
          {{ errorPasswordConfirm }}
          </span>
        </div>
        <div class="text-center">
          <AlertMessage
            v-if="successMessage"
            :message="successMessage"
            type="success"
            @close="handleResetForm"
          />
          <AlertMessage
            v-if="errorMessage"
            :message="errorMessage"
            type="error"
            @close="closeAlert()"
          />
        </div>
        <button class="btn btn-primary" :disabled="isSubmitting">
          Soumettre
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.register {
  height: 100%;
}
</style>
