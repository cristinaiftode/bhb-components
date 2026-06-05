// url=https://www.figma.com/design/fUcrmr5PRAIQulDadSGsB8/Styles---Components-Webapp?node-id=3225-6
// source=components/Button/Button.tsx
// component=Button
import figma from 'figma';

const instance = figma.selectedInstance;

// Variant — direct 1:1 mapping (4 variants)
const variant = instance.getEnum('Variant', {
  Primary: 'primary',
  Secondary: 'secondary',
  Ghost: 'ghost',
  Danger: 'danger',
});

// Size — only Large is designed in Figma right now; Medium/Small will be added later.
// When they are, extend this mapping to: { Large: 'large', Medium: 'medium', Small: 'small' }.
const size = instance.getEnum('Size', {
  Large: 'large',
});

// State — Rest/Hover/Focus are CSS pseudo-classes on the React side (no prop).
// Disabled and Loading become explicit boolean props.
const state = instance.getEnum('State', {
  Rest: '',
  Hover: '',
  Focus: '',
  Disabled: 'disabled',
  Loading: 'loading',
});
const isDisabled = state === 'disabled';
const isLoading = state === 'loading';

// Label text comes from the descendant TEXT layer named 'label'.
const labelHandle = instance.findText('label');
const label =
  labelHandle && labelHandle.type === 'TEXT'
    ? labelHandle.textContent
    : 'Speichern & Weiter';

export default {
  example: figma.code`<Button variant="${variant}" size="${size}"${isDisabled ? ' disabled' : ''}${isLoading ? ' loading' : ''}>${label}</Button>`,
  imports: ['import { Button } from "bhb-components";'],
  id: 'button',
  metadata: { nestable: true },
};
