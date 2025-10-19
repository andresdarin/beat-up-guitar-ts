import type { Dispatch } from "react";
import type { CartActions } from "../reducers/cart-reducer";

type Guitar = {
    id: number;
    description: string;
    name: string;
    price: number;
    image: string;
}

type GuitarItem = Guitar & {
    quantity: number
};

type GuitarProps = {
    guitar: Guitar;
    dispatch: Dispatch<CartActions>;
}

export type { Guitar, GuitarProps, GuitarItem };