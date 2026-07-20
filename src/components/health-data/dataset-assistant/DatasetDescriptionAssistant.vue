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
    <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="successToast" class="toast text-white bg-success" role="alert" aria-live="assertive"
            aria-atomic="true">
            <div class="d-flex align-items-center">
                <div class="toast-body">
                    {{ toastMessage }}
                </div>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"
                    aria-label="Close"></button>
            </div>
        </div>
    </div>
    <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="errorToast" class="toast text-white bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex align-items-center">
                <div class="toast-body">
                    {{ toastMessage }}
                </div>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"
                    aria-label="Close"></button>
            </div>
        </div>
    </div>
    <div v-if="isComponentReady" class="ecl-container mt-4">
        <!-- Context -->
        <Accordion background-class="ecl-u-bg-primary-10 mb-4">
            <AccordionItem class="no-accent" heading-level="h2">
                <template #title>
                    <span class="text-primary-dark fw-bolder fs-5">
                        {{ $t('message.datasetDescriptionAssistant.context.title') }}
                    </span>
                </template>
                <!-- <section>
                    <template v-for="paragraph in contextParagraphs">
                        <p v-html="paragraph" />
                    </template>
                </section> -->
            </AccordionItem>
        </Accordion>

        <!-- Access Level Information -->
        <div class="ecl-u-shadow-1 ecl-u-bg-primary-10 ecl-u-border-radius-8 mb-4 px-4 py-3" id="accessLevelInfo">
            <div v-for="level in accessLevels">
                <strong :class="level.color">{{ level.label }}:</strong> {{ level.description }}
            </div>
        </div>

        <div class="alert alert-primary d-flex align-items-center">
            <!-- Access Level Selection -->
            <DropdownSelect class="d-flex align-items-center ecl-u-mr-2xl" id="access-level-select"
                :label="$t('message.datasetDescriptionAssistant.accessLevel')"
                :tooltip="$t('message.datasetDescriptionAssistant.accessLevelTooltip')" :items="accessLevelItems"
                :variant="datasetAccessLevels[selectedAccessLevel].backgroundColor" :model-value="selectedAccessLevel"
                @update:model-value="updateAccessLevel" />

            <!-- Default Language Selection -->
            <DropdownSelect class="d-flex align-items-center" id="default-language-select"
                :label="$t('message.datasetDescriptionAssistant.defaultLanguage')" :items="languages"
                :model-value="defaultLanguage" @update:model-value="updateDefaultLanguage" />
        </div>

        <!-- Buttons -->
        <div class="d-flex justify-content-end mb-3">
            <button class="ecl-button ecl-button--primary fw-bold m-2" id="create-snapshot" data-bs-toggle="tooltip"
                data-bs-placement="top" v-bootstrap-tooltip="!isAuthenticated ? $t('message.datasetDescriptionAssistant.saveTooltip') : ''
                    " @click="handleSnapshot">Create Snapshot
            </button>

            <button class="ecl-button ecl-button--primary fw-bold m-2" id="save-template-modal-toggle"
                data-bs-toggle="tooltip" data-bs-placement="top" v-bootstrap-tooltip="!isAuthenticated ? $t('message.datasetDescriptionAssistant.saveTooltip') : ''
                    " @click="openTemplateDialog('save')">Save Template
            </button>

            <button class="ecl-button ecl-button--primary fw-bold m-2" id="load-template-button"
                data-bs-toggle="tooltip" data-bs-placement="top" v-bootstrap-tooltip="!isAuthenticated ? $t('message.datasetDescriptionAssistant.saveTooltip') : ''
                    " @click="openTemplateDialog('load')">Load Template
            </button>

            <!-- Save button with tooltip when disabled -->
            <button class="ecl-button ecl-button--primary fw-bold m-2" id="save-button" data-bs-toggle="tooltip"
                data-bs-placement="top" v-bootstrap-tooltip="!isAuthenticated ? $t('message.datasetDescriptionAssistant.saveTooltip') : ''
                    " :disabled="true" @click="handleSave">
                {{ $t('message.datasetDescriptionAssistant.save') }}
            </button>

            <!-- Clear button -->
            <button class="ecl-button ecl-button--primary fw-bold m-2" id="clear-button" @click="handleClear">
                <svg class="ecl-icon ecl-icon--m me-2" focusable="false" aria-hidden="true">
                    <use xlink:href="@/assets/img/ecl/icons.svg#trash"></use>
                </svg>
                {{ $t('message.datasetDescriptionAssistant.clear') }}
            </button>

            <!-- Validate button with tooltip when disabled -->
            <!-- TODO: add :disabled="!isAuthenticated" -->
            <button class="ecl-button ecl-button--primary fw-bold m-2" id="validate-button" data-bs-toggle="tooltip"
                data-bs-placement="top" v-bootstrap-tooltip="!canValidate ? $t('message.datasetDescriptionAssistant.validateTooltip') : ''
                    " @click="handleValidate">
                <svg class="ecl-icon ecl-icon--m me-2" focusable="false" aria-hidden="true">
                    <use xlink:href="@/assets/img/ecl/icons.svg#check"></use>
                </svg>
                {{ $t('message.datasetDescriptionAssistant.validate') }}
            </button>

            <!-- Export button -->
            <button :disabled="true" class="ecl-button ecl-button--primary fw-bold m-2 me-0 dropdown-toggle"
                id="export-button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <svg class="ecl-icon ecl-icon--m me-2" focusable="false" aria-hidden="true">
                    <use xlink:href="@/assets/img/ecl/icons.svg#external"></use>
                </svg>
                {{ $t('message.datasetDescriptionAssistant.export') }}
            </button>
            <ul class="dropdown-menu custom-dropdown-menu" aria-labelledby="export-button">
                <li v-for="(format, key) of supportedFormats" :key="key">
                    <a class="dropdown-item" :id="`export-${key}`" :href="key" @click.prevent="handleExport">
                        {{ format.label }}
                    </a>
                </li>
            </ul>
        </div>

        <e-c-confirmation-dialog ref="clearDialog" :cancelButton="'message.common.no'"
            :confirmButton="'message.common.yes'" :context="'message.datasetDescriptionAssistant.clearConfirm'"
            :title="'message.datasetDescriptionAssistant.clearTitle'" @confirm="confirmClear" />

        <TemplateDialog :mode="templateDialogMode" ref="templateDialog" :cancelButton="'message.common.no'"
            :confirmButton="'message.common.yes'" @confirm="handleTemplate" />

        <!-- Validation Errors -->
        <section v-if="validationErrors.length || validationWarnings.length" class="mb-3" id="validation-errors">
            <ErrorNotification v-for="error in validationErrors" :key="error.id" :header="error.description"
                @close="handleCloseError(error.id)">
                <div v-if="error.test" class="ecl-notification__description">
                    <strong>{{ $t('message.datasetDescriptionAssistant.test') }}:</strong> {{ error.test }}
                </div>
                <div v-if="error.location" class="ecl-notification__description">
                    <strong>{{ $t('message.datasetDescriptionAssistant.location') }}:</strong>
                    {{ error.location }}
                </div>
            </ErrorNotification>

            <WarningNotification v-for="warning in validationWarnings" :key="warning.id" :header="warning.description"
                @close="handleCloseWarning(warning.id)">
                <div v-if="warning.test" class="ecl-notification__description">
                    <strong>{{ $t('message.datasetDescriptionAssistant.test') }}:</strong> {{ warning.test }}
                </div>
                <div v-if="warning.location" class="ecl-notification__description">
                    <strong>{{ $t('message.datasetDescriptionAssistant.location') }}:</strong>
                    {{ warning.location }}
                </div>
            </WarningNotification>
        </section>

        <PillTabs class="mb-3" :tabs="pills" v-model:active-tab="activePill">
            <!-- Pill Label -->
            <template #tab-label="{ tab: pill }: { tab: ShapeTab }">
                {{ pill.label }}
                <template v-if="pill.id === 'dataset' || pill.id === 'distribution'">
                    {{ getFieldCount(`${pill.id}-mandatory`) }}
                </template>
            </template>

            <!-- Pill Content -->
            <template #tab-content="{ tab: pill }: { tab: ShapeTab }">
                <!-- Shape Information -->
                <div class="ecl-u-shadow-1 bg-primary-subtle ecl-u-border-radius-8 mb-4 px-4 py-3">
                    <strong>{{ pill.label }}:</strong>
                    {{ $t(`message.datasetDescriptionAssistant.${pill.id}.definition`) }}
                </div>

                <NavTabs :id="`${pill.id}`" :tabs="tabs[pill.id]" v-model:active-tab="activeTab[pill.id]">
                    <!-- Tab Label -->
                    <template #tab-label="{ tab }: { tab: ShapeRequirementTab }">
                        <span class="p-1">{{ tab.label }}</span>
                        <span :class="['container-circle mx-1 p-2', tab.bgClass]" aria-hidden="true">
                            {{ tab.label[0] }}
                        </span>
                        <span class="p-1 fw-normal" :id="`counter-${tab.label}`">
                            {{ getFieldCount(tab.id) }}
                        </span>
                    </template>

                    <!-- Tab Content -->
                    <template #tab-content="{ tab }: { tab: ShapeRequirementTab }">
                        <!-- Single bucket for dataset -->
                        <template v-if="pill.id === 'dataset'">
                            <RecursiveForm class="ecl-u-shadow-1 bg-white ecl-u-border-radius-8 p-4 pb-2"
                                :id-prefix="`${tab.id}-0`" :properties="getPropertiesForRequirement(pill.id, getRequirement(tab.id), formData[pill.id][0])
                                    " :selected-access-level="selectedAccessLevel"
                                :has-any-filled-inputs="hasAnyFilledInputs" :is-multilingual="isMultilingual"
                                :is-iri="isIRI" :is-required="isRequired" v-model:bucket="formData[pill.id][0]"
                                v-model:saved="saved" v-model:translateLoading="translateLoading"
                                @add-another="({ prop, data }) => handleAddAnotherInput(prop, data)"
                                @handleTemplateNode="handleTemplateNode" @handleTranslate="translate" />
                        </template>

                        <!-- Multiple buckets into accordion for distribution/sample/analytics -->
                        <template v-else>
                            <Accordion>
                                <AccordionItem v-for="(_, i) in formData[pill.id]" :key="`${tab.id}-${i}`"
                                    class="form-content" :id="`${tab.id}-${i}`">
                                    <template #title>
                                        <div class="position-relative">
                                            <span class="fw-bolder">{{ pill.label }} #{{ i + 1 }}</span>
                                            <button v-if="formData[pill.id].length > 1"
                                                class="btn btn-link position-absolute top-0 end-0 mt-n2"
                                                :aria-label="$t('message.datasetDescriptionAssistant.removeEntry')"
                                                @click.stop="handleRemoveBucket(pill.id, i)">
                                                <svg class="ecl-icon ecl-icon--m me-2" focusable="false"
                                                    aria-hidden="true">
                                                    <use xlink:href="@/assets/img/ecl/icons.svg#trash"></use>
                                                </svg>
                                            </button>
                                        </div>
                                    </template>

                                    <RecursiveForm class="mt-3" :id-prefix="`${tab.id}-${i}`" :properties="getPropertiesForRequirement(
                                        pill.id,
                                        getRequirement(tab.id),
                                        formData[pill.id][i]
                                    )
                                        " :selected-access-level="selectedAccessLevel"
                                        :has-any-filled-inputs="hasAnyFilledInputs" :is-multilingual="isMultilingual"
                                        :is-iri="isIRI" :is-required="isRequired" v-model:bucket="formData[pill.id][i]"
                                        v-model:saved="saved"
                                        @add-another="({ prop, data }) => handleAddAnotherInput(prop, data)" />
                                </AccordionItem>
                            </Accordion>

                            <!-- Add another distribution/sample/analytics entry -->
                            <button
                                class="btn btn-link d-flex align-items-center ecl-u-shadow-1 bg-white ecl-u-border-radius-8 mt-3 px-3 py-2"
                                :id="'addAnalytics-' + tab.id" @click="handleAddAnotherBucket(pill.id)">
                                <span class="btn btn-sm ecl-u-bg-primary text-white me-3">
                                    <svg class="ecl-icon ecl-icon--m me-2" focusable="false" aria-hidden="true">
                                        <use xlink:href="@/assets/img/ecl/icons.svg#plus"></use>
                                    </svg>
                                </span>
                                <span class="ecl-u-type-color-primary-60">
                                    {{ $t(`message.datasetDescriptionAssistant.${pill.id}.addAnother`) }}
                                </span>
                            </button>
                        </template>
                    </template>
                </NavTabs>
            </template>
        </PillTabs>
    </div>
    <ECLoadingIndicator v-else :loadingBar="!isComponentReady" />
