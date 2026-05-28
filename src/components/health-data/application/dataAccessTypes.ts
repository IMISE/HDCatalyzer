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
import {
  convertToApplicationCatalogId,
  convertToApplicationCountries,
  convertToApplicationCountriesWithIds,
  convertToApplicationDatabases,
  convertToApplicationDataHolders,
  convertToApplicationDatasets,
  convertToApplicationDatasetVariables,
  convertToApplicationHDABs,
  convertToApplicationHDABsForSelectedCountry,
  getDatasetTitleFromDataset
} from "@/utils/applicationConverter";

import type {
  ApplicationInterface,
  ApplicationLabels,
  ApplicationStatus,
  Attachment,
  BaseSectionLabels,
  Catalogs,
  DAADataset,
  Decisions,
  FieldValue,
  PhoneNumber,
  Section,
  Section1,
  Section2,
  Section3,
  Section4,
  SectionCompletion,
  SectionDefinition,
  SelectObject
} from "@/components/health-data/application/commonTypes";

export interface Section5DA extends Section {
  whyTheDataIsNeeded: string;
  whatIsTheAimAndTopicOfTheProject: string;
  whichAreTheExpectedBenefits: string;
  describeApplicantsQualification: string;
  legalBasis: string;
  linkToTheSupportingLegalBasis: string;
  summaryOfPlanForUsingTheData: Attachment[];
  summaryOfResearchPlan: Attachment[];
  personResponsibleSameAsContactPerson: boolean;
  personResponsibleName: string
  personResponsibleProfileDataDate?: Date;
  personResearchSameAsContactPerson: boolean;
  personResearchName: string;
  formatOfTheElectronicHealthData: SelectObject;
  inOrderToApplyPseudonymisedDataA: boolean;
  inOrderToApplyPseudonymisedDataB: boolean;
  whyNeedForPseudonymisation: string;
  personResearchProfileDataDate?: Date;
}

export interface Section6DA extends Section {
  country_id: string;
  catalog_ids: string[];
  hdabContacts: string;
  howWillTheDataFromDifferentSourcesBeLinked: string;
  personProfileDataDate?: Date

  //6.1
  howIsTheStudyCohortFormed: SelectObject;
  hasTheStudyCohortBeenFormedBasedOnInformationOfStudyParticipants: SelectObject;
  doesTheInformedConsentCoverTheRequestedRegistryExtractions: SelectObject;
  consentAndInformationLetterAttachment: Attachment[];
  hasTheCohortBeenBasedOnADataPermit: SelectObject;
  confirmThatDataPermitHasBeenGrantedForTheResearchProject: boolean;
  previouslyIssuedPermitIssuer1: string;
  previouslyIssuedPermitDate1: string;
  previouslyIssuedPermitValidityPeriodFrom1: string;
  previouslyIssuedPermitValidityPeriodTo1: string;
  previouslyIssuedPermitNumber1: string;
  permitDecisionAttachment: Attachment[];
  howTheStudyCohortWasObtained: string;
  informationProviderName: string;
  informationProviderEmail: string;
  informationProviderPhone: PhoneNumber;
  whyNeedDataOfaWholePopulation: string;
  sizeOfTheStudyCohort: string;
  sizeOfTheStudyCohortEstimationOrExact: SelectObject;
  whyNeedStudyCohortOfThisSize: string;
  ethicalReviewAttachment: Attachment[];
  informationProviderSameAsContactPerson: boolean;

  //todo list data holders
  //todo list databases
  //todo list dataset/registers

  variablesToBeUsedInDataExtractionAttachment: Attachment[];
  timePeriodOfDataExtraction: string;
  extractionMethod: SelectObject;
  samplingMethod: string;
  sampleSize: string;
  inclusionCriteria: string;
  potentialExclusionCriteria: string;

  howOftenDoesTheDataNeedToBeExtracted: SelectObject;
  needForDataExtractionEvery: SelectObject;
  needForDataExtractionEveryOther?: string;
  needForDataExtractionEveryDescription?: string;
  orderForDataExtraction: string;

  //6.2
  willControlsBeExtracted: SelectObject;
  hasTheGroupRelativesFormed2: SelectObject;
  willSameDataBeExtractedForControls: SelectObject;
  dataHoldersForControls: string[];
  databasesForControls: string[];
  datasetsForControls: string[];
  variablesForDataExtractionAttachments: string;
  timePeriodForDataExtraction: string;
  extractionCriteriaForControls: string;
  sizeOfControlGroup: string;
  sizeOfControlGroupEstimationOrExact: SelectObject;

  controlsPerPersonInStudyCohort: string;
  exclusionCriteriaForControls: string;
  previouslyIssuedPermitIssuer2: string;
  previouslyIssuedPermitDate2: string;
  previouslyIssuedPermitValidityPeriodFrom2: string;
  previouslyIssuedPermitValidityPeriodTo2: string;
  previouslyIssuedPermitNumber2: string;
  willDataForControlsBeExtractedSimultaneously: SelectObject;
  dataExtractionFrequencyMultipleTimesInformation: string;
  dataExtractionFrequency: SelectObject;
  dataNeedsToBeExtractedEvery: SelectObject;
  specifyOther: string;
  moreInfoOnExtractionPeriods: string;
  orderOfControlsDataExtraction: string;
  extractionPhases: string;

  //6.3
  willRelativesBeExtracted: SelectObject;
  hasTheGroupRelativesFormed3: SelectObject;
  previouslyIssuedPermitIssuer3: string;
  previouslyIssuedPermitDate3: string;
  previouslyIssuedPermitValidityPeriodFrom3: string;
  previouslyIssuedPermitValidityPeriodTo3: string;
  previouslyIssuedPermitNumber3: string;
  willSameDataBeExtractedForRelatives: SelectObject;
  dataHoldersForRelatives: string[];
  databasesForRelatives: string[];
  datasetsForRelatives: string[];
  variablesForDataExtractionRelativesAttachments: Attachment[];
  timePeriodForDataExtractionRelatives: string;
  relationshipToStudyCohort: string;
  sizeOfRelativesGroup: string;
  sizeOfRelativesGroupEstimateOrExact: SelectObject;
  willDataForRelativesBeExtractedSimultaneously: SelectObject;
  dataExtractionFrequencyRelatives: SelectObject;
  dataNeedsToBeExtractedEveryRelatives: SelectObject;
  dataExtractionFrequencyMultipleTimesInformationRelatives: string;
  specifyOtherRelatives: string;
  moreInfoOnExtractionPeriodsRelatives: string;
  orderOfRelativesDataExtraction: string;
  extractionPhasesRelatives: string;
}

export interface Section7DA extends Section {
  willDataBeCombinedWithDataObtained: SelectObject;
  combinedCountries: string;
  combinedDataHolders: string;
  combinedDatabaseRegistries: string;
  combinedDatasetsRegistries: string;
  attachmentOfPermitDocuments: Attachment[];
  otherPermitApplications: SelectObject;
  dateOfSubmittingTheApplication: string;
  applicationIssuer: string;
  identificationCode: string;

  otherDataPermits: PermitDocument[];
  provideInformationList: ProvidedInformation[];
}

export interface Section8DA extends Section {
  technicalRequirementsForEnvironment: string;
  nameWebsiteAddressForEnvironment: string;
  whenDataNeeded: SelectObject;
  ifLaterWhen: string;
  informationWhichDataCanAccess: string;
  frequencyOfAccessOrDataUpdates: string;
  estimatedStartDatesForDataProcessing: string;
  estimatedEndDatesForDataProcessing: string;
  startPeriodOfInactiveDataStorage: string;
  endPeriodOfInactiveDataStorage: string;
  willTheDataBeTransferred: SelectObject;
  whichCountriesDataBeProcessed: SelectObject[];
  whyWillDataBeTransferredOutsideEUArticle47: boolean;
  whyWillDataBeTransferredOutsideEUArticle47Options: SelectObject []
  whyWillDataBeTransferredOutsideEUArticle47a: boolean;
  whyWillDataBeTransferredOutsideEUArticle47b: boolean;
  whyWillDataBeTransferredOutsideEUArticle47c: boolean;
  whyWillDataBeTransferredOutsideEUArticle48: boolean;
  whyWillDataBeTransferredOutsideEUArticle48a: boolean;
  whyWillDataBeTransferredOutsideEUArticle48b: boolean;
  whyWillDataBeTransferredOutsideEUArticle48bOptions: SelectObject[];
  whyWillDataBeTransferredOutsideEUArticle48c: boolean;
  whyWillDataBeTransferredOutsideEUArticle48cOpt: SelectObject;
  whyWillDataBeTransferredOutsideEUArticle48d: boolean;
  whyWillDataBeTransferredOutsideEUArticle48e: boolean;
  whyWillDataBeTransferredOutsideEUArticle49: boolean;
  legalBasisForTransferringTheDataOutsideEU: SelectObject;
  legalBasisForTransferringTheDataOutsideEUOtherOptions: SelectObject[];
  safeguardsAreProvidedByReferringGDCP: SelectObject[];
  safeguardsAreProvidedByOtherExceptionalLegalBases: SelectObject;
  whichOrganizationWillBeTheControllerOfData: string;
  complyWithDataMinimisationPrinciple: string;
  complyWithDataMinimisationPrincipleNotEUMember: string;
  protectionAndSecurityStatementsA: boolean;
  protectionAndSecurityStatementsB: boolean;
  protectionAndSecurityStatementsC: boolean;
  protectionAndSecurityStatementsD: boolean;
  protectionAndSecurityStatementsE: boolean;
  legalBasisForProcessingPersonalData: SelectObject[];
  lawfulForProcessingPersonalData: SelectObject[];
  otherLegalBasisForProcessingPersonalData: string;
  legalBasisForProcessingCombinedData: SelectObject[];
  otherLegalBasisForProcessingCombinedData: string;
  legalBasisForProcessingApplicationData: SelectObject[];
  europeanUnionInstitution: SelectObject[];
  otherLegalBasisForProcessingApplicationData: string;
  legalBasisForProcessingCombinedApplicationData: SelectObject[];
  otherLegalBasisForProcessingCombinedApplicationData: string;
  attachResearchPermitIfRequired: Attachment[];
  hdabToRetain: SelectObject;

  sameAsContactPerson: boolean;
  peopleWhoWillBeProcessingTheData: Person[];
  optOutOfTheMechanismProvidedInTheNationalLaw: SelectObject
  providedJustificationException: string

}

export interface Section9DA extends Section {
  additionalInformation: string
  additionalAttachment: Attachment[];
}

export interface Section10DA extends Section {
  awareProcessingFee: boolean;
  awareChargeFee: boolean;
  awareInformationCorrect: boolean;
}

export interface Form {
  section1?: Section1;
  section2?: Section2;
  section3?: Section3;
  section4?: Section4;
  section5?: Section5DA;
  section6?: Section6DA[];
  section7?: Section7DA;
  section8?: Section8DA;
  section9?: Section9DA;
  section10?: Section10DA;
}

export interface PermitDocument {
  permitIssuer: string;
  permitStartDateOfIssue: string;
  permitEndDateOfIssue: string;
  permitIdentificationInformation: string;
}

export interface ProvidedInformation {
  dataset: string;
  numberOfFiles: string;
  formatOfFiles: string;
  sizeOfFiles: string;
  notes: string;
}

export interface Person {
  fullName: string;
  emailAddress: string;
}

// ------- S E C T I O N S  L A B E L S   A N D   I T E M S ----------------------------------------

export interface Section1LabelsDA extends BaseSectionLabels {
  applicationDatasets: ApplicationLabels;
  applicationCountries: ApplicationLabels;
  applicationDataHolders: ApplicationLabels;
  applicationHDABs: ApplicationLabels;
  applicationDatabases: ApplicationLabels;
  variables: ApplicationLabels;
  datatype: ApplicationLabels;
  description: ApplicationLabels;
  title: ApplicationLabels;
  emptyTable: ApplicationLabels;
}

export interface Section2LabelsDA extends BaseSectionLabels {
  projectName: ApplicationLabels;
  projectLeader: ApplicationLabels;
  countryOfProjectLeader: ApplicationLabels;
  purposeForWhichDataWillBeUsed: ApplicationLabels;
  summaryOfTheProject: ApplicationLabels;
  theNatureOfTheProjectDoesNotLetYouProvideASummary: ApplicationLabels;
  theNatureOfTheProjectDoesNotLetYouProvideASummaryReason: ApplicationLabels;
}

export interface Section3LabelsDA extends BaseSectionLabels {
  applyingForDataOnBehalfOfPublicSector: ApplicationLabels;
  applyingForDataForCarryingOutTasks: ApplicationLabels;
  legalOrNaturalPerson: ApplicationLabels;
  legalPerson: string;
  naturalPerson: string;
  participatingEntitiesInstruction:string;
  legalPersonName: ApplicationLabels;
  postalAddress: string;
  legalPersonAddress: ApplicationLabels;
  legalPersonZipCode: ApplicationLabels;
  legalPersonCity: ApplicationLabels;
  legalPersonCountry: ApplicationLabels;
  contactPersonInformation: string;
  contactPersonInformationDescription: string;
  contactPersonName: ApplicationLabels;
  contactPersonEmail: ApplicationLabels;
  contactPersonPhone: ApplicationLabels;
  contactPersonOrganisationName: ApplicationLabels;
  contactPersonBusinessID: ApplicationLabels;
  contactPersonRelationship: ApplicationLabels;
  otherContactPerson: ApplicationLabels;
  naturalPersonName: ApplicationLabels;
  naturalPersonAddress: ApplicationLabels;
  naturalPersonZipCode: ApplicationLabels;
  naturalPersonCity: ApplicationLabels;
  naturalPersonCountry: ApplicationLabels;
  naturalPersonEmail: ApplicationLabels;
  naturalPersonPhone: ApplicationLabels;
  naturalPersonJobTitle: ApplicationLabels;
  naturalPersonAffiliation: ApplicationLabels;
}

