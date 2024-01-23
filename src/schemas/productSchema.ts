import { ObjectSchema, object, string, number } from "yup";
import { Product } from "../models";
import { currentAvailableBrands, currentAvailableImages } from "@src/constants";

export const productSchema: ObjectSchema<Product> = object({
  name: string()
    .min(3, "Product name must be at least 3 characters")
    .required(),
  brand: string().oneOf(currentAvailableBrands).required(),
  image: string().oneOf(currentAvailableImages).required(),
  price: number().required(),
  id: string().required(), // Maybe further check with http to ensure no duplicate id's
});
