import { type TimeProvider } from '@framework'
import { Entity, type EntityProps } from '../core'
import type { Participant } from './participant'

export interface VotingFactoryProps {
  timeProvider: TimeProvider
  timeLimit: Date
  participants: Map<string, Participant>
}

export interface VotingProps extends EntityProps {
  timeLimit: Date
  closedAt?: Date
  participantVotes: Map<string, number>
  participants: Map<string, Participant>
}

export class Voting extends Entity<VotingProps> {
  static factory(props: VotingFactoryProps): Voting {
    return new Voting(
      {
        ...this.factoryEntityProps(props.timeProvider),
        timeLimit: props.timeLimit,
        participantVotes: new Map(),
        participants: props.participants,
      },
      props.timeProvider
    )
  }

  constructor(props: VotingProps, timeProvider: TimeProvider) {
    super(props, timeProvider)
  }

  timeLimit(): Date {
    return new Date(this.props.timeLimit)
  }

  isOpen(): boolean {
    if (this.props.closedAt) return false
    return this.props.timeLimit.getTime() >= this.timeProvider.now().getTime()
  }

  votes(): Map<string, number> {
    return new Map(this.props.participantVotes)
  }

  manualClose(): void {
    this.props.closedAt = this.timeProvider.now()
  }

  allowedPoints(): Set<number> {
    return new Set([1, 2, 3, 5, 8, 13, 20, 100])
  }

  setParticipantVote(participant: Participant, points: number): void {
    if (!this.isOpen()) {
      throw new VotingIsClosed()
    }
    if (!this.props.participants.has(participant.userId())) {
      throw new InvalidParticipant()
    }

    const allowedPoints = this.allowedPoints()

    if (!allowedPoints.has(points)) {
      throw new InvalidPoints()
    }

    this.props.participantVotes.set(participant.userId(), points)

    if (this.allParticipantsVoted()) {
      this.props.closedAt = this.timeProvider.now()
    }

    this.notifyUpdate()
  }

  // Private methods
  private allParticipantsVoted(): boolean {
    return Array.from(this.props.participants.keys()).every((userId) => {
      return this.props.participantVotes.has(userId)
    })
  }
}

// Errors

export class VotingIsClosed extends Error {}
export class InvalidPoints extends Error {}
export class InvalidParticipant extends Error {}
