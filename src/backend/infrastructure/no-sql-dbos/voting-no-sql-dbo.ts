import { type Voting } from "@domain";
import { NoSqlDboMapper } from "@framework/infrastructure";

export interface VotingNoSqlDbo {

}

export class VotingNoSqlDboMapper extends NoSqlDboMapper<Voting, VotingNoSqlDbo> {
  makeDbo(obj: Voting): VotingNoSqlDbo {
    throw new Error("Method not implemented.");
  }
  loadDbo(dbo: VotingNoSqlDbo): Voting {
    throw new Error("Method not implemented.");
  }
}
