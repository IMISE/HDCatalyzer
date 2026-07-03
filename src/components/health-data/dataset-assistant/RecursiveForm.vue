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
    <div>
        <template v-for="(prop, index) in properties" :key="`${idPrefix}-${prop.path}-${index}`">
            <TemplateDropdownSelect v-if="orders.dataset[selectedAccessLevel].includes(prop.name)"
                class="d-flex align-items-center justify-content-end" id="default-language-select"
                v-model:items="templates" :model-value="selectedTemplate"
                @update:model-value="(template) => selectTemplate(template, prop.path)" />
            <div v-for="(input, i) in localBucket[prop.path] ?? []"
                :key="`${idPrefix}-${prop.path}-${input._uid}-${selectedAccessLevel}`" class="position-relative">
                <button
                    v-if="prop.maxCount !== 1 && localBucket[prop.path]?.length > 1 && input !== localBucket[prop.path][0]"
                    class="btn btn-link position-absolute top-0 start-50 px-3"
                    @click="handleTranslate(prop.path, localBucket[prop.path][i])" :aria-label="'Translate'"
                    :aria-describedby="`${idPrefix}-${prop.path.replace(':', '-')}-${i}-label`">
                    Translate
                </button>
                <!-- Remove entry button -->
                <button v-if="prop.maxCount !== 1 && localBucket[prop.path]?.length > 1"
                    class="btn btn-link position-absolute top-0 end-0 px-3" @click="removeEntry(prop, i)"
                    :aria-label="$t('message.datasetDescriptionAssistant.removeEntryFor')"
                    :aria-describedby="`${idPrefix}-${prop.path.replace(':', '-')}-${i}-label`">
                    <svg class="ecl-icon ecl-icon--m me-2" focusable="false" aria-hidden="true">
                        <use xlink:href="@/assets/img/ecl/icons.svg#trash"></use>
                    </svg>
                </button>

                <!-- Leaf: render a single field -->
                <DynamicInputField v-if="!prop.nestedProperties?.length" class="mb-3"
                    :id="`${idPrefix}-${prop.path.replace(':', '-')}-${i}`" :datatype="prop.datatype"
                    :input="prop.input" :multilingual="isMultilingual(prop)"
                    :readonly="!!prop.hasValue || prop.input.readonly" :required="isRequired(prop, parent, localBucket)"
                    :date-range="getDateRange(prop, i)" v-model="localBucket[prop.path][i]"
                    v-model:saved="localSaved" />

                <!-- Container node -->
                <template v-else>
                    <!-- If the container accepts an IRI, render an input bound to the container's value -->
                    <DynamicInputField v-if="prop.input.type && isIri(prop)" class="mb-3"
                        :id="`${idPrefix}-${prop.path.replace(':', '-')}-${i}`" :datatype="prop.datatype"
                        :input="prop.input" :multilingual="false" :readonly="!!prop.hasValue || prop.input.readonly"
                        :required="isRequired(prop, parent, localBucket)" v-model="localBucket[prop.path][i]"
                        v-model:saved="localSaved" />

                    <!-- Otherwise render a blank node label and recurse into children -->
                    <FauxLabel v-else class="mb-3" :id="`${idPrefix}-${prop.path.replace(':', '-')}-${i}`"
                        :label="getLocaleText(prop.input.label)" :tooltip="getLocaleText(prop.input.tooltip)"
                        :usage-note="getLocaleText(prop.input.usageNote)"
                        :required="isRequired(prop, parent, localBucket)" />
                    <RecursiveForm class="ms-4 ms-md-5" :id-prefix="`${idPrefix}-${prop.path.replace(':', '-')}-${i}`"
                        :properties="prop.nestedProperties"
                        :parent="{ prop, input, isRequired: isRequired(prop, parent, localBucket) }"
                        :selected-access-level="selectedAccessLevel" :has-any-filled-inputs="hasAnyFilledInputs"
                        :is-multilingual="isMultilingual" :is-iri="isIri" :is-required="isRequired"
                        :show-separator="false" v-model:bucket="localBucket[prop.path][i].nestedValues"
                        v-model:saved="localSaved" @add-another="$emit('add-another', $event)" />
                </template>

                <!-- Add another entry for this property -->
                <button v-if="i === localBucket[prop.path].length - 1 && prop.maxCount !== 1"
                    class="btn btn-link d-flex align-items-center p-0 mb-3"
                    :id="String(Object.values(prop.buttonLabel ?? {})[0]).replace(/\W+/g, '-').toLowerCase()"
                    @click="$emit('add-another', { prop, data: localBucket[prop.path] })">
                    <span class="btn btn-sm ecl-u-bg-primary text-white me-3">
                        <svg class="ecl-icon ecl-icon--m me-2" focusable="false" aria-hidden="true">
                            <use xlink:href="@/assets/img/ecl/icons.svg#plus"></use>
                        </svg>
                    </span>
                    <span class="ecl-u-type-color-primary-60">
                        {{ getLocaleText(prop.buttonLabel) }}
                    </span>
                </button>
            </div>

            <hr v-if="showSeparator && index < properties.length - 1"
                class="ecl-separator border-secondary opacity-50 mb-3" />
        </template>
    </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import DynamicInputField from './DynamicInputField.vue';
