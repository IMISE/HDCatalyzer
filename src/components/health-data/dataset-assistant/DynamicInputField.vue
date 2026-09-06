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
    <FormSelectInputField v-if="input.type === 'select'" :id="id" :label="getLocaleText(input.label)"
        :tooltip="getLocaleText(input.tooltip)" :usage-note="getLocaleText(input.usageNote)" :items="input.items"
        :error-fields="errorFields" :readonly="readonly" :required="required" v-model="internalValue" />
    <div v-else-if="input.type === 'checkbox'">
        <FormLabel :id="id" :label="getLocaleText(input.label)" :tooltip="getLocaleText(input.tooltip)"
            :usage-note="getLocaleText(input.usageNote)" :required="required" />
        <FormCheckboxInputField :id="`${id}-checkbox`" :label="getLocaleText(input.checkboxLabel)" :readonly="readonly"
            :required="required" :model-value="internalValue.value === 'true'"
            @update:model-value="internalValue.value = $event ? 'true' : required ? 'false' : ''" />
    </div>
    <OpeningHours v-else-if="input.type === 'opening_hours'" />
    <TemporalResolutionInputField v-else-if="datatype === 'xsd:duration'" :id="id" :label="getLocaleText(input.label)"
        :tooltip="getLocaleText(input.tooltip)" :usage-note="getLocaleText(input.usageNote)" :error-fields="errorFields"
        :readonly="readonly" :required="required" v-model="internalValue.value" @blur="updateErrorFields" />
    <div v-else-if="input.type === 'datetime'">
        <FormLabel :id="id" :label="getLocaleText(input.label)" :tooltip="getLocaleText(input.tooltip)"
            :usage-note="getLocaleText(input.usageNote)" :required="required" />
        <!-- TODO (optional): implement event and error handling  -->
        <!-- <FlatPickr v-model="internalValue.value" :config="flatpickrConfig" :disabled="readonly" :id="id"
            @on-change="onDateTimeChange" @on-close="updateErrorFields" /> -->
        <input type="datetime-local" v-model="internalValue.value" :disabled="readonly" :id="id" />

        <!-- error display -->
        <div v-if="errorFields.length" class="tr-errors">
            <p v-for="(error, idx) in errorFields" :key="`${error.code}-${idx}`">
                {{ $t(`message.common.${error.code}`, error.params) }}
            </p>
        </div>
    </div>
    <FormTextInputField v-else :id="id" :label="getLocaleText(input.label)" :tooltip="getLocaleText(input.tooltip)"
        :usage-note="getLocaleText(input.usageNote)" :placeholder="getLocaleText(input.placeholder)" :type="input.type"
        :multilingual="multilingual" :display-limit="false" :error-fields="errorFields" :readonly="readonly"
        :required="required" v-model="internalValue.value" v-model:language="internalValue.lang"
        :translateLoading="translateLoading" @blur="updateErrorFields" />
</template>

<script lang="ts">
import type { PropType } from 'vue';

// import FlatPickr from 'vue-flatpickr-component';
// import 'flatpickr/dist/flatpickr.css';

import FormCheckboxInputField from '../application/forms/form-fields/FormCheckboxInputField.vue';
import FormLabel from '../application/forms/form-fields/FormLabel.vue';
import FormSelectInputField from '../application/forms/form-fields/FormSelectInputField.vue';
import FormTextInputField from '../application/forms/form-fields/FormTextInputField.vue';
import TemporalResolutionInputField from '@/components/health-data/dataset-assistant/TemporalResolutionInputField.vue';
import { getLocaleText } from '@/utils/generalUtils';
import type { ErrorFields } from '../application/commonTypes';
import type { InputOptions, ShapeInput } from './types';
import OpeningHours from './OpeningHours.vue';

type InternalInput = Omit<ShapeInput, 'nestedValues' | '_uid'> & { key: string };

