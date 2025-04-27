import { Order } from '@/interfaces/orders';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id: string;
  rol: string[];
  iat: number;
  exp: number;
}

export const fetchOrdersOfUser = async (token: string) => {
  try {
    // Decode the token to extract the user ID
    const decoded = jwtDecode(token) as TokenPayload;
    const userId = decoded.id;

    // Fetch orders for the user
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const fetchUserOrders = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found');
    return;
  }

  try {
    const orders: Order[] = await fetchOrdersOfUser(token);
  } catch (error) {
    console.error('Failed to fetch user orders:', error);
  }
};

fetchUserOrders();