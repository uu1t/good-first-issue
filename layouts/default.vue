<template>
  <div>
    <header class="l-header">
      <div class="container mx-auto">
        <div>
          <h1 class="p-title">GitHub<span class="p-title__label">good first issue</span></h1>
        </div>
      </div>
    </header>
    <nuxt />
  </div>
</template>

<style scoped>
.l-header {
  @apply h-16;
  align-items: center;
  background: #24292e;
  display: flex;
}

.p-title {
  font-size: 1.25rem;
  color: #ffffff;
}

.p-title__label {
  @apply ml-2;
  @apply px-2;
  @apply py-1;
  background: #7057ff;
  font-weight: normal;
}
</style>
