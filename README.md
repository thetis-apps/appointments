# Overview of the current days appointments

This is a simple prototype of an app that shows a list of the current days appointments in a calendar.

## Technologies used

- Vue.js version 3
- Tailwind CSS
- TypeScript
- Tailwind UI calendar component (used as a starting point)
- Vite

## Features

- Display appointments for the current day
- Responsive design for various screen sizes
- User-friendly interface
- Adapts to the number of therapists
- Data are currently hardcoded - see AppointmentDailyOverview.vue.
- Highly customizable thanks to Tailwind CSS

## Integration

The app can be built using the following command: npm run build. The output is in the dist folder. The content of the dist folder can be deployed on one of the Apache servers.

Data can be passed from the legacy application using shared memory - or maybe better - session storage. 