export interface Section4LabelsDA extends BaseSectionLabels {
  sameAsContactPerson: ApplicationLabels;
  postalAddressLabel: string;
  fullName: ApplicationLabels;
  address: ApplicationLabels;
  email: ApplicationLabels;
  phone: ApplicationLabels;
  invoiceType: ApplicationLabels;
  invoiceReferenceNumber: ApplicationLabels;
  invoiceAddress: ApplicationLabels;
  operatorIdentifier: ApplicationLabels;
  nameOfTheOrganisation: ApplicationLabels;
  businessIdentifierOrganization: ApplicationLabels;
  vatNumber: ApplicationLabels;
  peppolCode: ApplicationLabels;
  isTheProjectFinanciallyCovered: ApplicationLabels;
  rangeOfAmountOfFinancing: ApplicationLabels;
}

export interface Section5LabelsDA extends BaseSectionLabels {
  purposeOfUse: ApplicationLabels;
  whyTheDataIsNeeded: ApplicationLabels;
  whatIsTheAimAndTopicOfTheProject: ApplicationLabels;
  whichAreTheExpectedBenefits: ApplicationLabels;
  describeApplicantsQualification: ApplicationLabels;
  legalBasis: ApplicationLabels;
  linkToTheSupportingLegalBasis: ApplicationLabels;
  summaryOfPlanForUsingTheData: ApplicationLabels;
  summaryOfResearchPlan: ApplicationLabels;
  personResponsibleLabel: string;
  personResponsibleName: ApplicationLabels;
  personResearchSameAsContactPerson: ApplicationLabels;
  personResponsibleForResearchLabel: string;
  personResponsibleSameAsContactPerson: ApplicationLabels;
  personResearchName: ApplicationLabels;
  formatOfTheElectronicHealthData: ApplicationLabels;
  inOrderToApplyPseudonymisedData: string;
  inOrderToApplyPseudonymisedDataA: ApplicationLabels;
  inOrderToApplyPseudonymisedDataB: ApplicationLabels;
  whyNeedForPseudonymisation: ApplicationLabels;
}

export interface Section6LabelsDA extends BaseSectionLabels {
  descriptionSection6_1: string;
  descriptionOfTheDataNeeded: string;
  applicationHDABsForSelectedCountry: string;
  applicationDatasetsPerCountry: string;
  hdabContacts: ApplicationLabels;
  howWillTheDataFromDifferentSourcesBeLinked: ApplicationLabels;
  howIsTheStudyCohortFormed: ApplicationLabels;
  hasTheStudyCohortBeenFormedBasedOnInformationOfStudyParticipants: ApplicationLabels;
  doesTheInformedConsentCoverTheRequestedRegistryExtractions: ApplicationLabels;
  consentAndInformationLetterAttachment: ApplicationLabels;
  hasTheCohortBeenBasedOnADataPermit: ApplicationLabels;
  confirmThatDataPermitHasBeenGrantedForTheResearchProject: ApplicationLabels;
  ifTheGroupHasBeenFormedBasedOnPreviousIssued: ApplicationLabels;
  previouslyIssuedPermitIssuer1: ApplicationLabels;
  previouslyIssuedPermitDate1: ApplicationLabels;
  validityPeriod1: string;
  previouslyIssuedPermitValidityPeriodFrom1: ApplicationLabels;
  previouslyIssuedPermitValidityPeriodTo1: ApplicationLabels;
  previouslyIssuedPermitNumber1: ApplicationLabels;
  permitDecisionAttachment: ApplicationLabels;
  howTheStudyCohortWasObtained: ApplicationLabels;
  whoWillDeliverTheInformationOnTheStudy: ApplicationLabels;
  informationProviderName: ApplicationLabels;
  informationProviderEmail: ApplicationLabels;
  informationProviderPhone: ApplicationLabels;
  whyNeedDataOfaWholePopulation: ApplicationLabels;
  sizeOfTheStudyCohort: ApplicationLabels;
  sizeOfTheStudyCohortEstimationOrExact: ApplicationLabels;
  whyNeedStudyCohortOfThisSize: ApplicationLabels;
  ethicalReview: string;
  ethicalReviewDescription: string;
  ethicalReviewAttachment: ApplicationLabels;
  dataHolders: string;
  whichDatabasesDataExtracted: string;
  whichDatasetDataExtracted: string;
  variablesToBeUsedInDataExtractionAttachment: ApplicationLabels;
  timePeriodOfDataExtraction: ApplicationLabels;
  extractionMethod: ApplicationLabels;
  samplingMethod: ApplicationLabels;
  sampleSize: ApplicationLabels;
  inclusionCriteria: ApplicationLabels;
  potentialExclusionCriteria: ApplicationLabels;
  dataExtraction: string;
  dataExtractionTimes: string;
  howOftenDoesTheDataNeedToBeExtracted: ApplicationLabels;
  needForDataExtractionEvery: ApplicationLabels;
  needForDataExtractionEveryOther: ApplicationLabels;
  needForDataExtractionEveryDescription: ApplicationLabels;
  orderForDataExtraction: ApplicationLabels;
  definingExtractionCriteria: string;
  willControlsBeExtracted: ApplicationLabels;
  hasTheGroupRelativesFormed2: ApplicationLabels;
  willSameDataBeExtractedForControls: ApplicationLabels;
  fromWhichDataHolderLabel: string;
  fromWhichDatabaseLabel: string;
  fromWhichDatasetLabel: string;
  dataNeedsToBeExtractedEveryRelatives: ApplicationLabels;
  variablesForDataExtractionAttachments: ApplicationLabels;
  timePeriodForDataExtraction: ApplicationLabels;
  extractionCriteriaForControls: ApplicationLabels;
  sizeOfControlGroup: ApplicationLabels;
  sizeOfControlGroupEstimationOrExact: ApplicationLabels;
  controlsPerPersonInStudyCohort: ApplicationLabels;
  exclusionCriteriaForControls: ApplicationLabels;
  ifTheGroupHasBeenFormed: string;
  previouslyIssuedPermitIssuer2: ApplicationLabels;
  previouslyIssuedPermitDate2: ApplicationLabels;
  validityPeriod2: string;
  previouslyIssuedPermitValidityPeriodFrom2: ApplicationLabels;
  previouslyIssuedPermitValidityPeriodTo2: ApplicationLabels;
  previouslyIssuedPermitNumber2: ApplicationLabels;
  dataExtractionAndOrderForControls: string;
  willDataForControlsBeExtractedSimultaneously: ApplicationLabels;
  dataExtractionFrequency: ApplicationLabels;
  dataExtractionFrequencyMultipleTimesInformation: ApplicationLabels;
  dataNeedsToBeExtractedEvery: ApplicationLabels;
  specifyOther: ApplicationLabels;
  moreInfoOnExtractionPeriods: ApplicationLabels;
  orderOfControlsDataExtraction: ApplicationLabels;
  definingTheExtractionCriteria: string;
  willRelativesBeExtracted: ApplicationLabels;
  ifTheGroupOfRelativesHasBeenFormed: ApplicationLabels;
  hasTheGroupRelativesFormed3: ApplicationLabels;
  previouslyIssuedPermitIssuer3: ApplicationLabels;
  previouslyIssuedPermitDate3: ApplicationLabels;
  validityPeriod3: string;
  previouslyIssuedPermitValidityPeriodFrom3: ApplicationLabels;
  previouslyIssuedPermitValidityPeriodTo3: ApplicationLabels;
  previouslyIssuedPermitNumber3: ApplicationLabels;
  willSameDataBeExtractedForRelatives: ApplicationLabels;
  whichDataHoldersForRelatives: string;
  whichDatabaseForRelatives: string;
  whichDatasetsForRelatives: string;
  variablesForDataExtractionRelativesAttachments: ApplicationLabels;
  timePeriodForDataExtractionRelatives: ApplicationLabels;
  relationshipToStudyCohort: ApplicationLabels;
  sizeOfRelativesGroup: ApplicationLabels;
  sizeOfRelativesGroupEstimateOrExact: ApplicationLabels;
  willDataForRelativesBeExtractedSimultaneously: ApplicationLabels;
  dataExtractionFrequencyRelatives: ApplicationLabels;
  dataExtractionFrequencyMultipleTimesInformationRelatives: ApplicationLabels;
  needForDataExtractionEveryOptions: ApplicationLabels;
  specifyOtherRelatives: ApplicationLabels;
  moreInfoOnExtractionPeriodsRelatives: ApplicationLabels;
  orderOfRelativesDataExtraction: ApplicationLabels;
  informationProviderSameAsContactPerson: ApplicationLabels;
}

export interface Section7LabelsDA extends BaseSectionLabels {
  addDataPermit: string;
  addInfo: ApplicationLabels;
  removeDataPermit: string;
  willDataBeCombinedWithDataObtained: ApplicationLabels;
  listOtherDataToBeCompined: string;
  combinedCountries: ApplicationLabels;
  combinedDataHolders: ApplicationLabels;
  combinedDatabaseRegistries: ApplicationLabels;
  combinedDatasetsRegistries: ApplicationLabels;
  provideInformationList: ApplicationLabels;
  dataset: ApplicationLabels;
  numberOfFiles: ApplicationLabels;
  formatOfFiles: ApplicationLabels;
  sizeOfFiles: ApplicationLabels;
  notes: ApplicationLabels;
  listAnyOtherDataPermit: string;
  otherPermits: ApplicationLabels;
  permitIssuer: ApplicationLabels;
  permitStartDateOfIssue: ApplicationLabels;
  permitEndDateOfIssue: ApplicationLabels;
  permitIdentificationInformation: ApplicationLabels;
  attachmentOfPermitDocuments: ApplicationLabels;
  otherPermitApplications: ApplicationLabels;
  applicationIssuer: ApplicationLabels;
  dateOfSubmittingTheApplication: ApplicationLabels;
  identificationCode: ApplicationLabels;
}

export interface Section8LabelsDA extends BaseSectionLabels {
  addPerson: string;
  removePerson: string;
  technicalRequirementsForEnvironment: ApplicationLabels;
  nameWebsiteAddressForEnvironment: ApplicationLabels;
  healthDataAccessBody: string;
  whenDataNeeded: ApplicationLabels;
  ifLaterWhen: ApplicationLabels;
  informationWhichDataCanAccess: ApplicationLabels;
  frequencyOfAccessOrDataUpdates: ApplicationLabels;
  estimatedStartAndEnd: ApplicationLabels;
  estimatedStartDatesForDataProcessing: ApplicationLabels;
  estimatedEndDatesForDataProcessing: ApplicationLabels;
  ifStoreNeeded: string;
  startPeriodOfInactiveDataStorage: ApplicationLabels;
  endPeriodOfInactiveDataStorage: ApplicationLabels;
  willTheDataBeTransferred: ApplicationLabels;
  whichCountriesDataBeProcessed: ApplicationLabels;
  whyWillDataBeTransferredOutsideEU: ApplicationLabels;
  whyWillDataBeTransferredOutsideEUArticle47: ApplicationLabels;
  whyWillDataBeTransferredOutsideEUArticle47Options: ApplicationLabels;
  whyWillDataBeTransferredOutsideEUArticle48cOpt: ApplicationLabels;
  whyWillDataBeTransferredOutsideEUArticle48: ApplicationLabels;
  whyWillDataBeTransferredOutsideEUArticle48a: ApplicationLabels;
  whyWillDataBeTransferredOutsideEUArticle48b: ApplicationLabels;
  whyWillDataBeTransferredOutsideEUArticle48bOptions: ApplicationLabels;
  whyWillDataBeTransferredOutsideEUArticle48c: ApplicationLabels;
  whyWillDataBeTransferredOutsideEUArticle48d: ApplicationLabels;
  whyWillDataBeTransferredOutsideEUArticle48e: ApplicationLabels;
  whyWillDataBeTransferredOutsideEUArticle49: ApplicationLabels;
  legalBasisForTransferringTheDataOutsideEU: ApplicationLabels;
  legalBasisForTransferringTheDataOutsideEUOtherOptions: ApplicationLabels;
  legalBasisForTransferringTheDataOutsideEUc1: ApplicationLabels;
  legalBasisForTransferringTheDataOutsideEUc2: ApplicationLabels;
  legalBasisForTransferringTheDataOutsideEUc3: ApplicationLabels;
  legalBasisForTransferringTheDataOutsideEUc4: ApplicationLabels;
  legalBasisForTransferringTheDataOutsideEUc5: ApplicationLabels;
  legalBasisForTransferringTheDataOutsideEUc6: ApplicationLabels;
  legalBasisForTransferringTheDataOutsideEUc7: ApplicationLabels;
  safeguardsAreProvidedByReferringGDCP: ApplicationLabels;
  whichOrganizationWillBeTheControllerOfData: ApplicationLabels;
  complyWithDataMinimisationPrinciple: ApplicationLabels;
  complyWithDataMinimisationPrincipleNotEUMember: ApplicationLabels;
  protectionAndSecurityStatements: ApplicationLabels;
  protectionAndSecurityStatementsA: ApplicationLabels;
  protectionAndSecurityStatementsB: ApplicationLabels;
  protectionAndSecurityStatementsC: ApplicationLabels;
  protectionAndSecurityStatementsD: ApplicationLabels;
  protectionAndSecurityStatementsE: ApplicationLabels;
  onlyThePeopleMentioned: string;
  sameAsContactPerson: ApplicationLabels;
  listTheFullNames: string;
  fullName: ApplicationLabels;
  emailAddress: ApplicationLabels;
  lawfulnessOfProcessing: string;
  legalBasisForProcessingPersonalData: ApplicationLabels;
  lawfulForProcessingPersonalData: ApplicationLabels;
  lawfulForProcessingPersonalDataNaturalPersonOption: SelectObject;
  otherLegalBasisForProcessingPersonalData: ApplicationLabels;
  legalBasisForProcessingCombinedData: ApplicationLabels;
  otherLegalBasisForProcessingCombinedData: ApplicationLabels;
  legalBasisForProcessingApplicationData: ApplicationLabels;
  europeanUnionInstitution: ApplicationLabels;
  otherLegalBasisForProcessingApplicationData: ApplicationLabels;
  legalBasisForProcessingCombinedApplicationData: ApplicationLabels;
  otherLegalBasisForProcessingCombinedApplicationData: ApplicationLabels;
  attachResearchPermitIfRequired: ApplicationLabels;
  hdabToRetain: ApplicationLabels;
  optOutOfTheMechanismProvidedInTheNationalLaw: ApplicationLabels;
  providedJustificationException: ApplicationLabels;
}

