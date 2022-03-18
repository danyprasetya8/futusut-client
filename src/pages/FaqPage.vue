<template>
  <BaseLayout>
    <section class="flex flex-col xl:w-4/6">
      <section class="flex flex-col xl:flex-row py-10 px-8 xl:px-20">
        <div class="flex items-center">
          <p class="text-xl xl:text-2xl">Support</p>
          <div class="h-1 w-full xl:w-24 bg-black mx-8" />
        </div>
        <p class="text-2xl font-bold mt-4 xl:mt-0">FAQ</p>
      </section>

      <section class="px-4 xl:px-20 mb-6 xl:mb-32">
        <div class="flex border border-gray-300 px-3 py-2 mt-6 xl:mt-0 rounded-md xl:w-1/4">
          <SearchIcon class="w-7 mr-3 text-gray-500" />
          <input
            v-model="searchKeyword"
            type="text"
            class="outline-none w-full"
          >
        </div>

        <div class="text-lg xl:text-xl font-semibold my-6">
          General
        </div>

        <template v-if="generalFaqList.length">
          <div
            v-for="(faq, i) in generalFaqList"
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
        </template>
        <template v-else>
          No question found
        </template>

        <div class="text-lg xl:text-xl font-semibold mt-10 mb-6">
          Policy
        </div>

        <template v-if="policyFaqList.length">
          <div
            v-for="(faq, i) in policyFaqList"
            :key="i"
            class="p-5 border-t-2 border-gray-200"
          >
            <div
              class="flex justify-between cursor-pointer"
              @click="setSelectedFaq(i + GENERAL_AND_POLICY_BREAKPOINT)"
            >
              <div>{{ faq.question }}</div>
              <ChevronDownIcon
                v-if="selectedFaq !== i + GENERAL_AND_POLICY_BREAKPOINT"
                class="w-7"
              />
              <ChevronUpIcon
                v-if="selectedFaq === i + GENERAL_AND_POLICY_BREAKPOINT"
                class="w-7"
              />
            </div>
            <p
              v-if="selectedFaq === i + GENERAL_AND_POLICY_BREAKPOINT"
              class="mt-4 mb-2 text-gray-500"
            >
              {{ faq.answer }}
            </p>
          </div>
        </template>
        <template v-else>
          No question found
        </template>
      </section>
    </section>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout'
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from '@heroicons/vue/solid'
import { computed, onMounted, ref, watch } from 'vue'

const GENERAL_AND_POLICY_BREAKPOINT = 5

const FAQ_LIST = [
  {
    question: 'Do I get soft copy files from my session?',
    answer: 'You can get the soft copy files from your session on additional charge (check our Price List for more info). Please note that soft copy files are only accessible 7 days after your session so please download your photos before they expire.'
  },
  {
    question: 'Can I use my shoes inside the studio?',
    answer: 'Sorry, any kind of footwear from outside is not allowed in the studio, but we do provide you comfy slippers :)'
  },
  {
    question: 'Can I bring my pets?',
    answer: 'As much as we love pets and admire them, our studio is not pet friendly :( Let\'s hope that soon we can allow your cute furbabies inside the studio!'
  },
  {
    question: 'What is the maximum number of people in the studio?',
    answer: 'Due to Covid-19 measures, we limit the number of our guests to maximum 8 people per session.'
  },
  {
    question: 'What clothing code would you recommend?',
    answer: 'Many of our guests prefer wearing contrast clothes like lightly-colored tops and dark-coloured bottoms. But at the end of the day, wear whatever that is comfortable for you and be confident during the session! You will look good anyway :)'
  },
  {
    question: 'Can I cancel my booking?',
    answer: 'Unfortunately, you can\'t cancel/ask for a refund after you have booked your session. But you can definitely reschedule your session! <br />*maximum 1x24 hours prior to your scheduled session. <br />*limited to one time'
  },
  {
    question: 'Can I walk-in for a session?',
    answer: 'Yes you can, but there is a low possibility that the slot you desire is available. Therefore, we highly encourage you to do the bookings beforehand through the link on our bio.'
  },
  {
    question: 'What if we late for a session?',
    answer: 'We strongly recommend you to arrive 10 minutes prior to your scheduled time as late arrivals will result in cancellation with no refund. Therefore, if you are unable to arrive on time, we encourage you to make a new booking on available dates/times.'
  },
  {
    question: 'How do I know if my booking is confirmed?',
    answer: 'You can claim your slot after you making your payments online. We will reach out to you regarding your booking via Whatsapp and Email after it is confirmed by our website.'
  }
]

const selectedFaq = ref(-1)
const searchKeyword = ref('')

const generalFaqList = computed(() => FAQ_LIST.slice(0, 5).filter(f => f.question.toLowerCase().includes(searchKeyword.value.toLowerCase())))
const policyFaqList = computed(() => FAQ_LIST.slice(5, 9).filter(f => f.question.toLowerCase().includes(searchKeyword.value.toLowerCase())))

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

watch([generalFaqList, policyFaqList], () => {
  selectedFaq.value = -1
})
</script>
