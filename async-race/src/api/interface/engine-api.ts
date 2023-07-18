export interface Engine {
  velocity: number;
  distance: number;
}

export interface DriveStatus {
  success: boolean;
}

export interface DrivingResult {
  success: boolean;
  carId: number;
  time: number;
}
