
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
    handleAddToCart: (item: Guitar) => void;
}

export type { Guitar, GuitarProps, GuitarItem };