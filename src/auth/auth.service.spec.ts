import { Test } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthService } from './auth.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('AuthService', () => {
  let service: AuthService;
  const prismaMock = {
    user: { findUnique: vi.fn(), create: vi.fn() },
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: JwtService, useValue: { sign: vi.fn(() => 'fake-token') } },
      ],
    }).compile();
    service = moduleRef.get(AuthService);
  });

  it('harus menolak registrasi jika email sudah terdaftar', async () => {
    prismaMock.user.findUnique.mockResolvedValue({ id: 1, email: 'ada@example.com' });
    await expect(
      service.register('Budi', 'ada@example.com', 'rahasia123'),
    ).rejects.toThrow(ConflictException);
  });
});