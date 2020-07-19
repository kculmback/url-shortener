<script>
  import ErrorAlert from "../components/ErrorAlert.svelte";

  let url = "";
  let customShortUrl = "";
  let loading = false;
  let success = null;
  let error = null;
  let validationErrors = {};

  async function submitUrl() {
    error = null;
    validationErrors = {};
    success = null;
    loading = true;

    const response = await fetch(`shorten`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, customShortUrl })
    });
    const data = await response.json();

    loading = false;

    if (response.status === 200) {
      success = { ...data };
      url = "";
      customShortUrl = "";
      return;
    }

    console.log(data);

    if (response.status === 400) {
      validationErrors = data.errors;
      return;
    }

    if (response.status === 409) {
      validationErrors.customShortUrl = data.error;
      return;
    }

    error = "Something went wrong";
  }
</script>

<svelte:head>
  <title>URL Shortener</title>
</svelte:head>

<h1 class="text-center text-5xl font-black">URL Shortener</h1>

<form class="my-4 mx-auto max-w-xl" on:submit|preventDefault={submitUrl}>
  <label class="block my-6">
    <span class="font-bold text-lg mb-1 block">URL</span>
    <input
      bind:value={url}
      class="block w-full rounded-lg p-4 shadow-md {validationErrors.url ? 'border-2 border-red-500' : ''}
      dark:bg-gray-300 dark:border-gray-300 dark:text-gray-900"
      type="text"
      placeholder="www.example.com"
      required />
    {#if validationErrors.url}
      <ErrorAlert>{validationErrors.url}</ErrorAlert>
    {/if}
  </label>
  <label class="block my-6">
    <span class="font-bold text-lg mb-1 block">Custom URL</span>
    <div class="flex items-center">
      <span class="mr-4 flex-grow flex-shrink-0">k-c.dev/</span>
      <input
        bind:value={customShortUrl}
        class="block w-full rounded-lg p-4 shadow-md {validationErrors.customShortUrl ? 'border-2 border-red-500' : ''}
        dark:bg-gray-300 dark:border-gray-300 dark:text-gray-900"
        type="text"
        placeholder="soCustom"
        minlength="5"
        maxlength="100" />
    </div>
    {#if validationErrors.customShortUrl}
      <ErrorAlert>{validationErrors.customShortUrl}</ErrorAlert>
    {/if}
  </label>
  {#if error}
    <ErrorAlert>{error}</ErrorAlert>
  {/if}
  {#if success}
    <div
      class="bg-green-200 border border-green-600 rounded text-green-800 p-4
      full-width my-4">
      Successfully created URL redirect for
      <a
        href={`//${window.location.host}/${success.shortUrl}`}
        target="_blank"
        rel="noopener nofollow noreferrer"
        class="text-green-900 font-bold underline">
        k-c.dev/{success.shortUrl}
      </a>
      to {success.url}
    </div>
  {/if}
  <button
    class="block mt-12 py-2 px-6 w-full rounded text-white bg-teal-500
    hover:bg-teal-600 transition-colors duration-300 shadow-md"
    type="submit">
    Submit
  </button>
</form>
