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
    <div class="notification" v-if="displayNotification">
        <div class="ecl-notification ecl-notification--info" data-ecl-notification role="alert"
            data-ecl-auto-init="Notification">
            <div class="icon-padding">
                <svg class="ecl-icon ecl-icon--s ecl-accordion__toggle-icon" style="fill:#0e47cb;" focusable="false"
                    aria-hidden="true" data-ecl-icon="">
                    <use xlink:href="@/assets/img/ecl/icons.svg#information" />
                </svg>
            </div>
            <div class="ecl-notification__content">
                <button v-if="displayCloseButton" @click="closeNotification"
                    class="ecl-button ecl-button--tertiary ecl-notification__close ecl-button--icon-only" type="button"
                    data-ecl-notification-close>
                    <span class="ecl-button__container">
                        <span class="ecl-button__label" data-ecl-label="true">Close</span>
                        <span class="ecl-icon ecl-icon--m ecl-button__icon" focusable="false" aria-hidden="true"
                            data-ecl-icon>
                            <svg class="ecl-icon ecl-icon--m me-2" focusable="false" aria-hidden="true">
                                <use xlink:href="@/assets/img/ecl/icons.svg#close-filled"></use>
                            </svg>
                        </span>
                    </span>
                </button>
                <div class="ecl-notification__title">{{ header ?? $t('message.common.information') }}</div>
                <div v-if="!itemId" class="ecl-notification__description">{{ $t(text) }}<span v-if="extraText"> {{
                    $t(extraText) }}</span>
                    <span class="ecl-form-label__required" v-if="required">*</span>
                </div>
                <router-link v-else
                    :to="{ name: routeName, params: { id: itemId }, query: { locale: this.$route.query.locale } }">
                    {{ text }}<span v-if="extraText"> {{ extraText }}</span></router-link>
            </div>
        </div>
    </div>

</template>

<script>

export default {
    props: {
        text: { type: String, required: true },
        itemId: String,
        routeName: String,
        extraText: String,
        required: {
            type: Boolean,
            default: false
        },
        displayCloseButton: {
            type: Boolean,
            default: true
        },
        header: {
            type: String
        }
    },
    data() {
        return {
            displayNotification: true
        }
    },
    methods: {
        closeNotification() {
            this.displayNotification = false;
            this.$emit('changeDisplayInfoMessage');
        }
    }

}
</script>

<style scoped>
.notification {
    padding-bottom: 0.5em;
}

.icon-padding {
    padding-right: 0.5em;
}

.ecl-notification__description {
    max-width: inherit;
}
</style>
