import { Entity, type TimeManager, type EntityProps } from '@framework/domain'
import type { MeetingParticipant } from './meeting-participant'

export interface VotingProps extends EntityProps {
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
      timeLimit: props.timeLimit,
      isOpen: false,
      votes: new Map(),
      manualClosed: false,
    })
  }

  validate(): void {
    // TODO: implement
  }

  timeLimit(): Date {
    return this.props.timeLimit
  }

  isOpen(timeManager: TimeManager): boolean {
    const isTimeExpired =
      this.props.timeLimit.getTime() - timeManager.now().getTime()

    if (isTimeExpired || this.props.manualClosed) {
      this.props.isOpen = false
    }

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

  closeVoting(): boolean {
    return (this.props.isOpen = false)
  }

  setVoteByParticipant(participant: MeetingParticipant, points: number): void {
    if (this.allParticipantsVoted()) {
      this.props.isOpen = false
      throw new VotingIsClosed()
    }

    this.props.votes.set(participant.userId(), points)
  }

  // Private methods

  private allParticipantsVoted(): boolean {
    return this.participants.every((participant) => {
      return this.props.votes.has(participant.userId())
    })
  }
  private participants: MeetingParticipant[] = []
}

// Errors

export class VotingIsClosed extends Error {}
