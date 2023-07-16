import { PickType } from '@nestjs/graphql';

// Remember the thing. This is ""most likely"" an issue with PNPM
export const PickTypesWrapper: typeof PickType = (classRef, keys) =>
  PickType(classRef, keys);
