<template>
  <BaseLayout>
    <section class="flex flex-col">
      <section class="flex flex-col xl:flex-row pt-10 pb-5 xl:pb-10 px-8 xl:px-20">
        <div class="flex items-center">
          <p class="text-xl xl:text-2xl">Support</p>
          <div class="h-1 w-full xl:w-24 bg-black mx-8" />
        </div>
        <p class="text-2xl font-bold mt-4 xl:mt-0">FAQ</p>
        <div class="mt-4 xl:mt-0 ml-auto">
          <LanguageDropdown />
        </div>
      </section>

      <section class="px-6 xl:px-20 mb-6 xl:mb-32 xl:w-4/6">
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
              v-html="faq.answer"
            />
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
              v-html="faq.answer"
            />
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
import { useI18n } from 'vue-i18n'
import LanguageDropdown from '@/components/LanguageDropdown'

const GENERAL_AND_POLICY_BREAKPOINT = 5

const { t } = useI18n()

const selectedFaq = ref(-1)
const searchKeyword = ref('')

const faqList = computed(() => [
  {
    question: t('faq.one.question'),
    answer: t('faq.one.answer')
  },
  {
    question: t('faq.two.question'),
    answer: t('faq.two.answer')
  },
  {
    question: t('faq.three.question'),
    answer: t('faq.three.answer')
  },
  {
    question: t('faq.four.question'),
    answer: t('faq.four.answer')
  },
  {
    question: t('faq.five.question'),
    answer: t('faq.five.answer')
  },
  {
    question: t('faq.six.question'),
    answer: t('faq.six.answer')
  },
  {
    question: t('faq.seven.question'),
    answer: t('faq.seven.answer')
  },
  {
    question: t('faq.eight.question'),
    answer: t('faq.eight.answer')
  },
  {
    question: t('faq.nine.question'),
    answer: t('faq.nine.answer')
  }
])

const generalFaqList = computed(() => faqList.value.slice(0, 5).filter(f => f.question.toLowerCase().includes(searchKeyword.value.toLowerCase())))
const policyFaqList = computed(() => faqList.value.slice(5, 9).filter(f => f.question.toLowerCase().includes(searchKeyword.value.toLowerCase())))

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
