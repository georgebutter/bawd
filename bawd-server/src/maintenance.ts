import { Client } from "@elastic/elasticsearch";
import { getField, notIds } from "./queries";
import { ing } from "./utils";

const {
  PORT = 3100,
  BONSAI_URL = "http://localhost:9200",
  HMAC_SECRET = "Open Sesame"
} = process.env;

const client = new Client({
  node: BONSAI_URL
});

const mapAggregation = ({ body, key }) => body.aggregations[key].buckets.map((agg) => agg.key);

const getActiveBoards = async () => {
  const query = {
    body: getField({
      field: "board._id.keyword",
      name: "ids"
    }),
    index: "posts",
  };

  const [err, res] = await ing(client.search(query));

  if (err) {
    throw err;
  }
  const { body } = res;
  return mapAggregation({ body, key: "ids" });
};

const removeInactiveBoards = async (ids) => {
  const query = {
    body: notIds(ids),
    index: "boards",
  };
  const [err, res] = await ing(client.deleteByQuery(query));
  if (err) {
    throw err;
  }
  return res;
};

export const maintenance = async () => {
  /**
   * Get a list of all board ids that are currently being used by posts.
   * Remove any boards that do not exist in that list of boards.
   */
  const activeBoards = await getActiveBoards();
  const removedBoards = await removeInactiveBoards(activeBoards);
};

maintenance();
