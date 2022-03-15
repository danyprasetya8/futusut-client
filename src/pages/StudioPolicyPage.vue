<template>
  <BaseLayout>
    <section class="flex flex-col">
      <section class="flex flex-col xl:flex-row py-10 px-8 xl:px-20">
        <div class="flex items-center">
          <p class="text-xl xl:text-2xl">Support</p>
          <div class="h-1 w-full xl:w-24 bg-black mx-8" />
        </div>
        <p class="text-2xl font-bold mt-4 xl:mt-0">Studio Policy</p>
        <div class="mt-4 xl:mt-0 ml-auto">
          <LanguageDropdown />
        </div>
      </section>

      <section class="px-12 xl:px-20 xl:mt-6 xl:w-1/2 self-center">
        <div class="text-xl font-bold mb-2 underline">
          {{ t('protocols.title') }}
        </div>

        <ul
          v-for="i in protocolItemsLength"
          :key="i"
          class="list-disc"
        >
          <li>{{ t(`protocols.items[${i - 1}]`) }}</li>
        </ul>
      </section>

      <section class="px-12 xl:px-20 mt-6 mb-12 xl:w-1/2 self-center">
        <div class="text-xl font-bold mb-2 underline">
          {{ t('regulations.title') }}
        </div>

        <ul
          v-for="i in regulationItemsLength"
          :key="i"
          class="list-disc"
        >
          <li>{{ t(`regulations.items[${i - 1}]`) }}</li>
        </ul>

        <div class="text-xl font-bold mt-6 mb-2 underline">
          {{ t('regulations.damagedGoodsTitle') }}
        </div>

        <div
          v-for="i in damagedGoodsItemsLength"
          :key="i"
          class="flex justify-between xl:w-2/5"
        >
          <div>{{ t(`regulations.damagedGoodsItems[${i - 1}].name`) }}</div>
          <div>{{ numberFormatter(t(`regulations.damagedGoodsItems[${i - 1}].price`), 'Rp. ') }}</div>
        </div>
      </section>
    </section>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout'
import LanguageDropdown from '@/components/LanguageDropdown'
import { onMounted, toRaw } from 'vue'
import { useI18n } from 'vue-i18n'
import { numberFormatter } from '@/utils/formatter'

const { t, tm } = useI18n()

const protocolItemsLength = toRaw(tm('protocols.items')).length
const regulationItemsLength = toRaw(tm('regulations.items')).length
const damagedGoodsItemsLength = toRaw(tm('regulations.damagedGoodsItems')).length

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})
</script>
