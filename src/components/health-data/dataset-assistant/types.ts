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
import { SelectObject } from '../application/commonTypes';
import { Tab } from '../common/tabs/types';

export type AccessLevel = 'public' | 'restricted' | 'non-public';

export type RequirementLevel = 'mandatory' | 'recommended' | 'optional';

export type ConditionalRequirementOperator = 'equals' | 'notEquals';

/** Represents a conditional requirement for a shape property based on the value of another property. */
export interface ConditionalRequirement {
  dependsOn: string;
  operator: ConditionalRequirementOperator;
  value: string;
  requirement: Record<AccessLevel, RequirementLevel>;
}

export type Shape = 'dataset' | 'distribution' | 'sample' | 'analytics';

export type ShapeRequirement = `${Shape}-${RequirementLevel}`;

export interface ShapeTab extends Tab {
  id: Shape;
}

export interface ShapeRequirementTab extends Tab {
  id: ShapeRequirement;

  /** The background class for the circle inside the tab. */
  bgClass: string;
}

export type RequirementFilter = 'all' | RequirementLevel;

export type ShapeFilter = 'all' | Shape;

export type ShapeRequirementFilter = `${ShapeFilter}-${RequirementFilter}`;

export interface ShapeFilterTab extends Tab {
  id: ShapeFilter;
}

export interface ShapeRequirementFilterTab extends Tab {
  id: ShapeRequirementFilter;
}

export interface ShapeInput {
  /** The value of the input. */
  value: string;

  /** The language of the input value. */
  lang: string;

  /** The values of the nested input fields. */
  nestedValues?: DataBucket;

  /** A unique identifier for this input. */
  _uid: string;
}

/** Represents a bucket of input data with ShapeProperty paths as its keys. */
export type DataBucket = Record<string, ShapeInput[]>;

/** Represents the Health DCAT-AP schema in the expected JSON format. */
export interface HealthDcatApSchema {
  prefixes: Record<string, string>;
  datasetAccessLevels: Record<
    AccessLevel,
    {
      label: Record<string, string>;
      value: string;
      description: Record<string, string>;
      color: string;
      backgroundColor: string;
    }
  >;
  shapes: Record<string, ShapeObject>;
}

export interface ShapeObject {
  name: Record<string, string>;
  targetClass: string;
  properties: ShapeProperty[];
}

/** Represents a property of a shape as defined in the schema. */
export interface ShapeProperty {
  /** The path to the property in the shape. */
  path: string;

  /** The name of the property. */
  name: string;

  /** The minimum number of occurrences of this property. */
  minCount: number;

  /** The maximum number of occurrences of this property. */
  maxCount?: number | null;

  /** The kind of node this property represents. */
  nodeKind?: string | null;

  /** The data type of the property. */
  datatype?: string | null;

  /** The class of the property. */
  class?: string | string[] | null;

  /** The shape associated with this property. */
  shape?: string | null;

  /** The node associated with this property. */
  node?: string | null;

  /** The predefined value of this property for each access level. */
  hasValue?: Record<AccessLevel, string> | null;

  /** A record mapping access levels to requirement levels for this property. */
  requirement: Record<AccessLevel, RequirementLevel>;

  /** An optional conditional override for the requirement of this property. */
  conditionalRequirement?: ConditionalRequirement | null;

  /** The order of this property within its shape. */
  order: number;

  /** The text of the "Add another ..." button in different languages. For fields with no maxCount. */
  buttonLabel?: Record<string, string>;

  /** The characteristics of the input field for this property. */
  input: InputOptions;

  /** An array of nested properties for this property. */
  nestedProperties?: NestedProperty[];

  /** The source of the field, e.g. DCAT-AP. */
  source?: string;
}

/** Represents a nested property within a ShapeProperty. */
export type NestedProperty = Omit<ShapeProperty, 'order'>;

export type AnyProperty = ShapeProperty | NestedProperty;

export interface PropertyContext {
  prop: AnyProperty;
  input: ShapeInput;
  isRequired: boolean;
}

/** Precomputed, localized view model for MetadataModelExplorer. */
export interface PreparedProperty {
  label: string;
  tooltip: string;
  usageNote: string;
  example: string;
  requirement: string;
  cardinality: string;
  classText: string;
  source: string;
  original: AnyProperty;
}

/** Represents the UI input options for a shape property. */
export interface InputOptions {
  /** The path of the input value for non-literals. */
  path?: string;

  /** The label for the input field in different languages. */
  label: Record<string, string>;

  /** The tooltip for the input field in different languages. */
  tooltip?: Record<string, string>;

  /** The usage note for the input field in different languages. */
  usageNote?: Record<string, string>;

  /** An RDF example of this property. */
  example?: string;

  /** The label for the checkbox input field in different languages. */
  checkboxLabel?: Record<string, string>;

  /** The placeholder for the input field in different languages. */
  placeholder?: Record<string, string>;

  /** The type of the input field (e.g., text, select, textarea, url). */
  type?: string;

  /** An array of options for select inputs, each with a label in different languages and value. */
  options?: Array<{ label: Record<string, string>; value: string }>;

  /** An array of SelectObject items for select inputs. System generated for internal use. */
  items?: SelectObject[];

  /** The source(s) of the options for select inputs, if they are loaded from an external source. */
  source?: string | string[];

  /**
   * A flag indicating the input is NOT multilingual.
   * By default, all text/textarea inputs are multilingual.
   */
  isNotMultilingual?: boolean;

  /** Whether the input is read-only. */
  readonly?: boolean;

  /** Whether the input should be hidden. */
  hidden?: boolean;
}

/** Represents the properties of a shape grouped by requirement level. */
export type RequirementPropertiesMapping = Record<RequirementLevel, ShapeProperty[]>;

/** Represents the computed properties of a shape grouped by requirement level. */
export type RequirementFilterPreparedMapping = Record<RequirementFilter, PreparedProperty[]>;

export interface ITBValidationError {
  id: string;
  description: string;
  location?: string;
  test?: string;
}

export interface PaginationState {
  page: number;
  limit: number;
}
