<template>
  <div class="corner-decor corner-decor-tl"></div>
  <div class="corner-decor corner-decor-tr"></div>
  <div class="corner-decor corner-decor-bl"></div>
  <div class="corner-decor corner-decor-br"></div>
</template>

<style scoped>
.corner-decor {
  position: fixed;
  width: 80px;
  height: 80px;
  pointer-events: none;
  z-index: var(--z-sticky);
}

.corner-decor-tl {
  top: 20px;
  left: 20px;
  border-top: 1px solid var(--accent-primary);
  border-left: 1px solid var(--accent-primary);
}

.corner-decor-tr {
  top: 20px;
  right: 20px;
  border-top: 1px solid var(--accent-primary);
  border-right: 1px solid var(--accent-primary);
}

.corner-decor-bl {
  bottom: 20px;
  left: 20px;
  border-bottom: 1px solid var(--accent-primary);
  border-left: 1px solid var(--accent-primary);
}

.corner-decor-br {
  bottom: 20px;
  right: 20px;
  border-bottom: 1px solid var(--accent-primary);
  border-right: 1px solid var(--accent-primary);
}
</style>