</template>

<script lang="ts">
import { capitalize, debounce } from 'lodash';
import { markRaw } from 'vue';
import Accordion from '../common/accordion/Accordion.vue';
import AccordionItem from '../common/accordion/AccordionItem.vue';
import DropdownSelect from './DropdownSelect.vue';
import ECConfirmationDialog from '@/components/health-data/common/ECConfirmationDialog.vue';
import TemplateDialog from '../common/TemplateDialog.vue';
import ECLoadingIndicator from '../common/ECLoadingIndicator.vue';
import ErrorNotification from '../common/notifications/ErrorNotification.vue';
import NavTabs from '../common/tabs/NavTabs.vue';
import PillTabs from '../common/tabs/PillTabs.vue';
import RecursiveForm from './RecursiveForm.vue';
import WarningNotification from '../common/notifications/WarningNotification.vue';
import UtilService from '@/services/utilService';
import { orders } from '@/utils/sortUtil'
import {
    cloneDeepAndPrune,
    generateUniqueID,
    getLocaleText,
    getSupportedLanguagesForDropdown,
    getTypedEntries,
    getTypedKeys,
} from '@/utils/generalUtils';
import schema from './healthdcat-ap-schema.json';
import type {
    AccessLevel,
    AnyProperty,
    DataBucket,
    HealthDcatApSchema,
    ITBValidationError,
    PropertyContext,
    RequirementLevel,
    Shape,
    ShapeInput,
    ShapeObject,
    ShapeRequirement,
    ShapeRequirementTab,
    ShapeTab,
} from './types';
import { Toast } from 'bootstrap'
const multilingualInputTypes = new Set(['text', 'textarea']);

