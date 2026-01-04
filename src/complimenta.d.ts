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
