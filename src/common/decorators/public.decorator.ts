import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

// Can be used as a decorator to set metadata as public
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
