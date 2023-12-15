import {
  Entity,
  generatePasswordHash,
  generateSecureRandomSecretString,
  verifyPasswordHash,
  type TimeManager,
  type EntityProps,
} from '@framework/domain'
import { Voting, type VotingProps } from './voting'
import type { MeetingParticipant } from './meeting-participant'

export interface MeetingProps extends EntityProps {
  secretHash: string
  participants: Map<string, MeetingParticipant>
  votings: Voting[]
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
      votings: [],
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
    this.props.participants.set(participant.userId(), participant)
  }

  notifyParticipantDisconnected(userId: string) {
    const participant = this.props.participants.get(userId)

    if (participant) {
      participant.setAsDisconnected()
    }
  }

  participantById(id: string): MeetingParticipant | undefined {
    return this.props.participants.get(id)
  }

  participants(): Map<string, MeetingParticipant> {
    return new Map(this.props.participants)
  }

  addVoting(votingProps: VotingProps): void {
    const voting = new Voting(votingProps)
    this.props.votings.push(voting)
  }

  getVotings(): Voting[] {
    return this.props.votings
  }

  closeAllVotings(
    participants: MeetingParticipant[],
    timeManager: TimeManager
  ): void {
    for (const voting of this.props.votings) {
      voting.closeVoting(participants, timeManager)
    }
  }

  // Private methods

  private isValidSecret(secret: string): boolean {
    return verifyPasswordHash(secret, this.props.secretHash)
  }
}

// Errors

export class ParticipantMeetingIdNotMatch extends Error {}
export class ParticipantProvideInvalidSecretError extends Error {}
