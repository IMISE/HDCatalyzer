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
    <div v-if="displayNotification" class="ecl-notification ecl-notification--error" data-ecl-notification role="alert">
        <svg class="ecl-icon ecl-icon--m ecl-notification__icon" data-ecl-icon focusable="false" aria-hidden="true">
            <use xlink:href="@/assets/img/ecl/icons.svg#error" />
        </svg>
        <div class="ecl-notification__content">
            <NotificationCloseButton v-if="displayCloseButton" @close="close" />
            <div class="ecl-notification__title">{{ header ?? $t('message.common.error') }}</div>
            <slot>
                <!-- Default slot content -->
                <template v-if="text">
                    <div v-if="!itemId" class="ecl-notification__description">
                        {{ $t(text) }} <span v-if="extraText">{{ extraText }}</span>
                    </div>
                    <div v-else class="ecl-notification__link">
                        <router-link :to="routeTo">
                            {{ text }} <span v-if="extraText">{{ extraText }}</span>
                        </router-link>
                    </div>
                </template>
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import NotificationCloseButton from './NotificationCloseButton.vue';

export default {
    name: 'ErrorNotification',
    components: { NotificationCloseButton },
    props: {
        header: String,
        text: String,
        extraText: String,
        itemId: String,
        routeName: String,
        displayCloseButton: { type: Boolean, default: true },
    },
    computed: {
        routeTo() {
            return {
                name: this.routeName,
                params: { id: this.itemId },
                query: { locale: this.$route.query.locale },
            };
        },
    },
    data() {
        return { displayNotification: true };
    },
    methods: {
        close() {
            this.displayNotification = false;
            this.$emit('close');
        },
    },
};
</script>
