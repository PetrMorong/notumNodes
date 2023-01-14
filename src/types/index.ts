import { NodeDto } from '../api'

export interface Tree extends NodeDto {
  children: Tree[]
}
