export interface Engine {
  velocity: number;
  distance: number;
}

export interface DriveStatus {
  success: boolean;
}

export interface DriveResult {
  success: boolean;
  carId: number;
  time: number;
  color: string;
  carName: string;
}
