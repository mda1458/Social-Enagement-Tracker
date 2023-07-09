import axios from "axios";

const INSTAGRAM_API_BASE_URL = "https://api.instagram.com/v1";

export const getInstagramUser = async (accessToken) => {
  try {
    const response = await axios.get(
      `${INSTAGRAM_API_BASE_URL}/users/self/?access_token=${accessToken}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching Instagram user:", error);
    throw error;
  }
};
