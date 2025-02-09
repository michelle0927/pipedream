import symblAIApp from "../../symbl_ai.app.mjs";

export default {
  key: "symbl_ai-post-trackers-analytics-ui",
  name: "Submit Trackers and Analytics Summary User Interface",
  description: "The Trackers and Analytics Summary UI provides users the ability to interact with the Symbl elements (Transcripts, Questions, Follow-Ups, Action Items, etc.) from a audio conversation. See the doc [here](https://docs.symbl.ai/docs/api-reference/experience-api/post-trackers-and-analytics-ui).",
  version: "0.0.1",
  type: "action",
  props: {
    symblAIApp,
    conversationId: {
      propDefinition: [
        symblAIApp,
        "conversationId",
      ],
    },
    audioUrl: {
      type: "string",
      label: "Audio URL",
      description: "URL of the audio file for which you want to generate the Trackers and Analytics Audio Summary UI.",
    },
    logo: {
      type: "string",
      label: "Logo",
      description: "URL of the custom logo to be used in the Trackers and Analytics Audio Summary UI.",
      optional: true,
    },
    favicon: {
      type: "string",
      label: "Favicon",
      description: "URL of the custom favicon to be used in the Trackers and Analytics Audio Summary UI.",
      optional: true,
    },
    background: {
      type: "string",
      label: "Background Color",
      description: "Background color to be used in the Trackers and Analytics Audio Summary UI. Hex Color Codes accepted.",
      optional: true,
    },
    topicsFilter: {
      type: "string",
      label: "Topics Filter Element Color",
      description: "Topics Filter Element color to be used in the Trackers and Analytics Audio Summary UI. Hex Color Codes accepted.",
      optional: true,
    },
    insightsFilter: {
      type: "string",
      label: "Insights Element Color",
      description: "Insights (Questions, Follow-ups, Action Items, etc) Filter Element color to be used in the Trackers and Analytics Audio Summary UI. Hex Color Codes accepted.",
      optional: true,
    },
    font: {
      type: "string",
      label: "Font",
      description: "The name of the font to be used in the Trackers and Analytics Audio Summary UI. All fonts available in the [Google Fonts](https://fonts.google.com/) are supported.",
      optional: true,
    },
    summaryURLExpiresIn: {
      type: "string",
      label: "Expiration Time of the Trackers and Analytics Audio Summary UI",
      description: "Number of seconds set for expiration time of the Trackers and Analytics Audio Summary UI. Zero (0) will set the Trackers and Analytics Audio Summary UI to never expire. Default value is set to `2592000` (30 days).",
      optional: true,
    },
    readOnly: {
      type: "boolean",
      label: "Read Only",
      description: "Disable the editing capabilities of the Trackers and Analytics Audio Summary UI. Default value is `false`.",
      optional: true,
    },
  },
  async run({ $ }) {
    const response =
      await this.symblAIApp.postSummaryUI({
        $,
        conversationId: this.conversationId,
        data: {
          audioUrl: this.audioUrl,
          name: "audio-summary",
          logo: this.logo,
          favicon: this.favicon,
          color: {
            background: this.background,
            topicsFilter: this.topicsFilter,
            insightsFilter: this.insightsFilter,
          },
          font: {
            family: this.font,
          },
          summaryURLExpiresIn: this.summaryURLExpiresIn,
          readOnly: this.readOnly,
        },
      });
    $.export("$summary", `Successfully generated Trackers and Analytics Audio Summary UI at: ${response.url}`);
    return response;
  },
};
