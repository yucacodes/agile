export type Mapper<M, DTO> = {
  map(model: M): DTO
}
