import { isProxy, markRaw, type Component } from 'vue';

export const parseOptionalStringComponentProp = (
  prop: undefined | Component | string,
) => {
  if (prop === undefined) return undefined;

  if (typeof prop === 'string') {
    return prop !== '' ? prop : undefined;
  }

  return isProxy(prop) ? markRaw(prop) : prop;
};
