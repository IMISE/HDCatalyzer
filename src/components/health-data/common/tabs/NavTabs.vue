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
    <!-- Tab Navigation -->
    <div class="nav nav-tabs border-bottom-0" :id="id" role="tablist" v-bind="$attrs">
        <div v-for="tab in tabs" :key="tab.id" class="nav-item" role="presentation">
            <button :class="['nav-link mb-0 border-bottom-0', { active: tab.id === initialActiveTab }]"
                :id="`${tab.id}-tab`" data-bs-toggle="tab" :data-bs-target="tab.target ?? `#${tab.id}-tab-pane`"
                type="button" role="tab" :aria-controls="tab.target ?? `${tab.id}-tab-pane`"
                :aria-selected="tab.id === initialActiveTab"
                v-on="{ 'show.bs.tab': () => $emit('update:activeTab', tab.id) }">
                <slot name="tab-label" :tab="tab">
                    <span class="p-1">{{ tab.label }}</span>
                </slot>
            </button>
        </div>
    </div>

    <!-- Tab Content -->
    <div class="tab-content bg-primary-subtle py-4 px-3" :id="`${id}-tab-content`">
        <div v-for="tab in tabs" :key="tab.id"
            :class="['tab-pane fade p-4', { 'active show': tab.id === initialActiveTab }]"
            :id="tab.target ?? `${tab.id}-tab-pane`" role="tabpanel" :aria-labelledby="`${tab.id}-tab`">
            <slot name="tab-content" :tab="tab" />
        </div>
    </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { Tab } from './types';

export default {
    name: 'NavTabs',
    props: {
        id: { type: String, default: 'nav-tabs' },
        tabs: { type: Array as PropType<Tab[]>, required: true },
        activeTab: String,
    },
    emits: ['update:activeTab'],
    data() {
        return { initialActiveTab: this.activeTab ?? this.tabs[0]?.id ?? '' };
    },
};
</script>

<style scoped>
.nav-tabs {

    .nav-item:not(:last-child) {
        margin-right: 0.75rem;
    }

    .nav-link:not(.active) {
        border-color: var(--bs-primary-border-subtle);
    }

    .nav-link.active {
        background-color: var(--bs-primary-bg-subtle);
        color: var(--bs-primary-dark);
        font-weight: 600;
    }
}
</style>