export default {
    name: 'DatasetDescriptionAssistant',
    components: {
        Accordion,
        AccordionItem,
        DropdownSelect,
        ECConfirmationDialog,
        ECLoadingIndicator,
        ErrorNotification,
        NavTabs,
        PillTabs,
        RecursiveForm,
        WarningNotification,
        TemplateDialog,
    },
    head() {
        return {
            title: this.$t('message.datasetDescriptionAssistant.title'),
            meta: [
                {
                    name: 'description',
                    vmid: 'description',
                    content: this.$t('message.datasetDescriptionAssistant.title'),
                },
            ],
        };
    },
    computed: {
        // TODO
        //...mapGetters('authenticationStore', ['isAuthenticated', 'authenticatedUser']),
        isAuthenticated() {
            return true;
        },
        schemaService() {
            // @ts-ignore-next-line
            return new UtilService("https://health-data-access.acceptance.data.health.europa.eu", 'payload');
        },
        accessLevelItems() {
            return getTypedEntries(this.datasetAccessLevels).map(([level, { label }]) => ({
                value: level as AccessLevel,
                label: this.getLocaleText(label),
            }));
        },
        accessLevels() {
            return Object.values(this.datasetAccessLevels).map(({ color, description, label }) => ({
                color,
                description: this.getLocaleText(description),
                label: this.getLocaleText(label),
            }));
        },
        pills(): ShapeTab[] {
            return [
                { id: 'dataset', label: this.$t('message.datasetDescriptionAssistant.dataset.name') },
                {
                    id: 'distribution',
                    label: this.$t('message.datasetDescriptionAssistant.distribution.name'),
                },
                { id: 'sample', label: this.$t('message.datasetDescriptionAssistant.sample.name') },
                { id: 'analytics', label: this.$t('message.datasetDescriptionAssistant.analytics.name') },
            ];
        },
        tabs(): Record<Shape, ShapeRequirementTab[]> {
            return {
                dataset: this.getTabs('dataset'),
                distribution: this.getTabs('distribution'),
                sample: this.getTabs('sample'),
                analytics: this.getTabs('analytics'),
            };
        },
        canValidate(): boolean {
            const ds = 'dataset-mandatory';
            const dist = 'distribution-mandatory';

            const dsComplete = this.countFilledRequiredInputs(ds) >= this.countTotalRequiredInputs(ds);
            const distComplete =
                this.countFilledRequiredInputs(dist) >= this.countTotalRequiredInputs(dist);

            return dsComplete && distComplete;
        },
        contextParagraphs(): string[] {
            return [
                this.localDOMPurify.sanitize(
                    this.$t('message.datasetDescriptionAssistant.context.paragraph1', {
                        spec: `<a href="https://healthdataeu.pages.code.europa.eu/healthdcat-ap/releases/latest/" class="ecl-link" target="_blank">HealthDCAT-AP ${this.$t(
                            'message.datasetDescriptionAssistant.context.specification'
                        )}</a>`,
                    })
                ),
                this.$t('message.datasetDescriptionAssistant.context.paragraph2'),
                this.$t('message.datasetDescriptionAssistant.context.paragraph3'),
            ];
        },
    },
    data() {
        // Create a new instance of DOMPurify to avoid adding hooks to the global instance
        //const localDOMPurify = DOMPurify();
        //localDOMPurify.setConfig({ ADD_ATTR: ['class', 'target'] }); // Allow class and target attributes on elements

        return {
            activePill: 'dataset' as Shape,
            activeTab: {
                dataset: 'dataset-mandatory',
                distribution: 'distribution-mandatory',
                sample: 'sample-mandatory',
                analytics: 'analytics-mandatory',
            } as Record<Shape, ShapeRequirement>,
            prefixes: {} as Record<string, string>,
            shapes: {} as Record<Shape, ShapeObject>,
            datasetAccessLevels: {} as HealthDcatApSchema['datasetAccessLevels'],
            selectedAccessLevel: localStorage.getItem(
                'datasetDescriptionAssistantAccessLevel'
            ) as AccessLevel,
            languages: getSupportedLanguagesForDropdown(),
            defaultLanguage:
                localStorage.getItem('datasetDescriptionAssistantLanguage') ?? this.$i18n.locale,
            validationErrors: [] as ITBValidationError[],
            validationWarnings: [] as ITBValidationError[],
            supportedFormats: {
                nt: {
                    label: 'N-Triples',
                    mime: 'application/n-triples',
                    // transform: jsonLdToNTriples,
                    endpoint: '',
                },
                ttl: {
                    label: 'Turtle',
                    mime: 'text/turtle',
                    // transform: jsonLdToTurtle, 
                    endpoint: ''
                },
                rdf: {
                    label: 'RDF/XML',
                    mime: 'application/rdf+xml',
                    // transform: jsonLdToRdfXml,
                    endpoint: '/rdf/convert/rdf-xml',
                },
            },
            formData: {} as Record<Shape, DataBucket[]>,
            isComponentReady: false,
            saved: false, // Flag to indicate if the save button has been clicked at least once
            blankNodeCounter: 0, // A counter used to generate unique IDs for blank nodes
            //localDOMPurify,
            saveLocalDraftDebounced: debounce(() => this.saveLocalDraft(), 400),
            templateDialogMode: "",
            toastMessage: "",
            translateLoading: false,
        };
    },
    async created() {
        /**
         * Maps options to the correct format for the select inputs.
         * @param prop - The property to map options for select inputs.
         */
        const mapOptionsToSelectObjects = (prop: AnyProperty) => {
            if (prop.input.type === 'select' && prop.input.options) {
                prop.input.items = prop.input.options
                    .map((option) => ({ key: option.value, value: this.getLocaleText(option.label) }))
                    .sort((a, b) => a.value.localeCompare(b.value, this.$i18n.locale, { numeric: true }));
            }
            prop.nestedProperties?.forEach(mapOptionsToSelectObjects);
        };

        /**
         * Filters out properties that are marked as hidden. Applies the filter recursively to nested properties.
         * @param prop - The property to check for visibility.
         * @returns True if the property is not hidden, false otherwise.
         */
        const filterHiddenProps = (prop: AnyProperty) => {
            if (prop.input.hidden) return false;
            if (prop.nestedProperties)
                prop.nestedProperties = prop.nestedProperties.filter(filterHiddenProps);
            return true;
        };

        // Load the schema from the API or fallback to the local version
        const { datasetAccessLevels, prefixes, shapes } = await this.schemaService
            .getById('health-dcat-ap-schema')
            .then((data) => data.payload as HealthDcatApSchema)
            .catch((error) => {
                console.error('Error loading schema data:', error);
                console.warn('Falling back to local schema data.');
                return schema.payload as HealthDcatApSchema;
            });


        //const { datasetAccessLevels, prefixes, shapes } = schema.payload

        // Extract dataset and distribution shapes, sort their properties and map select options
        // to the correct format for the dropdowns
        const datasetShapes: ShapeObject = shapes['dcatap:Dataset_Shape'];
        datasetShapes.properties = datasetShapes.properties.filter(filterHiddenProps);
        datasetShapes.properties.sort((a, b) => a.order - b.order).forEach(mapOptionsToSelectObjects);
        const distributionShapes: ShapeObject = shapes['dcatap:Distribution_Shape'];
        distributionShapes.properties = distributionShapes.properties.filter(filterHiddenProps);
        distributionShapes.properties
            .sort((a, b) => a.order - b.order)
            .forEach(mapOptionsToSelectObjects);

        // Initialize the shapes, prefixes and access levels from the fetched schema
        this.shapes = markRaw({
            dataset: datasetShapes,
            distribution: distributionShapes,
            sample: distributionShapes,
            analytics: distributionShapes,
        });

        this.sortFormInputs()

        this.prefixes = markRaw(prefixes);
        this.datasetAccessLevels = markRaw(datasetAccessLevels);
        this.selectedAccessLevel ??= getTypedKeys(datasetAccessLevels)[0];

        this.initializeForm(); // Initialize the form data structure

        // Load saved form data from backend (when authenticated) or from local storage
        // on a hard page reload we depend on the watched isAuthenticated async method
        // so that we wait for the authenticationStore store to return the correct value
        if (this.isAuthenticated) {
            await this.loadFromBackendOrLocal();
        } else {
            this.loadForm();
        }

        if (this.$route.path.includes("snapshot")) {
            const res = await fetch(`${import.meta.env.VITE_DDA_PROXY_URL}${this.$route.path}`)
            const data = await res.json()
            this.formData = data
            this.$router.replace({ path: '/' })
        }

        this.isComponentReady = true;
        this.$nextTick(() => this.upsertFakeAccessRightsInput());
    },
    watch: {
        // Save draft to local storage when selections or form content change
        selectedAccessLevel() {
            this.saveLocalDraftDebounced();
            this.$nextTick(() => this.upsertFakeAccessRightsInput());
        },
        defaultLanguage() {
            this.saveLocalDraftDebounced();
        },
        formData: { deep: true, handler: 'onFormDataChanged' },
        // Keep component state in sync with auth state (Watch for authentication status changes)
        //---------------------------------------------------------------------------------------------
        // Vuex isAuthenticated is a reactive computed value.
        // This watcher runs automatically whenever that value changes.
        // We only care about the transition from false → true, meaning the store has finished updating.
        // On a hard refresh the store initializes with isAuthenticated = false, so created() loads from local storage first.
        //  Once the auth store finishes restoring the user session and flips isAuthenticated → true, this watcher triggers and reloads form data from the backend.
        async isAuthenticated(val, oldVal) {
            if (val && !oldVal) {
                await this.loadFromBackendOrLocal();
            }
        },
    },
    methods: {
        async handleSnapshot() {
            const uuid = crypto.randomUUID()
            try {
                await fetch(`${import.meta.env.VITE_DDA_PROXY_URL}/snapshot/${uuid}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.formData)
                })

                navigator.clipboard.writeText(`${window.location.origin}/snapshot/${uuid}`)

                alert(`Snapshot created successfully. You can access it under:\n\n${window.location.origin}/snapshot/${uuid}\n\nThe link was saved to your clipboard.`)
            } catch (e) {
                alert(e)
            }
        },
        async translate(path: string, prop: any) {
            const sourceEntry = this.formData.dataset[0][path][0]
            const text = sourceEntry.value
            const sourceLangKey = sourceEntry.lang
            const targetLangKey = prop.lang

            this.translateLoading = true;
            const response = await fetch(`${import.meta.env.VITE_DDA_PROXY_URL}/ai/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "text": text,
                    "sourceLangKey": sourceLangKey,
                    "targetLangKey": targetLangKey
                })
            })

            const data = await response.json();

            this.formData.dataset[0][path]?.forEach((entry) => {
                if (entry._uid === prop._uid) {
                    entry.value = data.generation
                }
            })

            this.refresh()
            this.translateLoading = false;
        },
        async handleTemplate(name: string) {
            if (this.templateDialogMode === "save") {
                const res = await fetch(`${import.meta.env.VITE_DDA_PROXY_URL}/template/${name}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.formData)
                })
            } else if (this.templateDialogMode === "load") {
                const res = await fetch(`${import.meta.env.VITE_DDA_PROXY_URL}/template/${name}`, {
                    method: 'GET'
                })
                const data = await res.json();

                this.formData = data
                this.refresh()
            }
        },
        async handleTemplateNode(template: String, path: String) {
            const res = await fetch(`${import.meta.env.VITE_DDA_PROXY_URL}/template/${template}`, {
                method: 'GET'
            })
            const data = await res.json();
            this.formData.dataset[0][path] = data.dataset[0][path];
            this.refresh()
        },
        sortFormInputs() {
            let sortedDatasetShapes: any = []
            orders.dataset['non-public'].forEach((entry) => {
                this.shapes.dataset.properties.forEach((shape) => {
                    if (shape.name === entry) {
                        sortedDatasetShapes.push(shape)
                    }
                })
            })
            this.shapes.dataset.properties = sortedDatasetShapes
        },
        capitalize,
        getLocaleText,
        onFormDataChanged() {
            this.saveLocalDraftDebounced();
        },
        /**
         * Initializes the form data structure based on the shapes and their properties recursively.
         * Each shape will have its own set of properties and nested properties initialized with
         * ShapeInput objects.
         */
        initializeForm() {
            getTypedEntries(this.shapes).forEach(([shape, shapeDef]) => {
                this.formData[shape] = [this.buildBucket(shapeDef.properties)];
            });
        },
        /**
         * Attempts to load the saved form data from the backend for the authenticated user.
         * If user has no data available falls back to localStorage.
         * Finally merges the saved form data into a fresh, schema-aligned structure recursively.
         */
        async loadFromBackendOrLocal() {
            try {
                // @ts-ignore-next-line
                const endpoint = `${"https://health-data-access.acceptance.data.health.europa.eu"}/dda`;
                const { data } = await axios.get(endpoint);

                const accessLevel = data?.payload?.datasetDescriptionAssistantAccessLevel ?? null;
                const language = data?.payload?.datasetDescriptionAssistantLanguage ?? null;
                const formData = data?.payload?.datasetDescriptionAssistantFormData ?? null;

                const hasBackend =
                    !!(accessLevel || language) ||
                    (formData && typeof formData === 'object' && Object.keys(formData).length > 0);

                if (!hasBackend) {
                    this.loadForm();
                    return;
                }

                // Reuse existing merging logic from loadForm (without changing its comments)
                const savedData: Record<Shape, unknown> = formData ?? {};
                const mergeBucket = (savedBucket: DataBucket, props: AnyProperty[]) =>
                    props.reduce((bucket, prop) => {
                        const savedArr = savedBucket?.[prop.path];
                        bucket[prop.path] =
                            Array.isArray(savedArr) && savedArr.length
                                ? savedArr.map((input: ShapeInput) => this.mergeInputWithSaved(prop, input))
                                : [this.getInitialInput(prop)];
                        return bucket;
                    }, {} as DataBucket);

                if (accessLevel) this.selectedAccessLevel = accessLevel as AccessLevel;
                if (language) this.defaultLanguage = language as string;

                getTypedEntries(this.shapes).forEach(([shape, shapeDef]) => {
                    const raw = savedData?.[shape];
                    let rawBuckets: unknown[] | undefined;
                    if (Array.isArray(raw)) rawBuckets = raw;
                    else if (raw && typeof raw === 'object') rawBuckets = [raw];
                    else return;

                    const buckets = rawBuckets.filter((b): b is DataBucket => !!b && typeof b === 'object');
                    if (!buckets.length) return;

                    this.formData[shape] = buckets.map((bucket) => mergeBucket(bucket, shapeDef.properties));
                });
            } catch (e) {
                console.warn('Backend data not available; falling back to localStorage.', e);
                this.loadForm();
            }
        },

        /**
         * Loads the saved form data from local storage if available
         * and merges it into a fresh, schema-aligned structure recursively.
         */
        loadForm() {
            const dataStr = localStorage.getItem('datasetDescriptionAssistantFormData');
            if (!dataStr) return;
            try {
                const mergeBucket = (savedBucket: DataBucket, props: AnyProperty[]) =>
                    props.reduce((bucket, prop) => {
                        const savedArr = savedBucket?.[prop.path];
                        bucket[prop.path] =
                            Array.isArray(savedArr) && savedArr.length
                                ? savedArr.map((input) => this.mergeInputWithSaved(prop, input))
                                : [this.getInitialInput(prop)];
                        return bucket;
                    }, {} as DataBucket);

                const savedData: Record<Shape, unknown> = JSON.parse(dataStr);
                getTypedEntries(this.shapes).forEach(([shape, shapeDef]) => {
                    const raw = savedData?.[shape];
                    let rawBuckets: unknown[] | undefined;
                    if (Array.isArray(raw)) rawBuckets = raw;
                    else if (raw && typeof raw === 'object') rawBuckets = [raw];
                    else return; // Keep the initialized form

                    // Keep only object-like buckets
                    const buckets = rawBuckets.filter((b): b is DataBucket => !!b && typeof b === 'object');
                    if (!buckets.length) return; // Keep the initialized form

                    this.formData[shape] = buckets.map((bucket) => mergeBucket(bucket, shapeDef.properties));
                });
            } catch (e) {
                console.error('Could not parse saved form data:', e);
            }
        },
        /**
         * Merges a saved ShapeInput into a fresh, schema-aligned one recursively.
         * - Respects hasValue overrides from the schema.
         * - Preserves saved values where appropriate.
         * - Initializes any newly added nested properties.
         * @param prop - The property to merge against.
         * @param saved - The saved ShapeInput to merge from.
         * @returns The new merged ShapeInput.
         */
        mergeInputWithSaved(prop: AnyProperty, saved: ShapeInput): ShapeInput {
            // Start from a clean, schema-compliant structure
            const base = this.getInitialInput(prop);

            // If schema doesn't enforce a value via hasValue, merge saved value/lang
            if (!prop.nestedProperties?.length) {
                if (!prop.hasValue) {
                    if (saved.value) base.value = saved.value;
                    if (this.isMultilingual(prop) && saved.lang) base.lang = saved.lang;
                }
                return base;
            }

            if (!prop.hasValue && this.isContainerIRI(prop) && saved.value) base.value = saved.value;

            // Extract the nested values
            const { nestedValues = {}, ...rest } = base;
            const { nestedValues: savedValues = {} } = saved;

            // Recurse into nested values
            prop.nestedProperties.forEach((nested) => {
                const savedArr = savedValues[nested.path];
                nestedValues[nested.path] = savedArr?.length
                    ? savedArr.map((input) => this.mergeInputWithSaved(nested, input))
                    : [this.getInitialInput(nested)];
            });

            return { ...rest, nestedValues };
        },
        /**
         * Upserts an input field next to the accessRights input field to display the selected access
         * level label instead of the IRI value. Hides the real input field.
         */
        upsertFakeAccessRightsInput() {
            const inputID = 'dataset-mandatory-0-dct-accessRights-0';
            const real = document.getElementById(inputID) as HTMLInputElement | null;
            if (!real) return;

            // Compute the display label
            const label = this.getLocaleText(this.datasetAccessLevels[this.selectedAccessLevel].label);

            // If we already have a fake input, just update its value
            const existing = real.nextElementSibling as HTMLInputElement | null;
            if (existing?.id === inputID + '-display') {
                existing.value = label;
                return;
            }

            // Create the fake input
            const fake = document.createElement('input');
            fake.className = real.className;
            fake.id = inputID + '-display';
            fake.value = label;
            fake.type = 'text';
            fake.readOnly = true;
            fake.setAttribute('aria-labelledby', inputID + '-label');

            // Hide the real input and insert the fake one after it
            real.type = 'hidden';
            real.insertAdjacentElement('afterend', fake);
        },
        /**
         * Calculates and returns a string representing the number of filled inputs
         * over the total number of inputs for the given tab.
         * @param tabID - The ID of the tab (shape-requirement).
         * @returns A string in the format "filled/total" for the specified tab.
         */
        getFieldCount(tabID: ShapeRequirement): string {
            return `${this.countFilledInputs(tabID)}/${this.countTotalInputs(tabID)}`;
        },
        /**
         * Calculates and returns the number of filled inputs for the given tab.
         * @param tabID - The ID of the tab (shape-requirement).
         * @returns The number of filled inputs for the specified tab.
         */
        countFilledInputs(tabID: ShapeRequirement): number {
            const [shape, requirement] = this.getShapeAndRequirement(tabID);

            return this.formData[shape].reduce((acc, bucket) => {
                const props = this.getPropertiesForRequirement(shape, requirement, bucket);
                return props.reduce((sum, prop) => {
                    return sum + this.countFilledLeaves(prop, bucket[prop.path] ?? []);
                }, acc);
            }, 0);
        },
        /**
         * Calculates and returns the number of filled inputs for the given property recursively.
         * @param prop - The property to check.
         * @param inputs - The array of ShapeInput to check against.
         * @returns The number of filled inputs for the specified property.
         */
        countFilledLeaves(prop: AnyProperty, inputs: ShapeInput[]): number {
            return inputs.reduce((filled, input) => {
                // Count filled inputs for leaf properties
                if (!prop.nestedProperties?.length) return input.value?.trim() ? ++filled : filled;

                // Increment by one if the property is an IRI and has a value
                if (this.isContainerIRI(prop) && input.value?.trim()) filled++;

                // Count filled inputs for nested properties
                return prop.nestedProperties.reduce((sum, nested) => {
                    return sum + this.countFilledLeaves(nested, input.nestedValues?.[nested.path] ?? []);
                }, filled);
            }, 0);
        },
        /**
         * Calculates and returns the total number of inputs for the given tab.
         * @param tabID - The ID of the tab (shape-requirement).
         * @returns The total number of inputs for the specified tab.
         */
        countTotalInputs(tabID: ShapeRequirement): number {
            const [shape, requirement] = this.getShapeAndRequirement(tabID);

            return this.formData[shape].reduce((acc, bucket) => {
                const props = this.getPropertiesForRequirement(shape, requirement, bucket);
                return props.reduce((sum, prop) => {
                    return sum + this.countTotalLeaves(prop, bucket[prop.path] ?? []);
                }, acc);
            }, 0);
        },
        /**
         * Calculates and returns the total number of inputs for the given property recursively.
         * @param prop - The property to check.
         * @param inputs - The array of ShapeInput to check against.
         * @returns The total number of inputs for the specified property.
         */
        countTotalLeaves(prop: AnyProperty, inputs: ShapeInput[]): number {
            const nestedProperties = prop.nestedProperties;

            // If there are no nested properties, the length of the array is the total
            if (!nestedProperties?.length) return inputs.length;

            // Count total inputs for nested properties, starting with inputs.length if the property
            // has an IRI input
            return inputs.reduce(
                (total, input) => {
                    return nestedProperties.reduce((sum, nested) => {
                        return sum + this.countTotalLeaves(nested, input.nestedValues?.[nested.path] ?? []);
                    }, total);
                },
                this.isContainerIRI(prop) ? inputs.length : 0
            );
        },
        /**
         * Calculates and returns the number of filled required inputs for the given tab.
         * @param tabID - The ID of the tab (shape-requirement).
         * @returns The number of filled required inputs for the specified tab.
         */
        countFilledRequiredInputs(tabID: ShapeRequirement): number {
            const [shape, requirement] = this.getShapeAndRequirement(tabID);

            return this.formData[shape].reduce((acc, bucket) => {
                const props = this.getPropertiesForRequirement(shape, requirement, bucket);
                return props.reduce((sum, prop) => {
                    return (
                        sum + this.countFilledRequiredLeaves(prop, bucket[prop.path] ?? [], undefined, bucket)
                    );
                }, acc);
            }, 0);
        },
        /**
         * Calculates and returns the number of filled required inputs for the given property recursively.
         * @param prop - The property to check.
         * @param inputs - The array of ShapeInput to check against.
         * @param parent - The parent context for the property.
         */
        countFilledRequiredLeaves(
            prop: AnyProperty,
            inputs: ShapeInput[],
            parent?: PropertyContext,
            bucket?: DataBucket
        ): number {
            if (!this.isRequired(prop, parent, bucket)) return 0;

            const nestedProperties = prop.nestedProperties;

            // If there are no nested properties, count entries with a non-empty value
            if (!nestedProperties?.length) return inputs.filter((input) => !!input.value?.trim()).length;

            const hasAnyRequiredNested = nestedProperties.some((nested) =>
                inputs.some((input) => this.isRequired(nested, { prop, input, isRequired: true }))
            );

            return inputs.reduce((filled, input) => {
                // Increment by one if the property is an IRI and has a value
                if (this.isContainerIRI(prop) && input.value?.trim()) filled++;

                // If no nested property is explicitly required, the group itself is required.
                // Count 1 for this entry if ANY child is filled.
                if (!hasAnyRequiredNested && !this.isContainerIRI(prop)) {
                    const nestedValues = input.nestedValues ?? {};
                    const anyChildFilled = nestedProperties.some((nested) =>
                        (nestedValues[nested.path] ?? []).some((child) =>
                            this.hasAnyFilledInputs(nested, child)
                        )
                    );
                    if (anyChildFilled) filled++;
                }

                // Count filled inputs for required nested properties
                return nestedProperties.reduce((sum, nested) => {
                    const childInputs = input.nestedValues?.[nested.path] ?? [];
                    const parent = { prop, input, isRequired: true };
                    return sum + this.countFilledRequiredLeaves(nested, childInputs, parent);
                }, filled);
            }, 0);
        },
        /**
         * Calculates and returns the total number of required inputs for the given tab.
         * @param tabID - The ID of the tab (shape-requirement).
         * @returns The total number of required inputs for the specified tab.
         */
        countTotalRequiredInputs(tabID: ShapeRequirement): number {
            const [shape, requirement] = this.getShapeAndRequirement(tabID);

            return this.formData[shape].reduce((acc, bucket) => {
                const props = this.getPropertiesForRequirement(shape, requirement, bucket);
                return props.reduce((sum, prop) => {
                    return (
                        sum + this.countTotalRequiredLeaves(prop, bucket[prop.path] ?? [], undefined, bucket)
                    );
                }, acc);
            }, 0);
        },
        /**
         * Calculates and returns the total number of required inputs for the given property recursively.
         * @param prop - The property to check.
         * @param inputs - The array of ShapeInput to check against.
         * @param parent - The parent context for the property.
         * @param bucket - The current data bucket, used for evaluating conditional requirements.
         * @returns The total number of required inputs for the specified property.
         */
        countTotalRequiredLeaves(
            prop: AnyProperty,
            inputs: ShapeInput[],
            parent?: PropertyContext,
            bucket?: DataBucket
        ): number {
            if (!this.isRequired(prop, parent, bucket)) return 0;

            const nestedProperties = prop.nestedProperties;

            // If there are no nested properties, the length of the array is the total
            if (!nestedProperties?.length) return inputs.length;

            const hasAnyRequiredNested = nestedProperties.some((nested) =>
                inputs.some((input) => this.isRequired(nested, { prop, input, isRequired: true }))
            );

            // Count total inputs for nested properties, starting with inputs.length if the property
            // has an IRI input or if any nested property is required
            return inputs.reduce(
                (total, input) => {
                    return nestedProperties.reduce((sum, nested) => {
                        const childInputs = input.nestedValues?.[nested.path] ?? [];
                        const parent = { prop, input, isRequired: true };
                        return sum + this.countTotalRequiredLeaves(nested, childInputs, parent);
                    }, total);
                },
                this.isContainerIRI(prop) || !hasAnyRequiredNested ? inputs.length : 0
            );
        },
        /**
         * Returns the properties for a given shape that match the specified requirement level,
         * taking into account any conditional requirements based on the current form values.
         * @param shape - The shape for which to get the properties.
         * @param requirement - The requirement level to filter properties by.
         * @param bucket - An optional bucket of values to use for evaluating conditional requirements, defaults to the shape's top-level bucket.
         * @returns An array of properties that match the specified requirement level.
         */
        getPropertiesForRequirement(
            shape: Shape,
            requirement: RequirementLevel,
            bucket?: DataBucket
        ): AnyProperty[] {
            return this.shapes[shape].properties.filter(
                (prop) => this.getEffectiveRequirement(prop, undefined, bucket) === requirement
            );
        },
        /**
         * Determines the effective requirement level for a property based on its default requirement
         * and any conditional requirements that may apply given the current form values.
         * @param prop - The property to evaluate.
         * @param parent - The parent context for the property, used to access sibling values if needed.
         * @param bucket - An optional bucket of values to use for evaluating the condition, defaults to the parent's nestedValues.
         * @returns The effective requirement level for the property.
         */
        getEffectiveRequirement(
            prop: AnyProperty,
            parent?: PropertyContext,
            bucket?: DataBucket
        ): RequirementLevel {
            // Cache the default requirement level
            const requirement = prop.requirement[this.selectedAccessLevel];

            // If there's no conditional requirement, return the default requirement level
            const conditionalRequirement = prop.conditionalRequirement;
            if (!conditionalRequirement) return requirement;

            // Evaluate the conditional requirement based on the values of the dependent property in the current scope
            const currentScope = bucket ?? parent?.input.nestedValues;
            const values = (currentScope?.[conditionalRequirement.dependsOn] ?? [])
                .map((input) => input.value?.trim())
                .filter((value) => !!value);

            // Determine if the condition is met based on the operator
            const matches =
                conditionalRequirement.operator === 'equals'
                    ? values.some((value) => value === conditionalRequirement.value)
                    : values.every((value) => value !== conditionalRequirement.value);

            // If the condition is met, return the overridden requirement level; otherwise, return the default requirement level
            return matches ? conditionalRequirement.requirement[this.selectedAccessLevel] : requirement;
        },
        /**
         * Determines if a property is required based on its requirement level, the current tab
         * and the parent's requirement status and values.
         * @param prop The property to check.
         * @param parent The parent context for the property.
         * @param bucket The current data bucket, used for evaluating conditional requirements.
         * @returns True if the property is required, false otherwise.
         */
        isRequired(prop: AnyProperty, parent?: PropertyContext, bucket?: DataBucket): boolean {
            const requirementLevel = this.getEffectiveRequirement(prop, parent, bucket);

            // Return false early if the property and its parent are not required so that we don't
            // perform any unnecessary checks.
            if (requirementLevel !== 'mandatory') {
                if (!parent?.isRequired) return false;

                // If the parent is required and none of the siblings are filled or mandatory,
                // we consider all the siblings required until at least one is filled.
                const nestedValues = parent.input.nestedValues ?? {};
                return !parent.prop.nestedProperties?.some(
                    (nested) =>
                        this.getEffectiveRequirement(nested, parent, nestedValues) === 'mandatory' ||
                        nestedValues[nested.path]?.some((child) => this.hasAnyFilledInputs(nested, child))
                );
            }

            // Return true if the property doesn't have a parent or its parent is required
            if (!parent || parent.isRequired) return true;

            // Return true if any of the siblings are filled, false otherwise
            const nestedValues = parent.input.nestedValues ?? {};
            return !!parent.prop.nestedProperties?.some((nested) =>
                nestedValues[nested.path]?.some((child) => this.hasAnyFilledInputs(nested, child))
            );
        },
        /**
         * Returns the tabs for a given pill (shape).
         * @param pillID - The ID of the pill for which to get the tabs.
         * @return An array of ShapeRequirementTab objects representing the tabs.
         */
        getTabs(pillID: Shape): ShapeRequirementTab[] {
            const requirementLevels: RequirementLevel[] = ['mandatory', 'recommended', 'optional'];
            const bg = {
                mandatory: 'bg-mandatory',
                recommended: 'ecl-u-bg-primary',
                optional: 'bg-secondary',
            };
            return requirementLevels.map((requirement) => ({
                id: `${pillID}-${requirement}`,
                label: this.$t('message.datasetDescriptionAssistant.' + requirement),
                bgClass: bg[requirement],
            }));
        },
        /**
         * Extracts the requirement level from the given tab ID.
         * The tab ID is expected to be in the format "shape-requirement".
         * @param tabID - The ID of the tab, e.g., "dataset-mandatory".
         * @returns The extracted requirement level string.
         */
        getRequirement(tabID: ShapeRequirement): RequirementLevel {
            return this.getShapeAndRequirement(tabID)[1];
        },
        /**
         * Extracts the shape and requirement level from the given tab ID.
         * The tab ID is expected to be in the format "shape-requirement".
         * @param tabID - The ID of the tab, e.g., "dataset-mandatory".
         * @returns A tuple containing the shape and requirement level.
         */
        getShapeAndRequirement(tabID: ShapeRequirement): [Shape, RequirementLevel] {
            return tabID.split('-') as [Shape, RequirementLevel];
        },
        buildBucket(props: AnyProperty[]) {
            const bucket: DataBucket = {};
            props.forEach((prop) => (bucket[prop.path] = [this.getInitialInput(prop)]));
            return bucket;
        },
        /**
         * Creates and returns a ShapeInput object initialized recursively for the given property.
         * - If the input type is multilingual, it initializes the language field with the default language.
         * - If the property has a predefined value (hasValue), it enforces that value.
         * - If the property has nested properties, it initializes them recursively.
         * @param prop - The property to create an empty input for.
         * @returns A ShapeInput object with initialized value, language, and nested values.
         */
        getInitialInput(prop: AnyProperty): ShapeInput {
            const input: ShapeInput = {
                value: prop.hasValue?.[this.selectedAccessLevel] ?? '',
                lang: this.isMultilingual(prop) ? this.defaultLanguage : '',
                _uid: generateUniqueID(),
            };

            // Initialize nested inputs recursively, one entry per nested path.
            if (prop.nestedProperties?.length) {
                const nestedValues: DataBucket = {};
                prop.nestedProperties.forEach((nested) => {
                    nestedValues[nested.path] = [this.getInitialInput(nested)];
                });
                input.nestedValues = nestedValues;
            }

            return input;
        },
        /**
         * Determines if an input field is multilingual based on its type and whether it has a button label.
         * @param type - The type of the input field.
         * @param hasButton - Whether the input field has a button for adding more inputs.
         * @returns True if the input type is multilingual, false otherwise.
         */
        isMultilingual(prop: AnyProperty): boolean {
            return (
                multilingualInputTypes.has(prop.input.type ?? '') &&
                !!prop.buttonLabel &&
                !prop.input.isNotMultilingual
            );
        },
        /**
         * Updates the access level of the dataset.
         * @param level - The new access level to set.
         */
        updateAccessLevel(level: AccessLevel) {
            this.isComponentReady = false; // Prevent re-rendering during update
            this.$nextTick(() => {
                this.selectedAccessLevel = level;
                this.formData.dataset[0]['dct:accessRights'][0].value =
                    this.datasetAccessLevels[level].value;
                this.isComponentReady = true;
            });
        },
        /**
         * Updated the default language and the language of all non-empty inputs.
         * @param lang - The new default language to set.
         */
        updateDefaultLanguage(lang: string) {
            this.defaultLanguage = lang;

            const updateBucket = (bucket: DataBucket) => {
                Object.values(bucket).forEach((inputs) =>
                    inputs.forEach((input) => this.updateInputLanguage(input, lang))
                );
            };

            getTypedEntries(this.formData).forEach(([, buckets]) => {
                buckets.forEach(updateBucket);
            });

            this.refresh();
        },
        /**
         * Updates the language of a ShapeInput and its nested values recursively.
         * @param input - The ShapeInput to update.
         * @param lang - The new language to set.
         */
        updateInputLanguage(input: ShapeInput, lang: string) {
            if (!input.value) input.lang &&= lang;
            if (!input.nestedValues) return;
            Object.values(input.nestedValues).forEach((nestedInputs) =>
                nestedInputs.forEach((nestedInput) => this.updateInputLanguage(nestedInput, lang))
            );
        },
        /** Saves the current form data in the backend db for the authenticated user and shows a success or error toast. */
        async handleSave() {
            this.saved = true; // Mark that the user has attempted to save at least once
            const success = await this.saveForm();
            if (success) {
                this.toastMessage = this.$t('message.datasetDescriptionAssistant.saveSuccess')
                const toastElement = document.getElementById('successToast')
                const toast = new Toast(toastElement)
                toast.show()
            } else {
                this.toastMessage = this.$t('message.datasetDescriptionAssistant.saveError')
                const toastElement = document.getElementById('errorToast')
                const toast = new Toast(toastElement)
                toast.show()
            }
        },
        /**
         * Attempts to save the current form data in the backend db for the authenticated user.
         * Returns true on success, false on failure.
         */
        async saveForm() {
            // Clone the form data to avoid mutating the original data structure and remove empty values
            const formData = cloneDeepAndPrune(this.formData, 'lang', '_uid');

            try {
                // Build a single JSON object containing the three items
                const payload = {
                    datasetDescriptionAssistantAccessLevel: this.selectedAccessLevel ?? null,
                    datasetDescriptionAssistantLanguage: this.defaultLanguage ?? null,
                    datasetDescriptionAssistantFormData: formData ?? {},
                };

                // @ts-ignore-next-line Send to backend with axios
                const endpoint = `${"https://health-data-access.acceptance.data.health.europa.eu"}/dda`;
                await axios.post(endpoint, payload);

                return true;
            } catch (e) {
                console.error('Failed to save form data:', e);
                return false;
            }
        },
        handleClear() {
            (this.$refs.clearDialog as InstanceType<typeof ECConfirmationDialog>).open();
        },
        openTemplateDialog(m: string) {
            this.templateDialogMode = m;
            (this.$refs.templateDialog as InstanceType<typeof TemplateDialog>).open();
        },
        /** Clears the form data and resets the form to its initial state. */
        confirmClear() {
            this.initializeForm();
            this.refresh(); // Force a re-render to reset the form
            this.toastMessage = this.$t('message.datasetDescriptionAssistant.clearSuccess')
            const toastElement = document.getElementById('successToast')
            const toast = new Toast(toastElement)
            toast.show()
        },
        /** Forces a re-render of the component by toggling the isComponentReady flag. */
        refresh() {
            this.isComponentReady = false;
            this.$nextTick(() => (this.isComponentReady = true));
        },
        /** Validates the current form data and saves the validation errors. */
        async handleValidate() {
            // @ts-ignore-next-line
            const params = new URLSearchParams({ accessLevel: this.selectedAccessLevel });
            const url = "https://health-data-access.acceptance.data.health.europa.eu" + `/validate-dataset?${params}`;

            const body = this.buildJsonLd()

            const turtle = await fetch(`${import.meta.env.VITE_DDA_PROXY_URL}/jsonld-to-ttl`, {
                method: 'POST',
                body: JSON.stringify(body)
            })

            const data = await turtle.text()

            // Send the validation request
            const { errors, warnings } = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/turtle'
                },
                body: data
            })

                .then(async (res) => {
                    // Extract errors and warnings from the validation report

                    const data = await res.json()

                    const errors = (data.reports?.error ?? []) as ITBValidationError[];
                    const warnings = (data.reports?.warning ?? []) as ITBValidationError[];

                    // Display a success message if there are no errors
                    if (data.result === 'SUCCESS') {
                        this.toastMessage = this.$t('message.datasetDescriptionAssistant.validateSuccess')
                        const successToast = document.getElementById('successToast')
                        const toast = new Toast(successToast)
                        toast.show()
                        return {
                            errors: [],
                            warnings: warnings.map((warning) => ({ ...warning, id: generateUniqueID() })),
                        };
                    }

                    // Add a unique ID to each error and warning for rendering purposes
                    return {
                        errors: errors.map((error) => ({ ...error, id: generateUniqueID() })),
                        warnings: warnings.map((warning) => ({ ...warning, id: generateUniqueID() })),
                    };
                })
                .catch((error) => {
                    console.error('Error in communication with validation service:', error);
                    this.toastMessage = `${this.$t('message.datasetDescriptionAssistant.validateError')}\n${error.message}`
                    const successToast = document.getElementById('errorToast')
                    const toast = new Toast(successToast)
                    toast.show()
                    return { errors: [], warnings: [] };
                });
            this.validationErrors = errors;
            this.validationWarnings = warnings;

            // Scroll to the validation errors section if there are any errors or warnings
            if (this.validationErrors.length || this.validationWarnings.length) {
                this.$nextTick(() =>
                    document
                        .getElementById('validation-errors')
                        ?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
                );
            }
        },
        /** Saves the form data, then builds the JSON-LD document and converts it to the target format. */
        async handleExport(event: MouseEvent) {
            // Get the format from the clicked link's href attribute
            const target = event.target as HTMLAnchorElement;
            const format = target.getAttribute('href') as keyof typeof this.supportedFormats;
            if (!this.supportedFormats[format]) return console.warn('Unknown export format:', format);

            if (this.isAuthenticated) await this.saveForm();
            const jsonLd = this.buildJsonLd();
            const { mime, transform, endpoint } = this.supportedFormats[format];

            // @ts-ignore-next-line
            const rdf = await transform(jsonLd, "https://health-data-access.acceptance.data.health.europa.eu" + endpoint);

            // Download the serialized data as a text file
            downloadTextFile('dataset.' + format, rdf, mime);
            this.toastMessage = this.$t('message.datasetDescriptionAssistant.exportSuccess')
            const successToast = document.getElementById('successToast')
            const toast = new Toast(successToast)
            toast.show()
        },
        /**
         * Serializes datasets and distributions into the appropriate format in order to build
         * a JSON-LD document from the current form data.
         * @returns An object containing the context and the main JSON-LD document.
         */
        buildJsonLd(): JsonLdObj {
            // Build the main document
            const doc: NodeObject = { '@type': this.shapes.dataset.targetClass };

            // Clean up the form data by cloning it and removing empty values
            const formData = cloneDeepAndPrune(this.formData, 'lang', '_uid');
            if (!formData) return { '@context': this.prefixes, ...doc };

            // Add the dataset
            const dataset = formData.dataset?.[0];
            if (dataset)
                Object.assign(doc, this.serializeFormData(dataset, this.shapes.dataset.properties));

            // Helper to build Distribution nodes for a given shape
            const mapEntries = (shape: Shape) => {
                const buckets = formData[shape] as DataBucket[] | undefined;
                if (!Array.isArray(buckets) || !buckets.length) return;
                return buckets
                    .map((bucket) => {
                        const node = this.serializeFormData(bucket, this.shapes[shape].properties);
                        return { '@type': this.shapes[shape].targetClass, ...node };
                    })
                    .filter((node) => Object.keys(node).length > 1);
            };

            const distributions = mapEntries('distribution');
            if (distributions?.length) doc['dcat:distribution'] = distributions;

            const samples = mapEntries('sample');
            if (samples?.length) doc['adms:sample'] = samples;

            const analytics = mapEntries('analytics');
            if (analytics?.length) doc['healthdcatap:analytics'] = analytics;

            return { '@context': this.prefixes, ...doc };
        },
        /**
         * Serializes a bucket from formData into JSON-LD props recursively.
         * @param bucket - The bucket of data to serialize.
         * @param props - The properties to serialize.
         * @returns An object containing the serialized properties in JSON-LD format.
         */
        serializeFormData(bucket: DataBucket, props: AnyProperty[]): NodeObject {
            const out: NodeObject = {};

            props.forEach((prop) => {
                // Filter out empty values
                const inputs = bucket[prop.path] ?? [];
                const filled = inputs.filter((input) => this.hasAnyFilledInputs(prop, input));
                if (!filled.length) return;

                out[prop.path] = filled.map((input) => this.serializeEntry(prop, input));
            });

            return out;
        },
        /**
         * Serializes a single input for a (possibly nested) property. Creates a blank node and merges
         * recursively serialized children.
         * @param prop - The property to serialize.
         * @param input - The input to serialize.
         * @returns An object containing the serialized input in JSON-LD format.
         */
        serializeEntry(prop: AnyProperty, input: ShapeInput): NodeObject {
            const node: NodeObject = {};

            // Handle leaf node
            if (!prop.nestedProperties?.length) {
                const nodeKey = this.isIRI(prop) ? '@id' : '@value';
                const value = input.value;

                if (prop.class) {
                    node['@type'] = prop.class;
                    const path = prop.input.path;
                    if (!path) node['@id'] = value;
                    else if (prop.datatype) node[path] = { '@type': prop.datatype, '@value': value };
                    else if (this.isMultilingual(prop))
                        node[path] = { '@value': value, '@language': input.lang };
                    else node[path] = { [nodeKey]: value };
                } else if (prop.datatype) {
                    node['@type'] = prop.datatype;
                    node['@value'] = value;
                } else if (this.isMultilingual(prop)) {
                    node['@value'] = value;
                    node['@language'] = input.lang;
                } else node[nodeKey] = value;

                // If the property has no nested properties, return the node and end the recursion
                return node;
            }

            // Generate a blank node ID or use the IRI if available
            node['@id'] =
                this.isContainerIRI(prop) && input.value
                    ? input.value
                    : `_:${prop.path.split(':').pop() ?? 'bn'}-${this.blankNodeCounter++}`;

            // Serialize nested properties recursively
            const nestedBucket = input.nestedValues ?? {};
            const nestedNodes = this.serializeFormData(nestedBucket, prop.nestedProperties);

            // If the property has a class, set the type. In the case of downloadURL, only set the type
            // if it has any nested values
            if (prop.class) {
                if (prop.path !== 'dcat:downloadURL' || (nestedNodes && Object.keys(nestedNodes).length))
                    node['@type'] = prop.class;
            }

            // Merge each nested path back into this node
            getTypedEntries(nestedNodes).forEach(([path, value]) => (node[path] = value));
            return node;
        },
        /**
         * Recursively checks if there is any filled input for a property or its nested properties.
         * @param prop - The property to check.
         * @param input - The input to check.
         * @returns True if there is any filled input, false otherwise.
         */
        hasAnyFilledInputs(prop: AnyProperty, input: ShapeInput): boolean {
            // Check if the current leaf has a value
            if (!prop.nestedProperties?.length) return !!input.value?.trim();

            // If the property is an IRI, check if the value is a non-empty string
            if (this.isContainerIRI(prop) && input.value?.trim()) return true;

            // Check if any child path has any value
            const nestedValues = input.nestedValues ?? {};
            return prop.nestedProperties.some((nested) =>
                nestedValues[nested.path]?.some((child) => this.hasAnyFilledInputs(nested, child))
            );
        },
        /**
         * Checks if the property is a container with an IRI input.
         * @param prop - The property to check.
         * @returns True if the property is a container IRI, false otherwise.
         */
        isContainerIRI(prop: AnyProperty): boolean {
            return !!prop.nestedProperties?.length && !!prop.input.type && this.isIRI(prop);
        },
        /**
         * Determines if this property should serialize as an IRI (@id) or a literal (@value).
         * @param prop - The property to check.
         * @returns True if the property should serialize as an IRI, false otherwise.
         */
        isIRI(prop: AnyProperty): boolean {
            return prop.input.type === 'url' || !!prop.nodeKind?.includes('IRI');
        },
        handleCloseError(id: string) {
            this.validationErrors = this.validationErrors.filter((error) => error.id !== id);
        },
        handleCloseWarning(id: string) {
            this.validationWarnings = this.validationWarnings.filter((warning) => warning.id !== id);
        },
        handleAddAnotherInput(prop: AnyProperty, data?: ShapeInput[]) {
            if (!data) return;
            data.push(this.getInitialInput(prop));
        },
        handleAddAnotherBucket(shape: Shape) {
            this.formData[shape].push(this.buildBucket(this.shapes[shape].properties));
        },
        handleRemoveBucket(shape: Shape, index: number) {
            this.formData[shape].splice(index, 1);
        },
        // Save a debounced draft of selections + form to localStorage
        saveLocalDraft() {
            const pruned = cloneDeepAndPrune(this.formData, 'lang', '_uid');
            try {
                localStorage.setItem('datasetDescriptionAssistantAccessLevel', this.selectedAccessLevel);
                localStorage.setItem('datasetDescriptionAssistantLanguage', this.defaultLanguage);
                localStorage.setItem('datasetDescriptionAssistantFormData', JSON.stringify(pruned ?? {}));
            } catch (e) {
                console.error('Failed to save local draft:', e);
            }
        },
    },
};
</script>

<style scoped>
.no-accent.ecl-accordion__item:first-child::before {
    content: none !important;
    display: none !important;
}

.no-accent :deep(.ecl-accordion__content),
.form-content :deep(.ecl-accordion__content),
.form-content :deep(.ecl-accordion__toggle-title) {
    width: 100%;
    max-width: unset;
    line-height: unset;
}

#validation-errors>div:not(:last-child) {
    margin-bottom: 1rem;
}

.container-circle {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;
    width: 1.75rem;
    height: 1.75rem;

    font-size: 0.8rem;
    font-weight: 700;
    color: #fff;
}

.bg-mandatory {
    background-color: #e78a47;
}

.btn-link:hover .btn {
    background-color: var(--ecl-color-primary-80) !important;
}

.mt-n2 {
    margin-top: -0.5rem !important;
}
</style>
