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
import type { Form } from '@/components/health-data/application/dataAccessTypes';
import {ApplicationStatusEnum} from "@/components/health-data/application/form-enums";

export interface SectionErrors {
  section2Errors: ErrorFields[];
  section3Errors: ErrorFields[];
  section4Errors: ErrorFields[];
  section5Errors: ErrorFields[];
  section6Errors: ErrorFields[];
  section7Errors: ErrorFields[];
  section8Errors: ErrorFields[];
  section10Errors?: ErrorFields[];
}

export interface ErrorFields {
  code: string;
  errorMessage: string;
  field: string;
  listIndex?: number;
  params: string[];
  countryId?: string;
  section6SubSection?: string;
}

export interface ApplicationStatus {
  status: ApplicationStatusEnum;
  date: string;
  user: string;
  status_history: ApplicationStatus[];
}

export interface CountryOption {
  isoCode: string;
  name: string;
  country: string;
}

export interface DAADatasetDistribution {
  distribution_id: string;
}

export interface DAADataset {
  dataset_id: string;
  date_added: string;
  catalog_id: string;
  distributions: DAADatasetDistribution[];
}
export interface CatalogStatuses {
  status: string;
}
export interface Catalogs {
  catalogs_id: string;
  catalog_languages: string[];
  statuses: CatalogStatuses[];
}
export interface Decisions {
  datasetStatus: string;
  decision_date_received: string;
  latest: number;
}


export interface ApplicationInterface {
  _id?: string;
  /** ECAS ID (Keycloak preferred_username) of the owner. Stored by backend as application.userId on create. */
  userId?: string;
  title?: string;
  status?: ApplicationStatus;
  date_created?: string;
  date_modified?: string;
  datasets?: DAADataset[];
  catalogs?: Catalogs[];
  decisions?: Decisions[];
  form?: Form;
  version?: number;
  form_translations?: any;
  translation?:any;
  inputLanguage?: string;
  additionalInformation?: AdditionalInformation;
}

export interface AdditionalInformation {
  catalogId: string;
  country: Country;
  requestingDate: string;
  formVersion: string;
  translationStatus: string;
  source: any;
  translation: any;
}

export interface Country {
  label: string;
  resource: string;
  countryId: string;
}

export interface RemovedDistribution {
  dataset_id: string;
  distribution_id: string;
}

export interface RemovedDataset {
  dataset_id: string;
}

export interface SelectObject {
  key: string;
  value: string;
}

export interface SelectObjectWithTitle {
  title: string;
  items: SelectObject[];
}

export interface Section {
  sectionNumber: number;
}

export interface PhoneNumber {
  countryCode: string;
  number: string;
  isoCode: string;
}

export interface Attachment {
  name?: string;
  id?: string;
  file?: File;
  size?: number;
}

export type FieldValue = string | number | boolean | undefined;

export interface SectionCompletion {
  completed?: number;
  total?: number;
  mandatoryCompleted?: number;
  mandatoryTotal?: number;
}

export class SectionDefinition {
  id: number;
  title: string;
  description: string;
  sectionTitle: string;

  constructor(data: SectionDefinition) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.sectionTitle = data.sectionTitle;
  }
}

export interface Section1 extends Section {
  removedDistributions: RemovedDistribution[];
  removedDatasets: RemovedDataset[];
  datasetVariables: DatasetVariables[];
}

export interface DatasetVariables {
  datasetId: string;
  variables: any;
}

export interface Section2 extends Section {
  projectName: string;
  projectLeader: string;
  countryOfProjectLeader: SelectObject;
  purposeForWhichDataWillBeUsed: SelectObject[];
  summaryOfTheProject: string;
  theNatureOfTheProjectDoesNotLetYouProvideASummary: boolean;
  theNatureOfTheProjectDoesNotLetYouProvideASummaryReason?: string;
}