export interface Section9LabelsDA extends BaseSectionLabels {
  additionalInformation: ApplicationLabels;
  additionalAttachment: ApplicationLabels;
}

export interface Section10LabelsDA extends BaseSectionLabels {
  submitYouApplicationText: ApplicationLabels;
  awareProcessingFee: ApplicationLabels;
  awareChargeFee: ApplicationLabels;
  awareInformationCorrect: ApplicationLabels;
}

export class DataAccessApplication implements ApplicationInterface {

  _id?: string = undefined;
  /** ECAS ID (Keycloak preferred_username) of the owner. Backend stores this as application.userId on create. */
  userId?: string;
  inputLanguage?: string;
  title?: string;
  status?: ApplicationStatus;
  date_created?: string;
  date_modified?: string;
  date_submitted?: string;
  datasets?: DAADataset[];
  catalogs?: Catalogs[];
  decisions?: Decisions[];
  form?: Form;
  hubDatasets?: any;
  version?: number;
  form_translations?: any;
  formTranslationsKeys?: any ;
  translation?: any;
  additionalInformation?: any;

  constructor(data: ApplicationInterface, hubDatasets: any) {
    this._id = data._id;
    this.userId = (data as any).userId;
    this.inputLanguage = data.inputLanguage;
    this.title = data.title;
    this.status = data.status;
    this.date_created = data.date_created;
    this.date_modified = data.date_modified;
    this.datasets = data.datasets;
    this.catalogs = data.catalogs;
    this.decisions = data.decisions;
    this.form = data.form;
    this.version = data.version;
    this.additionalInformation = data.additionalInformation;
    this.form ??= {} as Form;
    this.form.section1 ??= {
      sectionNumber: 1,
      removedDistributions: [],
      removedDatasets: [],
    } as Section1;
    this.form.section2 ??= {sectionNumber: 2} as Section2;
    this.form.section3 ??= {sectionNumber: 3} as Section3;
    this.form.section4 ??= {sectionNumber: 4} as Section4;
    this.form.section5 ??= {sectionNumber: 5} as Section5DA;
    this.form.section6 ??= [];
    this.form.section7 ??= {sectionNumber: 7} as Section7DA;
    this.form.section8 ??= {sectionNumber: 8} as Section8DA;
    this.form.section9 ??= {sectionNumber: 9} as Section9DA;
    this.form.section10 ??= {sectionNumber: 10} as Section10DA;

    this.translation = data.translation;
    this.form_translations = data.form_translations;

    if (this.form_translations && typeof this.form_translations === 'object') {
      // Keep only translations that are allowed
      this.formTranslationsKeys = Object.keys(this.form_translations).map(k => String(k).toLowerCase())
    }

    if (this.form.section5.summaryOfPlanForUsingTheData != undefined && !Array.isArray(this.form.section5.summaryOfPlanForUsingTheData)) {
      this.form.section5.summaryOfPlanForUsingTheData = [];
    } else if (this.form.section5.summaryOfResearchPlan != undefined && !Array.isArray(this.form.section5.summaryOfResearchPlan)) {
      this.form.section5.summaryOfResearchPlan = [];
    }

    if (this.form.section7.attachmentOfPermitDocuments != undefined && !Array.isArray(this.form.section7.attachmentOfPermitDocuments)) {
      this.form.section7.attachmentOfPermitDocuments = [];
    }

    if (this.form.section8.attachResearchPermitIfRequired != undefined && !Array.isArray(this.form.section8.attachResearchPermitIfRequired)) {
      this.form.section8.attachResearchPermitIfRequired = [];
    }

    this.hubDatasets = hubDatasets;

    const section6 = this.form.section6;
    const expectedCountries = convertToApplicationCountries(hubDatasets);
    expectedCountries.forEach((country) => {
      if (!section6.find((section) => section.country_id === country)) {
        const catalogIds = convertToApplicationCatalogId(hubDatasets, country);

        section6.push({
          sectionNumber: 6,
          country_id: country,
          catalog_ids: catalogIds,
        } as unknown as Section6DA);
      }
    });

    //remove countries that are not in the hub
    this.form.section6 = section6.filter((section6) =>
      expectedCountries.includes(section6.country_id)
    );
  }

  getTotalCompletionPercentage(): number {
    let percentage = 0;
    let completed = 0;
    let total = 0;
    for (let i = 1; i <= 10; i++) {
      const sectionCompletion = this.getSectionCompletion({id: i} as SectionDefinition);
      completed += sectionCompletion?.mandatoryCompleted ?? 0;
      total += sectionCompletion?.mandatoryTotal ?? 0;
    }
    percentage = (completed / total) * 100;
    return Math.round(percentage);
  }

  getSectionCompletion(sectionDef: SectionDefinition): SectionCompletion {
    switch (sectionDef.id) {
      case 1: {
        const datasetVariables =  this.getDatasetVariables();

        const section1 = this.form?.section1;

        const mandatoryCompletedCount = new Set(
          (section1?.datasetVariables || []).map(d => d.datasetId)
        ).size;

        const mandatoryTotalCount = new Set(
          (datasetVariables || [])
          .filter(d => Array.isArray(d.variables) && d.variables.length > 0)
          .map(d => d.datasetId)
        ).size;

        return {
          mandatoryTotal: datasetVariables ? mandatoryTotalCount : 0,
          mandatoryCompleted: section1?.datasetVariables ? mandatoryCompletedCount : 0,
          completed: 5 + (section1?.datasetVariables ? mandatoryCompletedCount : 0),
          total: 5 + (datasetVariables ? mandatoryTotalCount : 0)
        };
      }
      case 2:
        return this.getSection2Completion();
      case 3:
        return this.getSection3Completion();
      case 4:
        return this.getSection4Completion();
      case 5:
        return this.getSection5Completion();
      case 6: {
        let mandatoryCompleted = 0;
        let mandatoryTotal = 0;
        let completed = 0;
        let total = 0;
        const section6AllCountries = this.form?.section6;

        if (section6AllCountries?.length) {
          const subSectionIds = [6, 6.1, 6.2, 6.3];
          section6AllCountries.forEach((section6Country) => {
            subSectionIds.forEach((subSectionId) => {
              const {
                mandatoryCompleted: countryCompleted = 0,
                mandatoryTotal: countryTotal = 0,
                completed: allCompleted = 0,
                total: allTotal = 0,
              } = this.getSubSectionCompletion(subSectionId, section6Country.country_id);
              mandatoryCompleted += countryCompleted;
              mandatoryTotal += countryTotal;
              completed += allCompleted;
              total += allTotal;
            });
          });
        }

        return {mandatoryCompleted, mandatoryTotal, completed, total};
      }
      case 7:
        return this.getSection7Completion();
      case 8:
        return this.getSection8Completion();
      case 9: {
        const section9 = this.form?.section9;
        if (!section9) return this.calculateSectionCompletion([], []);

        const optionalFieldValues: FieldValue[] = [
          section9.additionalInformation,
          section9.additionalAttachment?.length,
        ];
        return this.calculateSectionCompletion([], optionalFieldValues);
      }
      case 10: {
        const section10 = this.form?.section10;
        if (!section10) return this.calculateSectionCompletion([], []);

        const mandatoryFieldValues: FieldValue[] = [
          section10.awareProcessingFee,
          section10.awareChargeFee,
          section10.awareInformationCorrect,
        ];
        return this.calculateSectionCompletion(mandatoryFieldValues, []);
      }
      default:
        return this.calculateSectionCompletion([], []);
    }
  }

  private getSection2Completion(): SectionCompletion {
    const mandatoryFieldValues: FieldValue[] = [];
    const optionalFieldValues: FieldValue[] = [];
    const section2 = this.form?.section2;
    if (!section2) {
      return this.calculateSectionCompletion(mandatoryFieldValues, optionalFieldValues);
    }

    mandatoryFieldValues.push(
      section2.projectName,
      section2.projectLeader,
      section2.countryOfProjectLeader?.key,
      section2.purposeForWhichDataWillBeUsed?.length
    );

    optionalFieldValues.push(
      section2.theNatureOfTheProjectDoesNotLetYouProvideASummary,
    );

    if (section2.theNatureOfTheProjectDoesNotLetYouProvideASummary) {
      mandatoryFieldValues.push(section2.theNatureOfTheProjectDoesNotLetYouProvideASummaryReason);
    } else {
      mandatoryFieldValues.push(section2.summaryOfTheProject);
    }

    return this.calculateSectionCompletion(mandatoryFieldValues, optionalFieldValues);
  }

  private getSection3Completion(): SectionCompletion {
    const mandatoryFieldValues: FieldValue[] = [];
    const optionalFieldValues: FieldValue[] = [];
    const section3 = this.form?.section3;
    if (!section3) {
      return this.calculateSectionCompletion(mandatoryFieldValues, optionalFieldValues);
    }

    mandatoryFieldValues.push(
      section3.applyingForDataOnBehalfOfPublicSector?.key,
      section3.legalOrNaturalPerson?.key
    );

    // a = Yes
    if (section3.applyingForDataOnBehalfOfPublicSector?.key === 'a') {
      mandatoryFieldValues.push(section3.applyingForDataForCarryingOutTasks?.key);
    }

    // a = Legal person, b = Natural person
    if (section3.legalOrNaturalPerson?.key === 'a') {
      mandatoryFieldValues.push(
        section3.legalPersonName,
        section3.legalPersonAddress,
        section3.legalPersonZipCode,
        section3.legalPersonCity,
        section3.legalPersonCountry?.key,
        section3.contactPersonName,
        section3.contactPersonEmail,
        section3.contactPersonPhone?.number,
        section3.contactPersonOrganisationName,
        section3.contactPersonBusinessID,
        section3.contactPersonRelationship
      );
    } else if (section3.legalOrNaturalPerson?.key === 'b') {
      mandatoryFieldValues.push(
        section3.naturalPersonName,
        section3.naturalPersonAddress,
        section3.naturalPersonZipCode,
        section3.naturalPersonCity,
        section3.naturalPersonCountry?.key,
        section3.naturalPersonEmail,
        section3.naturalPersonPhone?.number,
        section3.naturalPersonJobTitle,
        section3.naturalPersonAffiliation
      );
    }

    optionalFieldValues.push(
      section3.otherContactPerson,
    );

    return this.calculateSectionCompletion(mandatoryFieldValues, optionalFieldValues);
  }

  private getSection4Completion(): SectionCompletion {
    const mandatoryFieldValues: FieldValue[] = [];
    const optionalFieldValues: FieldValue[] = [];
    const section4 = this.form?.section4;
    if (!section4) {
      return this.calculateSectionCompletion(mandatoryFieldValues, optionalFieldValues);
    }

    mandatoryFieldValues.push(
      section4.fullName,
      section4.address,
      section4.phone?.number,
      section4.email,
      section4.invoiceType?.key,
      section4.invoiceReferenceNumber,
      section4.isTheProjectFinanciallyCovered?.key
    );

    optionalFieldValues.push(section4.sameAsContactPerson);

    // b = Electronic invoice
    if (section4.invoiceType?.key === 'b') {
      mandatoryFieldValues.push(section4.invoiceAddress);
    }

    // a = Legal person
    if (this.form?.section3?.legalOrNaturalPerson?.key === 'a') {
      mandatoryFieldValues.push(
        section4.operatorIdentifier,
        section4.nameOfTheOrganisation,
        section4.businessIdentifierOrganization,
        section4.vatNumber
      );

      optionalFieldValues.push(section4.peppolCode);
    }

    // a = Yes
    if (section4.isTheProjectFinanciallyCovered?.key === 'a') {
      mandatoryFieldValues.push(section4.rangeOfAmountOfFinancing?.key);
    }

    return this.calculateSectionCompletion(mandatoryFieldValues, optionalFieldValues);
  }

  private getSection5Completion(): SectionCompletion {
    const mandatoryFieldValues: FieldValue[] = [];
    const optionalFieldValues: FieldValue[] = [];
    const section5 = this.form?.section5;
    if (!section5) {
      return this.calculateSectionCompletion(mandatoryFieldValues, optionalFieldValues);
    }

    mandatoryFieldValues.push(
      section5.whyTheDataIsNeeded,
      section5.whatIsTheAimAndTopicOfTheProject,
      section5.whichAreTheExpectedBenefits,
      section5.describeApplicantsQualification,
      section5.formatOfTheElectronicHealthData?.key
    );

    // b = Pseudonymised
    if (section5.formatOfTheElectronicHealthData?.key === 'b') {
      mandatoryFieldValues.push(
        section5.inOrderToApplyPseudonymisedDataA,
        section5.inOrderToApplyPseudonymisedDataB,
        section5.whyNeedForPseudonymisation
      );
    }

    // This field is not an array until at least one option is selected, so we need to check if
    // forEach exists

    const notContainE: boolean = this.form?.section2?.purposeForWhichDataWillBeUsed?.some((elem => elem?.key !== 'e'));

    if (notContainE) {
      optionalFieldValues.push(section5.personResponsibleSameAsContactPerson);
      mandatoryFieldValues.push(
        section5.personResponsibleName,
        section5.summaryOfPlanForUsingTheData?.length)
    }

    this.form?.section2?.purposeForWhichDataWillBeUsed?.forEach?.((obj) => {
      if (obj.key?.startsWith('b')) {
        mandatoryFieldValues.push(section5.legalBasis, section5.linkToTheSupportingLegalBasis);
      }

      if (obj.key?.startsWith('e')) {
        optionalFieldValues.push(section5.personResearchSameAsContactPerson);
        mandatoryFieldValues.push(
          section5.personResearchName,
          section5.summaryOfResearchPlan?.length,
        );
      }
    });

    return this.calculateSectionCompletion(mandatoryFieldValues, optionalFieldValues);
  }

