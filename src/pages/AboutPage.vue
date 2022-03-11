<template>
  <BaseLayout>
    <section class="bg-light-black text-white flex flex-col">
      <section class="flex items-center py-10 px-20">
        <p class="text-2xl">About</p>
        <div class="h-1 w-24 bg-white mx-8" />
        <p class="text-4xl font-bold">Our Story</p>
      </section>

      <section class="flex items-center mt-16 w-1/2 self-center">
        <img src="~@/assets/images/about-illustration-1.jpg" class="image" alt="">
        <p class="w-5/12 ml-auto leading-8">
          Futusut was established by a group of friends who aim to create a convenient and independent photography session without eliminating the joy and the aesthetics. We want you to make yourself feel at home and be expressive; pose however you want as nobody's watching and be fully in charge as you are your very own photographer.
        </p>
      </section>

      <section class="flex mt-16">
        <div class="w-1/2 flex flex-col items-center justify-center">
          <p class="w-1/2 text-3xl font-bold mb-6">How it all began</p>
          <p class="w-1/2 leading-7">
            At the beginning of 2022, we were strangers who eventually became friends to create Futusut which we now call home. We were able to unite as we were all passionate about one element: photography. We might still be youths, but we believe that no one is ever too young or too old to dream. With this, we will forever be grateful that we coexist in each other's lives.
          </p>
        </div>

        <div class="w-1/2 relative">
          <video autoplay muted loop class="w-full">
            <source src="~@/assets/videos/background-ocean.mp4" type="video/mp4">
          </video>
          <img
            src="~@/assets/images/about-illustration-1.jpg"
            class="w-60 transform rotate-12 -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2"
            alt=""
          >
        </div>
      </section>

      <section class="text-center mt-32 w-5/12 self-center leading-7">
        <p class="text-4xl mb-4 font-bold">Our Mission</p>
        <p>
          We stand for honest images, filled with unique feelings in an ode to remember the moments you wish to cherish. It's a privilege to witness the genuine images created by you. The poses, the goofy dances, the coy smiles, the tears and laughter are all full of stories to tell, and we are here to translate them into a time machine of memories for you in the shape of pictures.
        </p>
        <p class="text-4xl mt-12 mb-4 font-bold">Our Vision</p>
        <p>
          We wish to be the home for you to celebrate your happiest and most unforgettable moments in your life. Come to us whenever you need us as we are more than happy to pin down all your beautiful memories with our camera. We believe that pictures are full of invaluable mementos for us to recall a precise moment.
        </p>
      </section>

      <section class="mt-32 flex justify-end bg-red-200 h-96">
        <div class="w-1/2 px-10 pt-16 bg-black bg-opacity-30">
          <p class="text-3xl font-bold">Our Services</p>
          <p class="w-1/2 my-6">
            By making an appointment for a photo session at Futusut Studio, not only will you have a private space all by yourself but also be equipped with a high-resolution camera and professional studio lighting. Additionally, a shutter-button will be provided for you so you can strike as many poses as you want! A variety of props are also available to complement your self-photo experience.
          </p>
          <RouterLink
            :to="page.bookOnline"
            class="text-gray-300"
          >
            BOOK NOW
          </RouterLink>
        </div>
      </section>
    </section>
  </BaseLayout>
</template>

<style lang="scss" scoped>
.image {
  height: 500px;
  width: 312px;
  object-fit: cover;
}
</style>

<script setup>
import BaseLayout from '@/components/BaseLayout'
import config from '@/constant/config'

const page = config.page
</script>