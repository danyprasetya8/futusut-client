<template>
  <BaseLayout>
    <section class="flex flex-col w-4/6">
      <section class="flex items-center py-10 px-20">
        <p class="text-2xl">
          Support
        </p>
        <div class="h-1 w-24 bg-black mx-8" />
        <p class="text-4xl font-bold">
          FAQ
        </p>
      </section>

      <section class="px-20 mb-32">
        <div class="flex justify-between">
          <div class="flex text-xl">
            <button
              v-for="tab in FAQ_TABS"
              :key="tab.id"
              type="button"
              :class="{
                'mr-8 cursor-pointer font-semibold hover:text-sky-700 transition duration-150 ease-in-out': true,
                'text-sky-800': selectedTab === tab.id
              }"
              @click="setSelectedTab(tab)"
            >
              <div>{{ tab.text }}</div>
            </button>
          </div>

          <div class="flex border border-gray-300 px-3 py-2 rounded-md w-1/4">
            <SearchIcon class="w-7 mr-3 text-gray-500" />
            <input
              v-model="searchKeyword"
              type="text"
              class="outline-none w-full"
            >
          </div>
        </div>

        <div class="mt-12">
          <div
            v-for="(faq, i) in faqList"
            :key="i"
            class="p-5 border-t-2 border-gray-200"
          >
            <div
              class="flex justify-between cursor-pointer"
              @click="setSelectedFaq(i)"
            >
              <div>{{ faq.question }}</div>
              <ChevronDownIcon
                v-if="selectedFaq !== i"
                class="w-7"
              />
              <ChevronUpIcon
                v-if="selectedFaq === i"
                class="w-7"
              />
            </div>
            <p
              v-if="selectedFaq === i"
              class="mt-4 mb-2 text-gray-500"
            >
              {{ faq.answer }}
            </p>
          </div>
        </div>
      </section>
    </section>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout'
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from '@heroicons/vue/solid'
import { computed, onMounted, ref } from 'vue'

const FAQ_LIST = {
  SETTING_UP: [
    {
      question: 'Can we reschedule our booking?',
      answer: 'Yes! you can reschedule once with maximum 1x24 hours prior to your scheduled session.'
    },
    {
      question: 'Can we walk-in for a session?',
      answer: 'Yes you can, but there is a low possibility that the slot you desire is available. Therefore, we highly encourageyou to do the bookings beforehand through the link in our bio.'
    },
    {
      question: 'What if we late for a session?',
      answer: 'We strongly recommend you to arrive 10 minutes prior to your scheduled time as late arrivals will result in cancellation with no refund. Therefore, if you are unable to arrive on time, we encourage you to make a new booking on available dates/times.'
    },
    {
      question: 'How do we know if our booking is confirmed?',
      answer: 'You can claim your slot after you making your payments online. We will reach out to you regarding your booking via Whatsapp and Email after it is confirmed by our website.'
    },
  ],
  GENERAL: [
    {
      question: 'Do we get our soft copy files?',
      answer: 'Yes, you can get the soft copy files of you session on additional charge (check our Price List for more info). Please note that soft copy files are only accessible 7 days after your session so please download your photos before they expire.'
    },
    {
      question: 'Can we use our shoes inside the studio?',
      answer: 'Sorry but we do not allow shoes from outside the studio, but we do provide you comfy slippers :)'
    },
    {
      question: 'Can we bring our pets?',
      answer: 'As much as we love pets and admire them, our studio is not pet friendly :( Let\'s hope that soon we can allow your cute furbabies inside the studio!'
    },
    {
      question: 'How many pax is the maximum?',
      answer: 'Due to Covid-19 measures, we limit the number of our guests to maximum 8 pax per session.'
    },
    {
      question: 'What clothing code would you recommend?',
      answer: 'Many of our guests prefer wearing contrast clothes like lightly-colored tops and dark-coloured bottoms. But at the end of the day, wear whatever that is comfortable for you and be confident during the session! You will look good anyway :)'
    }
  ]
}

const FAQ_TABS = [
  {
    id: 'SETTING_UP',
    text: 'Setting up FAQs'
  },
  {
    id: 'GENERAL',
    text: 'General'
  }
]

const selectedTab = ref('SETTING_UP')
const selectedFaq = ref(-1)
const searchKeyword = ref('')

const faqList = computed(() => FAQ_LIST[selectedTab.value].filter(f => f.question.includes(searchKeyword.value)))

const setSelectedTab = tab => {
  selectedTab.value = tab.id
  selectedFaq.value = -1
  searchKeyword.value = ''
}

const setSelectedFaq = index => {
  if (selectedFaq.value === index) {
    selectedFaq.value = -1
    return
  }
  selectedFaq.value = index
}

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})
</script>
