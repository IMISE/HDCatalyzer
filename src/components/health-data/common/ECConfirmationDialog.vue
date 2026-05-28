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
    <dialog class="ecl-modal ecl-modal--l" id="confirmation-dialog" aria-modal="true"
        :aria-labelledby="'modal-example-header' + $.uid">
        <div :class="['ecl-modal__container', getClass()]">
            <div class="ecl-modal__content ecl-container" data-test-id="confirmation-dialog-content">
                <header class="ecl-modal__header">
                    <div class="ecl-modal__header-content" :id="'modal-example-header' + $.uid"
                        data-test-id="confirmation-dialog-header-title">
                        {{ $t(title) }}
                    </div>
                    <button class="ecl-button ecl-button--tertiary ecl-modal__close ecl-button--icon-only"
                        data-ecl-modal-close type="button">
                        <span class="ecl-button__container">
                            <span class="ecl-button__label" data-ecl-label="true">{{
                                $t('message.metadata.close')
                                }}
                            </span>
                            <svg class="ecl-icon ecl-icon--s ecl-icon--rotate-180 ecl-select__icon-shape"
                                focusable="false" aria-hidden="true">
                                <use xlink:href="@/assets/img/ecl/icons.svg#close-outline"></use>
                            </svg>
                        </span>
                    </button>
                </header>
                <div class="ecl-modal__body">
                    <div v-if="context" class="data-ecl-modal-scroll">{{ $t(context, { dynamicValue: dynamicValue }) }}
                    </div>
                    <slot />
                    <!-- Data Access Applications -->
                    <div v-if="dataAccessApplicationTitles && dataAccessApplicationTitles.length > 0"
                        class="ecl-form-label">{{ $t(dataAccessApplicationHeader) }}</div>
                    <div v-if="dataAccessApplicationTitles && dataAccessApplicationTitles.length > 0"
                        class="ecl-modal__body-scroll data-ecl-modal-scroll">
                        <ul>
                            <li v-for="context in dataAccessApplicationTitles">{{ context }}</li>
                        </ul>
                    </div>

                    <!-- Data Request Applications -->
                    <div v-if="dataRequestApplicationTitles && dataRequestApplicationTitles.length > 0"
                        class="ecl-form-label mt-2">{{ $t(dataRequestApplicationHeader) }}</div>
                    <div v-if="dataRequestApplicationTitles && dataRequestApplicationTitles.length > 0"
                        class="ecl-modal__body-scroll data-ecl-modal-scroll">
                        <ul>
                            <li v-for="context in dataRequestApplicationTitles">{{ context }}</li>
                        </ul>
                    </div>
                    <div class="data-ecl-modal-scroll" v-if="contextBelow">
                        {{ $t(contextBelow) }}
                    </div>
                </div>
                <footer class="ecl-modal__footer">
                    <div class="ecl-modal__footer-content">
                        <button class="ecl-button ecl-button--secondary ecl-modal__button" id="cancelButton"
                            data-test-id="cancelButton" type="button" @click="cancel">
                            {{ $t(cancelButton) }}
                        </button>
                        <button class="ecl-button ecl-button--primary ecl-modal__button" id="confirmButton"
                            data-test-id="confirmButton" type="button" @click="confirm" :disabled="disableConfirm">
                            {{ $t(confirmButton) }}
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    </dialog>
</template>

<script>
export default {
    props: {
        title: String,
        cancelButton: String,
        confirmButton: String,
        disableConfirm: { type: Boolean, default: false },
        context: String,
        dynamicValue: String,
        dataRequestApplicationHeader: { type: String, required: false, default: null },
        dataRequestApplicationTitles: { type: Array, required: false, default: null },
        dataAccessApplicationHeader: { type: String, required: false, default: null },
        dataAccessApplicationTitles: { type: Array, required: false, default: null },
        confirmationSize: { type: String, required: false, default: null },
        contextBelow: { type: String, required: false, default: null },
    },
    data() {
        return { modalInstance: null };
    },
    methods: {
        /** Initializes the modal and opens it. */
        open() {
            if (!this.modalInstance) {
                this.modalInstance = new window.ECL.Modal(this.$el);
                this.modalInstance.init();
            }
            this.modalInstance.openModal();
        },
        cancel() {
            this.modalInstance?.closeModal();
        },
        confirm() {
            this.modalInstance?.closeModal();
            this.$emit('confirm');
        },
        getClass() {
            if (this.confirmationSize === 'lg') {
                return 'ecl-modal__modal-lg';
            } else {
                return 'ecl-modal__container-sm';
            }
        },
    },
    beforeUnmount() {
        if (this.modalInstance) {
            this.modalInstance.closeModal();
            this.modalInstance.destroy();
            this.modalInstance = null;
        }
    },
};
</script>

<style>
.ecl-modal__header {
    display: flex !important;
}
</style>
