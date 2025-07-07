import { StaticImageData } from "next/image";
export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string | StaticImageData;
    special: boolean;
    catagory: string[];
    quantity: number;
}

