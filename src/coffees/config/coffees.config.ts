import { registerAs } from '@nestjs/config';

// registerAs allows us to make a namespace
export default registerAs('coffees', () => ({
  foo: 'bar',
  hi: 'hello',
}));
