<script setup lang="ts">
import { ref } from 'vue';

// Not bound to "formData". Just for evaluation purposes.

const days = ref([
    { "name": 'Montag', "isClosed": false },
    { "name": 'Dienstag', "isClosed": false },
    { "name": 'Mittwoch', "isClosed": false },
    { "name": 'Donnerstag', "isClosed": false },
    { "name": 'Freitag', "isClosed": false },
    { "name": 'Samstag', "isClosed": false },
    { "name": 'Sonntag', "isClosed": false }
])

</script>

<template>
    <div v-for="day in days" class="d-flex row mb-2">
        <span class="col-2">{{ day.name }}</span>
        <label v-if="!day.isClosed" class="col-1" :for="'from' + day">von</label>
        <input v-if="!day.isClosed" class="col-2" type="time" :id="'from' + day" :disabled="day.isClosed" />
        <label v-if="!day.isClosed" class="col-1" :for="'to' + day">bis</label>
        <input v-if="!day.isClosed" class="col-2" type="time" :id="'to' + day" :disabled="day.isClosed" />
        <label class="col-3" :for="'isClosed' + day">Geschlossen</label>
        <input class="col-1" type="checkbox" :id="'isClosed' + day" v-model="day.isClosed" />
    </div>
</template>