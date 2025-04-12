import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { Reflector } from '@nestjs/core';

describe('BeltGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard(new JwtService(), new Reflector())).toBeDefined();
  });
});
