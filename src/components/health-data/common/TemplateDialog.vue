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
    <dialog class="ecl-modal ecl-modal--l" id="save-template-dialog" aria-modal="true"
        :aria-labelledby="'modal-example-header' + $.uid">
        <div :class="['ecl-modal__container', getClass()]">
            <div class="ecl-modal__content ecl-container" data-test-id="confirmation-dialog-content">
                <header class="ecl-modal__header">
                    <div class="ecl-modal__header-content" :id="'modal-example-header' + $.uid"
                        data-test-id="confirmation-dialog-header-title">
                        {{ mode === "save" ? 'Enter template name' : 'Select template' }}
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
                    <input v-if="mode === 'save'" class="ecl-text-input flex-grow-1" :required="true"
                        v-model="templateName" />
                    <div v-if="mode === 'load'" class="ecl-select__container ecl-select__container--m">
                        <select class="ecl-select" :required="true" v-model="templateName" @click="toggleDropdown()"
                            @blur="toggleDropdown()" data-ecl-auto-init="Select">
                            <option v-for="(item, index) in templates" :key="item._id + index" :value="item._id">{{
                                item._id }}
                            </option>
                        </select>

                        <div class="ecl-select__icon">
                            <button class="ecl-button ecl-button--icon-only" tabindex="-1">
                                <span class="ecl-button__container">
                                    <span class="ecl-button__label" data-ecl-label="true">{{ label }}</span>
                                    <svg :class="`ecl-icon ecl-icon--fluid ${isDropdownOpen ? '' : 'ecl-icon--rotate-180'}
                    ecl-button__icon ecl-button__icon--after`" focusable="false" aria-hidden="true" data-ecl-icon>
                                        <use xlink:href="@/assets/img/ecl/icons.svg#corner-arrow"></use>
                                    </svg>
                                </span>
                            </button>
                        </div>
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
        mode: String,
    },
    data() {
        return { isDropdownOpen: false, templateName: "", templates: [], modalInstance: null };
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
            this.$emit('confirm', this.templateName);
        },
        getClass() {
            if (this.confirmationSize === 'lg') {
                return 'ecl-modal__modal-lg';
            } else {
                return 'ecl-modal__container-sm';
            }
        },
        async toggleDropdown() {
            const response = await fetch(`${import.meta.env.VITE_DDA_PROXY_URL}/templates`)
            const data = await response.json();
            this.templates = data
            this.isDropdownOpen = !this.isDropdownOpen;
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
