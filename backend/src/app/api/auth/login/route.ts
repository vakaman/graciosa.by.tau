import { PrismaAccountRepository } from '@/app/core/infrastructure/account/PrismaAccountRepository'
import { LoginAccountService } from '@/app/core/application/account/LoginAccountService'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return new Response('Missing credentials', { status: 400 })
    }

    const accountRepository = new PrismaAccountRepository()
    const loginService = new LoginAccountService(accountRepository)

    const token = await loginService.execute(email, password)

    return Response.json({ token })

  } catch (err: any) {
    console.error('Login error:', err)
    return new Response(err.message ?? 'Internal server error', { status: 401 })
  }
}
