import axios from "axios";
import { toast } from "react-toastify";

export const getInstInfo = async (username) => {
  let instaKey = import.meta.env.VITE_INSTA_KEY_1;
  if (new Date().getDay() === 1) {
    instaKey = import.meta.env.VITE_INSTA_KEY_1;
  } else if (new Date().getDay() === 2) {
    instaKey = import.meta.env.VITE_INSTA_KEY_2;
  } else if (new Date().getDay() === 3) {
    instaKey = import.meta.env.VITE_INSTA_KEY_3;
  } else if (new Date().getDay() === 4) {
    instaKey = import.meta.env.VITE_INSTA_KEY_4;
  } else if (new Date().getDay() === 5) {
    instaKey = import.meta.env.VITE_INSTA_KEY_5;
  } else if (new Date().getDay() === 6) {
    instaKey = import.meta.env.VITE_INSTA_KEY_6;
  } else if (new Date().getDay() === 7) {
    instaKey = import.meta.env.VITE_INSTA_KEY_3;
  }

  // Get User Info
  let options = {
    method: 'GET',
    url: 'https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/ig_profile',
    params: {
      ig: username,
      response_type: 'feeds'
    },
    headers: {
      'X-RapidAPI-Key': instaKey,
      'X-RapidAPI-Host': 'instagram-bulk-profile-scrapper.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const data = response.data;
    const user_id = data[0].pk;
    const followers = data[0].follower_count;
    const following = data[0].following_count;
    const is_private = data[0].is_private;


    if (!is_private) {
      // Get User Media
      options = {
        method: "GET",
        url: "https://instagram-looter2.p.rapidapi.com/user-feeds",
        params: {
          id: user_id,
          count: "50",
          end_cursor:
            "",
        },
        headers: {
          "X-RapidAPI-Key": instaKey,
          "X-RapidAPI-Host": "instagram-looter2.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        const data = response.data.data.user.edge_owner_to_timeline_media;
        // Get all posts
        let allposts = data.edges;

        // Get stats
        const likes = allposts.reduce((acc, curr) => {
          return acc + curr.node.edge_media_preview_like.count;
        }, 0);
        const comments = allposts.reduce((acc, curr) => {
          return acc + curr.node.edge_media_to_comment.count;
        }, 0);

        return {
          followers,
          following,
          is_private,
          likes,
          comments,
          num_posts: allposts.length,
        };
      } catch (error) {
        toast.error("Error getting user media");
      }
    }
    else {
      return {
        followers,
        following,
        is_private,
        likes: 0,
        comments: 0,
        num_posts: data[0].media_count,
      };
    }
  }
  catch (error) {
    toast.error("Error getting user info");
  }

}
