import { useState } from "react";
import { Container, Form, FormGroup, Input, Button } from "reactstrap";
import { getInstagramUser } from "../utils/instaApi";
import { getYouTubeChannel } from "../utils/youtubeApi";

const SocialEngagementCalculator = () => {
  const [instagramAccessToken, setInstagramAccessToken] = useState("");
  const [youtubeApiKey, setYoutubeApiKey] = useState("");
  const [youtubeChannelId, setYoutubeChannelId] = useState("");
  const [instagramUser, setInstagramUser] = useState(null);
  const [youtubeChannel, setYoutubeChannel] = useState(null);

  const handleInstagramSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await getInstagramUser(instagramAccessToken);
      setInstagramUser(user);
    } catch (error) {
      // Handle error
    }
  };

  const handleYouTubeSubmit = async (event) => {
    event.preventDefault();
    try {
      const channel = await getYouTubeChannel(youtubeApiKey, youtubeChannelId);
      setYoutubeChannel(channel);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Container>
      <h2>Instagram</h2>
      <Form onSubmit={handleInstagramSubmit}>
        <FormGroup>
          <Input
            type="text"
            placeholder="Enter Instagram access token"
            value={instagramAccessToken}
            onChange={(e) => setInstagramAccessToken(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">Fetch Instagram User</Button>
      </Form>
      {/* Display Instagram user details here */}

      <h2>YouTube</h2>
      <Form onSubmit={handleYouTubeSubmit}>
        <FormGroup>
          <Input
            type="text"
            placeholder="Enter YouTube API key"
            value={youtubeApiKey}
            onChange={(e) => setYoutubeApiKey(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            placeholder="Enter YouTube channel ID"
            value={youtubeChannelId}
            onChange={(e) => setYoutubeChannelId(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">Fetch YouTube Channel</Button>
      </Form>
      {/* Display YouTube channel details here */}
    </Container>
  );
};

export default SocialEngagementCalculator;
