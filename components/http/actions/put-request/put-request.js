const axios = require('axios')
const http = require('../../http.app.js')

module.exports = {  
  key: "http-put-request",
  name: "PUT Request",
  description: "Make an HTTP `POST` request to any URL. Optionally configure query string parameters, headers and basic auth.",
  type: "action",
  version: "0.0.11",
  props: {
    http,
    url: { propDefinition: [http, "url"] },
    body: { propDefinition: [http, "body"] },
    params: { propDefinition: [http, "params"] },
    headers: { propDefinition: [http, "headers"] },
    auth: { propDefinition: [http, "auth"] },
  },
  methods: {},
  async run() {
    const config = {
      url: this.url,
      method: "PUT",
      data: this.body,
      params: this.query,
      headers: this.headers,
    }
    if (this.auth) config.auth = this.http.parseAuth(this.auth)
    return (await axios(config)).data
  },
}