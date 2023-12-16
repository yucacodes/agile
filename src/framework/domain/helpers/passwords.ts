export function generatePasswordHash(
  password: string,
  iterations: number = 10
) {
  return Bun.password.hashSync(password, {
    algorithm: 'bcrypt',
    cost: iterations,
  })
}

export function verifyPasswordHash(password: string, hash: string): boolean {
  return Bun.password.verifySync(password, hash, 'bcrypt')
}