  getSubSectionCompletion(subSectionId: number, activeCountry: string): SectionCompletion {
    const countrySection = this.form?.section6?.find((item) => item.country_id === activeCountry);
    if (!countrySection) {
      return this.calculateSectionCompletion([], []);
    }

    switch (subSectionId) {
      case 6: {
        const mandatoryFieldValues = [countrySection.howWillTheDataFromDifferentSourcesBeLinked];
        const optionalFieldValues = [countrySection.hdabContacts];
        return this.calculateSectionCompletion(mandatoryFieldValues, optionalFieldValues);
      }
      case 6.1:
        return this.getSubSection1Completion(countrySection);
      case 6.2:
        return this.getSubSection2Completion(countrySection);
      case 6.3:
        return this.getSubSection3Completion(countrySection);
      default:
        return this.calculateSectionCompletion([], []);
    }
  }

  private getSubSection1Completion(section: Section6DA): SectionCompletion {
    const mandatoryFieldValues: FieldValue[] = [
      section.howIsTheStudyCohortFormed?.key,
      section.sizeOfTheStudyCohort,
      section.sizeOfTheStudyCohortEstimationOrExact?.key,
      section.whyNeedStudyCohortOfThisSize,
      section.timePeriodOfDataExtraction,
      section.extractionMethod?.key,
      section.inclusionCriteria,
      section.howOftenDoesTheDataNeedToBeExtracted?.key
    ];
    const optionalFieldValues: FieldValue[] = [];

    if (section.howIsTheStudyCohortFormed?.key === 'b' || section.howIsTheStudyCohortFormed?.key === 'c' ) {
      mandatoryFieldValues.push(
        section.hasTheStudyCohortBeenFormedBasedOnInformationOfStudyParticipants?.key,
        section.hasTheCohortBeenBasedOnADataPermit?.key
      );

      if( section.hasTheCohortBeenBasedOnADataPermit?.key === 'a'){
        mandatoryFieldValues.push(
          section.confirmThatDataPermitHasBeenGrantedForTheResearchProject,
          section.previouslyIssuedPermitDate1,
          section.previouslyIssuedPermitIssuer1,
          section.previouslyIssuedPermitNumber1,
          section.previouslyIssuedPermitValidityPeriodFrom1,
          section.previouslyIssuedPermitValidityPeriodTo1,
          section.permitDecisionAttachment?.length
        );

      }

      if (section.hasTheStudyCohortBeenFormedBasedOnInformationOfStudyParticipants?.key === 'a') {
        mandatoryFieldValues.push(
          section.doesTheInformedConsentCoverTheRequestedRegistryExtractions?.key,
          section.consentAndInformationLetterAttachment?.length
        );
      } else if (
        section.hasTheStudyCohortBeenFormedBasedOnInformationOfStudyParticipants?.key === 'b'
      ) {
        mandatoryFieldValues.push(section.howTheStudyCohortWasObtained);
      }
    }

    if (
      section.howIsTheStudyCohortFormed?.key === 'b' ||
      section.howIsTheStudyCohortFormed?.key === 'c'
    ) {
      optionalFieldValues.push(section.informationProviderSameAsContactPerson);
      mandatoryFieldValues.push(
        section.informationProviderName,
        section.informationProviderEmail,
        section.informationProviderPhone?.number,
      );
    } else if (section.howIsTheStudyCohortFormed?.key === 'd') {
      mandatoryFieldValues.push(section.whyNeedDataOfaWholePopulation);
    }

    // a = Random sample, c = Other sample
    if (section.extractionMethod?.key === 'a') {
      mandatoryFieldValues.push(section.sampleSize);
    } else if (section.extractionMethod?.key === 'c') {
      mandatoryFieldValues.push(section.samplingMethod);
      optionalFieldValues.push(section.sampleSize);
    }

    // b = Multiple times
    if (section.howOftenDoesTheDataNeedToBeExtracted?.key === 'b') {
      mandatoryFieldValues.push(section.needForDataExtractionEvery?.key);

      // d = Other
      if (section.needForDataExtractionEvery?.key === 'd') {
        mandatoryFieldValues.push(section.needForDataExtractionEveryOther);
        mandatoryFieldValues.push(section.needForDataExtractionEveryDescription);
      }
    }

    optionalFieldValues.push(
      section.ethicalReviewAttachment?.length,
      section.variablesToBeUsedInDataExtractionAttachment?.length,
      section.potentialExclusionCriteria,
      section.orderForDataExtraction
    );

    return this.calculateSectionCompletion(mandatoryFieldValues, optionalFieldValues);
  }

  private getSubSection2Completion(section: Section6DA): SectionCompletion {
    const mandatoryFieldValues: FieldValue[] = [];
    const optionalFieldValues: FieldValue[] = [];

    // a = Yes
    mandatoryFieldValues.push(
      section.willControlsBeExtracted?.key
    );

    // a = Yes
    if (section.willControlsBeExtracted?.key === 'a') {
      mandatoryFieldValues.push(
        section.hasTheGroupRelativesFormed2?.key,
        section.extractionCriteriaForControls
      );
      if (section.hasTheGroupRelativesFormed2?.key === 'a') {
        mandatoryFieldValues.push(
          section.previouslyIssuedPermitIssuer2,
          section.previouslyIssuedPermitDate2,
          section.previouslyIssuedPermitValidityPeriodFrom2,
          section.previouslyIssuedPermitValidityPeriodTo2,
          section.previouslyIssuedPermitNumber2
        );
      }

      mandatoryFieldValues.push(
        section.willSameDataBeExtractedForControls?.key,
        section.sizeOfControlGroup,
        section.sizeOfControlGroupEstimationOrExact?.key,
        section.controlsPerPersonInStudyCohort,
        section.willDataForControlsBeExtractedSimultaneously?.key
      );

      optionalFieldValues.push(
        section.exclusionCriteriaForControls,
      );

      // b = No
      if (section.willSameDataBeExtractedForControls?.key === 'b') {
        mandatoryFieldValues.push(
          section.timePeriodForDataExtraction,
        );

        optionalFieldValues.push(
          section.variablesForDataExtractionAttachments
        );
      }

      // b = No
      if (section.willDataForControlsBeExtractedSimultaneously?.key === 'b') {
        mandatoryFieldValues.push(
          section.dataExtractionFrequency?.key
        );

        optionalFieldValues.push(section.orderOfControlsDataExtraction);

        // b = Multiple times
        if (section.dataExtractionFrequency?.key === 'b') {
          mandatoryFieldValues.push(
            section.dataNeedsToBeExtractedEvery?.key,
            section.dataExtractionFrequencyMultipleTimesInformation
          );

          // d = Other
          if (section.dataNeedsToBeExtractedEvery?.key === 'd') {
            mandatoryFieldValues.push(section.specifyOther);
            mandatoryFieldValues.push(section.moreInfoOnExtractionPeriods);
          }
        }
      }
    }

    return this.calculateSectionCompletion(mandatoryFieldValues, optionalFieldValues);
  }

  private getSubSection3Completion(section: Section6DA): SectionCompletion {
    const mandatoryFieldValues: FieldValue[] = [];
    const optionalFieldValues: FieldValue[] = [];

    // a = Yes
    mandatoryFieldValues.push(
      section.willRelativesBeExtracted?.key,
    );

    if (section.willRelativesBeExtracted?.key === 'a') {
      if (section.hasTheGroupRelativesFormed3?.key === 'a') {
        mandatoryFieldValues.push(
          section.previouslyIssuedPermitIssuer3,
          section.previouslyIssuedPermitDate3,
          section.previouslyIssuedPermitValidityPeriodFrom3,
          section.previouslyIssuedPermitValidityPeriodTo3,
          section.previouslyIssuedPermitNumber3
        );
      }

      mandatoryFieldValues.push(
        section.hasTheGroupRelativesFormed3?.key,
      );

      mandatoryFieldValues.push(
        section.willSameDataBeExtractedForRelatives?.key,
        section.sizeOfRelativesGroup,
        section.sizeOfRelativesGroupEstimateOrExact?.key,
        section.willDataForRelativesBeExtractedSimultaneously?.key,
        section.relationshipToStudyCohort
      );

      optionalFieldValues.push(
        section.orderOfRelativesDataExtraction
      );

      // b = No
      if (section.willSameDataBeExtractedForRelatives?.key === 'b') {
        mandatoryFieldValues.push(
          section.timePeriodForDataExtractionRelatives,
        );

        optionalFieldValues.push(section.variablesForDataExtractionRelativesAttachments?.length);
      }

      // b = No
      if (section.willDataForRelativesBeExtractedSimultaneously?.key === 'b') {
        mandatoryFieldValues.push(section.dataExtractionFrequencyRelatives?.key);

        // b = Multiple times
        if (section.dataExtractionFrequencyRelatives?.key === 'b') {
          mandatoryFieldValues.push(
            section.dataExtractionFrequencyMultipleTimesInformationRelatives,
            section.dataNeedsToBeExtractedEveryRelatives?.key
          );

          if (section.dataNeedsToBeExtractedEveryRelatives?.key === 'd') {
            mandatoryFieldValues.push(section.specifyOtherRelatives);
            mandatoryFieldValues.push(section.moreInfoOnExtractionPeriodsRelatives);
          }
        }
      }
    }

    return this.calculateSectionCompletion(mandatoryFieldValues, optionalFieldValues);
  }

  private getSection7Completion(): SectionCompletion {
    const mandatoryFieldValues: FieldValue[] = [];
    const optionalFieldValues: FieldValue[] = [];
    const section7 = this.form?.section7;
    if (!section7) {
      return this.calculateSectionCompletion(mandatoryFieldValues, optionalFieldValues);
    }

    mandatoryFieldValues.push(
      section7.willDataBeCombinedWithDataObtained?.key,
      section7.otherPermitApplications?.key,
    );


    if (section7.willDataBeCombinedWithDataObtained?.key === 'a') {
      mandatoryFieldValues.push(
        section7.attachmentOfPermitDocuments?.length
      );

      optionalFieldValues.push(
        section7.otherDataPermits?.length,
      );

      mandatoryFieldValues.push(
        section7.combinedCountries,
        section7.combinedDataHolders,
        section7.combinedDatabaseRegistries,
        section7.combinedDatasetsRegistries,
        section7.provideInformationList?.length
      );

      if (section7.provideInformationList?.length) {
        section7.provideInformationList.forEach((provideInformation) => {
          mandatoryFieldValues.push(
            provideInformation.dataset,
            provideInformation.numberOfFiles,
            provideInformation.formatOfFiles,
            provideInformation.sizeOfFiles,
            provideInformation.notes
          );
        });
      }

      if (section7.otherDataPermits?.length) {
        section7.otherDataPermits.forEach((otherDataPermit) => {
          mandatoryFieldValues.push(
            otherDataPermit.permitIssuer,
            otherDataPermit.permitStartDateOfIssue,
            otherDataPermit.permitEndDateOfIssue,
            otherDataPermit.permitIdentificationInformation
          );
        });
      }
    }

    if (section7.otherPermitApplications?.key === 'a') {
      mandatoryFieldValues.push(
        section7.dateOfSubmittingTheApplication,
        section7.applicationIssuer
      );
    }

    return this.calculateSectionCompletion(mandatoryFieldValues, optionalFieldValues);
  }

  private getSection8Completion(): SectionCompletion {
    const section8 = this.form?.section8;
    if (!section8) return {mandatoryCompleted: 0, mandatoryTotal: 0, completed: 0, total: 0};

    const mandatoryFieldValues: FieldValue[] = [];
    const allFieldValues = [];

    mandatoryFieldValues.push(
      section8.technicalRequirementsForEnvironment,
      section8.whenDataNeeded?.key,
      section8.willTheDataBeTransferred?.key,
      section8.whichOrganizationWillBeTheControllerOfData,
      section8.protectionAndSecurityStatementsA,
      section8.protectionAndSecurityStatementsB,
      section8.protectionAndSecurityStatementsC,
      section8.protectionAndSecurityStatementsD,
      section8.protectionAndSecurityStatementsE,
      section8.peopleWhoWillBeProcessingTheData?.length,
      section8.optOutOfTheMechanismProvidedInTheNationalLaw?.key,
      section8.hdabToRetain?.key
    );

    allFieldValues.push(
      ...mandatoryFieldValues,
      section8.nameWebsiteAddressForEnvironment,
      section8.startPeriodOfInactiveDataStorage,
      section8.endPeriodOfInactiveDataStorage,
      section8.sameAsContactPerson
    );

    // e = Scientific research
    if (this.form?.section2?.purposeForWhichDataWillBeUsed?.some((obj) => obj.key === 'e')) {
      allFieldValues.push(section8.attachResearchPermitIfRequired?.length);
    }

    // b = Later
    if (section8.whenDataNeeded?.key === 'b') {
      mandatoryFieldValues.push(section8.ifLaterWhen);
      allFieldValues.push(section8.ifLaterWhen);
    }

    // a = Yes, b = No
    if (this.form?.section3?.applyingForDataOnBehalfOfPublicSector?.key === 'a') {
      // Handles all the fields that need the application to be on behalf of public sector, except
      // for europeanUnionInstitution and lawfulForProcessingPersonalData which are handled later
      this.section8PublicSectorHandler(section8, mandatoryFieldValues, allFieldValues);
    } else if (this.form?.section3?.applyingForDataOnBehalfOfPublicSector?.key === 'b') {
      this.section8PrivateSectorHandler(section8, mandatoryFieldValues, allFieldValues);
    }

    // b = Pseudonymised
    if (this.form?.section5?.formatOfTheElectronicHealthData?.key === 'b') {
      if (this.form?.section3?.applyingForDataOnBehalfOfPublicSector?.key === 'a') {
        mandatoryFieldValues.push(section8.europeanUnionInstitution?.length);
        allFieldValues.push(section8.europeanUnionInstitution?.length);
      }

      // If natural person or on behalf of public sector
      if (
        this.form?.section3?.applyingForDataOnBehalfOfPublicSector?.key === 'a' ||
        this.form?.section3?.legalOrNaturalPerson?.key === 'b'
      ) {
        mandatoryFieldValues.push(section8.lawfulForProcessingPersonalData?.length);
        allFieldValues.push(section8.lawfulForProcessingPersonalData?.length);
      }
    }

    // a = Yes
    if (section8.willTheDataBeTransferred?.key === 'a') {
      this.section8DataTransferHandler(section8, mandatoryFieldValues, allFieldValues);
    }

    if (section8.optOutOfTheMechanismProvidedInTheNationalLaw?.key === 'a'){
      mandatoryFieldValues.push(section8.providedJustificationException);
    }

    section8.peopleWhoWillBeProcessingTheData?.forEach((person) => {
      mandatoryFieldValues.push(person.fullName, person.emailAddress);
      allFieldValues.push(person.fullName, person.emailAddress);
    });

    const mandatoryCompleted = this.calculateCompletion(mandatoryFieldValues);
    const completed = this.calculateCompletion(allFieldValues);
    return {
      mandatoryCompleted,
      mandatoryTotal: mandatoryFieldValues.length,
      completed,
      total: allFieldValues.length,
    };
  }

