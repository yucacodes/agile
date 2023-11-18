import {
  generatePasswordHash,
  generateSecureRandomSecretString,
  verifyPasswordHash,
} from '../helpers'
import { Entity, type EntityProps } from './entity'
import type { MeetingParticipant } from './meeting-participant'

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
      secretHash: generatePasswordHash(secret, this.SECRET_SALT_ROUNDS),
      participants: new Map(),
    })
    return { meeting, secret }
  }

  validate(): void {
    // TODO: implement
  }

  addParticipant(participant: MeetingParticipant, providedSecret: string) {
    if (participant.meetingId() !== this.id()) {
      throw new ParticipantMeetingIdNotMatch()
    }
    if (!this.isValidSecret(providedSecret)) {
      throw new ParticipantProvideInvalidSecretError()
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
    return verifyPasswordHash(secret, this.props.secretHash)
  }
}

// Errors

export class ParticipantMeetingIdNotMatch extends Error {}
export class ParticipantProvideInvalidSecretError extends Error {}
