<template>
    <div class="flex h-screen flex-col overflow-hidden">

        <header class="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-white/15 dark:bg-gray-800/50">
            <h1 class="text-base font-semibold text-gray-900 dark:text-white">
                <time datetime="2022-01">{{ "Kalender for " + DateTime.now()
                        .setLocale('da')
                        .toFormat("cccc 'd.' d. MMMM yyyy") }}</time>
            </h1>
            <LiveClockDisplay />
        </header>

        <div ref="scrollContainer" class="isolate flex-1 flex-col bg-white dark:bg-gray-900 overflow-y-auto">

            <div style="width: 165%" class="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">

                <div class="sticky top-0 z-30 flex flex-auto bg-white shadow ring-1 ring-black/5 dark:bg-gray-900 dark:shadow-none dark:ring-white/20">
                    <div class="left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-white/5"></div>
                    <div class="grid flex-auto grid-cols-1 grid-rows-1">
                        <div class="-mr-px hidden divide-x divide-gray-100 border-r border-gray-100 text-sm/6 text-gray-500 sm:grid dark:divide-white/10 dark:border-white/10 dark:text-gray-400"
                                :style="{ gridTemplateColumns: `repeat(${therapists.length}, minmax(0, 1fr))` }">
                            <div v-for="therapist in therapists" :key="therapist.name" class="flex items-center justify-center py-3">
                                <span>{{ therapist.name }}</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="flex flex-auto">
                    <div class="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-white/5"></div>
                    <div ref="eventGrid"
                            class="grid flex-auto grid-cols-1 grid-rows-1 relative"
                            @click="createAppointmentAt">

                        <!-- Current time indicator -->
                        <div ref="currentTimeIndicator"
                                class="absolute left-0 right-0 z-10 flex items-center pointer-events-none"
                                :style="{ top: (now - 84 + 3) * 3.5 / 6 + 'rem' }">
                            <div class="h-2 w-2 rounded-full bg-red-500 -ml-1"></div>
                            <div class="h-[2px] grow bg-red-500"></div>
                        </div>

                        <!-- Horizontal lines -->
                        <div class="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100 dark:divide-white/5 pointer-events-none"
                                style="grid-template-rows: repeat(24, minmax(3.5rem, 1fr))">
                            <div class="row-end-1 h-7"></div>
                            <div>
                                <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">7:00</div>
                            </div>
                            <div></div>
                            <div>
                                <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">8:00</div>
                            </div>
                            <div></div>
                            <div>
                                <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">9:00</div>
                            </div>
                            <div></div>
                            <div>
                                <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">10:00</div>
                            </div>
                            <div></div>
                            <div>
                                <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">11:00</div>
                            </div>
                            <div></div>
                            <div>
                                <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">12:00</div>
                            </div>
                            <div></div>
                            <div>
                                <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">13:00</div>
                            </div>
                            <div></div>
                            <div>
                                <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">14:00</div>
                            </div>
                            <div></div>
                            <div>
                                <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">15:00</div>
                            </div>
                            <div></div>
                            <div>
                                <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">16:00</div>
                            </div>
                            <div></div>
                            <div>
                                <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">17:00</div>
                            </div>
                            <div></div>
                            <div>
                                <div class="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">18:00</div>
                            </div>
                            <div></div>

                        </div>

                        <!-- Vertical lines -->
                        <div class="col-start-1 col-end-2 row-start-1 hidden grid-rows-1 divide-x divide-gray-100 sm:griddark:divide-white/5 pointer-events-none"
                                :style="{ gridTemplateColumns: `repeat(${therapists.length}, minmax(0, 1fr))` }">
                            <div v-for="(_therapist, idx) in therapists"
                                    class="row-span-full"
                                    :style="{
                                        gridColumnStart: idx + 1
                                    }">
                            </div>
                        </div>

                        <!-- Events -->
                        <ol class="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-3"
                                style="grid-template-rows: 1.75rem repeat(144, minmax(0, 1fr)) auto"
                                :style="{ gridTemplateColumns: `repeat(${therapists.length}, minmax(0, 1fr))` }">
                            <template v-for="(therapist, idx) in therapists">
                                <li v-for="appointment in therapist.appointments" :key="appointment.appointmentPk"
                                        class="relative mt-px flex dark:before:pointer-events-none dark:before:absolute dark:before:inset-1 dark:before:z-0 dark:before:rounded-lg dark:before:bg-gray-900"
                                        :style="{
                                            gridColumnStart: idx + 1,
                                            gridRow: `${appointment.start - 84 + 2} / span ${appointment.duration}`
                                        }">
                                    <a href="#"
                                            data-appointment
                                            class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs/5 hover:bg-blue-100 dark:bg-blue-600/15 dark:hover:bg-blue-600/20"
                                            @mousedown="(event) => startDrag(appointment, idx, event)"
                                            @click="edit(appointment)">
                                        <p class="order-1 font-semibold text-blue-700 dark:text-blue-300">{{ appointment.client }}</p>
                                        <p class="text-blue-500 group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">
                                            <time :datetime="appointment.datetime">{{ appointment.datetime.substring(11, 16) }}</time>
                                        </p>
                                    </a>
                                    <div
                                            class="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-blue-400/30 flex items-center justify-center"
                                            @mousedown.stop="startResize(appointment, $event)">
                                    </div>
                                </li>
                            </template>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <WideSlideOver title="Ret aftale" :open="editing" @closed="editing = false">
        <AppointmentForm v-if="appointment" v-model="appointment" @done="editing = false" @cancel="editing = false" @delete="deleteAppointment" />
    </WideSlideOver>
