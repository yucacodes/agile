import {
  Entity,
  type TimeManager,
  type EntityProps,
  generateRandomVotingIdString,
} from '@framework/domain'
import type { MeetingParticipant } from './meeting-participant'

export interface VotingProps extends EntityProps {
  votingId: string
  timeLimit: Date
  isOpen: boolean
  votes: Map<string, number>
  manualClosed: boolean
}

export interface VotingFactoryProps {
  timeLimit: Date
}

export class Voting extends Entity<VotingProps> {
  static factory(props: VotingFactoryProps): Voting {
    return new Voting({
      ...this.factoryBaseProps(),
      votingId: generateRandomVotingIdString(),
      timeLimit: props.timeLimit,
      isOpen: false,
      votes: new Map(),
      manualClosed: false,
    })
  }

  validate(): void {
    // TODO: implement
    throw new MethodNotImplemented()
  }

  votingId(): string {
    return this.props.votingId
  }

  timeLimit(): Date {
    return this.props.timeLimit
  }

  isOpen(): boolean {
    return this.props.isOpen
  }

  votes(): Map<string, number> {
    return this.props.votes
  }

  manualCloseVoting(): void {
    this.props.manualClosed = true
  }

  startVoting(): void {
    if (!this.props.isOpen) {
      this.props.isOpen = true
    }
  }

  closeVoting(
    participants: MeetingParticipant[],
    timeManager: TimeManager
  ): void {
    const allVoted = participants.every((participant) => {
      return this.props.votes.has(participant.userId())
    })

    const currentTime = timeManager.now()
    const dynamicTimeLimit = this.props.timeLimit

    const timeRemaining = dynamicTimeLimit.getTime() - currentTime.getTime()
    const isTimeExpired = timeRemaining <= 0

    if (allVoted || isTimeExpired || this.props.manualClosed) {
      this.props.isOpen = false
    }
  }

  setVoteByParticipant(participant: MeetingParticipant, points: number): void {
    if (this.props.isOpen) {
      this.props.votes.set(participant.userId(), points)
    } else {
      throw new VotingIsClosed()
    }
  }
}

// Errors

export class VotingIsClosed extends Error {}
export class MethodNotImplemented extends Error {}
