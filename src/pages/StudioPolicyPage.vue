<template>
  <BaseLayout>
    <section class="flex flex-col">
      <section class="flex items-center py-10 px-20">
        <p class="text-2xl">
          Support
        </p>
        <div class="h-1 w-24 bg-black mx-8" />
        <p class="text-4xl font-bold">
          Studio Policy
        </p>
        <div class="ml-auto">
          <LanguageDropdown />
        </div>
      </section>

      <section class="px-20 mt-6 w-1/2 self-center">
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

      <section class="px-20 mt-6 mb-12 w-1/2 self-center">
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
          class="flex justify-between w-2/5"
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
const damagedGoodsItemsLength = toRaw(tm('regulations.items')).length

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})
</script>
