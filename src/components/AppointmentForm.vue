<script setup lang="ts">

import {type ModelRef, ref, watch} from "vue";

const appointment: ModelRef<Appointment | undefined> = defineModel();

const emit = defineEmits(['done'])

function saveAppointment() {
    emit('done')
}

const durationInMinutes = ref<number>((appointment.value?.duration ?? 6) * 5)

watch(durationInMinutes, () => {
    appointment.value!.duration = durationInMinutes.value / 5;
})

</script>

<template>
    <div class="flex flex-col gap-4">
        <input type="text" v-model="appointment!.client" placeholder="Klientens navn" class="border border-gray-300 rounded-md px-3 py-2 w-full">
        <input type="datetime-local" v-model="appointment!.datetime" class="border border-gray-300 rounded-md px-3 py-2 w-full">
        <input type="number" v-model="durationInMinutes" placeholder="Aftalelængde (minutter)"
               class="border border-gray-300 rounded-md px-3 py-2 w-full text-right step" step="5">
        <button @click="saveAppointment" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Gem ændringer</button>
    </div>
</template>

<style scoped>

</style>