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
// todo: move these to the backend and give them key - label pairs

export enum ApplicationStatusEnum {
  DRAFT = 'DRAFT',
  COMPLETED = 'COMPLETED',
  SUBMITTED = 'SUBMITTED',
  TRANSLATE = 'TRANSLATE',
  EDIT = 'EDIT',
  RETURNED_FOR_UPDATE = 'RETURNED FOR UPDATE',
  WITHDRAWN = 'WITHDRAWN',
  ON_GOING = 'ON-GOING',
  ADDITIONAL_INFORMATION = 'ADDITIONAL_INFORMATION'
}
export enum DecisionStatusEnum {

  POSITIVE_DECISION_ISSUED = 'POSITIVE_DECISION_ISSUED',
  POSITIVE_DECISION_ACCEPTED = 'POSITIVE_DECISION_ACCEPTED',
  POSITIVE_DECISION_REJECTED = 'POSITIVE_DECISION_REJECTED',
  NEGATIVE_DECISION_ISSUED = 'NEGATIVE_DECISION_ISSUED',
  NEGATIVE_DECISION_ACCEPTED = 'NEGATIVE_DECISION_ACCEPTED',
  NEGATIVE_DECISION_APPEALED = 'NEGATIVE_DECISION_APPEALED',
  APPEAL_APPROVED = 'APPEAL_APPROVED',
  APPEAL_REJECTED = 'APPEAL_REJECTED',
}
export const mandatoryFieldErrorCodes = [
  'NotNull',
  'NotBlank',
  'NotEmpty',
  'AssertTrue',
  'ListContainsSpecificValue',
  'ListNotContainsSpecificValue',
  'ListContainsOneMoreValueThanASpecificValue',
  'RequiredFieldBasedOnObjectValue',
  'ListObjectFieldsNotNull',
  'requiredOneFieldSelected',
  'RequiredFieldBasedOnValue',
  'RequiredFieldBasedOnTwoObjectValue',
  'RequiredFieldBasedOnAndOrObjectValue',
  'ListContainsOneMoreValueExpectASpecificValue',
  'NotNullVariables'
];
