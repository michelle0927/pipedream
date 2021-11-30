import docusign from "../../docusign.app.mjs";
import common from "./common.mjs";

export default {
  ...common,
  key: "docusign-envelope-sent-or-complete",
  version: "0.0.3",
  props: {
    docusign,
    account: {
      propDefinition: [
        docusign,
        "account",
      ],
    },
    ...common.props,
  }
};
