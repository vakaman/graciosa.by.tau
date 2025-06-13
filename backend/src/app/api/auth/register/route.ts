import { PrismaAccountRepository } from '@/app/core/infrastructure/account/PrismaAccountRepository'
import { RegisterAccountService } from '@/app/core/application/account/RegisterAccountService'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { name, email, password } = body

    if (!name || !email || !password) {
      return new Response('Campos obrigatórios faltando.', { status: 400 })
    }

    const accountRepository = new PrismaAccountRepository()
    const registerService = new RegisterAccountService(accountRepository)

    await registerService.execute({ name, email, password })

    return new Response('Conta criada com sucesso.', { status: 201 })

  } catch (error: any) {
    console.error('Erro no cadastro:', error)
    return new Response(error.message ?? 'Erro interno', { status: 500 })
  }
}
