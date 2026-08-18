<script setup lang="js">
const props = defineProps(['properties', 'defaultLanguage', 'selectedAccessLevel', 'datasetEntries', 'isChild'])

defineEmits(['handleScrollToInput'])
</script>

<template>
    <div v-for="(shape, index) in properties"
        :class="'p-2 ' + (!isChild ? (index % 2 === 0 ? 'bg-light' : 'bg-light-darker') : '')"
        @click="$emit('handleScrollToInput', shape.path)">
        <strong v-if="shape.input.label">{{ shape.input.label[defaultLanguage] }}</strong>
        <div class="border rounded p-2 mb-1" v-for="input in datasetEntries[shape.path]">
            <div v-if="input.value === '' && !input.nestedValues">
                <svg v-if="shape.requirement[selectedAccessLevel] === 'mandatory'"
                    class="ecl-icon ecl-icon--m me-2 text-danger" focusable="false" aria-hidden="true">
                    <use xlink:href="@/assets/img/ecl/icons.svg#warning"></use>
                </svg>
                <svg v-else class="ecl-icon ecl-icon--m me-2 text-warning" focusable="false" aria-hidden="true">
                    <use xlink:href="@/assets/img/ecl/icons.svg#warning"></use>
                </svg>
            </div>
            <div v-else>{{ input.value }}</div>
            <RecursiveDetails v-if="input.nestedValues" :properties="shape.nestedProperties"
                :defaultLanguage="defaultLanguage" :selectedAccessLevel="selectedAccessLevel"
                :datasetEntries="input.nestedValues" :isChild="true" />
        </div>
    </div>
</template>

<style scoped>
.bg-light-darker {
    background-color: #f1f1f1;
}
</style>