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
  <div v-if="message" class="alert-additional-info d-flex align-items-start w-100 mb-2">
    <svg class="ecl-icon ecl-icon--m me-2" focusable="false" aria-hidden="true">
      <use xlink:href="@/assets/img/ecl/icons.svg#warning"></use>
    </svg>

    <span class="alert-text">
      {{ message }}
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: "AlertAdditionalInfo",
  props: {
    message: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.alert-additional-info {
  background-color: #fff7d6;
  border: 1px solid #f0e1a0;
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 14px;
  color: #3d3d3d;
}

.alert-text {
  display: block;
  line-height: 1.4;
}
</style>