  /**
   * Mutates the given arrays by adding the values of the fields from the public sector part of
   * section 8.
   * @param section8 - The section 8 object.
   * @param mandatoryFieldValues - An array with the values of required fields.
   * @param allFieldValues - An array with the values of all fields.
   */
  private section8PublicSectorHandler(
    section8: Section8DA,
    mandatoryFieldValues: FieldValue[],
    allFieldValues: FieldValue[]
  ) {
    mandatoryFieldValues.push(
      section8.informationWhichDataCanAccess,
      section8.frequencyOfAccessOrDataUpdates,
      section8.complyWithDataMinimisationPrincipleNotEUMember,
      section8.legalBasisForProcessingApplicationData?.length
    );
    allFieldValues.push(
      section8.informationWhichDataCanAccess,
      section8.frequencyOfAccessOrDataUpdates,
      section8.complyWithDataMinimisationPrincipleNotEUMember,
      section8.legalBasisForProcessingApplicationData?.length
    );

    // This field is not an array until at least one option is selected, so we need to check if
    // some exists // b = Other
    if (section8.legalBasisForProcessingApplicationData?.some?.((obj) => obj.key === 'b')) {
      mandatoryFieldValues.push(section8.otherLegalBasisForProcessingApplicationData);
      allFieldValues.push(section8.otherLegalBasisForProcessingApplicationData);
    }

    if (this.form?.section7?.willDataBeCombinedWithDataObtained?.key === 'a') {
      mandatoryFieldValues.push(section8.legalBasisForProcessingCombinedApplicationData?.length);
      allFieldValues.push(section8.legalBasisForProcessingCombinedApplicationData?.length);

      // This field is not an array until at least one option is selected, so we need to check if
      // some exists // b = Other
      if (section8.legalBasisForProcessingCombinedApplicationData?.some?.((obj) => obj.key === 'b')) {
        mandatoryFieldValues.push(section8.otherLegalBasisForProcessingCombinedApplicationData);
        allFieldValues.push(section8.otherLegalBasisForProcessingCombinedApplicationData);
      }
    }
  }

  /**
   * Mutates the given arrays by adding the values of the fields from the private sector part of
   * section 8.
   * @param section8 - The section 8 object.
   * @param mandatoryFieldValues - An array with the values of required fields.
   * @param allFieldValues - An array with the values of all fields.
   */
  private section8PrivateSectorHandler(
    section8: Section8DA,
    mandatoryFieldValues: FieldValue[],
    allFieldValues: FieldValue[]
  ) {
    mandatoryFieldValues.push(
      section8.estimatedStartDatesForDataProcessing,
      section8.estimatedEndDatesForDataProcessing,
      section8.complyWithDataMinimisationPrinciple,
      section8.legalBasisForProcessingPersonalData?.length
    );
    allFieldValues.push(
      section8.estimatedStartDatesForDataProcessing,
      section8.estimatedEndDatesForDataProcessing,
      section8.complyWithDataMinimisationPrinciple,
      section8.legalBasisForProcessingPersonalData?.length
    );

    // This field is not an array until at least one option is selected, so we need to check if
    // some exists // c = Other
    if (section8.legalBasisForProcessingPersonalData?.some?.((obj) => obj.key === 'c')) {
      mandatoryFieldValues.push(section8.otherLegalBasisForProcessingPersonalData);
      allFieldValues.push(section8.otherLegalBasisForProcessingPersonalData);
    }

    if (this.form?.section7?.willDataBeCombinedWithDataObtained?.key === 'a') {
      mandatoryFieldValues.push(section8.legalBasisForProcessingCombinedData?.length);
      allFieldValues.push(section8.legalBasisForProcessingCombinedData?.length);

      // This field is not an array until at least one option is selected, so we need to check if
      // some exists // c = Other
      if (section8.legalBasisForProcessingCombinedData?.some?.((obj) => obj.key === 'c')) {
        mandatoryFieldValues.push(section8.otherLegalBasisForProcessingCombinedData);
        allFieldValues.push(section8.otherLegalBasisForProcessingCombinedData);
      }
    }
  }

  /**
   * Mutates the given arrays by adding the values of the fields from the data transfer part of
   * section 8.
   * @param section8 - The section 8 object.
   * @param mandatoryFieldValues - An array with the values of required fields.
   * @param allFieldValues - An array with the values of all fields.
   */
  private section8DataTransferHandler(
    section8: Section8DA,
    mandatoryFieldValues: FieldValue[],
    allFieldValues: FieldValue[]
  ) {
    mandatoryFieldValues.push(
      section8.whichCountriesDataBeProcessed?.length,
      section8.whyWillDataBeTransferredOutsideEUArticle47 ||
      section8.whyWillDataBeTransferredOutsideEUArticle48 ||
      section8.whyWillDataBeTransferredOutsideEUArticle49,
      section8.legalBasisForTransferringTheDataOutsideEU?.key
    );

    allFieldValues.push(
      section8.whichCountriesDataBeProcessed?.length,
      section8.whyWillDataBeTransferredOutsideEUArticle47 ||
      section8.whyWillDataBeTransferredOutsideEUArticle48 ||
      section8.whyWillDataBeTransferredOutsideEUArticle49,
      section8.legalBasisForTransferringTheDataOutsideEU?.key
    );

    if (section8.whyWillDataBeTransferredOutsideEUArticle47) {
      mandatoryFieldValues.push(section8.whyWillDataBeTransferredOutsideEUArticle47Options?.length);
      allFieldValues.push(section8.whyWillDataBeTransferredOutsideEUArticle47Options?.length);
    }

    if (section8.whyWillDataBeTransferredOutsideEUArticle48) {
      mandatoryFieldValues.push(
        section8.whyWillDataBeTransferredOutsideEUArticle48a ||
        section8.whyWillDataBeTransferredOutsideEUArticle48b ||
        section8.whyWillDataBeTransferredOutsideEUArticle48c ||
        section8.whyWillDataBeTransferredOutsideEUArticle48d ||
        section8.whyWillDataBeTransferredOutsideEUArticle48e
      );
      allFieldValues.push(
        section8.whyWillDataBeTransferredOutsideEUArticle48a ||
        section8.whyWillDataBeTransferredOutsideEUArticle48b ||
        section8.whyWillDataBeTransferredOutsideEUArticle48c ||
        section8.whyWillDataBeTransferredOutsideEUArticle48d ||
        section8.whyWillDataBeTransferredOutsideEUArticle48e
      );
    }

    if (section8.whyWillDataBeTransferredOutsideEUArticle48b) {
      mandatoryFieldValues.push(
        section8.whyWillDataBeTransferredOutsideEUArticle48bOptions?.length
      );
      allFieldValues.push(section8.whyWillDataBeTransferredOutsideEUArticle48bOptions?.length);
    }

    if (section8.whyWillDataBeTransferredOutsideEUArticle48c) {
      mandatoryFieldValues.push(section8.whyWillDataBeTransferredOutsideEUArticle48cOpt?.key);
      allFieldValues.push(section8.whyWillDataBeTransferredOutsideEUArticle48cOpt?.key);
    }

    if (section8.legalBasisForTransferringTheDataOutsideEU?.key === 'b') {
      mandatoryFieldValues.push(section8.safeguardsAreProvidedByReferringGDCP?.length);
      allFieldValues.push(section8.safeguardsAreProvidedByReferringGDCP?.length);
    }

    if (section8.legalBasisForTransferringTheDataOutsideEU?.key === 'c') {
      mandatoryFieldValues.push(
        section8.legalBasisForTransferringTheDataOutsideEUOtherOptions?.length
      );
      allFieldValues.push(section8.legalBasisForTransferringTheDataOutsideEUOtherOptions?.length);
    }
  }

  /**
   * Builds a SectionCompletion object based on the number of mandatory and optional fields that
   * have been filled in a section. For Array fields, it expects the length of the array as the
   * value.
   * @param mandatoryFieldValues - An array with the values of required fields.
   * @param optionalFieldValues - An array with the values of optional fields.
   * @returns A SectionCompletion object.
   */
  private calculateSectionCompletion(
    mandatoryFieldValues: FieldValue[],
    optionalFieldValues: FieldValue[]
  ): SectionCompletion {
    const mandatoryCompleted = this.calculateCompletion(mandatoryFieldValues);
    return {
      mandatoryCompleted: mandatoryCompleted,
      mandatoryTotal: mandatoryFieldValues.length,
      completed: mandatoryCompleted + this.calculateCompletion(optionalFieldValues),
      total: mandatoryFieldValues.length + optionalFieldValues.length,
    };
  }

  /**
   * Calculates the number of fields that have been filled in a section by counting the number of
   * truthy values.
   * @param values - An array of field values.
   * @returns The number of fields that have been filled.
   */
  private calculateCompletion(values: FieldValue[]): number {
    return values.reduce((sum: number, value) => sum + (value ? 1 : 0), 0);
  }
  private parseLangSelection(selection?: string): { lang?: string; source: 'input' | 'translated' } {
    if (!selection) return { lang: undefined, source: 'input' };

    const [lang, sourceRaw] = selection.split('::');
    const source = sourceRaw === 'translated' ? 'translated' : 'input';

    return { lang, source };
  }

  private getFormSelection(selection?: string): Form {
    const { lang, source } = this.parseLangSelection(selection);

    if (source === 'translated' && lang) {
      return (this.form_translations?.[lang] as Form) ?? this.form;
    }

    return this.form;
  }

  /**
   * For updates: ensure translated form exists when source is translated.
   */
  private getWritableFormSelection(selection?: string): Form {
    const { lang, source } = this.parseLangSelection(selection);

    if (source === 'translated' && lang) {
      this.form_translations ??= {};
      this.form_translations[lang] ??= { section6: [] };

      // keep keys in sync
      this.formTranslationsKeys = Object.keys(this.form_translations);

      return this.form_translations[lang] as Form;
    }

    return this.form;
  }
  getSectionData(sectionNumber: number, dropdownLang: string): Section {
    const formSelection = this.getFormSelection(dropdownLang);
    switch (sectionNumber) {
      case 1:
        return formSelection?.section1 || {sectionNumber: 1};
      case 2:
        return formSelection?.section2 || {
          sectionNumber: 2,
          theNatureOfTheProjectDoesNotLetYouProvideASummary: false,
        } as Section2;
      case 3:
        return formSelection?.section3 || {sectionNumber: 3};
      case 4:
        return formSelection?.section4 || {sectionNumber: 4};
      case 5:
        return formSelection?.section5 || {sectionNumber: 5};
      case 7:
        return formSelection?.section7 || {sectionNumber: 7};
      case 8:
        return formSelection?.section8 || {sectionNumber: 8};
      case 9:
        return formSelection?.section9 || {sectionNumber: 9};
      case 10:
        return formSelection?.section10 || {sectionNumber: 10};
      default:
        return formSelection?.section1 || {sectionNumber: 1};
    }
  }

  getSection6Data(dropdownLang: string): Section6DA[] {
    const formSelection = this.getFormSelection(dropdownLang);
    //if section 6 is not defined or is not array , return an empty array
    if (!formSelection?.section6 || !Array.isArray(formSelection.section6)) {
      return [] as Section6DA[];
    } else {
      return formSelection.section6;
    }
  }

  getDatasetTitle(datasetId, locale): string {
    return getDatasetTitleFromDataset(this.hubDatasets, datasetId, locale);
  }

  getDatasetVariables(): object[] {
    return convertToApplicationDatasetVariables(this.hubDatasets);
  }

  getCountries(): string[] {
    return convertToApplicationCountries(this.hubDatasets);
  }

  getCountriesWithId(): object[] {
    return convertToApplicationCountriesWithIds(this.hubDatasets);
  }

  getDataHolders(activeCountry?: string): string[] {
    return convertToApplicationDataHolders(this.hubDatasets, activeCountry);
  }

  getHDABs(): string[] {
    return convertToApplicationHDABs(this.hubDatasets);
  }

  getHDABsForSelectedCountry(activeCountry?: string): string[] {
    return convertToApplicationHDABsForSelectedCountry(activeCountry, this.hubDatasets);
  }

  getDatabases(activeCountry?: string): string[] {
    return convertToApplicationDatabases(this.hubDatasets, activeCountry);
  }

