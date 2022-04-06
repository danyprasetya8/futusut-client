<template>
  <TableSkeletonLoader
    v-if="props.isLoading"
    :headers="props.headers"
  />
  <table
    v-else
    class="w-full"
  >
    <thead>
      <tr>
        <th
          v-for="(header) in props.headers"
          :key="header.value"
          :class="{
            'p-5 text-left border-b border-gray-200': true
          }"
        >
          {{ header.text }}
        </th>
      </tr>
    </thead>
    <tbody v-if="props.items.length">
      <tr
        v-for="item in props.items"
        :key="item.id"
        class="border-b border-gray-200"
      >
        <td
          v-for="header in props.headers"
          :key="header.value"
          class="p-5 text-sm"
        >
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
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td :colspan="props.headers.length" class="text-center py-10">
          No booking yet
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { defineProps } from 'vue'
import { numberFormatter } from '@/utils/formatter'
import { formatDate } from '@/utils/date'
import TableSkeletonLoader from '@/components/admin/TableSkeletonLoader'

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
