import postgresql from "../postgresql.app.mjs";

export default {
  props: {
    postgresql,
    db: "$.service.db",
    timer: {
      type: "$.interface.timer",
      default: {
        intervalSeconds: 60 * 15,
      },
      label: "Polling Interval",
      description: "Pipedream will poll the API on this schedule",
    },
  },
  methods: {
    _getPreviousValues() {
      return this.db.get("previousValues");
    },
    _setPreviousValues(previousValues) {
      this.db.set("previousValues", previousValues);
    },
    _getLastResult() {
      return this.db.get("lastResult");
    },
    /**
     * Sets lastResult in db. Since results are ordered by the specified column,
     * we can assume the maximum result for that column is in the first row returned.
     * @param {object} rows - The rows returned to be emitted.
     * @param {string} column - Name of the table column to order by
     */
    _setLastResult(rows, column) {
      if (rows.length) this.db.set("lastResult", rows[0][column]);
    },
    async newRows(table, column) {
      const lastResult = this._getLastResult() || null;
      const rows = await this.postgresql.getRows(table, column, lastResult);
      for (const row of rows) {
        const meta = this.generateMeta(row, column);
        this.$emit(row, meta);
      }
      this._setLastResult(rows, column);
    },
    generateMeta(result) {
      return {
        id: result,
        summary: result,
        ts: Date.now(),
      };
    },
  },
};
