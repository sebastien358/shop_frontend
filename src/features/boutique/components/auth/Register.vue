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
    .string({ message: 'Email requis' })
    .email({message: 'L\'email n\'est pas valide'}),
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

const fields = [
  { label: 'Email', type: 'text', value: email, errorMessage: errorEmail },
  { label: 'Mot de passe', type: 'password', value: password, errorMessage: errorPassword },
  { label: 'Confirmation de mot de passe', type: 'password', value: passwordConfirm, errorMessage: errorPasswordConfirm }
]
</script>

<template>
  <div class="d-flex align-items-center justify-content-center register">
    <!-- Formulaire de crétion d'un utlisateur -->
    <div class="container-form">
      <h3>S'inscrire</h3>
      <form @submit.prevent="onSubmit">
        <div v-for="(field, index) in fields" :key="index">
          <div class="d-flex flex-column form-group">
            <label>{{ field.label }}</label>
            <input v-model="field.value.value" :type="fields.type" />
          </div>
          <span v-if="field.errorMessage" class="error-field">
            {{ field.errorMessage }}
          </span>
        </div>
        <!-- Gestion messages de validations -->
        <div class="text-center">
          <AlertMessage v-if="successMessage" :message="successMessage" type="success" redirectTo="" @close="handleResetForm()" class="alert-message" />
          <AlertMessage v-if="errorMessage" :message="errorMessage" type="error" redirectTo="" @close="closeAlert()" class="alert-message" />
        </div>
        <div class="d-flex align-items-center space-between container-button">
          <button class="btn btn-primary" :disabled="isSubmitting">Soumettre</button>
          <router-link to="/login" class="router-login">Vous avez un compte?</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.register {
  height: 100%;
  padding: 10px;
  .container-form {
    max-width: 440px;
    padding: 22px 15px 10px 15px;
    h3 {
      text-align: center
    }
    .alert-message {
      margin: 10px 0 4px 0;
    }
    .form-group {
      margin-top: 15px;
    }
    label {
      margin-bottom: 3px;
      font-size: 12px;
    }
    input {
      padding: 9px;
      border: var(--border);
      border-radius: var(--border-radius);
    }
    button {
      margin-top: 6px;
    }
  }
  .container-button {
    margin-top: 6px;
    .router-login {
      font-size: 11px;
      text-decoration: underline;
      color: var(--gray-3);
      transition: all 150ms ease;
    }
    .router-login {
      &:hover {
        color: var(--success-2);
      }
    }
  }
}
</style>
