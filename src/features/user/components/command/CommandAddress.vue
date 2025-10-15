<script setup lang="ts">
import CommandProgress from '@/templates/commandProgress/CommandProgress.vue'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import AlertMessage from '@/templates/alertMessage/AlertMessage.vue'
import { ref } from 'vue'
import { useCommandUserStore } from '@/stores/user/commandUserStore.ts'

const commandUserStore = useCommandUserStore()

const MESSAGES = {
  SUCCESS_ADDRESS: 'Vos données ont bien été enregistrées',
  INVALID_CREDENTIALS: 'Vos données n\'ont pas pu être enregistrées',
}

const schema = z.object({
  firstName: z
    .string({ message: 'Le prénom est requis' }),
  lastName: z
    .string({ message: 'Le nom est requis' }),
  address: z
    .string({ message: 'L\'adresse est requise' }),
  zipCode: z
    .string({ message: 'Le code postal est requis' })
    .regex(/^\d{5}$/, { message: 'Le code postal doit être composé de 5 chiffres' }),
  addressComplement: z.string().optional(),
  city: z
    .string({ message: 'La ville est requise'  }),
  phoneNumber: z
    .string({ message: 'Le numéro de téléphone est requis' })
    .regex(/^0\d{9}$/, { message: 'Le numéro de téléphone doit être composé de 10 chiffres et commencer par 0' }),
  country: z
    .string( {message: 'Le pays est requis'})
})

const { handleSubmit, isSubmitting  } = useForm({
  validationSchema: toTypedSchema(schema)
})

const { value: firstName, errorMessage: errorFirstName } = useField('firstName')
const { value: lastName, errorMessage: errorLastName } = useField('lastName')
const { value: address, errorMessage: errorAddress } = useField('address')
const { value: zipCode, errorMessage: errorZipCode } = useField('zipCode')
const { value: addressComplement, errorMessage: errorAddressComplement } = useField('addressComplement')
const { value: city, errorMessage: errorCity } = useField('city')
const { value: phoneNumber, errorMessage: errorPhoneNumber } = useField('phoneNumber')
const { value: country, errorMessage: errorCountry } = useField('country')

const currentStep = ref<number>(2)

const onSubmit = handleSubmit(async (dataAddress, {resetForm}) => {
  try {
    const response = await commandUserStore.addCommandAddress(dataAddress)
    if (response) {
      setSuccessMessage(MESSAGES.SUCCESS_ADDRESS, resetForm)
      currentStep.value = 3
    } else {
      setErrorMessage(MESSAGES.INVALID_CREDENTIALS)
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

function closeFields() {
  successMessage.value = ''
  errorMessage.value = ''
}

function handleResetForm() {
  closeFields()
  reset()
}
</script>

<template>
  <div class="d-flex justify-content-center address">
    <!-- Command Progress -->
    <div class="#">
      <CommandProgress :currentStep="currentStep" />
      <!-- Container -->
      <div class="container">
        <!-- Form Command -->
        <h2>Adresse de livraison</h2>
        <!-- Form Address -->
        <div class="container-form">
          <form @submit.prevent="onSubmit">
            <div class="d-flex align-items-center form-column">
              <div class="d-flex flex-column form-group" >
                <label class="label-firstname">Prénom</label>
                <input v-model="firstName" type="text" />
                <span v-if="errorFirstName" class="error-field">
                  {{ errorFirstName }}
                </span>
              </div>
              <div class="d-flex flex-column form-group" >
                <label>Nom</label>
                <input v-model="lastName" type="text" />
                <span v-if="errorLastName" class="error-field">
                  {{ errorLastName }}
                </span>
              </div>
            </div>
            <div class="d-flex align-items-center form-column">
              <div class="d-flex flex-column form-group" >
                <label class="label-address">Adresse (numéro et rue)</label>
                <input v-model="address" type="text" />
                <span v-if="errorAddress" class="error-field">
                  {{ errorAddress }}
                </span>
              </div>
              <div class="d-flex flex-column form-group">
                <label class="label-complement-address">Complément d'adresse (facultatif)</label>
                <input v-model="addressComplement" type="text" />
                <span v-if="errorAddressComplement" class="error-field">
                  {{ errorAddressComplement }}
                </span>
              </div>
            </div>
            <div class="d-flex align-items-center form-column">
              <div class="d-flex flex-column form-group" >
                <label class="label-zip-code">Code postal</label>
                <input v-model="zipCode" type="text" />
                <span v-if="errorZipCode" class="error-field">
                  {{ errorZipCode }}
                </span>
              </div>
              <div class="d-flex flex-column form-group">
                <label>Ville</label>
                <input v-model="city" type="text" />
                <span v-if="errorCity" class="error-field">
                  {{ errorCity }}
                </span>
              </div>
            </div>
            <div class="d-flex align-items-center form-column">
              <div class="d-flex flex-column form-group" >
                <label class="label-phone">Téléphone</label>
                <input v-model="phoneNumber" type="tel" name="tel" />
                <span v-if="errorPhoneNumber" class="error-field">
                  {{ errorPhoneNumber }}
                </span>
              </div>
              <div class="d-flex flex-column form-group">
                <label for="country">Pays</label>
                <select v-model="country" name="country">
                  <option value="">--Please choose an option--</option>
                  <option value="french">France</option>
                  <option value="belgium">Belgique</option>
                  <option value="germany">Allemage</option>
                </select>
                <span v-if="errorCountry" class="error-field">
                  {{ errorCountry }}
                </span>
              </div>
            </div>
            <!-- Gestion messages de validations -->
            <div class="d-flex align-items-center justify-content-center mt-10 alert-message">
              <AlertMessage v-if="successMessage" :message="successMessage" type="success" redirectTo="/payment" @close="handleResetForm()" />
              <AlertMessage v-if="errorMessage" :message="errorMessage" type="error" redirectTo=""  @close="closeFields()" />
            </div>
            <!-- Button validation de formulaire -->
            <div class="d-flex align-items-center flex-end">
              <button class="btn btn-black" :disabled="isSubmitting">
                Enregistrer l'adresse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@mixin labelElems {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  border: 1px solid black;
  border-bottom: none;
  height: 27px;
  white-space: nowrap;
}

.address {
  padding: 20px;
  .container {
    width: 1200px;
    margin-top: 100px;
    h2 {
      font-size: 22px;
      margin-bottom: 30px;
    }
  }
}

.container-form {
  padding: 10px 30px 20px 30px;
  border: var(--border);
  border-radius: var(--border-radius);
  background-color: var(--text-primary-color);
  .btn-black {
    margin-top: 5px;
  }
  .form-column {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 15px;
    margin-top: 30px;
    .form-group {
      input, select, textarea {
        border: 1px solid black;
        padding: 12px;
        outline: none;
        background-color: white;
        &:focus {
          border: 3px solid black;
          padding: 11px;
        }
      }
      label {
        @include labelElems;
        max-width: 45px;
      }
      .label-firstname {
        @include labelElems;
        max-width: 65px;
      }
      .label-address {
        @include labelElems;
        max-width: 140px;
      }
      .label-complement-address {
        @include labelElems;
        max-width: 185px;
      }
      .label-zip-code {
        @include labelElems;
        max-width: 80px;
      }
      .label-phone {
        @include labelElems;
        max-width: 80px;
      }
      &:focus-within label {
        background-color: black;
        color: var(--text-primary-color);
      }
    }
  }
}
</style>
