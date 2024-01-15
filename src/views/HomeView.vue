<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { refDebounced } from '@vueuse/core'
import { useCookies } from '@vueuse/integrations/useCookies'
import { getDoc, doc } from 'firebase/firestore'
import { firebaseDB } from '../../plugins/firebase' // Import your Firebase setup
import { useRoute, useRouter } from 'vue-router'
import MoreIcon from '@/components/MoreIcon.vue'
import BookmarksTab from '@/components/BookmarksTab.vue'
import NotesTab from '@/components/NotesTab.vue'
import MoreTab from '@/components/MoreTab.vue'

const tab = ref('bookmarks')
const data = ref({ bookmarks: [], notes: [], lastUpdated: '2023' })
const query = ref('')
const debouncedQuery = refDebounced(query, 1500)
const loading = ref(false)
const optionActive = ref(null)

const getData = async (username) => {
  // console.log('calling getData', username)
  loading.value = true
  if (username) {
    localStorage.setItem('username', username)
  }
  const docSnap = await getDoc(doc(firebaseDB, 'users', username))
  if (docSnap.exists()) {
    data.value = docSnap.data()
  }
  // localStorage.setItem('data', data.value)
  loading.value = false
}

onMounted(() => {
  // Redirect user if they land on home page and have signed in before
  const storedUsername = localStorage.getItem('username')
  if (storedUsername) {
    useRouter().push(`/${storedUsername}`)
  }

  // Retrieve user YV Data and their username from URL path
  const route = useRoute()
  getData(route.params.id || storedUsername)
})

const results = computed(() => {
  if (debouncedQuery.value) {
    let cardsInner = tab.value === 'bookmarks' ? data.value.bookmarks || [] : data.value.notes || []
    return cardsInner.filter(
      (card) =>
        JSON.stringify(card.labels)?.toLowerCase().includes(query.value.toLowerCase()) ||
        JSON.stringify(card.references)?.toLowerCase().includes(query.value.toLowerCase()) ||
        JSON.stringify(card.content)?.toLowerCase().includes(query.value.toLowerCase())
    )
  }
  return null
})

watch(tab, () => {
  optionActive.value = null
})
</script>

<template>
  <div id="youversion-search" class="homeview">
    <div class="youversion-search-main active">
      <header>
        <div class="flex">
          <h1>Youversion Search</h1>
          <span class="text-2"
            >by <a href="https://favourfelix.com" target="_blank">Favour Felix</a></span
          >
        </div>
        <div class="flex">
          <span class="text-3">
            Last updated: {{ new Date(data.lastUpdated).toDateString().substring(4) }}
            <!-- <a @click="refreshData" target="_blank">Refresh Data</a> -->
          </span>
        </div>
        <div class="tabs">
          <button class="tab" :class="{ active: tab === 'bookmarks' }" @click="tab = 'bookmarks'">
            Bookmarks
          </button>
          <button class="tab" :class="{ active: tab === 'notes' }" @click="tab = 'notes'">
            Notes
          </button>
          <button
            class="tab more"
            :class="{ active: tab === 'more' }"
            title="See more options"
            @click="tab = 'more'"
          >
            <MoreIcon />
          </button>
        </div>
        <template v-if="tab !== 'more'">
          <input
            type="text"
            :placeholder="`Search ${
              tab === 'bookmarks' ? data?.bookmarks?.length : data?.notes?.length
            } ${tab}`"
            v-model="query"
          />
          <div v-if="query" class="yv-search-header come-up">
            Filtering {{ tab }} with query: "{{ query }}"
          </div>
        </template>
      </header>
      <template v-if="tab !== 'more'">
        <div id="youversion-search-list">
          <!-- BOOKMARKS CARD -->
          <BookmarksTab
            v-if="tab === 'bookmarks'"
            :bookmarks="data?.bookmarks"
            :loading="loading"
            :results="results"
            @bookmark-filter="query = $event"
          />

          <!-- NOTES CARD -->
          <NotesTab
            v-if="tab === 'notes'"
            :notes="data?.notes"
            :loading="loading"
            :results="results"
          />
        </div>
      </template>
      <!-- MORE OPTIONS CARD -->
      <MoreTab v-else-if="optionActive === null" @option="optionActive = $event" />
    </div>
  </div>
</template>

<style>
main {
  padding: 0;
}

h1 {
  margin-top: 0;
  margin-bottom: 0rem;
  font-size: 1.5rem;
}
h1 + span.text-2 {
  margin-bottom: 0.7rem;
}
span.text-3 {
  color: #00000070;
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
header input {
  margin-bottom: 1rem;
}

.center {
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  height: 80px;
}

.center span {
  font-size: 0.8rem;
  display: block;
  text-align: center;
  color: #595959;
  margin: 0 auto;
  margin-top: 0.3rem;
  max-width: 200px;
}

.center span a {
  color: #ffab2d;
  text-decoration: none;
}

.homeview {
  max-width: 95%;
  margin: 0 auto;
}

#youversion-search {
  position: relative;
  background: transparent;
}

#youversion-search button#open-search {
  /* position: fixed;
  bottom: 1rem;
  right: 1rem; */
  height: 60px;
  border-radius: 30px;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  -ms-border-radius: 30px;
  -o-border-radius: 30px;
  padding: 0 1.5rem;
  border: 0;
  outline: none;
  font-size: 1rem;
  background: #2b3031;
  color: #fff;
}

#youversion-search .tabs {
  display: grid;
  grid-template-columns: 42% 42% 11%;
  gap: 2%;
  margin: 1rem 0;
}

#youversion-search button.tab {
  height: 40px;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
  -ms-transition: 0.2s;
  -o-transition: 0.2s;
  font-size: 1rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

#youversion-search .tab.more {
  background: #c2c2c2;
}

.flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.flex h1 {
  white-space: nowrap;
}

.flex span {
  white-space: nowrap;
  margin-bottom: 0;
  font-size: 0.8rem;
  margin-left: 6px;
}

.flex .clear-btn {
  margin-bottom: 1rem;
  border: 0;
  outline: none;
  background: #fff;
  position: absolute;
  right: 0;
}

.flex .clear-btn.rotate {
  margin-bottom: 0.5rem;
  border: 0;
  outline: none;
  background: #fff;
  height: 40px;
  width: 40px;
}

.flex span a {
  color: #ffab2d;
  text-decoration: none;
  font-size: 0.8rem;
}

#youversion-search .tab.active,
#youversion-search .tab:hover {
  background: #ff3d4d;
  color: #fff;
}

#youversion-search .tab.active path,
#youversion-search .tab:hover path {
  fill: #fff;
}

.youversion-search-main {
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
  padding: 0;
  background: #fff;
  opacity: 0;
  transform: translateY(100px);
  -webkit-transform: translateY(100px);
  -moz-transform: translateY(100px);
  -ms-transform: translateY(100px);
  -o-transform: translateY(100px);
  transition: 0.3s;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -ms-transition: 0.3s;
  -o-transition: 0.3s;
  visibility: hidden;
  z-index: 1;
}

.youversion-search-main.active {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
  -webkit-transform: translateY(0);
  -moz-transform: translateY(0);
  -ms-transform: translateY(0);
  -o-transform: translateY(0);
  z-index: 2;
}

input {
  width: calc(100% - 2rem);
  height: 40px;
  outline: none;
  border: 1px solid #cecece;
  margin-bottom: 2rem;
  border-radius: 10px;
  padding: 0 12px;
}

.yv-search-header {
  padding-bottom: 0.75rem;
  font-size: 0.95rem;
  font-weight: bold;
}

.yv-search-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  overflow-y: auto;
}
</style>
