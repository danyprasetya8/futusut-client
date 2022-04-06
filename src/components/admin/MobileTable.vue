<template>
  <div v-if="props.isLoading">
    <MobileTableSkeletonLoader />
  </div>
  <div
    v-else-if="!props.items.length"
    class="text-center my-10 text-xl"
  >
    No booking found
  </div>
  <div v-else>
    <div
      v-for="item in props.items"
      :key="item.id"
      class="mb-5 p-5 shadow rounded-lg bg-white text-sm"
    >
      <div
        v-for="header in props.headers"
        :key="header.value"
        class="mb-2.5"
      >
        <div class="font-semibold">
          {{ header.text }}
        </div>
        <template v-if="header.currency">
          {{ numberFormatter(item[header.value], 'Rp.') }}
        </template>
        <template v-else-if="header.date">
          {{ formatDate(item[header.value], option) }}
        </template>
        <template v-else-if="header.slot">
          <slot
            :item="item"
            :name="header.value"
          />
        </template>
        <template v-else>
          {{ item[header.value] }}
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { numberFormatter } from '@/utils/formatter'
import { formatDate } from '@/utils/date'
import MobileTableSkeletonLoader from '@/components/admin/MobileTableSkeletonLoader'

const props = defineProps({
  headers: {
    type: Array,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const option = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}
</script>
