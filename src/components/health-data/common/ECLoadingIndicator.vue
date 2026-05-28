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
    <div v-if="localLoadingBar" class="loading-spinner-overlay">
        <div class="ecl-spinner ecl-spinner--primary ecl-spinner--m ecl-spinner--visible" role="alert">
            <svg class="ecl-spinner__loader" viewBox="25 25 50 50">
                <circle class="ecl-spinner__circle" cx="50" cy="50" r="20" fill="none" stroke-width="4px"
                    stroke-miterlimit="10" vector-effect="non-scaling-stroke" />
            </svg>
            <div class="ecl-spinner__text">Loading</div>
        </div>
    </div>
</template>

<script>

export default {
    name: "ECLoadingIndicator",
    props: {
        loadingBar: Boolean
    },
    data() {
        return {
            localLoadingBar: this.loadingBar
        }
    },
    watch: {
        loadingBar: {
            deep: true,
            immediate: true,
            handler(newVal) {
                this.localLoadingBar = newVal;
            }
        }
    }
}
</script>

<style scoped>
.loading-spinner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.7);
    /* semi-transparent background */
    z-index: 1000;
    /* Make sure it's above other content */
}
</style>
