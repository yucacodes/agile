import {
  generatePasswordHash,
  generateSecureRandomSecretString,
  verifyPasswordHash,
  type TimeProvider,
} from '@framework'
import { Entity, type EntityProps } from '../core'
import type { Participant } from './participant'
import { Voting } from './voting'

export interface MeetingFactoryProps {
  timeProvider: TimeProvider
}

export interface MeetingProps extends EntityProps {
  secretHash: string
  participants: Map<string, Participant>
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

  addParticipant(participant: Participant, providedSecret: string) {
    if (!this.isValidSecret(providedSecret)) {
      throw new ParticipantProvideInvalidSecretError()
    }
    this.props.participants.set(participant.userId(), participant)
  }

  participant(userId: string): Participant | undefined {
    return this.props.participants.get(userId)
  }

  participants(): Map<string, Participant> {
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

  allVotings(): Map<string, Voting> {
    return new Map(this.props.votings)
  }

  getManager(): Participant | undefined {
    return Array.from(this.props.participants.values()).find((participant) =>
      participant.isManager()
    )
  }

  getSecondParticipant(): Participant {
    const filteredParticipants = Array.from(
      this.props.participants.values()
    ).filter(
      (participant) => !participant.isManager() && participant.isConnected()
    )

    if (!filteredParticipants.length) {
      throw new NotEnoughParticipantsError()
    }

    filteredParticipants.sort((a, b) => a.userId().localeCompare(b.userId()))
    return filteredParticipants[0]
  }

  assignManagerRole(): Participant {
    const newManager = this.getSecondParticipant()
    newManager.assignManagerRole()

    return newManager
  }

  // Private methods

  private isValidSecret(secret: string): boolean {
    return verifyPasswordHash(secret, this.props.secretHash)
  }
}

// Errors

export class ParticipantMeetingIdNotMatch extends Error {}
export class ParticipantProvideInvalidSecretError extends Error {}
export class NotEnoughParticipantsError extends Error {}
