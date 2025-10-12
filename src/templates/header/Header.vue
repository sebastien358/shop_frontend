<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore.ts'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'

const authStore = useAuthStore()

const router = useRouter()

// Menu déroulant

const state = reactive<{
  activeDropdown: string | null
  openMenuMobile: boolean
}>({
  activeDropdown: null,
  openMenuMobile: false
})

function toggleDropdown(DropdownType: string | null) {
  if (state.activeDropdown === DropdownType) {
    state.activeDropdown = null
  } else {
    state.activeDropdown = DropdownType
  }
}

// Gestion de connexion

function isLoggedIn() {
  return authStore.isLoggedIn
}

// Gestion des roles

function roleAdmin() {
  return authStore.roleAdmin()
}

function roleUser() {
  return authStore.roleUser()
}

// Déconnexion

function logout() {
  authStore.logout()
  router.push({ path: '/login' })
}
</script>

<template>
  <header class="d-flex align-items-center space-between header">
    <div class="d-flex align-items-center">
      <!-- Logo -->
      <router-link to="/boutique" class="d-flex align-items-center logo">
        <img src="@/assets/images/3030285.webp" />
        <h1>Dyma</h1>
      </router-link>
      <!-- Menu -->
      <div class="hide-menu">
        <ul class="d-flex align-items-center">
          <li class="mr-10">
            <router-link to="/boutique">Boutique</router-link>
          </li>
          <li v-if="roleAdmin()" class="mr-10 dropdown" @click="toggleDropdown('admin')">
            <a href="#">Admin</a>
            <div class="dropdown-menu" :class="{show: state.activeDropdown === 'admin'}">
              <div class="d-flex flex-column dropdown-menu-link">
                <router-link to="/admin">Admin</router-link>
                <router-link to="#">AA</router-link>
                <router-link to="#">AA</router-link>
              </div>
              <div class="dropdown-divider"></div>
            </div>
          </li>
          <li v-if="roleUser()" class="dropdown" @click="toggleDropdown('user')">
            <a href="#">Profil</a>
            <div class="dropdown-menu" :class="{show: state.activeDropdown === 'user'}">
              <div class="d-flex flex-column dropdown-menu-link">
                <router-link to="/profile">Profil</router-link>
                <router-link to="#">AA</router-link>
                <router-link to="#">AA</router-link>
              </div>
              <div class="dropdown-divider"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- Authentification -->
    <div class="hide-menu">
      <ul class="d-flex align-items-center">
        <div v-if="!isLoggedIn()" class="d-flex align-items-center">
          <li class="mr-10">
            <router-link :to="{path: '/register'}">Inscription</router-link>
          </li>
          <li>
            <router-link :to="{path: '/login'}">Connexion</router-link>
          </li>
        </div>
        <div v-else>
          <li>
            <a @click="logout()" href="#">Déconnexion</a>
          </li>
        </div>
      </ul>
    </div>
    <!-- Menu tablet -->
    <div class="container-tablet">
      <font-awesome-icon @click="state.openMenuMobile = !state.openMenuMobile" icon="fa-solid fa-bars" />
      <ul v-if="state.openMenuMobile" class="tablet-menu">
        <li v-if="roleAdmin()">
          <router-link to="/admin">Admin</router-link>
        </li>
        <li v-if="roleUser()">
          <router-link to="/profile">Profil</router-link>
        </li>
        <div v-if="!isLoggedIn()">
          <li>
            <router-link :to="{path: '/register'}">Inscription</router-link>
          </li>
          <li>
            <router-link :to="{path: '/login'}">Connexion</router-link>
          </li>
        </div>
        <div v-else>
          <li>
            <a @click="logout()" href="#">Déconnexion</a>
          </li>
        </div>
      </ul>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins' as m;
// Header

.header {
  padding: 0 10px 0 5px;
  background-color: var(--primary-1);
  .logo {
    text-decoration: none;
    img {
      height: 28px;
      width: auto;
      margin-right: 3px;
    }
    h1 {
      font-size: 16px;
      color: var(--text-primary-color);
      margin-right: 20px;
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
        font-size: 15px;
        color: var(--text-primary-color);
      }
    }
  }
}

// Menu déroulant

.dropdown {
  position: relative;
  .dropdown-menu {
    position: absolute;
    top: 34px;
    left: 0;
    width: 250px;
    border: var(--border);
    padding: 10px 10px 15px 10px;
    background-color: var(--text-primary-color);
    line-height: 27px;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.5s ease;
    &.show {
      visibility: visible;
      transition: opacity 0.5s ease;
      opacity: 1;
    }
    .dropdown-menu-link {
      a {
        font-size: 14px;
        color: var(--gray-3);
      }
    }
    .dropdown-divider {
      border-bottom: var(--border);
      margin-top: 10px;
    }
  }
}


// Menu tablet

.container-tablet {
  position: relative;
  @include m.lg {
    display: none;
  }
  .fa-bars {
    cursor: pointer;
    color: var(--text-primary-color);
    font-size: 20px;
  }
  .tablet-menu {
    position: absolute;
    background-color: var(--text-primary-color);
    border: var(--border);
    padding: 20px 20px;
    top: 37px;
    right: -5px;
    line-height: 27px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    a {
      font-size: 14px;
      color: var(--gray-3);
    }
  }
}
</style>
