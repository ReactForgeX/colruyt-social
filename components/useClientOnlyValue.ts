import { Platform } from 'react-native';

export function useClientOnlyValue<T>(web: T, native: T): T {
  return Platform.select({
    web,
    native,
    default: native,
  });
}
