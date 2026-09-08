<script setup lang="ts">
import { ref } from 'vue';

// Not bound to "formData". Just for evaluation purposes.

const days = ref([
    { "name": 'Montag', "isClosed": false, "openingHoursAmount": 1 },
    { "name": 'Dienstag', "isClosed": false, "openingHoursAmount": 1 },
    { "name": 'Mittwoch', "isClosed": false, "openingHoursAmount": 1 },
    { "name": 'Donnerstag', "isClosed": false, "openingHoursAmount": 1 },
    { "name": 'Freitag', "isClosed": false, "openingHoursAmount": 1 },
    { "name": 'Samstag', "isClosed": false, "openingHoursAmount": 1 },
    { "name": 'Sonntag', "isClosed": false, "openingHoursAmount": 1 }
])

</script>

<template>
    <div v-for="day in days">
        <div class="d-flex row mb-2" v-for="amount in day.openingHoursAmount">
            <span class="col-2">{{ day.name }}</span>
            <label v-if="!day.isClosed" class="col-1" :for="'from' + day">von</label>
            <input v-if="!day.isClosed" class="col-2" type="time" :id="'from' + day" :disabled="day.isClosed" />
            <label v-if="!day.isClosed" class="col-1" :for="'to' + day">bis</label>
            <input v-if="!day.isClosed" class="col-2" type="time" :id="'to' + day" :disabled="day.isClosed" />
            <label class="col-3" :for="'isClosed' + day">Geschlossen</label>
            <input class="col-1" type="checkbox" :id="'isClosed' + day" v-model="day.isClosed" />
        </div>
        <button class="m-2" @click="day.openingHoursAmount += 1">Zeitraum hinzufügen</button>
        <button class="m-2" v-if="day.openingHoursAmount > 1" @click="day.openingHoursAmount -= 1">Zeitraum
            entfernen</button>
    </div>
</template>