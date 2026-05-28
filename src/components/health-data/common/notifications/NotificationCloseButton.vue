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
    <button class="ecl-button ecl-button--tertiary ecl-notification__close ecl-button--icon-only"
        data-ecl-notification-close @click="$emit('close')">
        <span class="ecl-button__container">
            <span class="ecl-button__label" data-ecl-label="true">
                {{ $t('message.metadata.close') }}
            </span>
            <span class="ecl-icon ecl-icon--m ecl-button__icon" data-ecl-icon focusable="false" aria-hidden="true">
                <svg class="ecl-icon ecl-icon--m me-2" focusable="false" aria-hidden="true">
                    <use xlink:href="@/assets/img/ecl/icons.svg#close-filled"></use>
                </svg>
            </span>
        </span>
    </button>
</template>

<script lang="ts">
export default { name: 'NotificationCloseButton', emits: ['close'] };
</script>
