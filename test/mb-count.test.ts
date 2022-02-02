import {
    html,
    fixture,
    expect,
    oneEvent,
    elementUpdated,
  } from '@open-wc/testing';
  import MbCount from '../src/medblocks/count/count';
  import '../src/medblocks/count/count';
  import { querySelectorDeep } from 'query-selector-shadow-dom';
  
  describe('MbCount', () => {
    let mbcount: MbCount;
    let input: HTMLInputElement;
  
    beforeEach(async () => {
      mbcount = await fixture<MbCount>(
        html`<mb-count label="Hello there"></mb-count>`
      );
      input = querySelectorDeep('input') as HTMLInputElement
    });
    it('emits data on input', async () => {
      input.value = '3';
      input.dispatchEvent(new Event('input'));
      const event: any = await oneEvent(mbcount, 'mb-input');
      expect(event.target.data).to.eq(3);
    });
  
    it('changes input on setting data', async () => {
      mbcount.data = 1;
      await oneEvent(mbcount, 'mb-input')
      await elementUpdated(mbcount);
      expect(input.value).to.eq('1');
    });
  });
  