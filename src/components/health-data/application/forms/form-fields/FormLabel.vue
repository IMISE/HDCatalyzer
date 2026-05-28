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
  <div class="d-flex flex-column">
    <div class="d-flex align-items-center justify-content-between">
      <label :for="id" class="ecl-form-label fw-bold" :id="id + '-label'"
        style="white-space:normal!important;max-width: 100%;">
        {{ label }}

        <span v-if="required" class="ecl-form-label__required" role="note"
          :aria-label="$t('message.common.required')">*</span>
        <span v-if="localTextValue?.length > 0 && displayLimit" class="fst-italic mt-0 mb-1 small">
          &nbsp;({{ localTextValue?.length }}/{{ textLimit }})
        </span>
      </label>

      <button v-if="additionalInfoNotification" type="button" class="ecl-button--primary  mb-1 mt-1 orangeNotif"
        :aria-controls="id + '_editable'" @click="toggleEditableSection">
        <svg class="ecl-icon ecl-icon--m me-2" focusable="false" aria-hidden="true">
          <use xlink:href="@/assets/img/ecl/icons.svg#feedback"></use>
        </svg>
      </button>
    </div>

    <small v-if="tooltip || usageNote" class="fst-italic mt-0 mb-1">
      <template v-if="tooltip">
        <svg class="ecl-icon ecl-icon--m me-2" focusable="false" aria-hidden="true">
          <use xlink:href="@/assets/img/ecl/icons.svg#information"></use>
        </svg>
        <span v-if="tooltipWithHTML" :id="id + '-tooltip'" v-html="sanitizedTooltip"></span>
        <span v-else :id="id + '-tooltip'">{{ tooltip }}</span>
      </template>

      <!-- Show Usage Note Button -->
      <button v-if="usageNote" class="btn btn-link btn-usage-note align-top border-0 ms-1 p-0"
        :id="id + '-usage-note-button'" type="button" @click="toggleShowMore" :aria-expanded="showMore"
        :aria-controls="id + '-usage-note'">
        {{ showMore ? $t('message.common.viewLess') : $t('message.common.viewMore') }}
        <CornerArrowIcon class="align-baseline" :class="{ 'ecl-icon--rotate-180': !showMore }" />
      </button>
    </small>

    <!-- Usage Note -->
    <small v-if="showMore" class="usage-note bg-body-secondary fst-italic mb-2 p-1" :id="id + '-usage-note'">
      <strong>{{ $t('message.common.usageNote') }}:</strong> {{ usageNote }}
    </small>
  </div>
</template>

<script lang="ts">
import CornerArrowIcon from '@/components/health-data/common/CornerArrowIcon.vue';

export default {
  name: 'FormLabel',
  components: { CornerArrowIcon },
  props: {
    id: String,
    label: {
      type: String,
      default: '',
    },
    tooltip: String,
    tooltipWithHTML: {
      type: Boolean,
      default: false,
    },
    usageNote: String,
    required: Boolean,
    textValue: {
      type: String,
      default: '',
    },
    textLimit: {
      type: Number,
      default: 500,
    },
    displayLimit: {
      type: Boolean,
      default: true,
    },
    additionalInfoNotification: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    sanitizedTooltip() {
      // Sanitize the tooltip content to remove unsafe HTML
      // Use a local instance of DOMPurify to avoid global configuration
      return DOMPurify().sanitize(this.tooltip ?? '', { ADD_ATTR: ['class'] });
    },
  },
  data() {
    return { localTextValue: this.textValue, showMore: false };
  },
  methods: {
    toggleShowMore() {
      this.showMore = !this.showMore;
    },
  },
  watch: {
    textValue(newVal) {
      this.localTextValue = newVal;
    },
  },
};
</script>

<style scoped>
.btn-usage-note {
  font-size: 0.8rem;
}

.usage-note {
  width: fit-content;
  /* Take as much space as the text content */
  white-space: pre-line;
  /* Preserve whitespace and line breaks */
}

.orangeNotif,
.orangeNotif:focus,
.orangeNotif:hover {
  background: #FF8133 !important;
  border-radius: 50%;
}
</style>