</template>

<script setup lang="ts">

import {onMounted, onUnmounted, type Ref, ref, watch} from "vue";
import {DateTime} from "luxon";
import LiveClockDisplay from "./LiveClockDisplay.vue";
import WideSlideOver from "./WideSlideOver.vue";
import AppointmentForm from "./AppointmentForm.vue";

const appointment = ref<Appointment | null>(null)
const eventGrid = ref<HTMLDivElement | null>(null)

const gridStart = 84
const gridUnits = 144
const defaultDuration = 6
let nextAppointmentPk = 1

function edit(app: Appointment) {
    appointment.value = app;
    editing.value = true
}

function deleteAppointment() {
    if (!appointment.value) return
    const appointmentPk = appointment.value.appointmentPk
    const therapist = therapists.value.find((entry) =>
        entry.appointments.some((appt) => appt.appointmentPk === appointmentPk)
    )
    if (!therapist) {
        editing.value = false
        appointment.value = null
        return
    }
    therapist.appointments = therapist.appointments.filter((appt) => appt.appointmentPk !== appointmentPk)
    editing.value = false
    appointment.value = null
    localStorage.setItem("therapists", JSON.stringify(therapists.value));
}

function createAppointmentAt(event: MouseEvent) {

    console.log('Creating appointment at', event.clientX, event.clientY)

    if (isDragging.value || isResizing.value) return

    const target = event.target as HTMLElement | null
    if (target?.closest('[data-appointment]')) return
    if (!eventGrid.value || therapists.value.length === 0) return

    const rect = eventGrid.value.getBoundingClientRect()
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const headerOffsetPx = 1.75 * rootFontSize
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top - headerOffsetPx

    if (x < 0 || y < 0) return

    const columnWidth = rect.width / therapists.value.length
    const therapistIdx = Math.max(0, Math.min(therapists.value.length - 1, Math.floor(x / columnWidth)))
    const rowHeight = (rect.height - headerOffsetPx) / gridUnits
    const unit = Math.max(0, Math.min(gridUnits - 1, Math.floor(y / rowHeight)))

    const start = gridStart + unit
    const totalMinutes = start * 5
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    const dateString = DateTime.now().toFormat("yyyy-LL-dd")

    const newAppointment: Appointment = {
        client: 'Ny aftale',
        datetime: `${dateString}T${timeString}`,
        duration: defaultDuration,
        start,
        appointmentPk: nextAppointmentPk++
    }

    therapists.value[therapistIdx]!.appointments.push(newAppointment)
    appointment.value = newAppointment
    editing.value = true
}