export interface Section3 extends Section {
  applyingForDataOnBehalfOfPublicSector?: SelectObject;
  applyingForDataForCarryingOutTasks: SelectObject;
  legalOrNaturalPerson: SelectObject;
  legalOrNaturalPersonProfileDataDate?: Date
  legalPersonName?: string;
  legalPersonAddress?: string;
  legalPersonZipCode?: string;
  legalPersonCity?: string;
  legalPersonCountry?: SelectObject;
  contactPersonName: string;
  contactPersonOrganisationName?: string;
  contactPersonBusinessID?: string;
  contactPersonEmail: string;
  contactPersonPhone: PhoneNumber;
  contactPersonRelationship?: string;
  otherContactPerson?: string;
  contactPersonProfileDataDate?: Date;

  naturalPersonName: string;
  naturalPersonAddress: string;
  naturalPersonZipCode: string;
  naturalPersonCity: string;
  naturalPersonCountry: SelectObject;
  naturalPersonEmail: string;
  naturalPersonPhone: PhoneNumber;
  naturalPersonJobTitle?: string;
  naturalPersonAffiliation?: string;
}

export interface Section4 extends Section {
  sameAsContactPerson: boolean;
  fullName: string;
  address: string;
  phone: PhoneNumber;
  email: string;
  invoiceType: SelectObject;
  invoiceReferenceNumber: string;
  invoiceAddress: string;
  operatorIdentifier: string;
  nameOfTheOrganisation: string;
  businessIdentifierOrganization: string;
  vatNumber: string;
  peppolCode: string;
  isTheProjectFinanciallyCovered: SelectObject;
  rangeOfAmountOfFinancing: SelectObject;
  section4ProfileDataDate?: Date;
}

export interface SectionCompletion {
  completed?: number;
  total?: number;
  mandatoryCompleted?: number;
  mandatoryTotal?: number;
}

export interface ApplicationLabels {
  label?: string;
  tooltip?: string;
  tooltipForm?: string;
  items?: SelectObject[];
  info?: string;
}

export interface BaseSectionLabels {
  sectionH5: string;
  sectionDescription: string;
  yesOrNoOptions: ApplicationLabels;
  onceOrMultipleTimes: ApplicationLabels;
  everyWhen: ApplicationLabels;
  processingData: ApplicationLabels;
  legalBasisForProcessingData: ApplicationLabels;
  lawfulForProcessingPersonalData: ApplicationLabels;
  europeanUnionInstitution: ApplicationLabels;
}

export function getCountryTextList(
  additionalInformation: any[] | null | undefined,
  section: string,
  field: string,
  catalogId?: string
): { countryCode: string; additionalText: any }[] {
  if (!additionalInformation?.length) return [];

  // 1) FILTER: keep only matching catalog_id if provided
  const filtered = catalogId
    ? additionalInformation.filter(item => item.catalog_id === catalogId)
    : additionalInformation;

  // 2) MAP: return raw values exactly as they are
  const mapped = filtered.map(item => {
    const countryCode = item.country?.country_id;
    const sectionData = getAdditionalInfoSection(item, section);

    if (!countryCode || !sectionData) return null;

    // Case 1: direct field (string | object | array)
    if (sectionData[field] !== undefined) {
      return {
        countryCode,
        additionalText: sectionData[field]      // 👈 RAW VALUE RETURNS HERE
      };
    }

    // Case 2: field inside array in section
    const arrayKey = Object.keys(sectionData).find(key =>
      Array.isArray(sectionData[key])
    );

    if (arrayKey) {
      const arr = sectionData[arrayKey];
      const firstItem = arr?.[0];

      if (firstItem && firstItem[field] !== undefined) {
        return {
          countryCode,
          additionalText: firstItem[field]     // 👈 RAW VALUE RETURNS HERE
        };
      }
    }

    return null;
  });

  return mapped.filter(
    (v): v is { countryCode: string; additionalText: any } => v !== null
  );
}

