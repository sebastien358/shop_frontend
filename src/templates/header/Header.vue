<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore.ts'
import { useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { useCommandUserStore } from '@/stores/user/commandUserStore.ts'

const authStore = useAuthStore()

const router = useRouter()

// Menu déroulant

const state = reactive<{
  activeDropdown: string | null
  openMenuMobile: boolean
}>({
  activeDropdown: null,
  openMenuMobile: false,
})

function openDropdown(dropType: string | null) {
  state.activeDropdown = dropType
}

function closeDropdown() {
  state.activeDropdown = null
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

// Récupératio ID commande afin de modifier les données utilisateurs : Adresse

const commandUserStore = useCommandUserStore()

async function loadCommandUserList() {
  try {
    await commandUserStore.getCommandUserList()
  } catch(e) {
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

// Récupération de l'ID utlisateur, puis redirection et modification des données

async function loadUserInfo() {
  try {
    await authStore.infoMe()
  } catch(e) {
    console.error(e)
  }
}

onMounted(async () => {
  try {
   await loadUserInfo()
  } catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <header class="d-flex align-items-center space-between header">
    <div class="d-flex align-items-center">
      <!-- Logo -->
      <router-link to="/boutique" class="d-flex align-items-center logo">
        <img src="@/assets/images/3030285.webp" />
        <h1>ShopComputer</h1>
      </router-link>
      <!-- Menu -->
      <div class="hide-menu">
        <ul class="d-flex align-items-center">
          <li class="mr-10">
            <router-link to="/boutique">Boutique</router-link>
          </li>
          <li
            v-if="roleAdmin()"
            class="mr-10 dropdown"
            @mouseover="openDropdown('admin')"
            @mouseout="closeDropdown()"
          >
            <a href="#">Admin</a>
            <div class="dropdown-menu" :class="{ show: state.activeDropdown === 'admin' }">
              <div class="d-flex flex-column dropdown-menu-link">
                <router-link to="/product-form">Ajouter un produit</router-link>
                <router-link to="/product-list">Liste des produits</router-link>
              </div>
              <div class="dropdown-divider"></div>
            </div>
          </li>
          <li
            v-if="roleUser()"
            class="dropdown"
            @mouseover="openDropdown('user')"
            @mouseout="closeDropdown()"
          >
            <a href="#">Profil</a>
            <div class="dropdown-menu" :class="{ show: state.activeDropdown === 'user' }">
              <div class="d-flex flex-column dropdown-menu-link">
                <router-link to="/command-user-list">Mes commandes</router-link>
                <router-link
                  :to="{ name: 'edit-command', params: { id: commandUserStore.currentCommandId } }"
                  >Données personnelles</router-link
                >
                <router-link :to="{ name: 'edit-user', params: { id: authStore.userId } }"
                  >Modifier mot de passe</router-link
                >
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
            <router-link :to="{ path: '/register' }">Inscription</router-link>
          </li>
          <li>
            <router-link :to="{ path: '/login' }">Connexion</router-link>
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
      <font-awesome-icon
        @click="state.openMenuMobile = !state.openMenuMobile"
        icon="fa-solid fa-bars"
      />
      <ul v-if="state.openMenuMobile" class="tablet-menu">
        <li>
          <router-link to="/boutique">Boutique</router-link>
        </li>
        <li
          v-if="roleAdmin()"
          class="dropdown"
          @mouseover="openDropdown('admin')"
          @mouseout="closeDropdown()"
        >
          <a href="#">Admin</a>
          <div class="dropdown-menu" :class="{ show: state.activeDropdown === 'admin' }">
            <div class="d-flex flex-column dropdown-menu-link">
              <router-link to="/admin">Admin</router-link>
              <router-link to="/product-list">Liste des produits</router-link>
            </div>
            <div class="dropdown-divider"></div>
          </div>
        </li>
        <li
          v-if="roleUser()"
          class="dropdown"
          @mouseover="openDropdown('user')"
          @mouseout="closeDropdown()"
        >
          <a href="#">Profil</a>
          <div class="dropdown-menu" :class="{ show: state.activeDropdown === 'user' }">
            <div class="d-flex flex-column dropdown-menu-link">
              <router-link to="/command-user-list">Mes commandes</router-link>
              <router-link to="/address-user">Données personnelles</router-link>
              <router-link to="/update-password-user">Modifier mot de passe</router-link>
            </div>
            <div class="dropdown-divider"></div>
          </div>
        </li>
        <div v-if="!isLoggedIn()">
          <li>
            <router-link :to="{ path: '/register' }">Inscription</router-link>
          </li>
          <li>
            <router-link :to="{ path: '/login' }">Connexion</router-link>
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
  z-index: 1;
  position: relative;
  .dropdown-menu {
    position: absolute;
    box-shadow:
      var(--gray-2) 0px 6px 12px -2px,
      var(--gray-2) 0px 3px 7px -3px;
    padding: 10px 12px;
    background-color: var(--text-primary-color);
    top: 35px;
    left: 0;
    visibility: hidden;
    opacity: 0.5;
    transition:
      opacity 200ms ease,
      visibility 200ms ease;
    width: 290px;
    &.show {
      opacity: 1;
      visibility: visible;
    }
    .dropdown-menu-link {
      line-height: 26px;
    }
    .dropdown-menu-link a {
      font-size: 13px;
      color: var(--gray-3);
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
    line-height: 30px;
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
