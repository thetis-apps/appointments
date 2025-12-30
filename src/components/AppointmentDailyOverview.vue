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
                    <div class="grid flex-auto grid-cols-1 grid-rows-1 relative">

                        <!-- Current time indicator -->
                        <div
                                class="absolute left-0 right-0 z-10 flex items-center pointer-events-none"
                                :style="{ top: (now - 84 + 2) * 3.5 / 6 + 'rem' }">
                            <div class="h-2 w-2 rounded-full bg-red-500 -ml-1"></div>
                            <div class="h-[2px] grow bg-red-500"></div>
                        </div>

                        <!-- Horizontal lines -->
                        <div class="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100 dark:divide-white/5"
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
                        <div class="col-start-1 col-end-2 row-start-1 hidden grid-rows-1 divide-x divide-gray-100 sm:griddark:divide-white/5"
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
                                <li v-for="appointment in therapist.appointments" :key="appointment.datetime"
                                        class="relative mt-px flex dark:before:pointer-events-none dark:before:absolute dark:before:inset-1 dark:before:z-0 dark:before:rounded-lg dark:before:bg-gray-900"
                                        :style="{
                                            gridColumnStart: idx + 1,
                                            gridRow: `${appointment.start - 84 + 2} / span ${appointment.duration}`
                                        }">
                                    <a href="#" class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs/5 hover:bg-blue-100 dark:bg-blue-600/15 dark:hover:bg-blue-600/20">
                                        <p class="order-1 font-semibold text-blue-700 dark:text-blue-300">{{ appointment.client }}</p>
                                        <p class="text-blue-500 group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">
                                            <time :datetime="appointment.datetime">{{ appointment.datetime.substring(11, 16) }}</time>
                                        </p>
                                    </a>
                                </li>
                            </template>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, type Ref, ref} from "vue";
import {DateTime} from "luxon";
import LiveClockDisplay from "./LiveClockDisplay.vue";

interface Therapist {
    name: string;
    appointments: Appointment[];
}

interface Appointment {
    client: string;
    datetime: string;
    duration: number;
    start: number;
}

function blocksSinceMidnight() : number {
    const dateTimeNowInCph = DateTime.now().setZone('Europe/Copenhagen');
    const minutesSinceMidnight = dateTimeNowInCph.hour * 60 + dateTimeNowInCph.minute;
    return Math.floor(minutesSinceMidnight / 5);
}

const now = ref(blocksSinceMidnight());

// Brug det til dine 5-minutters blokke

let timer: number;
onMounted(() => {
    timer = setInterval(() => {
        now.value = blocksSinceMidnight();
    }, 1000);
})

onUnmounted(() => {
    clearInterval(timer);
})

const therapists: Ref<Therapist[]> = ref([{
        name: "Børge Behandler",
        appointments: [
            {
                client: 'Ole Olsen',
                datetime: '2022-01-15T10:00',
                duration: 18, // unit is 5 minutes
                start: 120 // multiple of 5 minutes since midnight
            },
            {
                client: 'Ib Bo Larsen',
                datetime: '2022-01-15T11:30',
                duration: 6, // unit is 5 minutes
                start: 138 // multiple of 5 minutes since midnight
            },
            {
                client: 'Svend Bent Hagemann',
                datetime: '2022-01-15T13:00',
                duration: 18, // unit is 5 minutes
                start: 156 // multiple of 5 minutes since midnight
            },
            {
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
            client: 'Peter Petersen',
            datetime: '2022-01-15T12:00',
            duration: 12,
            start: 144
        }]
    },
    {
        name: "Robert Radbrækker",
        appointments: [{
            client: 'Mads Madsen',
            datetime: '2022-01-15T07:30',
            duration: 9,
            start: 90
        }]
    }]
);

</script>

<style scoped>

</style>