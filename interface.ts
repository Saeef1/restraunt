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

