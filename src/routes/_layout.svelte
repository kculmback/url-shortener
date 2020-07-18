<script>
  import GlobalStyle from "../components/GlobalStyle.svelte";
  import Footer from "../components/Footer.svelte";
</script>

<GlobalStyle />

<main class="h-full flex flex-col">
  <div class="container mx-auto my-8 flex-grow flex-shrink-0">
    <slot />
  </div>
  <div class="px-8">
    <hr class="my-4 mx-auto max-w-lg" />
  </div>
  <Footer />
</main>
