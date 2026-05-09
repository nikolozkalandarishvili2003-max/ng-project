export interface IProduct {
  id: number;
  brand: string | null;
  model: string | null;
  year: number;
  imageUrl1: string | null;
  imageUrl2: string | null;
  imageUrl3: string | null;
  price: number;
  multiplier: number;
  capacity: number;
  transmission: string | null;
  createdBy: string | null;
  createdByEmail: string | null;
  fuelCapacity: number;
  city: string | null;
  latitude: number;
  longitude: number;
  ownerPhoneNumber: string | null;
}
