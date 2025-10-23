<script setup lang="ts">
import AlertMessage from '@/templates/alertMessage/AlertMessage.vue'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useAuthStore } from '@/stores/authStore.ts'
import { ref } from 'vue'
import * as z from 'zod'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()

const route = useRoute()
const token = ref('')

if (route.params.token) {
  token.value = route.params.token
}

const schema = z.object({
  password: z
    .string({message: 'Veuillez renseigner votre nouveau mot de passe'}),
  confirmPassword: z
    .string({message: 'Veuillez renseigner le mot de passe de confirmation'})
    .refine((value) => value === password.value, {
      message: 'Les mots de passe ne correspondent pas',
      path: ['confirmPassword']
    })
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema)
})

const { value: password, errorMessage: errorPassword } = useField('password')
const { value: confirmPassword, errorMessage: errorConfirmPassword} = useField('confirmPassword')

const MESSAGES = {
  SUCCESS_RESET_PASSWORD: 'Le mot de passe a été modifié',
  ERROR_RESET_PASSWORD: 'Une erreur est survenue lors de la modification du mot de passe'
}

const onSubmit = handleSubmit(async (dataResetPassword, {resetForm}) => {
  try {
    const response = await authStore.resetPassword(dataResetPassword, token.value)
    if (response) {
      setSuccessMessage(MESSAGES.SUCCESS_RESET_PASSWORD, resetForm)
    } else {
      setErrorMessage(MESSAGES.ERROR_RESET_PASSWORD)
    }
  } catch(e) {
    console.error(e)
  }
})

const successMessage = ref<string>('')
const errorMessage = ref<string>('')

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

const fields = [
  {label: 'Mot de passe', for: 'Mot de passe', type: 'password', name: 'password', value: password, errorMessage: errorPassword},
  {label: 'Confirmation de mot passe', for: 'Confirmation de mot passe', type: 'password', name: 'confirmPassword', value: confirmPassword, errorMessage: errorConfirmPassword}
]
</script>

<template>
  <div class="d-flex align-items-center justify-content-center reset-password">
      <!-- Form reset password -->
    <div class="container-form">
      <h3>Modification du mot de passe</h3>
      <form @submit.prevent="onSubmit">
        <div v-for="(field, index) in fields" :key="index">
          <div class="d-flex flex-column form-group">
            <label :for="field.for">{{ field.label }}</label>
            <input v-model="field.value.value" :type="field.type" :name="field.name" />
            <span v-if="field.errorMessage" class="error-field">{{ field.errorMessage }}</span>
          </div>
        </div>
        <!-- Gestion messages de la validations -->
        <div class="text-center">
          <AlertMessage v-if="successMessage" :message="successMessage" type="success" redirectTo="/login" @close="handleResetForm()" class="alert-message" />
          <AlertMessage v-if="errorMessage" :message="errorMessage" type="error" redirectTo="" @close="closeAlert()" class="alert-message" />
        </div>
        <button class="btn btn-primary" :disabled="isSubmitting">Soumettre</button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.reset-password {
  height: 100%;
  padding: 10px;
}

.container-form {
  padding: 20px 10px 10px 10px;
  width: 100%;
  max-width: 500px;
  h3 {
    text-align: center;
    margin-bottom: 25px;;
  }
  button {
    margin-top: 5px;
    font-size: 11px;
  }
  .alert-message {
    margin-top: 10px;
    margin-bottom: 5px;
  }
  .form-group {
    margin-top: 15px;
    input {
      border: var(--border);
      border-radius: var(--border-radius);
      outline: none;
    }
    label {
      margin-bottom: 4px;
    }
  }
}
</style>
