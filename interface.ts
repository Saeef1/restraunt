import { StaticImageData } from "next/image";
export interface MenuItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string | StaticImageData;
    special: boolean;
    category: string[];
    quantity: number;
}

export interface OrderType {
  status: string;
  _id: string;
  orderId: string;
  user: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  items: {
    _id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  total: number;
  createdAt: string;
}