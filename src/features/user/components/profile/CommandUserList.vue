<script setup lang="ts">
import { useCommandUserStore } from '@/stores/user/commandUserStore.ts'
import { computed, onMounted } from 'vue'

const commandUserStore = useCommandUserStore()

const commands = computed(() => commandUserStore.command)

async function loadCommandUserList() {
  try {
    await commandUserStore.getCommandUserList()
  } catch (e) {
    console.error(e)
  }
}

onMounted(async () => {
  try {
    await loadCommandUserList()
  } catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <div class="command-user">
    <div v-for="command in commands" :key="command.id">
      <div class="command-user_list">
        <div v-for="item in command.commandItems" :key="item.id">
          <div class="d-flex align-items-center space-between command-user_list_content">
            <div class="d-flex flex-column command-user_list_content_text">
              <h4>Produit: {{ item.title }}</h4>
              <p>Prix: {{ item.price }} €</p>
              <p>Quantité: {{ item.quantity }}</p>
            </div>
            <img v-if="item.product.pictures.length > 0" :src="item.product.pictures[0].filename" class="img-command" />
            <img v-else src="@/assets/images/not-found.webp" class="img-command" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.command-user {
  padding: 20px;
  &_list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    &_content {
      padding: 10px;
      border: var(--border);
      background-color: var(--text-primary-color);
      border-radius: var(--border-radius);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }
      .img-command {
        height: 130px;
        width: auto;
      }
      &_text {
        line-height: 35px;
      }
    }
  }
}
</style>
