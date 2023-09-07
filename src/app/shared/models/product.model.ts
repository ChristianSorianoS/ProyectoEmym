export interface Products {
  count: number;
  products: Product[];
}

export interface Product {
  id: number;
  name: String;
  category: String;
  description: String;
  image: String;
  price: Number;
  quantity: Number;
  images: String;
}
