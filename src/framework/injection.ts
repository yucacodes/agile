await import('reflect-metadata')
export type { DependencyContainer } from 'tsyringe'
export const { container, singleton, inject, registry } = await import('tsyringe')
