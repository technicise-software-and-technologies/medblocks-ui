import {
  html,
  fixture,
  expect,
  oneEvent, 
  elementUpdated,
} from '@open-wc/testing';
import MbDuration from '../src/medblocks/duration/duration';
import '../src/medblocks/duration/duration';
import { querySelectorAllDeep } from 'query-selector-shadow-dom';
import { SlInput } from '@shoelace-style/shoelace';

describe('MbDuration', () => {

  it('data if not provided', async () => {
    const mbDuration = await fixture<MbDuration>(
      html`<mb-duration year=${true} label="Year"></mb-duration>`
    );
    const year = querySelectorAllDeep('input') as SlInput[];
    setTimeout(() => {
      // year[0].value = '2';
      year[0].dispatchEvent(new Event('input'));
    });
    const event: any = await oneEvent(mbDuration, 'mb-input');
    expect(event.target.data).to.eq(undefined);
  });


  it('emits data on input', async () => {
    const mbDuration = await fixture<MbDuration>(
      html`<mb-duration year=${true} label="Year"></mb-duration>` 
    );
    const year = querySelectorAllDeep('input') as SlInput[];
    setTimeout(() => {
      year[0].value = '2';
      year[0].dispatchEvent(new Event('input'));
    });
    const event: any = await oneEvent(mbDuration, 'mb-input');
    expect(event.target.data).to.eq('P2Y');
  });

  
  it('changes input on setting data', async () => {
    const mbDuration = await fixture<MbDuration>(
      html`<mb-duration year label="Year"></mb-duration>` 
    );
    const year = querySelectorAllDeep('input') as SlInput[];
    setTimeout(()=>{
        mbDuration.data = 'P3Y';
    },0)
    await oneEvent(mbDuration, 'mb-input');
    await elementUpdated(mbDuration);
    expect(year[0].value).to.eq('3');
  });
});