export default {
    name: 'DynamicInputField',
    components: {
        // FlatPickr,
        FormCheckboxInputField,
        FormLabel,
        FormSelectInputField,
        FormTextInputField,
        TemporalResolutionInputField,
        OpeningHours
    },
    props: {
        id: { type: String, required: true },
        input: { type: Object as PropType<InputOptions>, required: true },
        datatype: String as PropType<string | null>,
        multilingual: { type: Boolean, default: false },
        readonly: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
        modelValue: { type: Object as PropType<ShapeInput>, required: true },
        saved: { type: Boolean, default: false },
        dateRange: {
            type: Object as PropType<{
                parentPath: string;
                currentPath: string;
                start: string;
                end: string;
            } | null>,
            default: null,
        },
        translateLoading: { type: Boolean },
    },
    computed: {
        flatpickrConfig(): any {
            return {
                enableTime: true,
                enableSeconds: true,
                time_24hr: true,

                // 🔹 Internal value (what v-model sees)
                // -> 2025-12-04T00:00:00.000Z (naive, no timezone conversion)
                dateFormat: 'Y-m-d\\TH:i:S.000\\Z',

                // 🔹 What the user sees in the input
                altInput: true,
                altFormat: 'Y-m-d H:i',

                allowInput: true,

                // keep the id on the visible input
                onReady: this.onFlatpickrReady,
            };
        },
    },
    mounted() {
        this.ensureRequiredCheckboxValue();
    },
    emits: ['update:modelValue', 'update:saved'],
    data() {
        const { value, lang } = this.modelValue;
        return {
            internalValue: { value, lang, key: value ?? '' } as InternalInput,
            errorFields: this.getErrorFields(value) as ErrorFields[],
        };
    },
    methods: {
        getLocaleText,
        ensureRequiredCheckboxValue() {
            if (this.input.type === 'checkbox' && this.required && !this.internalValue.value) {
                this.internalValue.value = 'false';
            }
        },
        updateErrorFields() {
            if (this.input.type !== 'select' && this.input.type !== 'datetime')
                this.internalValue.value = this.internalValue.value.trim();
            this.errorFields = this.getErrorFields(this.internalValue.value);
        },
        getErrorFields(value: string): ErrorFields[] {
            const errors: ErrorFields[] = [];

            // base error without the code; code will be added per case
            const baseError: Omit<ErrorFields, 'code'> = { field: this.id, errorMessage: '', params: [] };

            if (value) {
                if (this.datatype === 'xsd:decimal' && isNaN(+value)) {
                    errors.push({ ...baseError, code: 'NumericFormat' });
                } else if (this.datatype === 'xsd:nonNegativeInteger' && !/^\d+$/.test(value)) {
                    errors.push({ ...baseError, code: 'NumericFormat' });
                } else if (this.input.type === 'url' && !/^[A-Za-z][A-Za-z0-9+-.]*:[^\s]*$/.test(value)) {
                    // Basic check for IRI format that is also used in jsonld.toRDF()
                    errors.push({ ...baseError, code: 'IRIFormat' });
                } else if (
                    this.input.type === 'email' &&
                    !/^(mailto:)?[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)
                ) {
                    // Basic check for email format that is also used in jsonld.toRDF()
                    errors.push({ ...baseError, code: 'emailFormat' });
                } else if (this.datatype === 'xsd:duration') {
                    const isoDuration =
                        /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/;
                    if (!isoDuration.test(value)) {
                        errors.push({ ...baseError, code: 'DurationFormat' });
                    }
                } else if (this.input.type === 'datetime' && /dct-(modified|issued)/.test(this.id)) {
                    // ⬇️ NEW: prevent dct:modified / dct:issued from being later than today
                    // value should be like 2024-06-03T08:51:00.000Z
                    const dateMatch = value.match(/^(\d{4}-\d{2}-\d{2})/);
                    if (dateMatch) {
                        const valueDateStr = dateMatch[1]; // "YYYY-MM-DD"

                        const today = new Date();
                        const y = today.getFullYear();
                        const m = String(today.getMonth() + 1).padStart(2, '0');
                        const d = String(today.getDate()).padStart(2, '0');
                        const todayStr = `${y}-${m}-${d}`;

                        // simple lexicographical compare works for YYYY-MM-DD
                        if (valueDateStr > todayStr) {
                            errors.push({ ...baseError, code: 'DateNotLaterThanToday' });
                        }
                    }
                } else if (this.input.type === 'date' && this.dateRange) {
                    // --- temporal / retentionPeriod date-range validation ---
                    const { start, end, currentPath } = this.dateRange;

                    if (start && end) {
                        const startDate = new Date(start);
                        const endDate = new Date(end);

                        if (
                            !Number.isNaN(startDate.getTime()) &&
                            !Number.isNaN(endDate.getTime()) &&
                            startDate > endDate
                        ) {
                            // errors.push({
                            //   ...baseError,
                            //   code: 'DateRange',
                            //  // params: [currentPath, start, end], // params is string[]
                            // });

                            if (currentPath === 'dcat:startDate') {
                                errors.push({
                                    ...baseError,
                                    code: 'DateRange.StartDateAfterEndDate',
                                    // params: [start, end],
                                });
                            } else if (currentPath === 'dcat:endDate') {
                                errors.push({
                                    ...baseError,
                                    code: 'DateRange.EndDateBeforeStartDate',
                                    //  params: [start, end],
                                });
                            }

                            // OPTIONAL: auto-clear the "wrong" date
                            // if (currentPath === 'dcat:startDate') {
                            //   this.internalValue.value = '';
                            // } else if (currentPath === 'dcat:endDate') {
                            //   this.internalValue.value = '';
                            // }
                        }
                    }
                }
            } else if (this.required && this.saved) {
                errors.push({ ...baseError, code: 'NotBlank' });
            }

            // Restore saved state after validation
            if (this.saved) {
                this.$nextTick(() => this.$emit('update:saved', false));
            }

            return errors;
        },
        onDateTimeChange() {
            // internalValue.value is already the ISO string from Flatpickr
            this.updateErrorFields();
        },
        onFlatpickrReady(selectedDates: Date[], dateStr: string, instance: any) {
            // instance.input  -> original hidden input
            // instance.altInput -> visible text input (when altInput: true)
            if (instance.altInput) {
                // Move the id from the hidden input to the visible one
                instance.altInput.id = this.id;
                instance.input.removeAttribute('id');
            }
        },
    },
    watch: {
        internalValue: {
            deep: true,
            handler(this: any, newValue: InternalInput) {
                this.$emit('update:modelValue', {
                    value: this.input.type === 'select' ? newValue.key : newValue.value,
                    lang: newValue.lang,
                    nestedValues: this.modelValue.nestedValues, // Preserve nested values if any
                    _uid: this.modelValue._uid,
                });

                // Re-run validation so DurationFormat (and other format errors)
                // are cleared once the value becomes valid.
                if (this.datatype === 'xsd:duration') {
                    this.updateErrorFields();
                }
            },
        },
        required() {
            this.ensureRequiredCheckboxValue();
            this.updateErrorFields();
        },
        saved(value: boolean) {
            if (value) this.updateErrorFields();
        },
        dateRange: {
            deep: true,
            handler(this: any) {
                if (this.input.type === 'date') {
                    this.updateErrorFields();
                }
            },
        },
    },
};
</script>

<style scoped>
.tr-errors {
    margin: 0.25rem 0 0;
    padding-left: 1.25rem;
    color: #c00;
    font-size: 0.85rem;
}
</style>
