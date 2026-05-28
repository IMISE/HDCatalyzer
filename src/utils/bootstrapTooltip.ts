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
// src/directives/bootstrapTooltip.ts
import { Tooltip } from 'bootstrap';

type TooltipElement = HTMLElement & { _tooltipInstance?: Tooltip };

export default {
  mounted(el: TooltipElement, binding: { value?: string }) {
    if (el.getAttribute('data-bs-toggle') !== 'tooltip') return;

    const text = binding.value ?? '';
    el.setAttribute('data-bs-title', text);
    el.removeAttribute('title'); // Prevent native browser tooltip

    el._tooltipInstance = new Tooltip(el, { container: 'body', title: text });
    if (!text) el._tooltipInstance.disable(); // Disable if no text provided
  },
  updated(el: TooltipElement, binding: { value?: string }) {
    const instance = el._tooltipInstance;
    if (!instance) return;

    const text = binding.value ?? '';
    el.setAttribute('data-bs-title', text); // Keep Bootstrap's source of truth updated
    el.removeAttribute('title'); // Prevent native browser tooltip

    instance.setContent({ '.tooltip-inner': text, title: text });

    // Enable or disable based on presence of text
    if (text) instance.enable();
    else {
      instance.hide();
      instance.disable();
    }
  },
  unmounted(el: TooltipElement) {
    el._tooltipInstance?.dispose?.(); // Clean up on component removal
  },
};
