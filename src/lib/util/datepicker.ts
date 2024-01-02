import type { Action } from 'svelte/action';
import { TempusDominus } from '@eonasdan/tempus-dominus';

const datepicker: Action<HTMLInputElement> = (node) => {
  const picker = new TempusDominus(node, {
    localization: {
      locale: 'de-DE',
      format: 'yyyy-MM-dd HH:mm:ss.000Z'
    }
  });
  return {
    destroy() {
      picker.dispose();
    }
  };
};

export default datepicker;
