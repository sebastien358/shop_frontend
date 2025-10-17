<script setup lang="ts">
import CommandProgress from '@/templates/commandProgress/CommandProgress.vue'
import AlertMessage from '@/templates/alertMessage/AlertMessage.vue'
import { loadStripe } from '@stripe/stripe-js'
import { computed, onMounted, ref } from 'vue'
const stripe = ref(null);
const cardStripe = ref(null);
const cardElement = ref(null);
import axios from 'axios'
import { useCartStore } from '@/stores/cartStore.ts'

const cartStore = useCartStore()

const totalPrice = computed(() => cartStore.total)

async function stripePayment() {
  try {
    stripe.value = await loadStripe('pk_test_51S7vMKGrri7JBEMH0ETlCFzS9xiN409EHLpu07ZRfJURU9LZ79aR2M1NcPjseKOXgZRo1W0MR2qPDb8Z50W3sszt00ksAK8QBQ');
    const elements = stripe.value.elements();
    cardStripe.value = elements.create('card', {
      style: {
        base: {
          fontSize: '14px',
          color: '#32325d',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          padding: '10px',
        }
      }
    })
    cardStripe.value.mount(cardElement.value);
  } catch(e) {
    console.error(e)
  }
}

onMounted(async () => {
  try {
    await stripePayment()
  } catch(e) {
    console.error(e)
  }
});

const MESSAGES = {
  SUCCESS_PAYMENT: 'Le paiement a réussi',
  PAYMENT_ERROR: 'Une erreur est survenue lors du paiement',
  INVALID_CREDENTIALS: 'Les informations de paiement sont incorrectes'
}

const currentStep = ref<number>(3)

const handleSubmit = async () => {
  try {
    const { token, error } = await stripe.value.createToken(cardStripe.value);
    if (token) {
      const response = await axios.post('http://localhost:8000/api/payement', new URLSearchParams({
        token: token.id,
        price: totalPrice,
      }).toString());
      if (response.data.success) {
        setSuccessMessage(MESSAGES.SUCCESS_PAYMENT)
        currentStep.value = 4
      }
    } else if (error) {
      setErrorMessage(MESSAGES.INVALID_CREDENTIALS)
    } else {
      setErrorMessage(MESSAGES.PAYMENT_ERROR)
    }
  } catch (error) {
    setErrorMessage(MESSAGES.PAYMENT_ERROR)
    console.error(error);
  }
}

// Validation de formulaire

const successMessage = ref<string>('')
const errorMessage = ref<string>('')

function setSuccessMessage(message: string) {
  successMessage.value = message
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
}
</script>

<template>
  <CommandProgress :currentStep="currentStep" />
  <div class="d-flex align-items-center justify-content-center payment">
    <div class="container-form">
      <h2 class="text-center mb-15">Paiement sécurisé</h2>
      <p class="text-center mb-15">Entrez vos informations de carte de crédit pour effectuer le paiement</p>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="card-element"></label>
          <div id="card-element" ref="cardElement"></div>
        </div>
        <div class="text-center alert-message">
          <AlertMessage v-if="successMessage" :message="successMessage" type="success" redirectTo="/finish" @close="handleResetForm()" />
          <AlertMessage v-if="errorMessage" :message="errorMessage" type="error" redirectTo="" @close="closeAlert()" />
        </div>
        <div class="d-flex flex-column">
          <button class="btn btn-primary" type="submit">Payer</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
}

.container-form {
  margin-top: 110px;
  background-color: var(--text-primary-color);
  border-radius: var(--border-radius);
  border: var(--border);
  padding: 20px;
  width: 100%;
  max-width: 550px;
  h2 {
    font-size: 22px;
  }
  p {
    font-size: 13px;
  }
  .form-group {
    margin-bottom: 0px;
    #card-element {
      border: var(--border);
      border-radius: var(--border-radius);
      padding: 9px;
    }
  }
  .btn-primary {
    padding: 10px;
  }
  .alert-message {
    margin-bottom: 10px;
  }
}
</style>
