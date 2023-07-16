import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const skipGqlAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
