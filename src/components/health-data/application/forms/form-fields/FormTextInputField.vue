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
  <div class="ecl-form-group d-flex flex-column">
    <FormLabel :id="id" :label="label" :required="required" :tooltip="tooltip" :usage-note="usageNote"
      :text-value="localModelValue" :text-limit="textLimit" :display-limit="displayLimit" />

    <AdditionalInformationPerCountry :id="id + '-additional-info'" :values="additionalInformation ?? []" />

    <AlertAdditionalInfo v-if="additionalInformation?.length > 0" :message="$t('message.application.form.editField')" />

    <div class="d-flex align-items-center" :class="{ 'multilingual-container': multilingual }">
      <input v-if="type === 'tel' || type === 'date' || type === 'number'" class="ecl-text-input flex"
        :class="{ 'is-invalid': getErrorMessage.length > 0 && !touched }" :id="id" :type="type"
        :placeholder="placeholder" :required="required"
        :readonly="readonly && (additionalInformation?.length === 0 && !enabledBasedOnParentCondition)"
        v-model="localModelValue" @input="updateValue" @blur="$emit('blur', $event)" :disabled="translateLoading" />
      <textarea v-else-if="type === 'textarea'" class="ecl-text-area flex-grow-1"
        :class="{ 'is-invalid': getErrorMessage.length > 0 && !touched }" :id="id" :placeholder="placeholder" rows="4"
        :required="required"
        :readonly="readonly && (additionalInformation?.length === 0 && !enabledBasedOnParentCondition)"
        v-model="localModelValue" @input="updateValue" @blur="$emit('blur', $event)"
        :disabled="translateLoading"></textarea>
      <input v-else class="ecl-text-input flex-grow-1" :class="{ 'is-invalid': getErrorMessage.length > 0 && !touched }"
        :id="id" :type="type" :placeholder="placeholder" :required="required"
        :readonly="readonly && (additionalInformation?.length === 0 && !enabledBasedOnParentCondition)"
        v-model="localModelValue" @input="updateValue" @blur="$emit('blur', $event)" :disabled="translateLoading" />

      <!-- Language selector -->
      <div v-if="multilingual"
        class="ecl-select__container ecl-select__container--m ecl-u-bg-primary position-absolute top-0 end-0 w-auto rounded">
        <select class="ecl-select h-100" :class="{
          'is-invalid': getErrorMessage.length > 0 && !touched,
          'text-dark bg-white': isDropdownOpen,
          'text-white': !isDropdownOpen,
        }" :id="id + 'LanguageSelector'" data-ecl-auto-init="Select" :required="required"
          :disabled="readonly && (additionalInformation?.length === 0 && !enabledBasedOnParentCondition)"
          v-model="selectedLanguage" @change="updateLanguage" @blur="isDropdownOpen = false"
          @click="isDropdownOpen = !isDropdownOpen" @keydown.space="isDropdownOpen = true">
          <option v-for="lang of languages" :key="lang.key" :value="lang.key" class="text-black">
            {{ lang.value }}
          </option>
        </select>

        <div class="ecl-select__icon">
          <button class="ecl-button ecl-button--icon-only" tabindex="-1" aria-hidden="true">
            <span class="ecl-button__container">
              <svg class="ecl-icon ecl-icon--fluid ecl-button__icon ecl-button__icon--after"
                :class="`${isDropdownOpen ? '' : 'ecl-icon--rotate-180'}`" data-ecl-icon focusable="false"
                aria-hidden="true">
                <use xlink:href="@/assets/img/ecl/icons.svg#corner-arrow"></use>
              </svg>
            </span>
          </button>
        </div>
      </div>

      <!--This functionality is for section 7, 8 for the dynamic list -->
      <button v-if="removeButton" type="button"
        :disabled="readonly && (additionalInformation?.length === 0 && !enabledBasedOnParentCondition)"
        @click="handleRemove()" class="ecl-button ecl-button--tertiary text-nowrap removable-button ms-2"
        data-test-id="remove-email-row-button" :title="$t('message.common.removeRow')">
        <svg class="ecl-icon ecl-icon--m me-2" focusable="false" aria-hidden="true">
          <use xlink:href="@/assets/img/ecl/icons.svg#trash"></use>
        </svg>
      </button>
    </div>
    <div
      :id="`${id}${getErrorMessage === 'Size' ? 'InvalidSize' : getErrorMessage === 'EmailFormat' ? 'InvalidEmailFormat' : getErrorMessage === 'AlphanumericFormat' ? 'InvalidAlphanumericFormat' : 'ErrorMessage'}`"
      v-if="getErrorMessage.length > 0 && !touched" class="ecl-feedback-message">
      <ErrorIcon /> {{ $t('message.common.' + getErrorMessage) + ' ' + getErrorMessageParam }}
    </div>
  </div>
