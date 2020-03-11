import { Client } from "@elastic/elasticsearch";
import * as express from "express";
import * as mappings from "./mappings";

const {
  PORT = 3100,
  BONSAI_URL = "http://localhost:9200"
} = process.env;

const elasticClient = new Client({
  node: BONSAI_URL
});

const app = express();
app.use(express.json());

const ing = (promise: any) => {
  return promise.then((data: any) => {
    return [null, data];
  })
  .catch((err: any) => [err]);
};

app.post("/posts.json", (req: express.Request, res: express.Response) => {
  const { title, post } = req.body;

  (async () => {
    const [err, result] = await ing(elasticClient.index({
      body: {
        post,
        title,
      },
      index: "posts",
    }));
    if (err) {
      return res.json({
        error: err,
        status: "error",
      });
    }
    return res.json({
      result,
      status: "success",
    });
  })();
});

app.post("/boards.json", (req: express.Request, res: express.Response) => {
  const { name } = req.body;

  (async () => {
    const [err, result] = await ing(elasticClient.index({
      body: {
        name
      },
      index: "boards",
    }));
    if (err) {
      return res.json({
        error: err,
        status: "error",
      });
    }
    return res.json({
      result,
      status: "success",
    });
  })();
});

app.get("/boards.json", (req: express.Request, res: express.Response) => {
  (async () => {
    const [err, result] = await ing(elasticClient.search({
      index: "boards",
    }));
    if (err) {
      return res.json({
        error: err,
        status: "error",
      });
    }
    res.json(result);
  })();
});

// Only run when being executed so that the server doesn't run during tests.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
    (async () => {
      const [boardsErr] = await ing(elasticClient.indices.get({
        index: "boards"
      }));
      if (boardsErr) {
        const [error] = await ing(elasticClient.indices.create({
          body: {
            mappings: {
              properties: mappings.boards
            }
          },
          index: "boards",
        }));
        if (error) {
          console.error("Could not create boards index");
          console.log(error.body.error);
        }
      }
      const [postsErr] = await ing(elasticClient.indices.get({
        index: "posts"
      }));
      if (postsErr) {
        const [error] = await ing(elasticClient.indices.create({
          body: {
            mappings: {
              properties: mappings.posts
            }
          },
          index: "posts",
        }));
        if (error) {
          console.error("Could not create posts index");
          console.log(error.body.error);
        }
      }
    })();
  });
}

// Export for tests
export default app;
