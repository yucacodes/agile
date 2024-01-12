import { Entity, type TimeManager, type EntityProps } from '@framework/domain'
import type { MeetingParticipant } from './meeting-participant'

export interface VotingProps extends EntityProps {
  timeLimit: Date
  isOpen: boolean
  userVotes: Map<string, number>
  participants: MeetingParticipant[]
}

export interface VotingFactoryProps {
  timeLimit: Date
}

export class Voting extends Entity<VotingProps> {
  static factory(props: VotingFactoryProps): Voting {
    return new Voting({
      ...this.factoryBaseProps(),
      timeLimit: props.timeLimit,
      isOpen: false,
      userVotes: new Map(),
      participants: [],
    })
  }

  validate(): void {
    // TODO: implement
  }

  timeLimit(): Date {
    return this.props.timeLimit
  }

  isOpen(timeManager: TimeManager): boolean {
    if (!this.props.isOpen) return false
    return this.props.timeLimit.getTime() > timeManager.now().getTime()
  }

  votes(): Map<string, number> {
    return this.props.userVotes
  }

  manualCloseVoting(): void {
    this.props.isOpen = false
  }

  startVoting(): void {
    this.props.isOpen = true
  }

  setParticipantVote(participant: MeetingParticipant, points: number): void {
    if (!this.props.isOpen) {
      throw new VotingIsClosed()
    }

    this.props.userVotes.set(participant.userId(), points)

    if (this.allParticipantsVoted()) {
      this.props.isOpen = false
    }
  }

  // Private methods

  private allParticipantsVoted(): boolean {
    return this.props.participants.every((participant) => {
      return this.props.userVotes.has(participant.userId())
    })
  }
}

// Errors

export class VotingIsClosed extends Error {}
