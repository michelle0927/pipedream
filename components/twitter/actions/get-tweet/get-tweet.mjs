import twitter from "../../twitter.app.mjs";

export default {
  key: "twitter-get-tweet",
  name: "Get Tweet",
  description: "Return a single tweet specified by ID",
  version: "0.0.1",
  type: "action",
  props: {
    twitter,
    tweetID: {
      propDefinition: [
        twitter,
        "tweetID",
      ],
    },
    includeEntities: {
      propDefinition: [
        twitter,
        "includeEntities",
      ],
    },
  },
  async run() {
    const {
      tweetID,
      includeEntities,
    } = this;

    const params = {
      id: tweetID,
      includeEntities,
    };

    return await this.twitter.getTweet(params);
  },
};