function blocksSinceMidnight() : number {
    const dateTimeNowInCph = DateTime.now().setZone('Europe/Copenhagen');
    const minutesSinceMidnight = dateTimeNowInCph.hour * 60 + dateTimeNowInCph.minute;
    return Math.floor(minutesSinceMidnight / 5);
}

const editing = ref(false)

const isResizing = ref(false)
const isDragging = ref(false)
const activeAppointment = ref<any>(null)
const initialX = ref(0)
const initialY = ref(0)
const initialStart = ref(0)
const initialTherapistIdx = ref(-1)
const initialDuration = ref(0)

const startDrag = (appointment: any, therapistIdx: number, event: MouseEvent) => {
    isDragging.value = true
    activeAppointment.value = appointment
    initialY.value = event.clientY
    initialX.value = event.clientX
    initialStart.value = appointment.start
    initialTherapistIdx.value = therapistIdx

    window.addEventListener('mousemove', handleDrag)
    window.addEventListener('mouseup', stopDrag)

    event.preventDefault()
}

const handleDrag = (event: MouseEvent) => {
    if (!isDragging.value || !activeAppointment.value) return

    // Vertical movement: beregn antal 5-minutters-enheder som brugeren har flyttet musen
    const deltaY = event.clientY - initialY.value
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const pixelsPerUnit = (3.5 * rootFontSize) / 6
    const deltaUnits = Math.round(deltaY / pixelsPerUnit)

    // Opdater starttidspunktet (må ikke gå før midnat, f.eks. start 0)
    activeAppointment.value.start = Math.max(0, initialStart.value + deltaUnits)

    // Opdater datetime string (simpel version til visning)
    const totalMinutes = activeAppointment.value.start * 5
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    activeAppointment.value.datetime = activeAppointment.value.datetime.substring(0, 11) + timeString

    // --- Horisontal flytning (Behandler) ---
    const deltaX = event.clientX - initialX.value

    // Find containeren for at kende bredden på en kolonne
    const gridContainer = document.querySelector('.grid.flex-auto.grid-cols-1.grid-rows-1.relative')
    if (gridContainer) {
        const columnWidth = gridContainer.clientWidth / therapists.value.length
        const columnDelta = Math.round(deltaX / columnWidth)
        const newTherapistIdx = Math.max(0, Math.min(therapists.value.length - 1, initialTherapistIdx.value + columnDelta))

        if (newTherapistIdx !== initialTherapistIdx.value) {
            // Flyt aftalen i data-strukturen
            const currentTherapist: Therapist = therapists.value[initialTherapistIdx.value]!
            const targetTherapist: Therapist = therapists.value[newTherapistIdx]!

            const appointmentIdx = currentTherapist.appointments.indexOf(activeAppointment.value)
            if (appointmentIdx > -1) {
                currentTherapist.appointments.splice(appointmentIdx, 1)
                targetTherapist.appointments.push(activeAppointment.value)
                initialTherapistIdx.value = newTherapistIdx
                // Vi opdaterer initialX så den passer til den nye kolonne for at undgå "spring"
                initialX.value += columnDelta * columnWidth
            }
        }
    }


}

const stopDrag = () => {
    isDragging.value = false
    activeAppointment.value = null
    initialTherapistIdx.value = -1
    window.removeEventListener('mousemove', handleDrag)
    window.removeEventListener('mouseup', stopDrag)

    // Gem ændringer i localStorage
    localStorage.setItem("therapists", JSON.stringify(therapists.value));
}

const startResize = (appointment: any, event: MouseEvent) => {
    isResizing.value = true
    activeAppointment.value = appointment
    initialY.value = event.clientY
    initialDuration.value = appointment.duration

    // Tilføj globale listeners så vi fanger musen selvom den forlader elementet
    window.addEventListener('mousemove', handleResize)
    window.addEventListener('mouseup', stopResize)

    // Forhindr tekst-markering under drag
    event.preventDefault()
}

