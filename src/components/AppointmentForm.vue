<script setup lang="ts">

import {type ModelRef, ref, watch} from "vue";

const appointment: ModelRef<Appointment | undefined> = defineModel();

const emit = defineEmits(['done', 'cancel', 'delete'])

function saveAppointment() {
    emit('done')
}

function cancelEditing() {
    emit('cancel')
}

function deleteAppointment() {
    emit('delete')
}
const durationInMinutes = ref<number>((appointment.value?.duration ?? 6) * 5)

watch(durationInMinutes, () => {
    appointment.value!.duration = durationInMinutes.value / 5;
})

</script>

<template>
    <div class="grid gap-4 grid-cols-[auto_1fr] p-10">
        <label for="client" class="py-2">Klient</label>
        <input id="client" type="text" v-model="appointment!.client" placeholder="Klientens navn" class="border border-gray-300 rounded-md px-3 py-2 w-full">
        <label for="datetime" class="py-2">Aftaledato</label>
        <input id="datetime" type="datetime-local" v-model="appointment!.datetime" class="border border-gray-300 rounded-md px-3 py-2 w-64">
        <label for="duration" class="py-2">Aftalelængde (minutter)</label>
        <input id="duration" type="number" v-model="durationInMinutes" placeholder="Aftalelængde (minutter)"
               class="border border-gray-300 rounded-md px-3 py-2 text-right step w-24" step="5">
    </div>
    <div class="flex justify-end gap-2">
        <button @click="cancelEditing" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">Annuller</button>
        <button @click="saveAppointment" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Gem ændringer</button>
        <button @click="deleteAppointment" class="bg-red-50 text-red-700 px-4 py-2 rounded-md hover:bg-red-100">Slet</button>
    </div>
</template>

<style scoped>

</style>
