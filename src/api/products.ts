import axios from 'axios';

export const fetchProducts = async (token: string) => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};