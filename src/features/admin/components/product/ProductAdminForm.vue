<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AlertMessage from '@/templates/alertMessage/AlertMessage.vue'
import { useProductAdminStore } from '@/stores/admin/productAdminStore.ts'
import { useCategoryAdminStore } from '@/stores/admin/categoryAdminStore.ts'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const productAdminStore = useProductAdminStore()

// Récupération des catégories

const categoryAdminStore = useCategoryAdminStore()

const categories = computed(() => categoryAdminStore.category)

async function loadCategories() {
  try {
    await categoryAdminStore.getAdminCategories()
  } catch(e) {
    console.log(e)
  }
}

onMounted(async () => {
  try {
    await loadCategories()
  } catch(e) {
    console.log(e)
  }
})

// Création Form

const schema = z.object({
  title: z.string({ message: 'Le prénom est requis' }),
  price: z.coerce.number({ message: 'Veuillez renseigner un prix' }),
  category: z.coerce.number({ message: 'Veuillez renseigner une catégorie' }),
  description: z.string({ message: 'Veuillez renseigner une description' }),
  image: z.instanceof(File).optional(),
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
})

const { value: title, errorMessage: errorTitle } = useField<string>('title')
const { value: price, errorMessage: errorPrice } = useField<number>('price')
const { value: category, errorMessage: errorCategory } = useField<string>('category')
const { value: description, errorMessage: errorDescription } = useField<string>('description')
const {} = useField<string>('image')

const images = ref<any>([])
const errorImage = ref<string>('')

function changeMultipleFiles(files: FileList) {
  images.value = [...images.value, ...files];
}

const MESSAGES = {
  SUCCESS_ADD_PRODUCT: 'Le produit a bien été ajouté',
  INVALID_CREDENTIALS: 'Le produit n\'a pas pu être ajouté'
}

const onSubmit = handleSubmit(async (dataProduct, {resetForm}) => {
  try {
    delete dataProduct.image
    dataProduct.images = [...images.value]
    const response = await productAdminStore.addAdminProduct(dataProduct)
    if (response) {
      setSuccessMessage(MESSAGES.SUCCESS_ADD_PRODUCT, resetForm)
    } else {
      setErrorMessage(MESSAGES.INVALID_CREDENTIALS)
    }
  } catch (e) {
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
  <div class="d-flex align-items-center justify-content-center product-form">
    <div class="container-form">
      <h3>Ajouter un produit</h3>
      <form @submit.prevent="onSubmit">
        <div class="d-flex align-items-center input-column">
          <div class="d-flex flex-column form-group">
            <label>Titre</label>
            <input v-model="title" type="text" autofocus />
            <span v-if="errorTitle" class="error-field">
              {{ errorTitle }}
            </span>
          </div>
          <div class="d-flex flex-column form-group">
            <label>Prix</label>
            <input v-model="price" type="number" />
            <span v-if="errorPrice" class="error-field">
              {{ errorPrice }}
            </span>
          </div>
        </div>
        <div class="d-flex align-items-center input-column">
          <div class="d-flex flex-column form-group">
            <label class="label-select" for="category">Catégories:</label>
            <select v-model="category" name="category" id="category">
              <option value="">--Please choose an option--</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
            <span v-if="errorCategory" class="error-field">
              {{ errorCategory }}
            </span>
          </div>
          <div class="d-flex flex-column form-group">
            <label class="label-image">Images (optional)</label>
            <input multiple type="file" @change="changeMultipleFiles($event.target.files)" />
            <span v-if="errorImage" class="message-field">{{ errorImage }}</span>
          </div>
        </div>
        <div class="d-flex flex-column form-group">
          <label class="label-description">Description</label>
          <textarea v-model="description" type="text" rows="5"></textarea>
          <span v-if="errorDescription" class="error-field">
            {{ errorDescription }}
          </span>
        </div>
        <div class="alert-message">
          <AlertMessage v-if="successMessage" :message="successMessage" type="success" redirectTo="" @close="handleResetForm" />
          <AlertMessage v-if="errorMessage" :message="errorMessage" type="error" redirectTo="" @close="closeFields()" />
        </div>
        <div class="d-flex align-items-center flex-end">
          <button class="btn btn-black" :disabled="isSubmitting">Ajouter le produit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-form {
  height: 100%;
  padding: 20px;
  .container-form {
    max-width: 1000px;
    padding: 30px 20px 15px 20px;
    h3 {
      font-size: 20px;
      margin-bottom: 5px;
    }
    .btn-black {
      margin-top: 10px;
    }
    .alert-message {
      margin-top: 15px;
      text-align: center;
    }
  }
}

.input-column {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 18px;
}

.form-group {
  margin-top: 20px;
  label {
    font-size: 9px;
    border: 1px solid black;
    border-bottom: none;
    height: 23px;
    width: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  input,
  select,
  textarea {
    border: 1px solid black;
    padding: 12px;
    outline: none;
    background-color: var(--text-primary-color);
    &:focus {
      border: 3px solid black;
      padding: 11px;
    }
  }
  .label-image {
    width: 90px;
    white-space: nowrap;
  }
  .label-select {
    width: 65px;
    white-space: nowrap;
  }
  .label-description {
    width: 65px;
    white-space: nowrap;
  }
  &:focus-within label {
    background-color: black;
    color: var(--text-primary-color);
  }
  .message-field {
    color: var(--success-2);
  }
}
</style>
