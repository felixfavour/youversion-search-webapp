<script>
// import data from "./data"
import { useCookies } from '@vueuse/integrations/useCookies'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { firebaseDB } from '../../plugins/firebase'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'AuthView',
  props: {
    stuff: String
  },
  data() {
    return {
      username: '',
      pin: ''
    }
  },
  async created() {
    // const docSnap = getDoc(doc(firebaseDB, 'users', username)).then((doc) => {
    //   if (doc.exists()) {
    //     console.log('data', doc.data())
    //     this.data = doc.data()
    //   }
    // })
  },
  watch: {
    tab() {
      this.optionActive = null
    }
  },
  methods: {
    async login() {
      useAuthStore().setUsername(this.username)
      useCookies(['username']).set('username', this.username)
      this.$router.push('/')
    }
  }
}
</script>

<template>
  <div id="youversion-search">
    <div class="youversion-search-main active">
      <header>
        <div class="flex">
          <h1>Youversion Search</h1>
          <span>by <a href="https://favourfelix.com" target="_blank">Favour Felix</a></span>
        </div>
      </header>
      <div class="form-ctn">
        <form action="">
          <label for="">
            <input type="text" v-model="username" placeholder="Your Username" />
          </label>
          <label for="">
            <input type="password" v-model="pin" placeholder="Enter PIN" />
          </label>
          <button
            :disabled="!(username.length > 2 && pin.length === 6)"
            class="primary-btn"
            @click="login"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
main {
  padding: 1rem 0;
}

h1 {
  margin-top: 0;
  margin-bottom: 0.4rem;
}

/* YOUVERSION SEARCH CONTENT */
button,
a {
  cursor: pointer;
}

header {
  position: sticky;
  top: 0;
  background: #ffffff;
  padding-top: 1rem;
}
.flex {
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.flex span {
  white-space: nowrap;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  margin-left: 6px;
  display: block;
}
.form-ctn {
  background: #ffab2d20;
  padding: 8% 0;
  border-radius: 24px;
  width: 90%;
  margin: 2rem auto;
}

form {
  width: 85%;
  margin: 0 auto;
}

form .primary-btn {
  margin-top: 2rem;
}

form input {
  margin-bottom: 1rem;
}

form input[type='password'] {
  letter-spacing: 1rem;
  /* text-align: center; */
}
form input[type='password']::placeholder {
  letter-spacing: initial;
  text-align: left;
}
</style>