  getDatasets(activeCountry: string): string[] {
    return convertToApplicationDatasets(this.hubDatasets, activeCountry);
  }

  resetDatasets(dbDatasets: any) {
    this.hubDatasets = dbDatasets;
  }

  updateHubDatasets(datasetIndex: string, distributionIndex: string) {
    if (distributionIndex != null) {
      this.hubDatasets[datasetIndex].distributions.splice(distributionIndex, 1);
      return;
    }
    this.hubDatasets.splice(datasetIndex, 1);
  }

  updateSection(sectionNumber: number, formData: Section | Section6DA[],  dropdownLang: string) {
    let formSelection = this.getWritableFormSelection(dropdownLang);
    formSelection ??= { section6: [] };
    switch (sectionNumber) {
      case 1:
        formSelection.section1 = formData as Section1;
        break;
      case 2:
        formSelection.section2 = formData as Section2;
        break;
      case 3:
        formSelection.section3 = formData as Section3;
        break;
      case 4: {
        formSelection.section4 = formData as Section4;
        // when navigating to section 4 and there are changes in section 3 contact person
        // if section 4 sameAsContactPerson is checked (by a previous update)
        // then update section 4 contact person info with the changes in section 3 (if any)
        formSelection.section4 = formData as Section4;
        if (formSelection.section4?.sameAsContactPerson && formSelection.section3) {
          const section3Person = this.getSection3PersonInfo(dropdownLang);
          formSelection.section4.fullName = section3Person.name;
          formSelection.section4.address = section3Person.address;
          formSelection.section4.phone = section3Person.phone;
          formSelection.section4.email = section3Person.email;
        }
        break;
      }
      case 5: {
        // when navigating to section 5 and there are changes in section 3 contact person
        // if section 5 sameAsContactPerson is checked (by a previous update)
        // then update section 5 contact person info with the changes in section 3 (if any)
        formSelection.section5 = formData as Section5DA;
        const section3Person = this.getSection3PersonInfo(dropdownLang);

        if (formSelection.section5?.personResponsibleSameAsContactPerson && section3Person.personType.startsWith('legal')) {
          formSelection.section5.personResponsibleName = section3Person.name;
        }

        if (formSelection.section5?.personResearchSameAsContactPerson && section3Person.personType.startsWith('legal')) {
          formSelection.section5.personResearchName = section3Person.name;
        }
        break;
      }
      case 6:{
        formSelection.section6 = formData as Section6DA[];
        if (formSelection?.section6?.length > 0) {
          formSelection.section6 = formSelection.section6.map((section6Item: Section6DA) => {
            if (section6Item.informationProviderSameAsContactPerson && formSelection?.section3) {
              const section3Person = this.getSection3PersonInfo(dropdownLang);
              return {
                ...section6Item,
                informationProviderName: section3Person.name,
                informationProviderPhone: section3Person.phone,
                informationProviderEmail: section3Person.email,
              };
            }
            return section6Item; // Return the unchanged section6Item if no update is needed
          });
        }
        break;
      }
      case 7:
        formSelection.section7 = formData as Section7DA;
        break
      case 8: {
        formSelection.section8 = formData as Section8DA;
        const section3Person = this.getSection3PersonInfo(dropdownLang);
        let person = {};
        if (section3Person.personType !== '' && formSelection.section8.sameAsContactPerson) {
          if((section3Person.personType == 'legal')||(section3Person.personType == 'natural')){
            person = {
              fullName: section3Person.contractPersonName ?? '',
              emailAddress: section3Person.email ?? '',
            };
          }
          if (formSelection.section8.peopleWhoWillBeProcessingTheData.length === 0) {
            formSelection.section8.peopleWhoWillBeProcessingTheData.push(person);
          } else {
            formSelection.section8.peopleWhoWillBeProcessingTheData[0] = person;
          }
        }
        break;
      }
      case 9:
        formSelection.section9 = formData as Section9DA;
        break;
      case 10:
        formSelection.section10 = formData as Section10DA;
        break;
    }
  }

  private getSection3PersonInfo(dropdownLang: string) {
    const formSelection = this.getFormSelection(dropdownLang);
    const section3 = formSelection?.section3;
    if (!section3) {
      return {
        personType: '',
        name: '',
        address: '',
        email: '',
        contractPersonName: '',
        phone: {countryCode: '', number: ''},
        jobTitle: '',
        affiliation: '',
      };
    }
    if (section3.legalOrNaturalPerson?.key === 'b') {
      return {
        personType: "natural",
        name: section3.naturalPersonName ?? '',
        address: section3.naturalPersonAddress ?? '',
        email: section3.naturalPersonEmail ?? '',
        contractPersonName: section3.naturalPersonName ?? '',
        phone: {...(section3.naturalPersonPhone ?? {countryCode: '', number: ''})},
        jobTitle: section3.naturalPersonJobTitle ?? '',
        affiliation: section3.naturalPersonAffiliation ?? '',
      };
    } else {
      return {
        personType: "legal",
        name: section3.legalPersonName ?? '',
        address: section3.legalPersonAddress ?? '',
        email: section3.contactPersonEmail ?? '',
        contractPersonName: section3.contactPersonName ?? '',
        phone: {...(section3.contactPersonPhone ?? {countryCode: '', number: ''})}
      };
    }
  }

