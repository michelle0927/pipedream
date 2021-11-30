export default {
  name: "Envelope Sent or Complete",
  description:
    "Emit new event when an envelope status is set to sent or complete",
  dedupe: "unique",
  type: "source",
  props: {
    db: "$.service.db",
    // eslint-disable-next-line pipedream/props-label,pipedream/props-description
    timer: {
      type: "$.interface.timer",
      default: {
        intervalSeconds: 60 * 15,
      },
    },
    status: {
      type: "string[]",
      label: "Status",
      description: "The envelope status that you are checking for",
      options: [
        "sent",
        "completed",
      ],
      default: [
        "sent",
      ],
    },
  },
  methods: {
    _getLastEvent() {
      return this.db.get("lastEvent");
    },
    _setLastEvent(lastEvent) {
      this.db.set("lastEvent", lastEvent);
    },
    monthAgo() {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return monthAgo;
    },
    generateMeta({
      envelopeId: id, emailSubject: summary, status,
    }, ts) {
      return {
        id: `${id}${status}`,
        summary,
        ts,
      };
    },
  },
  async run(event) {
    const { timestamp: ts } = event;
    const lastEvent = this._getLastEvent() || this.monthAgo().toISOString();
    const baseUri = await this.docusign.getBaseUri({ accountId: this.account });
    let done = false;
    const params = {
      from_date: lastEvent,
      status: this.status.join(),
    };
    do {
      const {
        envelopes = [],
        nextUri,
        endPosition,
      } = await this.docusign.listEnvelopes(baseUri, params);
      if (nextUri) params.start_position += endPosition + 1;
      else done = true;

      for (const envelope of envelopes) {
        const meta = this.generateMeta(envelope, ts);
        this.$emit(envelope, meta);
      }
    } while (!done);
    this._setLastEvent(new Date(ts * 1000).toISOString());
  },
}