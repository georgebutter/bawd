import { Client } from "@elastic/elasticsearch";
import * as express from "express";
import { unfurl } from "unfurl.js";
import { handleize, validateBoardName } from "../../bawd-shared";
import { checkAndCreateIndex, createTripcode, ing, } from "./utils";
import { maintenance } from "./maintenance";

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

(async () => {
  console.log("refreshing indices");
  await elasticClient.indices.refresh({ index: "posts" });
  await elasticClient.indices.refresh({ index: "boards" });
  await elasticClient.indices.refresh({ index: "comments" });
  console.log("performing maintenance");
  await maintenance();
})();

app.post("/posts", (req: express.Request, res: express.Response) => {
  const { title, post, board, parent, password, link } = req.body;
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
    const upvotes = [tripcode];
    const downvotes = [];
    const score = 1;
    const [err, result] = await ing(elasticClient.index({
      body: {
        board,
        createdAt: new Date().toString(),
        downvotes,
        handle,
        id: Math.random().toString(16).substr(2),
        link,
        parent,
        post,
        score,
        title,
        tripcode,
        upvotes,
      },
      index: "posts",
    }));
    if (err) {
      res.status(400);
      return res.json({
        error: err?.meta?.body?.error?.reason ? err.meta.body.error.reason : err,
        status: "error",
      });
    }
    return res.json({
      result,
      status: "success",
    });
  })();
});

app.post("/comments", (req: express.Request, res: express.Response) => {
  const { comment, parent, password, link } = req.body;
  const ip = req.headers["x-forwarded-for"] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress;
  if (!comment || comment === "") {
    return res.json({
      error: {
        chooseTitle: "Comment cannot be blank"
      },
      status: "error",
    });
  }
  (async () => {
    const tripcode = createTripcode(HMAC_SECRET, password);
    const [err, result] = await ing(elasticClient.index({
      body: {
        comment,
        id: Math.random().toString(16).substr(2),
        ip,
        link,
        parent,
        tripcode,
      },
      index: "comments",
    }));
    if (err) {
      res.status(400);
      return res.json({
        error: err?.meta?.body?.error?.reason ? err.meta.body.error.reason : err,
        status: "error",
      });
    }
    await elasticClient.indices.refresh({ index: "boards" });
    return res.json({
      result,
      status: "success",
    });
  })();
});

app.post("/:index/search", (req: express.Request, res: express.Response) => {
  (async () => {
    const { index } = req.params;
    const { body } = req;
    const [err, result] = await ing(elasticClient.search({
      body,
      index,
    }));
    if (err) {
      res.status(400);
      return res.json({
        error: err?.meta?.body?.error?.reason ? err.meta.body.error.reason : err,
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

app.post("/boards", (req: express.Request, res: express.Response) => {
  const { name, category } = req.body;
  if (!name || name === "") {
    return res.json({
      error: {
        name: "Name cannot be blank"
      },
      status: "error",
    });
  }
  if (!validateBoardName(name)) {
    return res.json({
      error: {
        name: "Name must only contain alphanumeric values or spaces"
      },
      status: "error",
    });
  }
  const handle = handleize(name);
  (async () => {
    const body = {
      category,
      handle,
      name,
    };
    const [err, result] = await ing(elasticClient.index({
      body,
      index: "boards",
    }));
    if (err) {
      res.status(400);
      return res.json({
        error: err?.meta?.body?.error?.reason ? err.meta.body.error.reason : err,
        status: "error",
      });
    }
    await elasticClient.indices.refresh({ index: "boards" });
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
      res.status(400);
      return res.json({
        error: err?.meta?.body?.error?.reason ? err.meta.body.error.reason : err,
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
      res.status(400);
      return res.json({
        error: err?.meta?.body?.error?.reason ? err.meta.body.error.reason : err,
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
      res.status(400);
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
      res.status(400);
      return res.json({
        error: err?.meta?.body?.error?.reason ? err.meta.body.error.reason : err,
        status: "error",
      });
    }
    res.json({
      result,
      status: "success",
    });
  })();
});

app.post("/posts/:id/upvote", (req: express.Request, res: express.Response) => {
  (async () => {
    const [err, docs] = await ing(elasticClient.search({
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
      res.status(400);
      return res.json({
        error: err.meta.body.error.reason,
        status: "error",
      });
    }
    const post = docs.body.hits.hits[0];
    const { password } = req.body;
    const tripcode = createTripcode(HMAC_SECRET, password);
    const upvotes = post._source.upvotes || [];
    const downvotes = post._source.downvotes || [];
    const postScore = post._source.score || 0;
    const isUpvoted = upvotes.includes(tripcode);
    const isDownvoted = downvotes.includes(tripcode);
    let score = postScore;
    if (isUpvoted) {
      upvotes.splice(upvotes.indexOf(tripcode), 1);
      score -= 1;
    } else if (isDownvoted) {
      downvotes.splice(downvotes.indexOf(tripcode), 1);
      upvotes.push(tripcode);
      score += 2;
    } else {
      score += 1;
      upvotes.push(tripcode);
    }
    const [error, result] = await ing(elasticClient.update({
      body: {
        doc: {
          downvotes,
          score,
          upvotes,
        }
      },
      id: post._id,
      index: "posts",
      refresh: "true",
    }));
    if (error) {
      res.status(400);
      return res.json({
        error: err.meta.body.error.reason,
        status: "error",
      });
    }
    res.json({
      result,
      status: "success",
    });
  })();
});

app.post("/posts/:id/downvote", (req: express.Request, res: express.Response) => {
  (async () => {
    const [err, docs] = await ing(elasticClient.search({
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
      res.status(400);
      return res.json({
        error: err.meta.body.error.reason,
        status: "error",
      });
    }
    const post = docs.body.hits.hits[0];
    const { password } = req.body;
    const tripcode = createTripcode(HMAC_SECRET, password);
    const upvotes = post._source.upvotes || [];
    const downvotes = post._source.downvotes || [];
    const postScore = post._source.score || 0;
    const isUpvoted = upvotes.includes(tripcode);
    const isDownvoted = downvotes.includes(tripcode);
    let score = postScore;
    if (isDownvoted) {
      downvotes.splice(downvotes.indexOf(tripcode), 1);
      score += 1;
    } else if (isUpvoted) {
      upvotes.splice(upvotes.indexOf(tripcode), 1);
      downvotes.push(tripcode);
      score -= 2;
    } else {
      score -= 1;
      downvotes.push(tripcode);
    }
    const [error, result] = await ing(elasticClient.update({
      body: {
        doc: {
          downvotes,
          score,
          upvotes,
        }
      },
      id: post._id,
      index: "posts",
      refresh: "true",
    }));
    if (error) {
      res.status(400);
      return res.json({
        error: err.meta.body.error.reason,
        status: "error",
      });
    }
    res.json({
      result,
      status: "success",
    });
  })();
});

app.post("/preview", ({ body }: express.Request, res: express.Response) => {
  console.log("preview");

  (async () => {
    console.log(body.link);
    const preview = await unfurl(body.link);
    console.log(preview);
    res.status(200).json(preview);
  })();
});

// Only run when being executed so that the server doesn't run during tests.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
    (async () => {
      /**
       * Create any missing indices
       */
      checkAndCreateIndex("boards", elasticClient);
      checkAndCreateIndex("posts", elasticClient);
      checkAndCreateIndex("comments", elasticClient);
    })();
  });
}

// Export for tests
export default app;
