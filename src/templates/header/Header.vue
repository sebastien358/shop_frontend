<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore.ts'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'

const authStore = useAuthStore()

const router = useRouter()

const state = reactive({
  activeDropdown: null
})

function toggleDropdown(dropdownType: string) {
  if (state.activeDropdown === dropdownType) {
    state.activeDropdown = null
  } else {
    state.activeDropdown = dropdownType
  }
}

function isLoggedIn() {
  return authStore.isLoggedIn
}

function roleAdmin() {
  return authStore.roleAdmin()
}

function roleUser() {
  return authStore.roleUser()
}

function logout() {
  authStore.logout()
  router.push({ path: '/login' })
}
</script>

<template>
  <header class="d-flex align-items-center space-between header">
    <div class="d-flex align-items-center">
      <router-link to="/boutique" class="d-flex align-items-center logo">
        <img src="@/assets/images/3030285.webp" />
        <h1>Boutique</h1>
      </router-link>

      <ul class="d-flex align-items-center">

        <li v-if="roleAdmin()" class="dropdown mr-10" @click="toggleDropdown('admin')">
          <a href="#">Admin</a>
          <div class="dropdown-menu" :class="{ show: state.activeDropdown === 'admin' }" aria-labelledby="dropdownMenuLink">
            <div class="d-flex flex-column drop-menu-link">
              <router-link to="/admin">Admin</router-link>
            </div>
            <div class="dropdown-divider"></div>
          </div>
        </li>

        <li v-if="roleUser()" class="dropdown mr-10" @click="toggleDropdown('user')">
          <a href="#">Profile</a>
          <div class="dropdown-menu" :class="{ show: state.activeDropdown === 'user' }" aria-labelledby="dropdownMenuLink">
            <div class="d-flex flex-column drop-menu-link">
              <router-link to="/profile">Voir profil</router-link>
              <router-link to="#">Mes commandes</router-link>
            </div>
            <div class="dropdown-divider"></div>
          </div>
        </li>

      </ul>

    </div>


    <ul v-if="!isLoggedIn()" class="d-flex align-items-center authentification">
      <li>
        <router-link :to="{ name: 'register' }">Inscription</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'login' }">Connexion</router-link>
      </li>
    </ul>
    <ul v-else class="d-flex align-items-center authentification">
      <li>
        <a @click="logout()" href="#">Déconnexion</a>
      </li>
    </ul>
  </header>
</template>

<style scoped lang="scss">
.header {
  padding: 0 10px 0 5px;
  background-color: var(--primary-1);
  .logo {
    text-decoration: none;
    img {
      height: 28px;
      width: auto;
      margin-right: 5px;
    }
    h1 {
      font-size: 16px;
      color: var(--text-primary-color);
      margin-right: 10px;
    }
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    li {
      a {
        text-decoration: none;
        color: var(--text-primary-color);
      }
    }
  }
}

.dropdown {
  position: relative;
  .dropdown-menu {
    display: none;
    position: absolute;
    border: var(--border);
    padding: 10px 40px;
    background-color: var(--text-primary-color);
    top: 33px;
    left: 0;
    transition: all 300ms ease;
    &.show {
      display: block;
    }
    .dropdown-menu-link {
      a {
        color: var(--gray-3);
      }
      white-space: nowrap;
      line-height: 30px;
      .dropdown-divider {
        height: 1px;
        margin: 10px 0;
        background-color: var(--gray-3);
      }
    }
  }
}


</style>
