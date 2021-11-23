import { customElement, html, property } from 'lit-element';
import EhrElement from '../EhrElement';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input';
import '@shoelace-style/shoelace/dist/components/input/input';
import { ifDefined } from 'lit-html/directives/if-defined';
import './proportion'
@customElement('mb-percent')
export default class MbPercent extends EhrElement {
  @property({ type: Object }) data:
    | {
      denominator: number;
      numerator: number;
      type: number;
    }
    | undefined = undefined;

  @property({ type: Boolean, reflect: true }) required: boolean = false;

  @property({ type: Number, reflect: true }) max: number | string;

  @property({ type: Number, reflect: true }) min: number | string;

  // _handleChange(e: CustomEvent) {
  //   const inputElement = e.target as SlInput;
  //   if (inputElement.value === '') {
  //     this.data = undefined;
  //   } else {
  //     this.data = {
  //       numerator: parseFloat(inputElement.value),
  //       denominator: 100,
  //       type: 2,
  //     };
  //   }
  //   this._mbInput.emit();
  // }

  reportValidity() {
    const input = this.shadowRoot!.querySelector('mb-proportion') as SlInput;
    return input.reportValidity();
  }

  render() {
    return html`<mb-proportion ?required=${this.required} .min=${this.min} .max=${this.max} type="percent"
  label=${ifDefined(this.label)} .data=${this.data}></mb-proportion>`;
  }
}