const handleResize = (event: MouseEvent) => {
    if (!isResizing.value || !activeAppointment.value) return

    const deltaY = event.clientY - initialY.value

    // 1. Find ud af hvor mange pixels 1rem er i browseren lige nu (typisk 16px)
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)

    // 2. Beregn pixels pr. enhed ud fra din formel: (3.5 rem / 12 enheder)
    const pixelsPerUnit = (3.5 * rootFontSize) / 12

    // 3. Omregn din bevægelse (pixels) til enheder
    const deltaUnits = Math.round(deltaY / pixelsPerUnit)

    // Opdater varigheden, men sæt en minimumsgrænse (f.eks. 1 enhed)
    const newDuration = initialDuration.value + deltaUnits
    activeAppointment.value.duration = Math.max(1, newDuration)
}

const stopResize = () => {
    isResizing.value = false
    activeAppointment.value = null
    window.removeEventListener('mousemove', handleResize)
    window.removeEventListener('mouseup', stopResize)
}

const now = ref(blocksSinceMidnight());

const currentTimeIndicator = ref<HTMLElement | null>(null);

let indicatorTimer: number;
let scrollTimer: number;

onMounted(() => {
    now.value = blocksSinceMidnight();
    indicatorTimer = setInterval(() => {
        now.value = blocksSinceMidnight();
    }, 60000);
    if (currentTimeIndicator.value) {
        currentTimeIndicator.value.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
    scrollTimer = setInterval(() => {
        if (currentTimeIndicator.value) {
            currentTimeIndicator.value.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    }, 3600000);
});

onUnmounted(() => {
    clearInterval(indicatorTimer);
    clearInterval(scrollTimer);
})

const defaultData =[{
        name: "Børge Behandler",
        appointments: [
            {
                appointmentPk: 1,
                client: 'Ole Olsen',
                datetime: '2022-01-15T10:00',
                duration: 18, // unit is 5 minutes
                start: 120 // multiple of 5 minutes since midnight
            },
            {
                appointmentPk: 2,
                client: 'Ib Bo Larsen',
                datetime: '2022-01-15T11:30',
                duration: 6, // unit is 5 minutes
                start: 138 // multiple of 5 minutes since midnight
            },
            {
                appointmentPk: 3,
                client: 'Svend Bent Hagemann',
                datetime: '2022-01-15T13:00',
                duration: 18, // unit is 5 minutes
                start: 156 // multiple of 5 minutes since midnight
            },
            {
                appointmentPk: 4,
                client: 'Bengt Berg',
                datetime: '2022-01-15T15:00',
                duration: 12, // unit is 5 minutes
                start: 180 // multiple of 5 minutes since midnight
            },
        ]
    },
    {
        name: "Maren Massør",
        appointments: [{
            appointmentPk: 5,
            client: 'Peter Petersen',
            datetime: '2022-01-15T12:00',
            duration: 12,
            start: 144
        }]
    },
    {
        name: "Robert Radbrækker",
        appointments: [{
            appointmentPk: 6,
            client: 'Mads Madsen',
            datetime: '2022-01-15T07:30',
            duration: 9,
            start: 90
        }]
    }
];

const therapists: Ref<Therapist[]> = ref([]);

const syncAppointmentPks = () => {
    let maxPk = 0
    therapists.value.forEach((therapist) => {
        therapist.appointments.forEach((appt) => {
            if (!appt.appointmentPk) {
                maxPk += 1
                appt.appointmentPk = maxPk
            }
            maxPk = Math.max(maxPk, appt.appointmentPk)
        })
    })
    nextAppointmentPk = maxPk + 1
}

let data = localStorage.getItem("therapists");
if (!data) {
    therapists.value = defaultData;
    syncAppointmentPks()
    localStorage.setItem("therapists", JSON.stringify(therapists.value));
} else {
    therapists.value = JSON.parse(data);
    syncAppointmentPks()
    localStorage.setItem("therapists", JSON.stringify(therapists.value));
}

watch(therapists, () => localStorage.setItem("therapists", JSON.stringify(therapists.value)), {deep: true})

</script>

<style scoped>

</style>
