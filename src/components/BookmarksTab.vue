<template>
  <div class="bookmarks">
    <!-- <EmptyState v-if="loading" name="Bookmarks" /> -->
    <EmptyState v-if="bookmarks?.length === 0" name="Bookmarks" />
    <div v-if="results" class="yv-search-grid come-up">
      <YVCard
        v-for="bookmark in results"
        :key="bookmark.id"
        :item="bookmark"
        v-show="bookmark.kind === 'bookmark'"
        @bookmark-filter="$emit('bookmark-filter', $event)"
      />
      <button v-if="moreResults" class="primary-btn" @click="$emit('see-more-results')">See more results</button>
    </div>
    <div v-else class="yv-search-grid come-up">
      <YVCard
        v-for="bookmark in bookmarks"
        :key="bookmark.id"
        :item="bookmark"
        v-show="bookmark.kind === 'bookmark'"
        @bookmark-filter="$emit('bookmark-filter', $event)"
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
    bookmarks: {
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
