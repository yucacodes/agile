import { Meeting, MeetingParticipant } from "@domain";
import { MeetingAuthInformationDto } from "../dtos";
import { singleton } from "tsyringe";

@singleton()
export class GenerateMeetingAuthInformation {
  
  perform(meeting: Meeting, participant: MeetingParticipant): MeetingAuthInformationDto {
    return {
      meetingId: meeting.id(),
      participantId: participant.id(),
      participantName: participant.name(),
      roles: participant.roles(),
    }
  }
}
