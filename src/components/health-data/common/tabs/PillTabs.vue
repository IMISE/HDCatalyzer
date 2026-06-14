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
    <div class="nav nav-pills" :id="id" role="tablist" v-bind="$attrs">
        <div v-for="tab in tabs" :key="tab.id" class="nav-item" role="presentation">
            <button :class="['nav-link m-2 px-4 py-1', { active: tab.id === initialActiveTab }]" :id="`${tab.id}-tab`"
                data-bs-toggle="tab" :data-bs-target="tab.target ?? `#${tab.id}-tab-pane`" type="button" role="tab"
                :aria-controls="tab.target ?? `${tab.id}-tab-pane`" :aria-selected="tab.id === initialActiveTab"
                v-on="{ 'show.bs.tab': () => $emit('update:activeTab', tab.id) }">
                <slot name="tab-label" :tab="tab">{{ tab.label }}</slot>
            </button>
        </div>
    </div>

    <!-- Tab Content -->
    <div class="tab-content" :id="`${id}-tab-content`">
        <div v-for="tab in tabs" :key="tab.id"
            :class="['tab-pane fade', { 'active show': tab.id === initialActiveTab }]"
            :id="tab.target ?? `${tab.id}-tab-pane`" role="tabpanel" :aria-labelledby="`${tab.id}-tab`">
            <slot name="tab-content" :tab="tab" />
        </div>
    </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { Tab } from './types';

export default {
    name: 'PillTabs',
    props: {
        id: { type: String, default: 'pill-tabs' },
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
.nav-pills {
    margin-left: -0.5rem;
    --bs-nav-link-color: #fff;
    --bs-nav-link-hover-color: #fff;
    --bs-nav-link-font-weight: bold;
    --bs-nav-pills-border-radius: 1.5rem;
    --bs-nav-pills-link-active-bg: var(--bs-warning);
    --bs-nav-pills-link-active-color: #000;

    .nav-link {
        background-color: var(--bs-primary);

        &:not(.active):hover {
            background-color: lch(from var(--bs-primary) calc(l + 11) c h);
        }
    }
}
</style>
