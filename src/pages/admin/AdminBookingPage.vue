<template>
  <BaseAdminLayout>
    <section class="my-2 mx-6 xl:mx-8">
      <section class="xl:mt-6 flex flex-col">
        <div class="flex flex-col xl:flex-row xl:items-center justify-between">
          <div class="flex justify-center xl:justify-start">
            <button
              v-for="status in STATUSES"
              :key="status.id"
              type="button"
              :class="{
                'py-2 mr-5 xl:mr-10 cursor-pointer text-sky-800 font-semibold border-b-4 border-transparent transition duration-150 ease-linear': true,
                'border-sky-800': status.id === selectedTab.id
              }"
              @click="setSelectedTab(status)"
            >
              {{ status.value }}
            </button>
          </div>

          <div class="flex border border-gray-300 px-3 py-2 mt-6 xl:mt-0 rounded-md xl:w-1/4">
            <SearchIcon class="w-7 mr-3 text-gray-500" />
            <input
              :value="searchKeyword"
              type="text"
              class="outline-none w-full"
              @input="e => debounce(() => setSearchKeyword(e.target.value), 300, 'search')"
            >
          </div>
        </div>

        <section class="xl:my-7">
          <Table
            v-if="!isMobile"
            :headers="TABLE_HEADERS"
            :items="computeBookings"
            :isLoading="isGettingBookings"
          >
            <template #openDetail="{ item }">
              <RouterLink :to="{
                name: 'AdminBookingDetail',
                params: { id: item.id }
              }">
                <ExternalLinkIcon class="w-5 text-sky-600 cursor-pointer"/>
              </RouterLink>
            </template>
          </Table>
          <MobileTable
            v-else
            :headers="TABLE_HEADERS"
            :items="computeBookings"
            :isLoading="isGettingBookings"
            class="mt-4"
          >
            <template #openDetail="{ item }">
              <RouterLink :to="{
                name: 'AdminBookingDetail',
                params: { id: item.id }
              }">
                <div class="text-sky-800">
                  See detail
                </div>
              </RouterLink>
            </template>
          </MobileTable>
        </section>

        <Pagination
          v-if="!isGettingBookings"
          v-model:currentPage="currentPage"
          :totalPage="totalPage"
          :onUpdatingPage="scrollToTop"
          class="self-center xl:ml-auto"
        />
      </section>
    </section>
  </BaseAdminLayout>
</template>

<script setup>
import BaseAdminLayout from '@/components/admin/BaseAdminLayout'
import { ExternalLinkIcon, SearchIcon } from '@heroicons/vue/solid'
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import Pagination from '@/components/admin/Pagination'
import MobileTable from '@/components/admin/MobileTable'
import Table from '@/components/admin/Table'
import config from '@/constant/config'
import debounce from '@/utils/debouncer'
import useResponsive from '@/composable/responsive'

const STATUSES = Object.entries(config.paymentStatus).map(([id, value]) => ({ id, value }))
STATUSES.unshift({
  id: 'ALL',
  value: 'All'
})

const TABLE_HEADERS = [
  {
    text: 'Name',
    value: 'name'
  },
  {
    text: 'Email',
    value: 'email'
  },
  {
    text: 'Phone',
    value: 'phone'
  },
  {
    text: 'Service',
    value: 'serviceId'
  },
  {
    text: 'Time',
    value: 'bookingTime',
    date: true
  },
  {
    text: 'Total price',
    value: 'totalPrice',
    currency: true
  },
  {
    text: 'Payment status',
    value: 'paymentStatus'
  },
  {
    text: '',
    value: 'openDetail',
    slot: true
  }
]

const { isMobile } = useResponsive()

const store = useStore()

const searchKeyword = ref('')
const selectedTab = ref(STATUSES[0])
const currentPage = ref(1)
const totalPage = ref(0)
const bookings = ref([])
const isGettingBookings = ref(false)

const computeBookings = computed(() => bookings.value.map(booking => ({
  ...booking,
  paymentStatus: config.paymentStatus[booking.paymentStatus]
})))

const setSelectedTab = status => {
  if (isGettingBookings.value) {
    return
  }
  selectedTab.value = status
}

const getBookingList = page => {
  isGettingBookings.value = true
  store.dispatch('getBookingList', {
    payload: {
      page,
      keyword: searchKeyword.value,
      ...(selectedTab.value.id !== 'ALL' && { status: selectedTab.value.id }),
      size: 10
    },
    onSuccess: res => {
      const { data, paging } = res.data
      bookings.value = data
      totalPage.value = paging.totalPage
      currentPage.value = paging.page
      isGettingBookings.value = false
    },
    onFail: () => {
      isGettingBookings.value = false
    }
  })
}

const setSearchKeyword = keyword => {
  searchKeyword.value = keyword
}

const scrollToTop = () => {
  if (isMobile) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  getBookingList(1)
})

watch(currentPage, () => getBookingList(currentPage.value))
watch([selectedTab, searchKeyword], () => getBookingList(1))
</script>
