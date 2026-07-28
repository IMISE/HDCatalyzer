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
        <label v-if="label" class="d-inline-flex align-items-center fw-bold me-4" :for="id">
            {{ label }}
            <i v-if="tooltip" class="material-icons ms-1" data-bs-toggle="tooltip"
                :id="'tooltip-' + label.replace(/\W+/g, '-')" v-bootstrap-tooltip="tooltip">
                <svg class="ecl-icon ecl-icon--m me-2" focusable="false" aria-hidden="true">
                    <use xlink:href="@/assets/img/ecl/icons.svg#information"></use>
                </svg>
            </i>
        </label>

        <div class="dropdown">
            <button class="ecl-button ecl-button--primary fw-bold pe-1" :class="variant" :id="id"
                data-bs-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded="false" v-on="{
                    'hide.bs.dropdown': () => (isOpen = false),
                    'show.bs.dropdown': () => (isOpen = true),
                }" @click="handleOpen">
                <div class="d-flex justify-content-between align-items-center">
                    Select clinic
                    <div class="d-flex align-items-center ms-1 px-2 fs-5">
                        <svg class="ecl-icon ecl-icon--fluid ecl-button__icon ecl-button__icon--after"
                            :class="{ 'ecl-icon--rotate-180': !isOpen }" focusable="false" aria-hidden="true">
                            <use xlink:href="@/assets/img/ecl/icons.svg#corner-arrow"></use>
                        </svg>
                    </div>
                </div>
            </button>

            <ul class="dropdown-menu" :aria-labelledby="id">
                <li v-for="item in items" :key="item._id">
                    <a class="dropdown-item" href="#" @click.prevent="updateSelected(item)">
                        {{ item['Name'] }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
type Option = { value: string | number; label: string };

export default {
    name: 'TemplateDropdownSelect',
    props: {
        id: { type: String, required: true },
        label: String,
        tooltip: String,
        variant: { type: String, default: '' },
        modelValue: { type: [String, Number], required: true },
    },
    emits: ['update:modelValue'],
    data() {
        return {
            isOpen: false,
            items: [],
        };
    },
    methods: {
        /**
         * Updates the local state and emits the new value.
         * @param item - The new selected item.
         */
        updateSelected(item: Option) {
            this.$emit('update:modelValue', item);
        },
        async handleOpen() {
            const response = await fetch(`${import.meta.env.VITE_DDA_PROXY_URL}/kliniken`)
            const data = await response.json()
            this.items = data
        }
    },
};
</script>

<style scoped>
.material-icons {
    font-size: 0.975rem;
}
</style>
