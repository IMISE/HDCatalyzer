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
  <div class="ecl-form-group">
    <div class="row align-items-center">
      <div class="col-md-12">
        <AlertAdditionalInfo
          v-if="additionalInformation?.length > 0"
          :message="$t('message.application.form.editField')"
        />

        <e-c-checkbox
          :label="label"
          :id="String(id)"
          :hasError="getErrorMessage?.length > 0 && !touched"
          :disabled="readonly && (additionalInformation?.length === 0 && !enabledBasedOnParentCondition)"
          :checked="localModelValue"
          :on-change="updateValue"
          :required="required"
          :help-text="tooltip"
          class="mb-2"
        />

        <AdditionalInformationPerCountry
          :id="id + '-additional-info'"
          :values="additionalInformation ?? []"
        />
      </div>
    </div>
    <div :id="`${id}ErrorMessage`" v-if="getErrorMessage.length > 0 && !touched" class="ecl-feedback-message">
      <ErrorIcon /> {{ $t('message.common.' + getErrorMessage) }}
    </div>
  </div>
</template>

<script lang="ts">
import FormLabel from "@/components/health-data/application/forms/form-fields/FormLabel.vue";
import ECCheckbox from "@/components/health-data/common/ECCheckbox.vue";
import {ErrorFields} from "@/components/health-data/application/commonTypes";
import ErrorIcon from '@/components/health-data/common/ErrorIcon.vue';
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
    modelValue: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    tooltip: String,
    required: Boolean,
    readonly: {
      type: Boolean,
      default: false
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
      localModelValue: this.modelValue,
      touched: false
    };
  },
  computed : {
    getErrorMessage(): string{
      const errorMessageObject = this.errorFields.find(f => f.field === this.id);
      return errorMessageObject ? errorMessageObject.code : "";
    },
  },
  methods: {
    updateValue(checked: boolean) {
      if (!(this.readonly && (this.additionalInformation?.length === 0 && !this.enabledBasedOnParentCondition))) {
        this.touched = true;
        this.localModelValue = checked;
      }
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
      handler() {
        this.touched = false;
      },
    },
  }
};

</script>
