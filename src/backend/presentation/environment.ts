import { singleton } from "tsyringe";


@singleton()
export class Environment {
  getEnvironmentVariable(name: string, defaultValue?: string): string {
    throw new Error('Not implemented');
  }

  getEnvironmentVariableAsNumber(name: string, defaultValue?: string): number {
    throw new Error('Not implemented');
  }
}
