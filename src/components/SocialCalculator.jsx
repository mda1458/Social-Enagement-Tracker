import insta from "../assets/insta.png";

const SocialCalculator = () => {
  const instaHandle = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };
  return (
    <div>
      <div className="flex flex-col align-center py-12 gap-4">
        <div className="text-3xl text-center font-bold grad-text">
          Social Engagement Calculator
        </div>
      </div>
    </div>
  );
}

export default SocialCalculator