</template>

<script lang="ts">
import FormLabel from '@/components/health-data/application/forms/form-fields/FormLabel.vue';
import type { ErrorFields } from '@/components/health-data/application/commonTypes';
import ErrorIcon from '@/components/health-data/common/ErrorIcon.vue';
import { getSupportedLanguagesForSelect } from '@/utils/generalUtils';
import AdditionalInformationPerCountry
  from "@/components/health-data/application/forms/form-fields/AdditionalInformationPerCountry.vue";
import AlertAdditionalInfo
  from "@/components/health-data/application/forms/form-fields/AlertAdditionalInfo.vue";

export default {
  components: { AlertAdditionalInfo, AdditionalInformationPerCountry, ErrorIcon, FormLabel },
  props: {
    id: String,
    label: { type: String, required: true },
    modelValue: String,
    type: { type: String, default: 'text' },
    placeholder: String,
    tooltip: String,
    usageNote: String,
    required: Boolean,
    listIndex: Number,
    readonly: { type: Boolean, default: false },
    errorFields: { type: Array as () => ErrorFields[], default: () => [] },
    language: String,
    multilingual: { type: Boolean, default: false },
    textLimit: {
      type: Number,
      default: 500
    },
    displayLimit: {
      type: Boolean,
      default: true
    },
    removeButton: {
      type: Boolean,
      default: false
    },
    removeFunction: {
      type: Function,
      required: false
    },
    additionalInformation: {
      type: Array,
      required: false
    },
    enabledBasedOnParentCondition: {
      type: Boolean,
      required: false,
      default: false
    },
    translateLoading: { type: Boolean },
  },
  computed: {
    getErrorMessage(): string {
      let errorMessageObject;
      if (this.listIndex !== undefined) {
        errorMessageObject = this.localErrorFields.find(f =>
          Number(f.listIndex) === this.listIndex && f.field === this.id);
      } else {
        errorMessageObject = this.localErrorFields.find(f =>
          f.field === this.id);
      }

      return errorMessageObject ? errorMessageObject.code : "";
    },
    getErrorMessageParam(): string | undefined {
      const errorMessageObject = this.localErrorFields.find(f =>
        f.field === this.id);

      if (errorMessageObject && errorMessageObject?.params?.length > 0) {
        return errorMessageObject.params[0];
      } else {
        return "";
      }
    },
  },
  data() {
    return {
      localModelValue: this.modelValue,
      languages: getSupportedLanguagesForSelect(),
      selectedLanguage: this.language ?? this.$i18n.locale,
      touched: false,
      isDropdownOpen: false,
      localErrorFields: this.errorFields,
    };
  },
  methods: {
    updateValue(event: any) {
      this.touched = true;
      this.localModelValue = event.target.value;
      this.$emit('input', event.target.value);
    },
    updateLanguage() {
      this.$emit('update:language', this.selectedLanguage);
      this.$nextTick(() => (this.isDropdownOpen = false));
    },
    handleRemove() {
      // Filter out the objects with the specified targetIndex
      const updatedErrorFields = this.localErrorFields
        .filter(error => Number(error.listIndex) !== this.listIndex)
        .map(error => ({ ...error })); // This creates a shallow copy of each object

      // Update listIndex for all remaining objects
      updatedErrorFields.forEach(error => {
        if (Number(error.listIndex) > this.listIndex) {
          error.listIndex = Number(error.listIndex) - 1;
        }
      });

      // Reassign the updated array to ensure reactivity
      this.localErrorFields = [...updatedErrorFields];

      // Emit the updated error fields to the parent if necessary
      this.$emit('update:errorFields', this.localErrorFields);

      this.removeFunction?.(this.listIndex);
    }
  },
  watch: {
    modelValue(newVal) {
      this.touched = true;
      this.localModelValue = newVal;
    },
    localModelValue(newVal) {
      if (newVal !== this.modelValue) {
        this.$emit('update:modelValue', newVal);
      }
    },
    errorFields: {
      deep: true,
      immediate: true,
      handler(newErrorFields) {
        this.localErrorFields = newErrorFields;
        this.touched = false;
      }
    }
  }
};

</script>

<style scoped>
/* TODO (optional) */
.multilingual-container {
  position: relative;
  /* $select-width: 235px; */

  /* Adjust padding to accommodate the language selector */
  .ecl-text-area,
  .ecl-text-input {
    /* padding-right: $select-width + 15px; */
    padding-right: 250px;
  }

  .ecl-select__container {
    height: 44px;

    .ecl-select {
      /* width: $select-width; */
      width: 235px;
    }
  }
}
</style>
