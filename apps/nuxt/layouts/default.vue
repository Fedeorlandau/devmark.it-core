<script lang="ts">
  const title = ref("Devmark.it");

  export default {
    name: "Header",
    data() {
      return {
        title,
      };
    },
  };
</script>

<template>
  <Head>
    <Title>{{ title }}</Title>
    <link
      href="https://cdn.quilljs.com/1.3.6/quill.snow.css"
      rel="stylesheet"
    />
    <Meta name="description" :content="title" />
  </Head>

  <div
    class="bg-black leading-normal tracking-normal text-indigo-400 m-6 max-w-screen-xl mx-auto"
  >
    <div class="h-full bg-black">
      <!--Nav-->
      <div class="w-full container mx-auto px-6 md:px-0">
        <div class="w-full flex items-center justify-between">
          <NuxtLink
            class="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
            href="/"
          >
            <span
              class="text-transparent bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 bg-clip-text"
              >Devmark.it</span
            >
          </NuxtLink>
        </div>
      </div>

      <!--Main-->
      <div class="container mt-4 mx-auto">
        <slot />
        <!--Footer-->
        <div class="w-full pt-16 pb-6 text-sm text-center flex flex-col">
          <a
            class="text-white no-underline hover:underline"
            href="https://fedeorlandau.dev"
            target="blank"
            >&copy; Federico Orlandau 2021</a
          >
          <a class="text-white no-underline hover:underline"
            >Frontend Nuxt UI by Benjamin Kjær</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
