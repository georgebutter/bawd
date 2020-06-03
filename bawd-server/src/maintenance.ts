import { Client } from "@elastic/elasticsearch";

const {
  PORT = 3100,
  BONSAI_URL = "http://localhost:9200",
  HMAC_SECRET = "Open Sesame"
} = process.env;

const elasticClient = new Client({
  node: BONSAI_URL
});

(async () => {
  console.log(BONSAI_URL);
})();
