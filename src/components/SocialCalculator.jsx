import { useState, useEffect } from "react";
import instagram from "../assets/insta.png";
import ytb from "../assets/ytb.png";
import { Bar, PolarArea } from "react-chartjs-2";

import data from "../data.json";

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
    const followers = data[0].follower_count;
    const following = data[0].following_count;
    const posts = data[0].feed.data;
    const likes = posts.reduce((acc, curr) => acc + curr.like_count, 0);
    const comments = posts.reduce((acc, curr) => acc + curr.comment_count, 0);
    const likesperpost = likes / posts.length;
    const commentsperpost = comments / posts.length;
    const engagementrate = ((likesperpost + commentsperpost) / followers) * 100;
    console.log("followers : ", followers);
    console.log("following : ", following);
    console.log("posts : ", posts);
    console.log("likes : ", likes);
    console.log("comments : ", comments);
    console.log("likesperpost : ", likesperpost);
    console.log("commentsperpost : ", commentsperpost);
    console.log("engagementrate : ", engagementrate);



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
            className={`rounded-md px-4 py-2 hover:rotate-[-25deg] ease-linear duration-200 ${
              insta ? "rotate-[-25deg]" : ""
            }`}
            onClick={() => setInsta(true)}
          >
            <img src={instagram} alt="insta" className="w-10 h-10" />
          </button>
          <button
            className={`rounded-md px-4 py-2 hover:rotate-[-25deg] ease-linear duration-200 ${
              insta ? "" : "rotate-[-25deg]"
            }`}
            onClick={() => setInsta(false)}
          >
            <img src={ytb} alt="insta" className="w-16 h-16" />
          </button>
        </div>
        {/* Form */}
        <form onSubmit={insta ? instaHandle : ytbHandle}>
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
        {/* polar area chart using chart.js showing followers, following, posts, likes, comments and a big text showing engagement rate */}
        <div className="lg:absolute top-0 right-0 h-[100vh!important]">
          <Bar
            className="h-[18rem!important] w-[auto!important] mt-[10rem]"
            data={{
              labels: ["Posts", "Likes", "Comments"],
              datasets: [
                {
                  data: [100, 5000, 2000],
                  backgroundColor: [
                    "rgba(255, 99, 132)",
                    "rgba(54, 162, 235)",
                    "rgba(255, 206, 86)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: "Posts Data",
                  font: {
                    size: 20,
                    weight: "bold",
                  },
                  color: "#8508FF",
                },
              },
              responsive: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SocialCalculator