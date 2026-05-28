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
    <div class="ecl-accordion__item">
        <component :is="headingLevel" class="ecl-accordion__title" :id="titleId">
            <button class="ecl-accordion__toggle pb-4" data-ecl-accordion-toggle type="button"
                :aria-controls="contentId" :aria-expanded="isOpen" @click="toggle">
                <span class="ecl-accordion__toggle-flex">
                    <!-- Slot for the header/title -->
                    <span class="ecl-accordion__toggle-title">
                        <slot name="title" />
                    </span>
                    <span class="ecl-accordion__toggle-indicator">
                        <svg v-if="!isOpen" class="ecl-icon ecl-icon--s ecl-accordion__toggle-icon"
                            data-ecl-accordion-icon focusable="false" aria-hidden="true">
                            <use xlink:href="@/assets/img/ecl/icons.svg#plus" />
                        </svg>
                        <svg v-else class="ecl-icon ecl-icon--s ecl-accordion__toggle-icon" data-ecl-accordion-icon
                            focusable="false" aria-hidden="true">
                            <use xlink:href="@/assets/img/ecl/icons.svg#minus" />
                        </svg>
                    </span>
                </span>
            </button>
        </component>

        <section class="ecl-accordion__content py-2" :id="contentId" :aria-labelledby="titleId" :hidden="!isOpen"
            :style="fullWidth ? { '--max-w': '100%' } : {}">
            <!-- Default slot for the content -->
            <slot />
        </section>
    </div>
</template>

<script lang="ts">
export default {
    name: 'AccordionItem',
    props: {
        id: { type: String, default: 'accordion-item' },
        fullWidth: { type: Boolean, default: false },
        headingLevel: { type: String, default: 'h3' }
    },
    data() {
        return { isOpen: false, titleId: `${this.id}-title`, contentId: `${this.id}-content` };
    },
    methods: {
        toggle() {
            this.isOpen = !this.isOpen;
        },
    },
};
</script>
