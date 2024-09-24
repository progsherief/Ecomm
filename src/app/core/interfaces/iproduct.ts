

export interface IProduct {
  sold: number;
  images: string[];
  subcategory: ISubcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: ICategory;
  brand: ICategory;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  fav:boolean;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ISubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}


export interface ICatg {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}