import FauxLabel from '../common/FauxLabel.vue';
import { getLocaleText } from '@/utils/generalUtils';
import type { AccessLevel, AnyProperty, DataBucket, PropertyContext, ShapeInput } from './types';
import TemplateDropdownSelect from './TemplateDropdownSelect.vue';
import { orders } from '@/utils/sortUtil'

export default {
    name: 'RecursiveForm',
    components: { DynamicInputField, FauxLabel, TemplateDropdownSelect },
    props: {
        idPrefix: { type: String, required: true },
        properties: { type: Array as PropType<AnyProperty[]>, required: true },
        parent: Object as PropType<PropertyContext>,
        selectedAccessLevel: { type: String as PropType<AccessLevel>, required: true },
        hasAnyFilledInputs: {
            type: Function as PropType<(prop: AnyProperty, input: ShapeInput) => boolean>,
            required: true,
        },
        isMultilingual: { type: Function as PropType<(prop: AnyProperty) => boolean>, required: true },
        isIri: { type: Function as PropType<(prop: AnyProperty) => boolean>, required: true },
        isRequired: {
            type: Function as PropType<
                (prop: AnyProperty, parent?: PropertyContext, bucket?: DataBucket) => boolean
            >,
            required: true,
        },
        showSeparator: { type: Boolean, default: true },
        bucket: { type: Object as PropType<DataBucket | undefined>, required: true },
        saved: { type: Boolean, default: false },
    },
    data() {
        return {
            selectedTemplate: "",
            templates: [],
            isDropdownOpen: false,
            orders: orders
        }
    },
    emits: ['update:bucket', 'update:saved', 'add-another', 'handle-template-node', 'handleTranslate'],
    computed: {
        localBucket: {
            get() {
                // If parent didn't provide a bucket yet, initialize one and sync upward
                if (!this.bucket) {
                    const initial: DataBucket = {};
                    this.$emit('update:bucket', initial);
                    return initial;
                }
                return this.bucket;
            },
            set(value: DataBucket) {
                this.$emit('update:bucket', value);
            },
        },
        localSaved: {
            get() {
                return this.saved;
            },
            set(value: boolean) {
                this.$emit('update:saved', value);
            },
        },
    },
    methods: {
        handleTranslate(path: string, prop: any) {
            this.$emit('handle-translate', path, prop)
        },
        selectTemplate(template: string, path: string) {
            this.$emit('handle-template-node', template, path)
        },
        async toggleDropdown() {
            const response = await fetch(`${import.meta.env.VITE_DDA_PROXY_URL}/templates`)
            const data = await response.json();
            this.templates = data
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        getLocaleText,
        /**
         * For dct:temporal and healthdcatap:retentionPeriod containers,
         * provide the current start/end values so DynamicInputField can
         * validate the date range.
         */
        getDateRange(prop: AnyProperty, index: number) {
            // We only care about date leaves inside the two specific containers
            if (
                !this.parent ||
                !this.parent.prop ||
                !['dct:temporal', 'healthdcatap:retentionPeriod'].includes(this.parent.prop.path)
            ) {
                return null;
            }

            if (prop.path !== 'dcat:startDate' && prop.path !== 'dcat:endDate') {
                return null;
            }

            const startInputs = this.localBucket['dcat:startDate'] ?? [];
            const endInputs = this.localBucket['dcat:endDate'] ?? [];

            // In your current structure, there is 1 start + 1 end per container,
            // but we still use the same index for safety.
            const start = startInputs[index]?.value ?? '';
            const end = endInputs[index]?.value ?? '';

            return { parentPath: this.parent.prop.path, currentPath: prop.path, start, end };
        },
        /**
         * Remove a single entry for a repeatable property.
         * @param prop The property to remove the entry from.
         * @param index The index of the entry to remove.
         */
        removeEntry(prop: AnyProperty, index: number) {
            if (this.localBucket[prop.path]?.length > 1) this.localBucket[prop.path].splice(index, 1);
        },
    },
};
</script>

<style scoped>
/* Change the background color of the add button when hovering the parent button */
.btn-link:hover .btn {
    background-color: var(--ecl-color-primary-80) !important;
}
</style>