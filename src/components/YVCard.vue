<template>
  <div class="yv-card come-up">
    <div class="col">
      <div class="title">
        {{ item.content || removeHTML(item.moment_title) }}
      </div>
      <div class="labels">
        <template v-if="item.kind !== 'note'">

        <button v-for="chip in item.labels?.split(',')" :key="chip" class="label chip" @click="$emit('bookmark-filter', chip)">
          {{ chip }}
        </button>
        </template>
        <a v-for="(scripture, index) in item.references?.split(',')" :key="scripture" :href="`https://my.bible.com/bible/111/${item.links?.at(index)}`" target="_blank" class="scripture chip favour">
          {{ scripture }}
        </a>
      </div>
      <div class="time">
        {{ new Date(item.created_dt).toDateString().replace(' ', ', ') }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    removeHTML(string) {
      return string.replaceAll('<b>', '').replaceAll('</b>', '')
    }
  }
}
</script>

<style scoped>
.yv-card {
  flex-basis: 100%;
  padding: 1rem;
  background: #fff;
  border: 1px solid rgba(2, 28, 62, 0.03);
  box-shadow: 3px 2px 25px rgba(2, 129, 255, 0.03);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  justify-content: space-between;
}

.yv-card .title {
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.yv-card .labels,
.yv-card .scriptures {
  margin-bottom: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.yv-card .chip {
  background: #ffe9eb;
  border: 1px solid #ff3d4d;
  color: #ff3d4d;
  border-radius: 6px;
  padding: 4px 8px;
  display: inline-flex;
  font-size: 0.85rem;
}

.yv-card .chip.favour {
  background: #ffefd7;
  border: 1px solid #ffab2d;
  color: #ffab2d;
}

.yv-card .time {
  font-size: 0.85rem;
  margin-top: 0.5rem;
  color: #595959;
}

a {
  text-decoration: none;
}
</style>