  convertLabelForSection(sectionNumber: number, data: any): BaseSectionLabels {
    switch (sectionNumber) {
      case 1: {
        return {
          sectionH5: data.section1h5,
          sectionDescription: data.section1Description,
          applicationDatasets: data.applicationDatasets,
          applicationCountries: data.applicationCountries,
          applicationDataHolders: data.applicationDataHolders,
          applicationHDABs: data.applicationHDABs,
          applicationDatabases: data.applicationDatabases,
          variables:  data.variables,
          datatype: data.datatype,
          description: data.description,
          title: data.title,
          emptyTable: data.emptyTable,
          //common fields
          yesOrNoOptions: data.yesOrNoOptions,
          onceOrMultipleTimes: data.onceOrMultipleTimes,
          everyWhen: data.everyWhen,
          processingData: data.processingData,
          legalBasisForProcessingData: data.legalBasisForProcessingData
        } as Section1LabelsDA
      }
      case 2: {
        return {
          sectionH5: data.section2h5,
          sectionDescription: data.section2Description,
          projectName: data.projectName,
          projectLeader: data.projectLeader,
          countryOfProjectLeader: data.countryOfProjectLeader,
          purposeForWhichDataWillBeUsed: data.purposeForWhichDataWillBeUsed,
          summaryOfTheProject: data.summaryOfTheProject,
          theNatureOfTheProjectDoesNotLetYouProvideASummary: data.theNatureOfTheProjectDoesNotLetYouProvideASummary,
          theNatureOfTheProjectDoesNotLetYouProvideASummaryReason: data.theNatureOfTheProjectDoesNotLetYouProvideASummaryReason,
          //common fields
          yesOrNoOptions: data.yesOrNoOptions,
          onceOrMultipleTimes: data.onceOrMultipleTimes,
          everyWhen: data.everyWhen,
          processingData: data.processingData,
          legalBasisForProcessingData: data.legalBasisForProcessingData
        } as Section2LabelsDA
      }
      case 3: {
        return {
          sectionH5: data.section3h5,
          sectionDescription: data.section3Description,
          applyingForDataOnBehalfOfPublicSector: data.applyingForDataOnBehalfOfPublicSector,
          applyingForDataForCarryingOutTasks: data.applyingForDataForCarryingOutTasks,
          legalOrNaturalPerson: data.legalOrNaturalPerson,
          legalPerson: data.legalPerson,
          naturalPerson: data.naturalPerson,
          participatingEntitiesInstruction: data.participatingEntitiesInstruction,
          legalPersonName: data.legalPersonName,
          postalAddress: data.postalAddress,
          legalPersonAddress: data.legalPersonAddress,
          legalPersonZipCode: data.legalPersonZipCode,
          legalPersonCity: data.legalPersonCity,
          legalPersonCountry: data.legalPersonCountry,
          contactPersonInformation: data.contactPersonInformation,
          contactPersonInformationDescription: data.contactPersonInformationDescription,
          contactPersonName: data.contactPersonName,
          contactPersonEmail: data.contactPersonEmail,
          contactPersonPhone: data.contactPersonPhone,
          contactPersonOrganisationName: data.contactPersonNameOfTheOrganisation,
          contactPersonBusinessID: data.contactPersonBusinessIdentifier,
          contactPersonRelationship: data.contactPersonRelationship,
          otherContactPerson: data.otherContactPerson,
          naturalPersonName: data.naturalPersonName,
          naturalPersonAddress: data.naturalPersonAddress,
          naturalPersonZipCode: data.naturalPersonZipCode,
          naturalPersonCity: data.naturalPersonCity,
          naturalPersonCountry: data.naturalPersonCountry,
          naturalPersonEmail: data.naturalPersonEmail,
          naturalPersonPhone: data.naturalPersonPhone,
          naturalPersonJobTitle: data.naturalPersonJobTitle,
          naturalPersonAffiliation: data.naturalPersonAffiliation,
          //common fields
          yesOrNoOptions: data.yesOrNoOptions,
          onceOrMultipleTimes: data.onceOrMultipleTimes,
          everyWhen: data.everyWhen,
          processingData: data.processingData,
          legalBasisForProcessingData: data.legalBasisForProcessingData
        } as Section3LabelsDA
      }
      case 4: {
        return {
          sectionH5: data.section4h5,
          sectionDescription: data.section4Description,
          sameAsContactPerson: data.sameAsContactPerson,
          postalAddressLabel: data.postalAddressLabel,
          fullName: data.fullName,
          address: data.address,
          email: data.email,
          phone: data.phone,
          invoiceType: data.invoiceType,
          invoiceReferenceNumber: data.invoiceReferenceNumber,
          invoiceAddress: data.invoiceAddress,
          operatorIdentifier: data.operatorIdentifier,
          nameOfTheOrganisation: data.nameOfTheOrganisation,
          businessIdentifierOrganization: data.businessIdentifierOrganization,
          vatNumber: data.vatNumber,
          peppolCode: data.peppolCode,
          isTheProjectFinanciallyCovered: data.isTheProjectFinanciallyCovered,
          rangeOfAmountOfFinancing: data.rangeOfAmountOfFinancing,
          //common fields
          yesOrNoOptions: data.yesOrNoOptions,
          onceOrMultipleTimes: data.onceOrMultipleTimes,
          everyWhen: data.everyWhen,
          processingData: data.processingData,
          legalBasisForProcessingData: data.legalBasisForProcessingData
        } as Section4LabelsDA
      }
      case 5: {
        return {
          sectionH5: data.section5h5,
          sectionDescription: data.section5Description,
          purposeOfUse: data.purposeOfUse,
          whyTheDataIsNeeded: data.whyTheDataIsNeeded,
          whatIsTheAimAndTopicOfTheProject: data.whatIsTheAimAndTopicOfTheProject,
          whichAreTheExpectedBenefits: data.whichAreTheExpectedBenefits,
          describeApplicantsQualification: data.describeApplicantsQualification,
          legalBasis: data.legalBasis,
          linkToTheSupportingLegalBasis: data.linkToTheSupportingLegalBasis,
          summaryOfPlanForUsingTheData: data.summaryOfPlanForUsingTheData,
          summaryOfResearchPlan: data.summaryOfResearchPlan,
          personResponsibleLabel: data.personResponsibleLabel,
          personResponsibleName: data.personResponsibleName,
          personResearchSameAsContactPerson: data.personResearchSameAsContactPerson,
          personResponsibleForResearchLabel: data.personResponsibleForResearchLabel,
          personResponsibleSameAsContactPerson: data.personResponsibleSameAsContactPerson,
          personResearchName: data.personResearchName,
          formatOfTheElectronicHealthData: data.formatOfTheElectronicHealthData,
          inOrderToApplyPseudonymisedData: data.inOrderToApplyPseudonymisedData,
          inOrderToApplyPseudonymisedDataA: data.inOrderToApplyPseudonymisedDataA,
          inOrderToApplyPseudonymisedDataB: data.inOrderToApplyPseudonymisedDataB,
          whyNeedForPseudonymisation: data.whyNeedForPseudonymisation,
          //common fields
          yesOrNoOptions: data.yesOrNoOptions,
          onceOrMultipleTimes: data.onceOrMultipleTimes,
          everyWhen: data.everyWhen,
          processingData: data.processingData,
          legalBasisForProcessingData: data.legalBasisForProcessingData
        } as Section5LabelsDA
      }
      case 6: {
        return {
          sectionH5: data.section6h5,
          sectionDescription: data.section6Description,
          descriptionSection6_1: data.descriptionSection6_1,
          descriptionOfTheDataNeeded: data.descriptionOfTheDataNeeded,
          applicationHDABsForSelectedCountry: data.applicationHDABsForSelectedCountry,
          applicationDatasetsPerCountry: data.applicationDatasetsPerCountry,
          hdabContacts: data.hdabContacts,
          howWillTheDataFromDifferentSourcesBeLinked: data.howWillTheDataFromDifferentSourcesBeLinked,
          howIsTheStudyCohortFormed: data.howIsTheStudyCohortFormed,
          hasTheStudyCohortBeenFormedBasedOnInformationOfStudyParticipants: data.hasTheStudyCohortBeenFormedBasedOnInformationOfStudyParticipants,
          doesTheInformedConsentCoverTheRequestedRegistryExtractions: data.doesTheInformedConsentCoverTheRequestedRegistryExtractions,
          consentAndInformationLetterAttachment: data.consentAndInformationLetterAttachment,
          hasTheCohortBeenBasedOnADataPermit: data.hasTheCohortBeenBasedOnADataPermit,
          confirmThatDataPermitHasBeenGrantedForTheResearchProject: data.confirmThatDataPermitHasBeenGrantedForTheResearchProject,
          ifTheGroupHasBeenFormedBasedOnPreviousIssued: data.ifTheGroupHasBeenFormedBasedOnPreviousIssued,
          previouslyIssuedPermitIssuer1: data.previouslyIssuedPermitIssuer1,
          previouslyIssuedPermitDate1: data.previouslyIssuedPermitDate1,
          validityPeriod1: data.validityPeriod1,
          previouslyIssuedPermitValidityPeriodFrom1: data.previouslyIssuedPermitValidityPeriodFrom1,
          previouslyIssuedPermitValidityPeriodTo1: data.previouslyIssuedPermitValidityPeriodTo1,
          previouslyIssuedPermitNumber1: data.previouslyIssuedPermitNumber1,
          permitDecisionAttachment: data.permitDecisionAttachment,
          howTheStudyCohortWasObtained: data.howTheStudyCohortWasObtained,
          whoWillDeliverTheInformationOnTheStudy: data.whoWillDeliverTheInformationOnTheStudy,
          informationProviderName: data.informationProviderName,
          informationProviderEmail: data.informationProviderEmail,
          informationProviderPhone: data.informationProviderPhone,
          informationProviderSameAsContactPerson: data.informationProviderSameAsContactPerson,
          whyNeedDataOfaWholePopulation: data.whyNeedDataOfaWholePopulation,
          sizeOfTheStudyCohort: data.sizeOfTheStudyCohort,
          sizeOfTheStudyCohortEstimationOrExact: data.sizeOfTheStudyCohortEstimationOrExact,
          whyNeedStudyCohortOfThisSize: data.whyNeedStudyCohortOfThisSize,
          ethicalReview: data.ethicalReview,
          ethicalReviewDescription: data.ethicalReviewDescription,
          ethicalReviewAttachment: data.ethicalReviewAttachment,
          dataHolders: data.dataHolders,
          whichDatabasesDataExtracted: data.whichDatabasesDataExtracted,
          whichDatasetDataExtracted: data.whichDatasetDataExtracted,
          variablesToBeUsedInDataExtraction: data.variablesToBeUsedInDataExtraction,
          variablesToBeUsedInDataExtractionAttachment: data.variablesToBeUsedInDataExtractionAttachment,
          timePeriodOfDataExtraction: data.timePeriodOfDataExtraction,
          extractionMethod: data.extractionMethod,
          samplingMethod: data.samplingMethod,
          sampleSize: data.sampleSize,
          inclusionCriteria: data.inclusionCriteria,
          potentialExclusionCriteria: data.potentialExclusionCriteria,
          dataExtraction: data.dataExtraction,
          dataNeedsToBeExtractedEveryRelatives: data.dataNeedsToBeExtractedEveryRelatives,
          dataExtractionTimes: data.dataExtractionTimes,
          howOftenDoesTheDataNeedToBeExtracted: data.howOftenDoesTheDataNeedToBeExtracted,
          needForDataExtractionEvery: data.needForDataExtractionEvery,
          needForDataExtractionEveryOther: data.needForDataExtractionEveryOther,
          needForDataExtractionEveryDescription: data.needForDataExtractionEveryDescription,
          orderForDataExtraction: data.orderForDataExtraction,
          definingExtractionCriteria: data.definingExtractionCriteria,
          willControlsBeExtracted: data.willControlsBeExtracted,
          hasTheGroupRelativesFormed2: data.hasTheGroupRelativesFormed2,
          willSameDataBeExtractedForControls: data.willSameDataBeExtractedForControls,
          fromWhichDataHolderLabel: data.fromWhichDataHolderLabel,
          fromWhichDatabaseLabel: data.fromWhichDatabaseLabel,
          fromWhichDatasetLabel: data.fromWhichDatasetLabel,
          variablesForDataExtractionAttachments: data.variablesForDataExtractionAttachments,
          timePeriodForDataExtraction: data.timePeriodForDataExtraction,
          extractionCriteriaForControls: data.extractionCriteriaForControls,
          whichDatasetsForRelatives: data.whichDatasetsForRelatives,
          sizeOfControlGroup: data.sizeOfControlGroup,
          sizeOfControlGroupEstimationOrExact: data.sizeOfControlGroupEstimationOrExact,
          controlsPerPersonInStudyCohort: data.controlsPerPersonInStudyCohort,
          exclusionCriteriaForControls: data.exclusionCriteriaForControls,
          ifTheGroupHasBeenFormed: data.ifTheGroupHasBeenFormed,
          previouslyIssuedPermitIssuer2: data.previouslyIssuedPermitIssuer2,
          previouslyIssuedPermitDate2: data.previouslyIssuedPermitDate2,
          validityPeriod2: data.validityPeriod2,
          previouslyIssuedPermitValidityPeriodFrom2: data.previouslyIssuedPermitValidityPeriodFrom2,
          previouslyIssuedPermitValidityPeriodTo2: data.previouslyIssuedPermitValidityPeriodTo2,
          previouslyIssuedPermitNumber2: data.previouslyIssuedPermitNumber2,
          dataExtractionAndOrderForControls: data.dataExtractionAndOrderForControls,
          willDataForControlsBeExtractedSimultaneously: data.willDataForControlsBeExtractedSimultaneously,
          dataExtractionFrequency: data.dataExtractionFrequency,
          dataExtractionFrequencyMultipleTimesInformation: data.dataExtractionFrequencyMultipleTimesInformation,
          dataNeedsToBeExtractedEvery: data.dataNeedsToBeExtractedEvery,
          specifyOther: data.specifyOther,
          moreInfoOnExtractionPeriods: data.moreInfoOnExtractionPeriods,
          orderOfControlsDataExtraction: data.orderOfControlsDataExtraction,
          definingTheExtractionCriteria: data.definingTheExtractionCriteria,
          willRelativesBeExtracted: data.willRelativesBeExtracted,
          hasTheGroupRelativesFormed3: data.hasTheGroupRelativesFormed3,
          previouslyIssuedPermitIssuer3: data.previouslyIssuedPermitIssuer3,
          previouslyIssuedPermitDate3: data.previouslyIssuedPermitDate3,
          validityPeriod3: data.validityPeriod3,
          previouslyIssuedPermitValidityPeriodFrom3: data.previouslyIssuedPermitValidityPeriodFrom3,
          previouslyIssuedPermitValidityPeriodTo3: data.previouslyIssuedPermitValidityPeriodTo3,
          previouslyIssuedPermitNumber3: data.previouslyIssuedPermitNumber3,
          ifTheGroupOfRelativesHasBeenFormed: data.ifTheGroupOfRelativesHasBeenFormed,
          willSameDataBeExtractedForRelatives: data.willSameDataBeExtractedForRelatives,
          whichDataHoldersForRelatives: data.whichDataHoldersForRelatives,
          whichDatabaseForRelatives: data.whichDatabaseForRelatives,
          variablesForDataExtractionRelativesAttachments: data.variablesForDataExtractionRelativesAttachments,
          timePeriodForDataExtractionRelatives: data.timePeriodForDataExtractionRelatives,
          relationshipToStudyCohort: data.relationshipToStudyCohort,
          sizeOfRelativesGroup: data.sizeOfRelativesGroup,
          sizeOfRelativesGroupEstimateOrExact: data.sizeOfRelativesGroupEstimateOrExact,
          willDataForRelativesBeExtractedSimultaneously: data.willDataForRelativesBeExtractedSimultaneously,
          dataExtractionFrequencyRelatives: data.dataExtractionFrequencyRelatives,
          dataExtractionFrequencyMultipleTimesInformationRelatives: data.dataExtractionFrequencyMultipleTimesInformationRelatives,
          needForDataExtractionEveryOptions: data.needForDataExtractionEveryOptions,
          specifyOtherRelatives: data.specifyOtherRelatives,
          moreInfoOnExtractionPeriodsRelatives: data.moreInfoOnExtractionPeriodsRelatives,
          orderOfRelativesDataExtraction: data.orderOfRelativesDataExtraction,
          //common fields
          yesOrNoOptions: data.yesOrNoOptions,
          onceOrMultipleTimes: data.onceOrMultipleTimes,
          everyWhen: data.everyWhen,
          processingData: data.processingData,
          legalBasisForProcessingData: data.legalBasisForProcessingData,
        } as Section6LabelsDA
      }
      case 7: {
        return {
          sectionH5: data.section7h5,
          sectionDescription: data.section7Description,
          addDataPermit: data.addDataPermit,
          addInfo: data.addInfo,
          removeDataPermit: data.removeDataPermit,
          willDataBeCombinedWithDataObtained: data.willDataBeCombinedWithDataObtained,
          listOtherDataToBeCompined: data.listOtherDataToBeCompined,
          combinedCountries: data.combinedCountries,
          combinedDataHolders: data.combinedDataHolders,
          combinedDatabaseRegistries: data.combinedDatabaseRegistries,
          listAnyOtherDataPermit: data.listAnyOtherDataPermit,
          provideInformationList: data.provideInformationList,
          dataset: data.dataset,
          numberOfFiles: data.numberOfFiles,
          formatOfFiles: data.formatOfFiles,
          sizeOfFiles: data.sizeOfFiles,
          notes: data.notes,
          otherPermits: data.otherPermits,
          permitIssuer: data.permitIssuer,
          combinedDatasetsRegistries: data.combinedDatasetsRegistries,
          permitStartDateOfIssue: data.permitStartDateOfIssue,
          permitEndDateOfIssue: data.permitEndDateOfIssue,
          permitIdentificationInformation: data.permitIdentificationInformation,
          attachmentOfPermitDocuments: data.attachmentOfPermitDocuments,
          otherPermitApplications: data.otherPermitApplications,
          applicationIssuer: data.applicationIssuer,
          dateOfSubmittingTheApplication: data.dateOfSubmittingTheApplication,
          identificationCode: data.identificationCode,
          //common fields
          yesOrNoOptions: data.yesOrNoOptions,
          onceOrMultipleTimes: data.onceOrMultipleTimes,
          everyWhen: data.everyWhen,
          processingData: data.processingData,
          legalBasisForProcessingData: data.legalBasisForProcessingData
        } as Section7LabelsDA
      }
      case 8: {
        return {
          sectionH5: data.section8h5,
          sectionDescription: data.section8Description,
          addPerson: data.addPerson,
          removePerson: data.removePerson,
          technicalRequirementsForEnvironment: data.technicalRequirementsForEnvironment,
          nameWebsiteAddressForEnvironment: data.nameWebsiteAddressForEnvironment,
          healthDataAccessBody: data.healthDataAccessBody,
          whenDataNeeded: data.whenDataNeeded,
          ifLaterWhen: data.ifLaterWhen,
          informationWhichDataCanAccess: data.informationWhichDataCanAccess,
          frequencyOfAccessOrDataUpdates: data.frequencyOfAccessOrDataUpdates,
          estimatedStartAndEnd: data.estimatedStartAndEnd,
          estimatedStartDatesForDataProcessing: data.estimatedStartDatesForDataProcessing,
          estimatedEndDatesForDataProcessing: data.estimatedEndDatesForDataProcessing,
          ifStoreNeeded: data.ifStoreNeeded,
          startPeriodOfInactiveDataStorage: data.startPeriodOfInactiveDataStorage,
          endPeriodOfInactiveDataStorage: data.endPeriodOfInactiveDataStorage,
          willTheDataBeTransferred: data.willTheDataBeTransferred,
          whichCountriesDataBeProcessed: data.whichCountriesDataBeProcessed,
          whyWillDataBeTransferredOutsideEUArticle47: data.whyWillDataBeTransferredOutsideEUArticle47,
          whyWillDataBeTransferredOutsideEUArticle47Options: data.whyWillDataBeTransferredOutsideEUArticle47Options,
          whyWillDataBeTransferredOutsideEUArticle48: data.whyWillDataBeTransferredOutsideEUArticle48,
          whyWillDataBeTransferredOutsideEUArticle48bOptions: data.whyWillDataBeTransferredOutsideEUArticle48bOptions,
          whyWillDataBeTransferredOutsideEUArticle48cOpt: data.whyWillDataBeTransferredOutsideEUArticle48cOpt,
          whyWillDataBeTransferredOutsideEUArticle48e: data.whyWillDataBeTransferredOutsideEUArticle48e,
          whyWillDataBeTransferredOutsideEUArticle48d: data.whyWillDataBeTransferredOutsideEUArticle48d,
          whyWillDataBeTransferredOutsideEUArticle48c: data.whyWillDataBeTransferredOutsideEUArticle48c,
          whyWillDataBeTransferredOutsideEUArticle48b: data.whyWillDataBeTransferredOutsideEUArticle48b,
          whyWillDataBeTransferredOutsideEUArticle48a: data.whyWillDataBeTransferredOutsideEUArticle48a,
          whyWillDataBeTransferredOutsideEUArticle49: data.whyWillDataBeTransferredOutsideEUArticle49,
          whyWillDataBeTransferredOutsideEU: data.whyWillDataBeTransferredOutsideEU,
          legalBasisForTransferringTheDataOutsideEU: data.legalBasisForTransferringTheDataOutsideEU,
          legalBasisForTransferringTheDataOutsideEUOtherOptions: data.legalBasisForTransferringTheDataOutsideEUOtherOptions,
          legalBasisForTransferringTheDataOutsideEUc1: data.legalBasisForTransferringTheDataOutsideEUc1,
          legalBasisForTransferringTheDataOutsideEUc2: data.legalBasisForTransferringTheDataOutsideEUc2,
          legalBasisForTransferringTheDataOutsideEUc3: data.legalBasisForTransferringTheDataOutsideEUc3,
          legalBasisForTransferringTheDataOutsideEUc4: data.legalBasisForTransferringTheDataOutsideEUc4,
          legalBasisForTransferringTheDataOutsideEUc5: data.legalBasisForTransferringTheDataOutsideEUc5,
          legalBasisForTransferringTheDataOutsideEUc6: data.legalBasisForTransferringTheDataOutsideEUc6,
          legalBasisForTransferringTheDataOutsideEUc7: data.legalBasisForTransferringTheDataOutsideEUc7,
          safeguardsAreProvidedByReferringGDCP: data.safeguardsAreProvidedByReferringGDCP,
          whichOrganizationWillBeTheControllerOfData: data.whichOrganizationWillBeTheControllerOfData,
          complyWithDataMinimisationPrinciple: data.complyWithDataMinimisationPrinciple,
          complyWithDataMinimisationPrincipleNotEUMember: data.complyWithDataMinimisationPrincipleNotEUMember,
          protectionAndSecurityStatements: data.protectionAndSecurityStatements,
          protectionAndSecurityStatementsA: data.protectionAndSecurityStatementsA,
          protectionAndSecurityStatementsB: data.protectionAndSecurityStatementsB,
          protectionAndSecurityStatementsC: data.protectionAndSecurityStatementsC,
          protectionAndSecurityStatementsD: data.protectionAndSecurityStatementsD,
          protectionAndSecurityStatementsE: data.protectionAndSecurityStatementsE,
          onlyThePeopleMentioned: data.onlyThePeopleMentioned,
          sameAsContactPerson: data.sameAsContactPerson,
          listTheFullNames: data.listTheFullNames,
          emailAddress: data.emailAddress,
          fullName: data.fullName,
          lawfulnessOfProcessing: data.lawfulnessOfProcessing,
          legalBasisForProcessingPersonalData: data.legalBasisForProcessingPersonalData,
          lawfulForProcessingPersonalData: data.lawfulForProcessingPersonalData,
          lawfulForProcessingPersonalDataNaturalPersonOption: data.lawfulForProcessingPersonalDataNaturalPersonOption,
          otherLegalBasisForProcessingPersonalData: data.otherLegalBasisForProcessingPersonalData,
          legalBasisForProcessingCombinedData: data.legalBasisForProcessingCombinedData,
          otherLegalBasisForProcessingCombinedData: data.otherLegalBasisForProcessingCombinedData,
          legalBasisForProcessingApplicationData: data.legalBasisForProcessingApplicationData,
          europeanUnionInstitution: data.europeanUnionInstitution,
          otherLegalBasisForProcessingApplicationData: data.otherLegalBasisForProcessingApplicationData,
          legalBasisForProcessingCombinedApplicationData: data.legalBasisForProcessingCombinedApplicationData,
          otherLegalBasisForProcessingCombinedApplicationData: data.otherLegalBasisForProcessingCombinedApplicationData,
          attachResearchPermitIfRequired: data.attachResearchPermitIfRequired,
          hdabToRetain: data.hdabToRetain,
          //common fields
          yesOrNoOptions: data.yesOrNoOptions,
          onceOrMultipleTimes: data.onceOrMultipleTimes,
          everyWhen: data.everyWhen,
          processingData: data.processingData,
          legalBasisForProcessingData: data.legalBasisForProcessingData,
          optOutOfTheMechanismProvidedInTheNationalLaw: data.optOutOfTheMechanismProvidedInTheNationalLaw,
          providedJustificationException: data.providedJustificationException,
        } as Section8LabelsDA
      }
      case 9: {
        return {
          sectionH5: data.section9h5,
          sectionDescription: data.section9Description,
          additionalInformation: data.additionalInformation,
          additionalAttachment: data.additionalAttachment,
          //common fields
          yesOrNoOptions: data.yesOrNoOptions,
          onceOrMultipleTimes: data.onceOrMultipleTimes,
          everyWhen: data.everyWhen,
          processingData: data.processingData,
          legalBasisForProcessingData: data.legalBasisForProcessingData
        } as Section9LabelsDA
      }
      default: {
        return {
          sectionH5: data.section10h5,
          sectionDescription: data.section10Description,
          submitYouApplicationText: data.submitYouApplicationText,
          awareProcessingFee: data.awareProcessingFee,
          awareChargeFee: data.awareChargeFee,
          awareInformationCorrect: data.awareInformationCorrect,
          //common fields
          yesOrNoOptions: data.yesOrNoOptions,
          onceOrMultipleTimes: data.onceOrMultipleTimes,
          everyWhen: data.everyWhen,
          processingData: data.processingData,
          legalBasisForProcessingData: data.legalBasisForProcessingData
        } as Section10LabelsDA
      }
    }
  }

}

