<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { DateTime } from 'luxon'

// Vi bruger Luxon til at håndtere tiden i den korrekte tidszone
const time = ref(DateTime.now().setZone('Europe/Copenhagen'))

let interval: number

onMounted(() => {
  interval = setInterval(() => {
    time.value = DateTime.now().setZone('Europe/Copenhagen')
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="inline-flex items-center gap-3 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
    <!-- Pulsere effekt for at vise uret er aktivt -->
    <div class="relative flex h-2 w-2">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
      <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
    </div>

    <div class="flex flex-col">
      <!-- Selve klokkeslættet -->
      <span class="text-2xl font-mono font-bold tracking-tight text-gray-900 dark:text-white tabular-nums">
        {{ time.toFormat('HH:mm:ss') }}
      </span>
    </div>
  </div>
</template>

<style scoped>
/* Tabular nums sikrer at tallene ikke hopper når de skifter */
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style>
