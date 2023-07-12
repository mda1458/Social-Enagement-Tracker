import { useState, useEffect } from "react";
import instagram from "../assets/insta.png";
import ytb from "../assets/ytb.png";

import followers_data from "../dummyfollwers.json"
import posts from "../dummyposts.json"

const SocialCalculator = () => {
  const [insta, setInsta] = useState(true)
  const instaHandle = (e) => {
    e.preventDefault();
    alert("insta");
  };
  const ytbHandle = (e) => {
    e.preventDefault();
    alert("ytb");
  };

  useEffect(() => {
    const followers = followers_data.user.follower_count;
    const following = followers_data.user.following_count;
    const post_count = posts.data.user.edge_owner_to_timeline_media.count;

    const all_posts = posts.data.user.edge_owner_to_timeline_media.edges
    let video_count = post_count;
    let video_views = 0;
    let likes = 0;
    let comments = 0;
    all_posts.map( (post) => {
        post.node.is_video? video_views += post.node.video_view_count : video_count -= 1;
        likes += post.node.edge_media_preview_like.count;
        !post.node.comments_disabled? comments += post.node.edge_media_to_comment.count : null;
      }
    )

    console.log(followers, following, post_count, video_views, video_count, likes, comments)
    console.log("engagement rate: ", (likes + video_views  + comments)/post_count/followers*100)
  }, [])
  return (
    <div>
      <div className="flex flex-col items-center py-12 gap-4">
        <div className="text-3xl text-center font-bold grad-text">
          Social Engagement Calculator
        </div>
        {/* Navigator between insta, youtube forms */}
        <div className="flex justify-center gap-6">
          <button
            className={`rounded-md px-4 py-2 hover:rotate-[-25deg] ease-linear duration-200 ${insta? "rotate-[-25deg]": ""}`}
            onClick={() => setInsta(true)}
          >
            <img src={instagram} alt="insta" className="w-10 h-10" />
          </button>
          <button
            className={`rounded-md px-4 py-2 hover:rotate-[-25deg] ease-linear duration-200 ${insta? "" : "rotate-[-25deg]"}`}
            onClick={() => setInsta(false)}
          >
            <img src={ytb} alt="insta" className="w-16 h-16" />
          </button>
        </div>
        {/* Form */}
        <form onSubmit={insta? instaHandle : ytbHandle}>
          <div className="flex flex-col gap-4">
            {/* label */}
            <div className="text-xl text-center font-bold grad-text">
              {insta ? "Instagram" : "Youtube"}
            </div>
            {/* username */}
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="floating"
                id="floating"
                className="block rounded-3xl p-5 w-full z-0 bg-transparent border-2 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating"
                className="bg-white px-2 rounded-md peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 z-10 left-2 origin-[0] peer-focus:text-pink-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Username
              </label>
            </div>
            {/* search */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="rounded-2xl px-4 py-2 bg-grad text-white hover:scale-105 transform duration-200 ease-linear"
              >
                Search
              </button>
            </div>
          </div>
        </form>
        
      </div>
    </div>
  );
}

export default SocialCalculator