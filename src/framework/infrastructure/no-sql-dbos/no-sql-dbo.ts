import { DboMapper } from "../dbo-mapper"

export abstract class NoSqlDboMapper<T, DBO> extends DboMapper {
  abstract makeDbo(obj: T): DBO
  abstract loadDbo(dbo: DBO): T


  makeMapDbo(map: Map<string, T>): { [k: string]: DBO } {
    const result: { [k: string]: DBO } = {}
    for (const [key, obj] of map.entries()) result[key] = this.makeDbo(obj)
    return result
  }

  loadMapDbo(dboMap: { [k: string]: DBO }): Map<string, T> {
    // TODO: HERE
    throw new Error('Not implemented')
  }

  makeArrayDbo(array: T[]): DBO[] {
    return array.map((x) => this.makeDbo(x))
  }

  loadArrayDbo(dboArray: DBO[]): T[] {
    // TODO: HERE
    throw new Error('Not implemented')
  }
}
