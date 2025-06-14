import { LoginAccountService } from '@/modules/account/application/services/login-account.service';
import { AccountRepositoryInterface } from '@/modules/account/domain/repositories/account.repository';
import { Account } from '@/modules/account/domain/entities/account.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

describe('LoginAccountService', () => {
  let loginService: LoginAccountService;
  let mockRepo: jest.Mocked<AccountRepositoryInterface>;

  beforeEach(() => {
    mockRepo = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
    };

    loginService = new LoginAccountService(mockRepo);
  });

  it('should generate token with valid login', async () => {
    const hash = await bcrypt.hash('senhaSegura123', 10);

    mockRepo.findByEmail.mockResolvedValue(
      new Account('1', 'maicol@graciosa.com', hash, 'Maicol', new Date(), new Date())
    );

    const token = await loginService.execute('maicol@graciosa.com', 'senhaSegura123');

    expect(token).toBeDefined();

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'chave-secreta-superforte');
    expect((decoded as any).email).toBe('maicol@graciosa.com');
  });

  it('should throw error with invalid password', async () => {
    const hash = await bcrypt.hash('senhaCorreta', 10);

    mockRepo.findByEmail.mockResolvedValue(
      new Account('1', 'maicol@graciosa.com', hash, 'Maicol', new Date(), new Date())
    );

    await expect(
      loginService.execute('maicol@graciosa.com', 'senhaErrada')
    ).rejects.toThrow();
  });

  it('should throw an error when email is invalid', async () => {
    mockRepo.findByEmail.mockResolvedValue(null);

    await expect(
      loginService.execute('naoexiste@graciosa.com', 'senhaSegura123')
    ).rejects.toThrow();
  });
});
