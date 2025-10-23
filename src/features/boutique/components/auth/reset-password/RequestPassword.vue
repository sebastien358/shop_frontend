<script setup lang="ts">
import AlertMessage from '@/templates/alertMessage/AlertMessage.vue'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useAuthStore } from '@/stores/authStore.ts'
import { ref } from 'vue'
import * as z from 'zod'

const authStore = useAuthStore()

const schema = z.object({
  email: z
  .string({message: 'Veuillez renseigner votre adresse e-mail'})
  .email({message: 'L\'email n\'est pas valide'})
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema)
})

const { value: email, errorMessage: errorEmail } = useField('email')

const MESSAGES = {
  SUCCESS_EMAIL: 'Vous avez reçu un email de réinitialisation de mot de passe',
  ERROR_EMAIL_NOT_SENT: 'Erreur lors de l\'envoi de l\'email',
  ERROR_INVALID_EMAIL: 'Adresse email invalide',
  EMAIL_NOT_FOUND: "Aucun compte n'existe avec cet email"
}

const onSubmit = handleSubmit(async (dataRequestPassword, {resetForm}) => {
  try {
    const response = await authStore.emailExistingRequestPassword(dataRequestPassword)
    if (!response.exists) {
      setErrorMessage(MESSAGES.EMAIL_NOT_FOUND)
    } else {
      const response = await authStore.requestPassword(dataRequestPassword)
      if (response) {
        setSuccessMessage(MESSAGES.SUCCESS_EMAIL, resetForm)
      } else {
        setErrorMessage(MESSAGES.ERROR_INVALID_EMAIL)
      }
    }
  } catch(e) {
    setErrorMessage(MESSAGES.ERROR_EMAIL_NOT_SENT)
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
</script>

<template>
  <div class="d-flex align-items-center justify-content-center request-password">
    <!-- Form request password -->
    <div class="container-form">
      <form @submit.prevent="onSubmit">
        <div class="d-flex flex-column form-group">
          <label for="email">Email</label>
          <input v-model="email" type="text" name="email" />
          <span v-if="errorEmail" class="error-field">{{ errorEmail }}</span>
        </div>
        <!-- Gestion messages de la validations -->
        <div class="text-center">
          <AlertMessage v-if="successMessage" :message="successMessage" type="success" redirectTo="" @close="handleResetForm()" class="alert-message" />
          <AlertMessage v-if="errorMessage" :message="errorMessage" type="error" redirectTo="" @close="closeAlert()" class="alert-message" />
        </div>
        <button class="btn btn-primary" :disabled="isSubmitting">Réinitialiser le mot de passe</button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.request-password {
  height: 100%;
  padding: 10px;
}

.container-form {
  width: 100%;
  max-width: 500px;
  padding: 15px 10px 10px 10px;
  button {
    margin-top: 5px;
    font-size: 10px;
  }
  .form-group {
    input {
      border: var(--border);
      border-radius: var(--border-radius);
      outline: none;
    }
    label {
      margin-bottom: 4px;
    }
  }
  .alert-message {
    margin-top: 10px;
    margin-bottom: 5px;
  }
}
</style>