export function getSectionListFieldPerLanguage(
  additionalInformation: any[] | null | undefined,
  sectionKey: string,
  arrayKey: string,
  listIndex: number,
  field: string,
  catalogId?: string
): { countryCode: string; additionalText: any }[] {
  // Early return if there is no data
  if (!additionalInformation?.length) return [];

  // 1) FILTER: keep only items for the given catalogId (if provided)
  const filtered = catalogId
    ? additionalInformation.filter(item => item.catalog_id === catalogId)
    : additionalInformation;

  // 2) MAP: extract countryCode + raw field value
  const mapped = filtered.map(item => {
    const countryCode = item.country?.country_id;
    const section = getAdditionalInfoSection(item, sectionKey);

    if (!countryCode || !section) return null;

    const arr = section[arrayKey];
    if (!Array.isArray(arr)) return null;

    const row = arr[listIndex];
    if (!row || !(field in row)) return null;

    // Return RAW value (string, object, array) exactly as stored in row[field]
    return {
      countryCode,
      additionalText: row[field],
    };
  });

  // 2) Remove null entries
  return mapped.filter(
    (v): v is { countryCode: string; additionalText: any } => v !== null
  );
}

export function hasFilledFieldsInSection(
  additionalInformation: any[] | null | undefined,
  sectionKey: string
): boolean {
  if (!additionalInformation?.length) return false;

  const item = additionalInformation[0]; // all countries share same structure
  const section = getAdditionalInfoSection(item, sectionKey);

  if (!section || typeof section !== "object") return false;

  // Check each field inside the section
  return Object.values(section).some((value) => {
    // Case 1: simple string
    if (typeof value === "string") {
      return value.trim().length > 0;
    }

    // Case 2: array
    if (Array.isArray(value)) {
      // non-empty array means section has data
      if (value.length === 0) return false;

      // If array contains objects, check if ANY object has non-empty fields
      return value.some((entry) =>
        entry && typeof entry === "object"
          ? Object.values(entry).some(
            (v) => typeof v === "string" ? v.trim().length > 0 : v != null
          )
          : entry != null
      );
    }

    // Case 3: object (non-array)
    if (value && typeof value === "object") {
      // If ALL props empty → false
      return Object.values(value).some(
        (v) => (typeof v === "string" ? v.trim().length > 0 : v != null)
      );
    }

    // Case 4: other primitive
    return value != null;
  });
}

/**
 * Checks if, for a given country and section, there is at least one non-empty field.
 *
 * @param additionalInformation - The full additionalInformation array from the application
 * @param sectionKey - The section name to inspect, e.g. "section6", "section7"
 * @param countryCode - The ISO code from item.country.country_id, e.g. "gr"
 * @returns true if at least one field in that section is non-empty for that country, otherwise false
 */
export function hasFilledFieldsInSectionForCountry(
  additionalInformation: any[] | null | undefined,
  sectionKey: string,
  countryCode: string
): boolean {
  if (!additionalInformation?.length) return false;

  // 1) Filter entries only for the requested country
  const countryEntries = additionalInformation.filter(
    (item) => item.country?.country_id === countryCode
  );

  if (!countryEntries.length) {
    // No entry for this country
    return false;
  }

  // 2) For each entry of that country, check if the section has any non-empty field
  return countryEntries.some((item) => {
    const section = getAdditionalInfoSection(item, sectionKey);

    if (!section || typeof section !== "object") {
      return false;
    }

    // 3) Check all fields inside the section object
    return Object.values(section).some((value) => isNonEmptyValue(value));
  });
}

/**
 * Helper to retrieve the additional information comments of a section, with fallback from translation to source.
 * @param additionalInformation - The full additionalInformation object from the application.
 * @param section - The section to retrieve, e.g. "section6", "section7".
 * @returns The additional information comments of the section, either from translation or source.
 */
function getAdditionalInfoSection(additionalInformation: AdditionalInformation, section: string) {
  return additionalInformation.translation?.[section] ?? additionalInformation.source?.[section];
}

// Helper to decide if a single value is considered "non-empty"
function isNonEmptyValue(value: any): boolean {
  // Case 1: simple string
  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  // Case 2: array (we consider it non-empty if any element is non-empty)
  if (Array.isArray(value)) {
    if (value.length === 0) return false;
    return value.some((entry) => isNonEmptyValue(entry));
  }

  // Case 3: object (non-array)
  if (value && typeof value === "object") {
    const values = Object.values(value);
    if (values.length === 0) return false;
    return values.some((v) => isNonEmptyValue(v));
  }

  // Case 4: other primitive (number, boolean, etc.)
  return value != null;
}
