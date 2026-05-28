/*Copyright (C) 2024 European Union

__

Licensed under the EUPL, Version 1.2 or – as soon they will be approved by the

European Commission – subsequent versions of the EUPL (the “Licence”);

You may not use this work except in compliance with the Licence.

You may obtain a copy of the Licence at:

*

https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12

*

Unless required by applicable law or agreed to in writing, software distributed under

the Licence is distributed on an “AS IS” basis, WITHOUT WARRANTIES OR CONDITIONS

OF ANY KIND, either express or implied. See the Licence for the specific language

governing permissions and limitations under the Licence.*/
<template>
    <div class="temporal-resolution-field">
        <FormLabel :id="id" :label="label" :tooltip="tooltip" :usage-note="usageNote" :required="required" />

        <div class="temporal-resolution-grid" :aria-labelledby="id">

            <span class="tr-separator">P</span>

            <div class="tr-cell">
                <label :for="`${id}-years`" class="tr-label">Y</label>
                <input :id="`${id}-years`" type="number" min="0" class="form-control tr-input" :readonly="readonly"
                    v-model.number="years" />
            </div>

            <div class="tr-cell">
                <label :for="`${id}-months`" class="tr-label">M</label>
                <input :id="`${id}-months`" type="number" min="0" class="form-control tr-input" :readonly="readonly"
                    v-model.number="months" />
            </div>

            <div class="tr-cell">
                <label :for="`${id}-days`" class="tr-label">D</label>
                <input :id="`${id}-days`" type="number" min="0" class="form-control tr-input" :readonly="readonly"
                    v-model.number="days" />
            </div>

            <span class="tr-separator">T</span>

            <div class="tr-cell">
                <label :for="`${id}-hours`" class="tr-label">H</label>
                <input :id="`${id}-hours`" type="number" min="0" class="form-control tr-input" :readonly="readonly"
                    v-model.number="hours" />
            </div>

            <div class="tr-cell">
                <label :for="`${id}-minutes`" class="tr-label">M</label>
                <input :id="`${id}-minutes`" type="number" min="0" class="form-control tr-input" :readonly="readonly"
                    v-model.number="minutes" />
            </div>

            <div class="tr-cell">
                <label :for="`${id}-seconds`" class="tr-label">S</label>
                <input :id="`${id}-seconds`" type="number" min="0" class="form-control tr-input" :readonly="readonly"
                    v-model.number="seconds" />
            </div>
        </div>

        <!-- Reuse existing errorFields pipeline -->
        <ul v-if="errorFields?.length" class="tr-errors">
            <li v-for="err in errorFields" :key="err.code">
                {{ err.errorMessage || err.code }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import FormLabel from '../application/forms/form-fields/FormLabel.vue';
import { ErrorFields } from '../application/commonTypes';

export default defineComponent({
    name: 'TemporalResolutionInputField',
    components: { FormLabel },
    props: {
        id: { type: String, required: true },
        label: { type: String, required: true },
        tooltip: { type: String, default: '' },
        usageNote: { type: String, default: '' },
        errorFields: { type: Array as PropType<ErrorFields[]>, default: () => [] },
        readonly: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
        modelValue: { type: String, default: '' },
    },
    emits: ['update:modelValue', 'blur'],
    data() {
        return {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    },
    created() {
        this.parseDuration(this.modelValue);
    },
    watch: {
        modelValue(newVal: string) {
            // If external model changes (e.g. loaded from backend), re-parse
            this.parseDuration(newVal);
        },
        // Rebuild duration string when any part changes
        years: 'emitDuration',
        months: 'emitDuration',
        days: 'emitDuration',
        hours: 'emitDuration',
        minutes: 'emitDuration',
        seconds: 'emitDuration',
    },
    methods: {
        parseDuration(value: string) {
            if (!value || typeof value !== 'string') {
                this.resetFields();
                return;
            }

            const isoRegex =
                /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/;

            const match = isoRegex.exec(value);
            if (!match) {
                // If the existing value is invalid, reset; validation will flag it.
                this.resetFields();
                return;
            }

            const [, y, m, d, h, min, s] = match;
            this.years = y ? Number(y) : 0;
            this.months = m ? Number(m) : 0;
            this.days = d ? Number(d) : 0;
            this.hours = h ? Number(h) : 0;
            this.minutes = min ? Number(min) : 0;
            this.seconds = s ? Number(s) : 0;
        },
        resetFields() {
            this.years = 0;
            this.months = 0;
            this.days = 0;
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
        },
        emitDuration() {
            // If everything is zero and not required, emit empty string
            const allZero =
                !this.years &&
                !this.months &&
                !this.days &&
                !this.hours &&
                !this.minutes &&
                !this.seconds;

            if (allZero) {
                this.$emit('update:modelValue', '');
                return;
            }

            // Build strict ISO 8601 duration
            let datePart = '';
            if (this.years) datePart += `${this.years}Y`;
            if (this.months) datePart += `${this.months}M`;
            if (this.days) datePart += `${this.days}D`;

            let timePart = '';
            if (this.hours) timePart += `${this.hours}H`;
            if (this.minutes) timePart += `${this.minutes}M`;
            if (this.seconds) timePart += `${this.seconds}S`;

            let result = 'P';
            if (datePart) result += datePart;
            if (timePart) result += `T${timePart}`;

            this.$emit('update:modelValue', result);
        },
    },
});
</script>

<style scoped>
.temporal-resolution-field {
    margin-bottom: 1rem;
}

.temporal-resolution-grid {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 0.5rem;
}

.tr-cell {
    display: flex;
    flex-direction: column;
    max-width: 5rem;
}

.tr-label {
    font-size: 0.75rem;
    font-weight: 600;
    margin-bottom: 0.1rem;
}

.tr-input {
    padding: 0.25rem 0.5rem;
}

.tr-separator {
    align-self: center;
    font-weight: 700;
    margin: 0 0.25rem;
}

.tr-errors {
    margin: 0.25rem 0 0;
    padding-left: 1.25rem;
    color: #c00;
    font-size: 0.85rem;
}
</style>
