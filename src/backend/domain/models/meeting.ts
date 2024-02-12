import {
  generatePasswordHash,
  generateSecureRandomSecretString,
  verifyPasswordHash,
  type TimeProvider,
} from '@framework/domain'
import { Entity, type EntityProps } from '../core'
import type { MeetingParticipant } from './meeting-participant'
import { Voting } from './voting'

export interface MeetingFactoryProps {
  timeProvider: TimeProvider
}

export interface MeetingProps extends EntityProps {
  secretHash: string
  participants: Map<string, MeetingParticipant>
  votings: Map<string, Voting>
}

export interface MeetingAndSecret {
  meeting: Meeting
  secret: string
}

export class Meeting extends Entity<MeetingProps> {
  private static VOTING_MINUTES_LIMIT = 5
  private static SECRET_BYTES = 32
  private static SECRET_SALT_ROUNDS = 10

  static factory(props: MeetingFactoryProps): MeetingAndSecret {
    const secret = generateSecureRandomSecretString(this.SECRET_BYTES)
    const meeting = new Meeting(
      {
        ...this.factoryEntityProps(props.timeProvider),
        secretHash: generatePasswordHash(secret, this.SECRET_SALT_ROUNDS),
        participants: new Map(),
        votings: new Map(),
      },
      props.timeProvider
    )
    return { meeting, secret }
  }

  addParticipant(participant: MeetingParticipant, providedSecret: string) {
    if (!this.isValidSecret(providedSecret)) {
      throw new ParticipantProvideInvalidSecretError()
    }
    this.props.participants.set(participant.userId(), participant)
  }

  participant(userId: string): MeetingParticipant | undefined {
    return this.props.participants.get(userId)
  }

  participants(): Map<string, MeetingParticipant> {
    return new Map(this.props.participants)
  }

  newVoting(): Voting {
    const voting = Voting.factory({
      participants: this.participants(),
      timeLimit: this.timeProvider.minutesLater(Meeting.VOTING_MINUTES_LIMIT),
      timeProvider: this.timeProvider,
    })
    this.props.votings.set(voting.id(), voting)
    this.notifyUpdate()
    return voting
  }

  voting(votingId: string): Voting | undefined {
    return this.props.votings.get(votingId)
  }

  // Private methods

  private isValidSecret(secret: string): boolean {
    return verifyPasswordHash(secret, this.props.secretHash)
  }
}

// Errors

export class ParticipantMeetingIdNotMatch extends Error {}
export class ParticipantProvideInvalidSecretError extends Error {}
