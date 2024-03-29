<template>
  <div class="notes">
    <!-- <EmptyState v-if="loading" name="Notes" /> -->
    <EmptyState v-if="notes?.length === 0" name="Notes" />
    <div v-if="results" class="yv-search-grid come-up">
      <YVCard
        v-for="note in results"
        :key="note.id"
        :item="note"
        v-show="note.kind === 'note'"
      />
      <button v-if="moreResults" class="primary-btn" @click="$emit('see-more-results')">See more results</button>
    </div>
    <div v-else class="yv-search-grid come-up">
      <YVCard
        v-for="note in notes"
        :key="note.id"
        :item="note"
        v-show="note.kind === 'note'"
      />
      <button v-if="moreData" class="primary-btn" @click="$emit('see-more')">See more results</button>
    </div>
  </div>
</template>

<script>
import YVCard from "./YVCard.vue"
import EmptyState from "./EmptyState.vue"
export default {
  props: {
    notes: {
      type: Array,
    },
    results: {
      type: Array,
    },
    loading: {
      type: Boolean,
    },
    moreData: {
      type: Boolean,
    },
    moreResults: {
      type: Boolean,
    },
  },
  components: { YVCard, EmptyState },
}
</script>

<style scoped>
.primary-btn {
  margin: 5% 0;
  font-size: 0.9rem;
}
</style>
