import { nanoid } from "nanoid";
import img1 from "@/public/menu/img1.jpg"
import img2 from "@/public/menu/img2.jpg"
import img3 from "@/public/menu/img3.jpg"
import img4 from "@/public/menu/img4.jpg"
import img5 from "@/public/menu/img5.jpg"
import img6 from "@/public/menu/img6.jpeg"
import img7 from "@/public/menu/img7.jpeg"
import img8 from "@/public/menu/img8.jpeg"
import img9 from "@/public/menu/img9.jpeg"
import img10 from "@/public/menu/img10.jpeg"
import img11 from "@/public/menu/img811.jpeg"
import { MenuItem } from "../../interface";

export const generateId = <T extends string = string>(size?: number): T =>
  nanoid(size) as T;


const menuItems : MenuItem[] = [
    {
      id: "pizza-1",
      name: "Pizza",
      description: "Tender beef strips marinated in special spices, grilled to perfection",
      price: 350,
      image: img1,
      special: true,
      catagory: ["Pizza DEALS", "Fast Food"],
      quantity: 0,
    },
    {
      id: "chowmein-1",
      name: "Chowmein",
      description: "Juicy chicken pieces marinated in yogurt and spices",
      price: 650,
      image: img2,
      special: false,
      catagory: ["Fast Food", "Chowmien"],
      quantity: 0,
    },
    {
      id: "deal-1",
      name: "DEAL",
      description: "Minced meat kababs with aromatic herbs and spices",
      price: 320,
      image: img3,
      special: false,
      catagory: ["DEALS"],
      quantity: 0,
    },
    {
      id: "deal-2",
      name: "DEAL",
      description: "Fresh fish marinated and grilled with traditional spices",
      price: 400,
      image: img4,
      special: false,
      catagory: ["DEALS"],
      quantity: 0,
    },
    {
      id: "bbq-mixed-grill",
      name: "MIXED GRILL",
      description: "Assorted kababs and grilled meats for the ultimate experience",
      price: 650,
      image: img5,
      special: false,
      catagory: ["BBQ"],
      quantity: 0,
    },
    {
      id: "bbq-karahi",
      name: "SPECIAL KARAHI",
      description: "Traditional mutton karahi with rich spices and flavors",
      price: 480,
      image: img6,
      special: false,
      catagory: ["BBQ"],
      quantity: 0,
    }
    ,{
      id: "burger-beef",
      name: "Beef Burger",
      description: "Traditional mutton karahi with rich spices and flavors",
      price: 480,
      image: img7,
      special: false,
      catagory: ["Fast Food"],
      quantity: 0,
    },
    {
      id: "pizza-2",
      name: "Pizza",
      description: "Traditional mutton karahi with rich spices and flavors",
      price: 480,
      image: img8,
      special: false,
      catagory: ["Fast Food"],
      quantity: 0,
    },{
      id: "burger-jumbo-zinger",
      name: "Jumbo zinger",
      description: "Traditional mutton karahi with rich spices and flavors",
      price: 480,
      image: img9,
      special: false,
      catagory: ["Fast Food"],
      quantity: 0,
    },{
      id: "burger-double-patty",
      name: "Dobble patty Burger",
      description: "Traditional mutton karahi with rich spices and flavors",
      price: 480,
      image: img10,
      special: false,
      catagory: ["Fast Food"],
      quantity: 0,
    },{
      id: "burger-chicken",
      name: "Chicken Burger",
      description: "Traditional mutton karahi with rich spices and flavors",
      price: 480,
      image: img11,
      special: false,
      catagory: ["Fast Food"],
      quantity: 0,
    }
  ]
  
export default menuItems
