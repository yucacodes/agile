import { generateRandomVotingIdString } from '../helpers'
import type { User } from './user'

export interface VotingProps {
  votingId: string
  timeLimit: Date
  status: 'open' | 'closed'
  votes: Map<string, string>
}

export interface VotingFactoryProps {
  timeLimit: Date
}

export class Voting {
  static factory(props: VotingFactoryProps): Voting {
    return new Voting({
      votingId: generateRandomVotingIdString(),
      timeLimit: props.timeLimit,
      status: 'open',
      votes: new Map(),
    })
  }

  constructor(private props: VotingProps) {}

  votingId(): string {
    return this.props.votingId
  }

  timeLimit(): Date {
    return this.props.timeLimit
  }

  status(): 'open' | 'closed' {
    return this.props.status
  }

  votes(): Map<string, string> {
    return this.props.votes
  }

  closeVoting(): void {
    this.props.status = 'closed'
  }

  vote(user: User, selectedOptionId: string): void {
    if (this.props.status === 'open') {
      this.props.votes.set(user.id(), selectedOptionId)
    } else {
      throw new Error('Voting is closed.')
    }
  }
}
