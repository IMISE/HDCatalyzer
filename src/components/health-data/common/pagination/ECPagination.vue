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
    <div class="col-12" style="padding:0">
        <div class="d-flex flex-row justify-content-between flex-wrap mt-3">
            <!-- PAGINATION -->
            <div v-if="usePagination" :class="[{ 'align-self-center justify-content-center': !isDatasetOrCatalog }]"
                class="d-flex pagination mb-0 flex-grow-1">
                <!-- F  I  R  S  T    C  O  R  N  E  R    A  R  R  O  W  -->
                <div v-if="usePaginationArrows" class="ecl-pagination__item ecl-pagination__item--previous"
                    :class="{ 'disabled': !clickedPageValid(getPage - 1) }" @click="pageClickedHandler(getPage - 1)">
                    <a class="ecl-link ecl-link--standalone ecl-link--icon ecl-pagination__link  ecl-link--icon-only"
                        aria-label="Go to previous page">
                        <svg class="ecl-icon ecl-icon--xs ecl-icon--rotate-270 ecl-link__icon" focusable="false"
                            aria-hidden="true">
                            <use xlink:href="@/assets/img/ecl/icons.svg#corner-arrow"></use>
                        </svg>
                        <span class="ecl-link__label">Previous</span>
                    </a>
                </div>

                <!-- Pagination numbers -->
                <div v-for="(page, i) in getPagesDisplayed(getPage, getPageCount)" :key="i">
                    <!-- If i equals getPage, render <a> -->
                    <div v-if="page === getPage" class="page-item active">
                        <span class="ecl-pagination__item--current" aria-current="true">
                            {{ page.toLocaleString('fi') }}
                        </span>
                    </div>
                    <!-- Otherwise render <a> -->
                    <a v-else @click="pageClickedHandler(page)"
                        class="ecl-link ecl-link--standalone ecl-pagination__link">
                        {{ page.toLocaleString('fi') }}
                    </a>
                </div>

                <!-- S  E  C  O  N   D    C  O  R  N  E  R    A  R  R  O  W  -->
                <div v-if="usePaginationArrows" class="ecl-pagination__item ecl-pagination__item--previous"
                    :class="{ 'disabled': !clickedPageValid(getPage + 1) }" @click="pageClickedHandler(getPage + 1)">
                    <a class="ecl-link ecl-link--standalone ecl-link--icon ecl-pagination__link ecl-link--icon-only"
                        aria-label="Go to next page">
                        <span class="ecl-link__label ps-2">Next</span>
                        <svg class="ecl-icon ecl-icon--xs ecl-icon--rotate-90 ecl-link__icon" focusable="false"
                            aria-hidden="true">
                            <use xlink:href="@/assets/img/ecl/icons.svg#corner-arrow"></use>
                        </svg>
                    </a>
                </div>
            </div>

            <!-- ITEMS PER PAGE -->
            <div class="d-flex flex-row flex-wrap align-items-center items-per-page ms-auto">
                <label class="d-inline align-middle me-2 mb-0" data-bs-toggle="translation"
                    :for="'select-page-size-' + $.uid">
                    {{ $t('message.pagination.itemsPerPage') }}
                </label>
                <div class="col-right d-inline">
                    <div class="btn-group items-per-page-dropdown">
                        <select class="ecl-select" :id="'select-page-size-' + $.uid" name="country" required
                            v-model="selectedOption" @change="setPageLimit" data-ecl-auto-init="Select">
                            <option v-for="(item) in defaultItemsPerPageOptions" :value="item">
                                {{ item }}
                            </option>
                        </select>
                        <div class="ecl-select__icon">
                            <button class="ecl-button ecl-button--primary ecl-button--icon-only" type="button"
                                tabindex="-1" aria-hidden="true">
                                <span class="ecl-button__container">
                                    <svg class="ecl-icon ecl-icon--xs ecl-icon--rotate-180 ecl-button__icon"
                                        focusable="false" aria-hidden="true" data-ecl-icon>
                                        <use xlink:href="@/assets/img/ecl/icons.svg#corner-arrow"></use>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pagination',
    components: {},
    props: {
        itemsCount: {
            type: Number,
            default: () => 0,
        },
        itemsPerPage: {
            type: Number,
            default: () => 0,
        },
        getPage: {
            type: Number,
            default: () => 1,
        },
        getPageCount: {
            type: Number,
            default: () => 1,
        },
        // Note: The dataset and catalog components are derived from Piveau,
        // and their pagination behavior differs from that of our custom components.
        // Ensure any modifications account for these differences to maintain compatibility.
        isDatasetOrCatalog: {
            type: Boolean,
            default: true
        },
        disableScroll: { type: Boolean, default: false },
    },
    data() {
        return {
            pagesDisplayed: [],
            usePagination: this.$env.routing.pagination.usePagination,
            usePaginationArrows: this.$env.routing.pagination.usePaginationArrows,
            useItemsPerPage: this.$env.routing.pagination.useItemsPerPage,
            defaultItemsPerPageOptions: this.$env.routing.pagination.defaultItemsPerPageOptions,
            selectedOption: this.isDatasetOrCatalog ? 10 : 5,
        };
    },
    mounted() {
        if (this.itemsPerPage !== 0) {
            this.selectedOption = this.itemsPerPage;
        }
    },
    computed: {},
    methods: {
        /**
         * @description Determines displayed pagenumbers and delimiters in the pagination.
         * @param currentPage {number} The currently active page.
         * @param lastPage {number} The number of the last page (also the pageCount).
         * @returns {array}
         */
        getPagesDisplayed(currentPage, lastPage) {
            const current = currentPage;
            const last = lastPage;
            const delta = currentPage < 1000 ? 2 : 1;
            const left = current - delta;
            const right = current + delta + 1;
            const range = [];
            const rangeWithDots = [];
            let l;

            for (let i = 1; i <= last; i += 1) {
                if (i === 1 || i === last || (i >= left && i < right)) {
                    range.push(i);
                }
            }

            for (const i of range) {
                if (l) {
                    if (i - l === 2) {
                        rangeWithDots.push(l + 1);
                    } else if (i - l !== 1) {
                        rangeWithDots.push('...');
                    }
                }
                rangeWithDots.push(i);
                l = i;
            }
            return rangeWithDots;
        },
        setPageLimit() {
            if (this.isDatasetOrCatalog) {
                this.$emit('setPageLimit', this.selectedOption);
            }
            this.changePageTo(1, this.selectedOption);
        },
        pageClickedHandler(page) {
            if (this.clickedPageValid(page)) {
                this.changePageTo(page, this.itemsPerPage);
            }
        },
        clickedPageValid(page) {
            return typeof page === 'number' && page > 0 && page <= this.getPageCount;
        },
        changePageTo(page, limit) {
            if (this.isDatasetOrCatalog) {
                this.$emit('setPageFromPagination', page);
            } else {
                this.$emit('fetch-data', { page, limit });
            }
            // Scroll to the top of page if this scrolling is not disabled
            if (!this.disableScroll) this.scrollTo(0, 0);
        },
        scrollTo(x, y) {
            window.scrollTo(x, y);
        },
    },
    watch: {
        itemsPerPage(newItemsPerPage) {
            this.selectedOption = newItemsPerPage;
        }
    },
};
</script>

<style scoped>
.page-item {
    display: flex;

    &.disabled {
        color: rgba(0, 0, 0, 0.7);
    }

    .page-link {
        line-height: normal;
    }
}

.items-per-page {
    display: inline;
    margin-left: auto;

    .items-per-page-dropdown {
        width: 100px;
        height: 48px;
    }

    .items-per-page-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 2.75rem;
        background-color: var(--primary);

        .material-icons {
            font-size: 30px;
        }
    }
}
</style>
