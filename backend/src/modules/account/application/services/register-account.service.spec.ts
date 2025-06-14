import { RegisterAccountService } from './register-account.service';
import { AccountRepositoryInterface } from '@/modules/account/domain/repositories/account.repository';
import { Account } from '@/modules/account/domain/entities/account.entity';

describe('RegisterAccountService', () => {
  let registerService: RegisterAccountService;
  let mockRepo: jest.Mocked<AccountRepositoryInterface>;

  beforeEach(() => {
    mockRepo = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
    };

    registerService = new RegisterAccountService(mockRepo);
  });

  it('should create a new account successfully', async () => {
    mockRepo.findByEmail.mockResolvedValue(null);

    await registerService.execute('Maicol', 'maicol@graciosa.com', 'senhaSegura123');

    expect(mockRepo.save).toHaveBeenCalled();
  });

  it('should throw an error if email already exists', async () => {
    mockRepo.findByEmail.mockResolvedValue(
      new Account('1', 'maicol@graciosa.com', 'hash', 'Maicol', new Date(), new Date())
    );

    await expect(
      registerService.execute('Maicol', 'maicol@graciosa.com', 'senhaSegura123')
    ).rejects.toThrow('Email já cadastrado');
  });
});
