import { Client } from "@elastic/elasticsearch";
import * as express from "express";
import { handleize } from "../../bawd-shared";
import * as mappings from "./mappings";
import { createTripcode } from "./utils";

const {
  PORT = 3100,
  BONSAI_URL = "http://localhost:9200",
  HMAC_SECRET = "Open Sesame"
} = process.env;

const elasticClient = new Client({
  node: BONSAI_URL
});

const app = express();
app.use(express.json());
app.set("trust proxy", true);

const ing = (promise: any) => {
  return promise.then((data: any) => {
    return [null, data];
  })
  .catch((err: any) => [err]);
};

(async () => {
  await elasticClient.indices.refresh({ index: "posts" });
  await elasticClient.indices.refresh({ index: "boards" });
  console.log("refreshing indices");
})();

app.post("/posts", (req: express.Request, res: express.Response) => {
  const { title, post, board, password } = req.body;
  const ip = req.headers["x-forwarded-for"] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress;
  const handle = handleize(title);
  if (!title || title === "") {
    return res.json({
      error: {
        chooseTitle: "Title cannot be blank"
      },
      status: "error",
    });
  }
  if (!post || post === "") {
    return res.json({
      error: {
        chooseTitle: "Post cannot be blank"
      },
      status: "error",
    });
  }
  (async () => {
    const tripcode = createTripcode(HMAC_SECRET, password);

    const [err, result] = await ing(elasticClient.index({
      body: {
        board,
        handle,
        id: Math.random().toString(16).substr(2),
        ip,
        post,
        title,
        tripcode,
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

app.post("/boards/search", (req: express.Request, res: express.Response) => {
  (async () => {
    const [err, result] = await ing(elasticClient.search({
      body: req.body,
      index: "boards",
    }));
    if (err) {
      return res.json({
        error: err,
        status: "error",
      });
    }
    return res.json({
      body: req.body,
      result,
      status: "success",
    });
  })();
});

app.post("/boards", (req: express.Request, res: express.Response) => {
  const { name } = req.body;
  if (!name || name === "") {
    return res.json({
      error: {
        chooseTitle: "Name cannot be blank"
      },
      status: "error",
    });
  }
  const handle = handleize(name);
  (async () => {
    const body = {
      handle,
      name,
    };
    const [err, result] = await ing(elasticClient.index({
      body,
      index: "boards",
    }));
    if (err) {
      return res.json({
        error: err,
        status: "error",
      });
    }
    return res.json({
      body,
      result,
      status: "success",
    });
  })();
});

app.get("/boards", (req: express.Request, res: express.Response) => {
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
    res.json({
      result,
      status: "success",
    });
  })();
});

app.get("/boards/:handle", (req: express.Request, res: express.Response) => {
  (async () => {
    const [err, result] = await ing(elasticClient.search({
      body: {
        _source: {
          exclude: ["ip"]
        },
        query: {
          match: {
            handle: req.params.handle
          }
        },
      },
      index: "boards",
    }));
    if (err) {
      return res.json({
        error: err,
        status: "error",
      });
    }
    res.json({
      result,
      status: "success",
    });
  })();
});

app.get("/posts/:id", (req: express.Request, res: express.Response) => {
  (async () => {
    const [err, result] = await ing(elasticClient.search({
      body: {
        query: {
          match: {
            id: req.params.id
          }
        }
      },
      index: "posts",
    }));
    if (err) {
      return res.json({
        error: err,
        status: "error",
      });
    }
    res.json({
      result,
      status: "success",
    });
  })();
});

app.get("/posts", (req: express.Request, res: express.Response) => {
  (async () => {
    const [err, result] = await ing(elasticClient.search({
      index: "posts",
    }));
    if (err) {
      return res.json({
        error: err,
        status: "error",
      });
    }
    res.json({
      result,
      status: "success",
    });
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
