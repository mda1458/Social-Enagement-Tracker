import axios from "axios";

const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3";

export const getYouTubeChannel = async (apiKey, channelId) => {
  try {
    const response = await axios.get(
      `${YOUTUBE_API_BASE_URL}/channels?part=statistics&id=${channelId}&key=${apiKey}`
    );
    return response.data.items[0].statistics;
  } catch (error) {
    console.error("Error fetching YouTube channel:", error);
    throw error;
  }
};
