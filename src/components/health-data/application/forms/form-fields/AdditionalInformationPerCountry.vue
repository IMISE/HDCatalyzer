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
    <div v-for="item in nonEmptyValues" :key="item.countryCode" class="d-flex align-items-start mb-3 mb-2">
      <!-- <CircleFlags size="small" :country="item.countryCode" class="me-2 mt-4" /> -->
      <textarea class="ecl-text-area flex-grow-1" rows="3" readonly :value="item.additionalText"></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import FormLabel from '@/components/health-data/application/forms/form-fields/FormLabel.vue';

export default {
  name: 'AdditionalInformationPerCountry',
  components: { FormLabel },
  props: {
    id: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    tooltip: {
      type: String,
      required: false,
    },
    usageNote: {
      type: String,
      required: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    values: {
      type: Array as () => { countryCode: string; additionalText: string }[],
      required: true,
    },
  },
  computed: {
    nonEmptyValues(): { countryCode: string; additionalText: string }[] {
      return (this.values || []).filter(
        (v) =>
          v &&
          true &&
          v.additionalText.trim().length > 0
      );
    },
    hasValues(): boolean {
      return this.nonEmptyValues.length > 0;
    },
  },
};
</script>

<style scoped>
.d-flex.align-items-start.mb-3.mb-2 {
  background: #FFCFB1;
  padding: 10px;
}

.ecl-text-area.flex-grow-1,
.ecl-text-area.flex-grow-1:active .ecl-text-area.flex-grow-1:focus .ecl-text-area.flex-grow-1:hover {
  border-color: #FF8133 !important;
  outline: #FF8133 !important;
}
</style>
