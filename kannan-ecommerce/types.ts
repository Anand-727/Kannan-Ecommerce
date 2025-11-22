
export interface Product {
  id: string;
  name: string;
  nameTa?: string;
  price: number;
  category: string;
  categoryTa?: string;
  description: string;
  descriptionTa?: string;
  image: string;
  rating: number;
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  paymentMethod: 'card' | 'upi' | 'cod';
}

export interface RecommendationResponse {
  recommendations: {
    productId: string;
    reason: string;
  }[];
}

export type ViewState = 'LOGIN' | 'HOME' | 'PRODUCT_DETAIL' | 'CART' | 'CHECKOUT' | 'SUCCESS';
export type Language = 'en' | 'ta';
