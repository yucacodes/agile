import { generateSecureRandomSecretString } from '@domain'
import { Entity, type EntityProps } from './entity'
import type { MeetingParticipant } from './meeting-participant'
import { compareSync, hashSync } from 'bcrypt'

export interface MeetingProps extends EntityProps {
  secretHash: string
  participants: Map<string, MeetingParticipant>
}

export class Meeting extends Entity<MeetingProps> {
  private static SECRET_BYTES = 32
  private static SECRET_SALT_ROUNDS = 10

  static factory(): { meeting: Meeting; secret: string } {
    const secret = generateSecureRandomSecretString(this.SECRET_BYTES)
    const meeting = new Meeting({
      ...this.factoryBaseProps(),
      secretHash: hashSync(secret, this.SECRET_SALT_ROUNDS),
      participants: new Map(),
    })
    return { meeting, secret }
  }

  validate(): void {
    throw new Error('Method not implemented.')
  }

  addParticipant(participant: MeetingParticipant, providedSecret: string) {
    if (!this.isValidSecret(providedSecret)) {
      throw new PersonProvideInvalidSecretError()
    }
    this.props.participants.set(participant.id(), participant)
  }

  participantById(id: string): MeetingParticipant | undefined {
    return this.props.participants.get(id)
  }

  participants(): Map<string, MeetingParticipant> {
    return new Map(this.props.participants)
  }

  // Private methods

  private isValidSecret(secret: string): boolean {
    return compareSync(secret, this.props.secretHash)
  }
}

// Errors

export class PersonProvideInvalidSecretError extends Error {}