export const sectionDefinitions: SectionDefinition[] = [
  {
    id: 1,
    title: 'message.application.sections.dataAccess.section1.title',
    description: 'message.application.sections.dataAccess.section1.description',
    sectionTitle: 'message.application.sections.dataAccess.section1.sectionTitle'
  },
  {
    id: 2,
    title: 'message.application.sections.dataAccess.section2.title',
    description: 'message.application.sections.dataAccess.section2.description',
    sectionTitle: 'message.application.sections.dataAccess.section2.sectionTitle'
  },
  {
    id: 3,
    title: 'message.application.sections.dataAccess.section3.title',
    description: 'message.application.sections.dataAccess.section3.description',
    sectionTitle: 'message.application.sections.dataAccess.section3.sectionTitle'
  },
  {
    id: 4,
    title: 'message.application.sections.dataAccess.section4.title',
    description: 'message.application.sections.dataAccess.section4.description',
    sectionTitle: 'message.application.sections.dataAccess.section4.sectionTitle'
  },
  {
    id: 5,
    title: 'message.application.sections.dataAccess.section5.title',
    description: 'message.application.sections.dataAccess.section5.description',
    sectionTitle: 'message.application.sections.dataAccess.section5.sectionTitle'
  },
  {
    id: 6,
    title: 'message.application.sections.dataAccess.section6.title',
    description: 'message.application.sections.dataAccess.section6.description',
    sectionTitle: 'message.application.sections.dataAccess.section6.sectionTitle'
  },
  {
    id: 7,
    title: 'message.application.sections.dataAccess.section7.title',
    description: 'message.application.sections.dataAccess.section7.description',
    sectionTitle: 'message.application.sections.dataAccess.section7.sectionTitle'
  },
  {
    id: 8,
    title: 'message.application.sections.dataAccess.section8.title',
    description: 'message.application.sections.dataAccess.section8.description',
    sectionTitle: 'message.application.sections.dataAccess.section8.sectionTitle'
  },
  {
    id: 9,
    title: 'message.application.sections.dataAccess.section9.title',
    description: 'message.application.sections.dataAccess.section9.description',
    sectionTitle: 'message.application.sections.dataAccess.section9.sectionTitle'
  },
  {
    id: 10,
    title: 'message.application.sections.dataAccess.section10.title',
    description: 'message.application.sections.dataAccess.section10.description',
    sectionTitle: 'message.application.sections.dataAccess.section10.sectionTitle'
  }
];

export const subSectionDefinitions: SectionDefinition[] = [
  {
    id: 6,
    title: 'message.application.sections.dataAccess.section6.title',
    description: 'message.application.sections.dataAccess.section6.description',
    sectionTitle: 'message.application.sections.dataAccess.section6.sectionTitle'
  },
  {
    id: 6.1,
    title: 'message.application.sections.dataAccess.section6.subSections.section6_1.title',
    description: 'message.application.sections.dataAccess.section6.subSections.section6_1.description',
    sectionTitle: 'message.application.sections.dataAccess.section6.subSections.section6_1.sectionTitle'
  },
  {
    id: 6.2,
    title: 'message.application.sections.dataAccess.section6.subSections.section6_2.title',
    description: 'message.application.sections.dataAccess.section6.subSections.section6_2.description',
    sectionTitle: 'message.application.sections.dataAccess.section6.subSections.section6_2.sectionTitle'
  },
  {
    id: 6.3,
    title: 'message.application.sections.dataAccess.section6.subSections.section6_3.title',
    description: 'message.application.sections.dataAccess.section6.subSections.section6_3.description',
    sectionTitle: 'message.application.sections.dataAccess.section6.subSections.section6_3.sectionTitle'
  },
]

/** Mapping of subsections to their respective fields */
export const subsectionMapping = {
  6.0: ['hdabContacts', 'howWillTheDataFromDifferentSourcesBeLinked'],
  6.1: [
    'howIsTheStudyCohortFormed',
    'hasTheStudyCohortBeenFormedBasedOnInformationOfStudyParticipants',
    'doesTheInformedConsentCoverTheRequestedRegistryExtractions',
    'consentAndInformationLetterAttachment',
    'hasTheCohortBeenBasedOnADataPermit',
    'confirmThatDataPermitHasBeenGrantedForTheResearchProject',
    'previouslyIssuedPermitIssuer1',
    'previouslyIssuedPermitDate1',
    'previouslyIssuedPermitValidityPeriodFrom1',
    'previouslyIssuedPermitValidityPeriodTo1',
    'previouslyIssuedPermitNumber1',
    'permitDecisionAttachment',
    'howTheStudyCohortWasObtained',
    'informationProviderName',
    'informationProviderEmail',
    'informationProviderPhone',
    'whyNeedDataOfaWholePopulation',
    'sizeOfTheStudyCohort',
    'sizeOfTheStudyCohortEstimationOrExact',
    'whyNeedStudyCohortOfThisSize',
    'ethicalReviewAttachment',
    'informationProviderSameAsContactPerson',
    'variablesToBeUsedInDataExtractionAttachment',
    'timePeriodOfDataExtraction',
    'extractionMethod',
    'samplingMethod',
    'sampleSize',
    'inclusionCriteria',
    'potentialExclusionCriteria',
    'howOftenDoesTheDataNeedToBeExtracted',
    'needForDataExtractionEvery',
    'needForDataExtractionEveryOther',
    'needForDataExtractionEveryDescription',
    'orderForDataExtraction',
  ],
  6.2: [
    'willControlsBeExtracted',
    'hasTheGroupRelativesFormed2',
    'willSameDataBeExtractedForControls',
    'dataHoldersForControls',
    'databasesForControls',
    'datasetsForControls',
    'variablesForDataExtractionAttachments',
    'timePeriodForDataExtraction',
    'extractionCriteriaForControls',
    'sizeOfControlGroup',
    'sizeOfControlGroupEstimationOrExact',
    'controlsPerPersonInStudyCohort',
    'exclusionCriteriaForControls',
    'previouslyIssuedPermitIssuer2',
    'previouslyIssuedPermitDate2',
    'previouslyIssuedPermitValidityPeriodFrom2',
    'previouslyIssuedPermitValidityPeriodTo2',
    'previouslyIssuedPermitNumber2',
    'willDataForControlsBeExtractedSimultaneously',
    'dataExtractionFrequencyMultipleTimesInformation',
    'dataExtractionFrequency',
    'dataNeedsToBeExtractedEvery',
    'specifyOther',
    'moreInfoOnExtractionPeriods',
    'orderOfControlsDataExtraction',
    'extractionPhases',
  ],
  6.3: [
    'willRelativesBeExtracted',
    'hasTheGroupRelativesFormed3',
    'previouslyIssuedPermitIssuer3',
    'previouslyIssuedPermitDate3',
    'previouslyIssuedPermitValidityPeriodFrom3',
    'previouslyIssuedPermitValidityPeriodTo3',
    'previouslyIssuedPermitNumber3',
    'willSameDataBeExtractedForRelatives',
    'dataHoldersForRelatives',
    'databasesForRelatives',
    'datasetsForRelatives',
    'variablesForDataExtractionRelativesAttachments',
    'timePeriodForDataExtractionRelatives',
    'relationshipToStudyCohort',
    'sizeOfRelativesGroup',
    'sizeOfRelativesGroupEstimateOrExact',
    'willDataForRelativesBeExtractedSimultaneously',
    'dataExtractionFrequencyRelatives',
    'dataNeedsToBeExtractedEveryRelatives',
    'dataExtractionFrequencyMultipleTimesInformationRelatives',
    'specifyOtherRelatives',
    'moreInfoOnExtractionPeriodsRelatives',
    'orderOfRelativesDataExtraction',
    'extractionPhasesRelatives',
  ],
};

// Helper: check whether a value is considered "non-empty"
function isNonEmptyValue(value: any): boolean {
  // Empty string
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }

  // Array: non-empty if any element is non-empty
  if (Array.isArray(value)) {
    if (value.length === 0) return false;
    return value.some((v) => isNonEmptyValue(v));
  }

  // Object: non-empty if any property is non-empty
  if (value && typeof value === 'object') {
    const vals = Object.values(value);
    if (vals.length === 0) return false;
    return vals.some((v) => isNonEmptyValue(v));
  }

  // Other primitive types: not null/undefined
  return value != null;
}

/**
 * Returns true if for this subsection (6.0, 6.1, 6.2, 6.3)
 * there is at least one non-empty additionalInformation field in section6.
 */
/**
 * Checks if, for a given catalogId and section6 subsection (6.0, 6.1, 6.2, 6.3),
 * there is at least one non-empty additionalInformation field.
 *
 * @param additionalInformation - the full additionalInformation array
 * @param subsectionId - 6.0, 6.1, 6.2, 6.3
 * @param catalogId - catalog_id to filter on
 */
export function hasAdditionalInfoForSubsectionAndCatalog(
  additionalInformation: any[] | null | undefined,
  subsectionId: number | string,
  catalogId: string
): boolean {
  if (!additionalInformation?.length) return false;

  const subsectionKey = String(subsectionId); // e.g. 6.0 -> "6.0"
  const fields = subsectionMapping[subsectionKey];

  // If no mapping is defined for this subsection, there is nothing to check
  if (!fields || fields.length === 0) return false;

  // 1) Filter only entries for this catalogId
  const entriesForCatalog = additionalInformation.filter(
    (item) => item.catalog_id === catalogId
  );

  if (!entriesForCatalog.length) return false;

  // 2) Check if ANY of those entries has at least one non-empty field in section6
  return entriesForCatalog.some((item) => {
    const section6 = item.source?.section6;
    if (!section6 || typeof section6 !== 'object') return false;

    // If ANY field defined for this subsection is non-empty → true
    return fields.some((fieldName) => {
      const value = section6[fieldName];
      return isNonEmptyValue(value);
    });
  });
}
