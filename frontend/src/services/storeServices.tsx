import axiosInstance from "./apiService";
import { ItemCreate, ShippingAddress } from "../../typings";

export const getProducts = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/latest-products/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching latest-products:', error);
      throw error;
    }
};

export const getProduct = async (category_slug:string, product_slug:string) => {
    try {
      const response = await axiosInstance.get(`/api/v1/products/${category_slug}/${product_slug}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching latest-products:', error);
      throw error;
    }
};

export const searchProduct = async (query: string) => {
    try {
      const response = await axiosInstance.get('/api/v1/search', { params : {query}});
      return response.data;
    } catch (error) {
      console.error('Error fetching latest-products:', error);
      throw error;
    }
};

export const getMyOrders = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/my-orders/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching my orderes:', error);
      throw error;
    }
};

export const checkout = async (items: ItemCreate[], shipping_address: ShippingAddress) => {
    try {
      const response = await axiosInstance.post(`/api/v1/checkout/`, {items, shipping_address} );
      return response.data;
    } catch (error) {
      console.error('Error checking out:', error);
      throw error;
    }
};