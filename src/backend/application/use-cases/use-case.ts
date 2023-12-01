import { type AuthInformationDto } from '../dtos'

export interface UseCaseWithAuth<Request, Result> {
  perform(
    request: Request,
    authInformation: AuthInformationDto
  ): Promise<Result>
}

export interface UseCaseWithoutAuth<Request, Result> {
  perform(request: Request): Promise<Result>
}

export type UseCase<Request, Result> =
  | UseCaseWithAuth<Request, Result>
  | UseCaseWithoutAuth<Request, Result>
