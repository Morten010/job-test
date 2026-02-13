<template>
  <main class="min-h-screen flex flex-col">
    <UiNavbar />
    <div class="grow flex flex-col">
      <slot />
    </div>
    <UiFooter />
  </main>
</template>
