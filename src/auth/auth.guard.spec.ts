import { JwtService } from '@nestjs/jwt';
import { AuhtGuard } from './atuh.guard';
import { Reflector } from '@nestjs/core';

describe('BeltGuard', () => {
  it('should be defined', () => {
    expect(new AuhtGuard(new JwtService(), new Reflector())).toBeDefined();
  });
});
