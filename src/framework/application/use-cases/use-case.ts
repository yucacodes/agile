import { type AuthInformationDto } from '../dtos'

export abstract class UseCase<Request, Result> {
  abstract perform(
    request: Request,
    authInformation?: AuthInformationDto
  ): Promise<Result>
}
