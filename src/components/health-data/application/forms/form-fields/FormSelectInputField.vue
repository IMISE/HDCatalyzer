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
    <FormLabel
      v-if="label"
      :id="id"
      :label="label"
      :required="required"
      :tooltip="tooltip"
      :usage-note="usageNote"
    />

    <AdditionalInformationPerCountry
      :id="id + '-additional-info'"
      :values="additionalInformation ?? []"
    />

    <AlertAdditionalInfo
      v-if="additionalInformation?.length > 0"
      :message="$t('message.application.form.editField')"
    />

    <div class="ecl-select__container ecl-select__container--m">
      <select class="ecl-select" :id="id"
              :required="required"
              :disabled="readonly && (additionalInformation?.length === 0 && !enabledBasedOnParentCondition)"
              v-model="localModelValue"
              :class="{'is-invalid': getErrorMessage.length > 0 && !touched}"
              @click="toggleDropdown()"
              @blur="toggleDropdown()"
              @change="updateValue($event)"
              data-ecl-auto-init="Select">
        <option v-for="(item, index) in filteredItems"
                :key="item.value + index"
                :value="item.key">{{ item.value }}
        </option>
      </select>

      <div class="ecl-select__icon">
        <button class="ecl-button ecl-button--icon-only" tabindex="-1">
            <span class="ecl-button__container">
              <span class="ecl-button__label" data-ecl-label="true">{{ label }}</span>
              <svg :class="`ecl-icon ecl-icon--fluid ${isDropdownOpen ? '' : 'ecl-icon--rotate-180'}
                    ecl-button__icon ecl-button__icon--after`"
                   focusable="false" aria-hidden="true" data-ecl-icon>
                <use xlink:href="@/assets/img/ecl/icons.svg#corner-arrow"></use>
              </svg>
            </span>
        </button>
      </div>
    </div>
    <div :id="`${id}ErrorMessage`" v-if="getErrorMessage.length > 0 && !touched" class="ecl-feedback-message">
      <ErrorIcon /> {{ $t('message.common.' + getErrorMessage) }}
    </div>
  </div>
</template>

<script lang="ts">
import FormLabel from "@/components/health-data/application/forms/form-fields/FormLabel.vue";
import {ErrorFields, SelectObject} from "@/components/health-data/application/commonTypes";
import ErrorIcon from '@/components/health-data/common/ErrorIcon.vue';
import ECCheckbox from "@/components/health-data/common/ECCheckbox.vue";
import AdditionalInformationPerCountry
  from "@/components/health-data/application/forms/form-fields/AdditionalInformationPerCountry.vue";
import AlertAdditionalInfo
  from "@/components/health-data/application/forms/form-fields/AlertAdditionalInfo.vue";

export default {
  components: {
    AlertAdditionalInfo,
    AdditionalInformationPerCountry, ECCheckbox, ErrorIcon, FormLabel },
  props: {
    id: String,
    label: String,
    modelValue: Object as () => SelectObject,
    items: {
      type: Array as () => SelectObject[]
    },
    tooltip: String,
    usageNote: String,
    required: Boolean,
    placeholder: String,
    showFilter: {
      type: String as () => "always" | "never" | "auto",
      default: "auto"
    },
    readonly: {
      type: Boolean,
      default: false
    },
    useDefaultDropDownList: {
      type: Boolean,
      default: true
    },
    errorFields: {
      type: Array as () => ErrorFields[],
      default: () => []
    },
    additionalInformation: {
      type: Array,
      required: false
    },
    enabledBasedOnParentCondition : {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      localModelValue: this.modelValue?.key,
      open: false,
      filter: "",
      filterTimeout: null,
      touched: false,
      isDropdownOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      if (!(this.readonly && (this.additionalInformation?.length === 0 && !this.enabledBasedOnParentCondition))){
        this.isDropdownOpen = !this.isDropdownOpen;
      }
    },
    updateValue(event) {
      if (!(this.readonly && (this.additionalInformation?.length === 0 && !this.enabledBasedOnParentCondition))) {
        const key = event.target.value;
        this.touched = true;
        this.localModelValue = key;
        const newInputValue = this.items?.find(i => i.key === key);
        this.$emit('input', newInputValue);
      }
    },
    activate() {
      this.showOptions();
      this.$nextTick(() => {
        const searchInput = this.$refs['search-input'] as HTMLInputElement | null;
        if (searchInput) {
          searchInput.focus();
        } else {
          (this.$refs["value-display"] as HTMLElement)?.focus();
        }
      });
    },
    away() {
      this.open = false;
    },
    showOptions() {
      this.open = true;
    },
  },
  computed: {
    filteredItems(): SelectObject[] {
      const lcFilter = this.filter?.toLowerCase() ?? "";
      return this.items?.filter(item => item.value?.toLowerCase().includes(lcFilter)) ?? [];
    },
    getErrorMessage(): string {
      const errorMessageObject = this.errorFields.find(f => f.field.split('.')[0] === this.id);
      return errorMessageObject ? errorMessageObject.code : "";
    },
  },
  watch: {
    modelValue(newVal: SelectObject) {
      this.touched = true;
      this.localModelValue = newVal?.key;
    },
    localModelValue(newVal, oldVal) {
      // HARD GUARD – do nothing when readonly
      if (this.readonly && (this.additionalInformation?.length === 0 && !this.enabledBasedOnParentCondition)) {
        // optionally reset to previous value to avoid UI drift
        this.localModelValue = this.modelValue?.key ?? oldVal;
        return;
      }

      if (newVal !== this.modelValue?.key) {
        const newInputValue = this.items?.find(i => i.key === newVal);
        this.$emit('update:modelValue', newInputValue);
      }
    },
    errorFields: {
      deep: true,
      handler() {
        this.touched = false;
      },
    },
  },
};

</script>
