export interface IFuelSession {
  id?: number;
  vehicleId: number;
  dateFueled: string;
  rate: number;
  quantity: number;
  amount?: number;
  odometer: number;
}
