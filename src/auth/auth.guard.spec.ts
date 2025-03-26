import { JwtService } from '@nestjs/jwt';
import { AuhtGuard } from './atuh.guard';

describe('BeltGuard', () => {
  it('should be defined', () => {
    expect(new AuhtGuard(new JwtService())).toBeDefined();
  });
});
