import { useState } from "react";

import instagram from "../assets/insta.png";
import ytb from "../assets/ytb.png";
import { Bar, PolarArea } from "react-chartjs-2";
import { getInstInfo } from "../utils/instaApi";
import { toast } from "react-toastify";

const SocialCalculator = () => {
  const [loading, setLoading] = useState(false);

  const [insta, setInsta] = useState(true)
  const [follow, setFollow] = useState([])
  const [posts, setPosts] = useState([])
  const [engagement, setEngagement] = useState(0)


  const instaHandle = async (e) => {
    e.preventDefault();
    setLoading(true);
    const username = e.target.username.value;
    const data = await getInstInfo(username);
    console.log(data);
    setFollow([data.followers, data.following]);
    setPosts([data.num_posts, data.likes, data.comments]);
    setLoading(false);
    data.is_private ? toast.warning("Account is private! So no Post Engagement Data is available") : setEngagement(((data.likes + data.comments)/data.num_posts / data.followers * 100).toFixed(2));
  };
  const ytbHandle = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center lg:flex-row">
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
                name="username"
                id="floating"
                className="block rounded-3xl p-5 w-full z-0 bg-transparent border-2 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="username"
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
        {/* Stats Display */}
        <div className="flex flex-col text-center mt-8">
          <div className="grad-text text-xl">Results</div>
          {/* grid */}
          {loading ? (
            <div className="🤚 my-16">
              <div className="👉"></div>
              <div className="👉"></div>
              <div className="👉"></div>
              <div className="👉"></div>
              <div className="🌴"></div>
              <div className="👍"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-8 mt-4">
              <div>Followers: {follow[0]}</div>
              <div>Following: {follow[1]}</div>
              <div>Posts: {posts[0]}</div>
              <div>Likes: {posts[1]}</div>
              <div>Comments: {posts[2]}</div>
            </div>
          )}
          <div className="grad-text text-xl font-bold">
            Engagement Rate: {engagement}%
          </div>
        </div>
      </div>
      {posts.length > 0 && (
        <div className="lg:absolute top-0 right-0 lg:h-[100vh!important]">
          <Bar
            className="h-[10rem!important] md:h-[18rem!important] w-[auto!important] lg:mt-[12rem]"
            data={{
              labels: ["Posts", "Likes", "Comments"],
              datasets: [
                {
                  barThickness: 50,
                  data: posts,
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
                  position: "bottom",
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
      )}
      {follow.length > 0 && (
        <div className="lg:absolute top-0 left-0 lg:h-[100vh!important]">
          <PolarArea
            className="h-[20rem!important] md:h-[30rem!important] w-[auto!important]"
            data={{
              labels: ["Followers", "Following"],
              datasets: [
                {
                  data: follow,
                  backgroundColor: [
                    "rgba(255, 0, 0, 0.6)",
                    "rgba(56, 255, 12, 0.6)",
                  ],
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  position: "right",
                },
                title: {
                  position: "bottom",
                  display: true,
                  text: "Followers Data",
                  font: {
                    size: 20,
                    weight: "bold",
                  },
                  color: "orange",
                },
              },
              responsive: true,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default SocialCalculator;