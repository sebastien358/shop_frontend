<script setup lang="ts">
import AlertMessage from '@/templates/alertMessage/AlertMessage.vue'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { onMounted, ref } from 'vue'
import { useCommandUserStore } from '@/stores/user/commandUserStore.ts'
import * as z from 'zod'
import { useRoute } from 'vue-router'

// Récupération de la commande de l'utilisateur connecté

const commandUserStore = useCommandUserStore()

const route = useRoute()

async function loadCommands() {
  try {
    await commandUserStore.getCommandUser()
  } catch(e) {
    console.error(e)
  }
}

onMounted(async () => {
  try {
    await loadCommands()
  } catch(e) {
    console.error(e)
  }
})

// Form Command

const MESSAGES = {
  SUCCESS_ADDRESS: 'Vos données ont bien été enregistrées',
  INVALID_CREDENTIALS: 'Vos données n\'ont pas pu être enregistrées',
}

const schema = z.object({
  firstName: z.string({ message: 'Le prénom est requis' }),
  lastName: z.string({ message: 'Le nom est requis' }),
  address: z.string({ message: 'L\'adresse est requise' }),
  zipCode: z.string({ message: 'Le code postal est requis' }).regex(/^\d{5}$/, {
    message: 'Le code postal doit être composé de 5 chiffres'
  }),
  addressComplement: z.string().optional(),
  city: z.string({ message: 'La ville est requise'  }),
  phoneNumber: z
    .string({ message: 'Le numéro de téléphone est requis' })
    .regex(/^0\d{9}$/, { message: 'Le numéro de téléphone doit être composé de 10 chiffres et commencer par 0' }),
  country: z.string( { message: 'Le pays est requis' })
})

const initialValues = ref({
  firstName: '',
  lastName: '',
  address: '',
  addressComplement: '',
  zipCode: '',
  phoneNumber: '',
  country: '',
  city: ''
})

const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: initialValues.value
})

// Récupérer les informations de l'utilisateur dans le formulaire

async function getCurrentCommandId() {
  try {
    const id = route.params.id
    if (!id) { return }
    const command = await commandUserStore.getCurrentCommand(id)
    if (command) {
      resetForm({
        values: { ...command }
      })
    }
  } catch(e) {
    console.error(e)
  }
}

onMounted(async () => {
  try {
    await getCurrentCommandId()
  } catch(e) {
    console.error(e)
  }
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
    const response = await commandUserStore.editCommandAddressUser(dataAddress)
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

// Validation de formulaire

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
  { label: 'Prénom', css:'label-firstname', type: 'text', name: 'firstName', value: firstName, errorMessage: errorFirstName },
  { label: 'Nom', css:'label-lastname', type: 'text', name: 'lastName', value: lastName, errorMessage: errorLastName },
  { label: 'Adresse (numéro et rue)', css: 'label-address', type: 'text', name: 'address', value: address, errorMessage: errorAddress },
  { label: 'Complément d\'adresse (facultatif)', css: 'label-complement-address', type: 'text', name: 'addressComplement', value: addressComplement, errorMessage: errorAddressComplement },
  { label: 'Code postal', css: 'label-zip-code', type: 'text', name: 'zipCode', value: zipCode, errorMessage: errorZipCode },
  { label: 'Ville', css: 'label-city', type: 'text', name: 'city', value: city, errorMessage: errorCity },
  { label: 'Téléphone', css: 'label-tel', type: 'tel', name: 'phoneNumber', value: phoneNumber, errorMessage: errorPhoneNumber },
  { label: 'Pays', css: 'label-country', type: 'select', name: 'country', value: country, errorMessage: errorCountry },
]
</script>

<template>
  <!-- Form address command -->
  <div class="d-flex align-items-center justify-content-center address">
    <div class="container-form">
      <h2>Modifier vos données</h2>
      <form @submit.prevent="onSubmit">
        <div class="form-column">
          <div v-for="(field, index) in fields" :key="index">
            <div class="d-flex flex-column form-group">
              <label :class="field.css">{{ field.label }}</label>
              <input
                v-if="field.type !== 'select'"
                v-model="field.value.value"
                :type="field.type"
                :name="field.name"
              />
              <select v-else v-model="field.value.value">
                <option value="">-- Veuillez sélectionner un pays --</option>
                <option value="germany">Allemagne</option>
                <option value="belgium">Belqique</option>
                <option value="french">France</option>
              </select>
            </div>
            <!-- Error message field -->
            <span v-if="field.errorMessage.value" class="error-field">{{
              field.errorMessage.value
            }}</span>
          </div>
        </div>
        <!-- Alert message -->
        <div class="text-center alert-message">
          <AlertMessage
            v-if="successMessage"
            :message="successMessage"
            type="success"
            redirectTo="/payment"
            @close="handleResetForm()"
          />
          <AlertMessage
            v-if="errorMessage"
            :message="errorMessage"
            type="error"
            redirectTo=""
            @close="closeAlert()"
          />
        </div>
        <!-- Button valdation form -->
        <div class="d-flex align-items-center flex-end">
          <button class="btn btn-black" :disabled="isSubmitting">Mettre à jour</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins' as m;
// Address

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
  padding: 10px 10px 20px 10px;
  height: calc(100vh - 160px);
  @include m.lg {
    margin-top: 60px;
    padding: 20px;
  }
  .container-form {
    padding: 30px 15px 10px 15px;
    border: var(--border);
    border-radius: var(--border-radius);
    background-color: var(--text-primary-color);
    width: 100%;
    @include m.lg {
      padding: 30px 30px 20px 30px;
    }
    @include m.xl {
      max-width: 1000px;
    }
    @include m.xxl {
      max-width: 1100px;
    }
    h2 {
      font-size: 21px;
      text-align: center;
      @include m.lg {
        text-align: left;
      }
    }
    .btn-black {
      margin-top: 10px;
    }
  }
}

.form-column {
  display: grid;
  grid-template-columns: 1fr;
  @include m.md {
    grid-template-columns: 1fr 1fr;
    column-gap: 17px;
  }
  .form-group {
    margin-top: 25px;
    input,
    select,
    textarea {
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
    .label-tel {
      @include labelElems;
      max-width: 80px;
    }
    &:focus-within label {
      background-color: black;
      color: var(--text-primary-color);
    }
  }
}
</style>
