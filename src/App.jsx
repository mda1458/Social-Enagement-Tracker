import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocialEngagementCalculator from "./components/SocialCalculator"
import { Chart as ChartJS } from "chart.js/auto";


const App = () => {
  return (
  <>
    <SocialEngagementCalculator />
    <ToastContainer />
  </>
  )
}

export default App