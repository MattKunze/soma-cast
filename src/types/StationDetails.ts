import { StationInfo } from "./StationInfo"

export interface StationDetails extends StationInfo {
  playlist: string
  streamUrl: string
}
