import { UserDataMiddleware } from './user-data.middleware';

describe('UserDataMiddleware', () => {
  it('should be defined', () => {
    expect(new UserDataMiddleware()).toBeDefined();
  });
});
