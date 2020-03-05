import { Client } from "@elastic/elasticsearch";
import * as express from "express";

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

// app.get('/:index.json', (req: Request, res: Response) => {
//   (async () => {
//     const [err, result] = await ing(elasticClient.search({
//       index: req.params.index
//     }))
//     if(err) throw new console.log('Error occurred fetching index');
//     res.send(result);
//   })()
// });

// app.get('/seed', (_req: Request, res: Response) => {
//   (async () => {
//     // Let's start by indexing some data
//     await elasticClient.index({
//       index: 'game-of-thrones',
//       body: {
//         character: 'Ned Stark',
//         quote: 'Winter is coming.'
//       }
//     })
//
//     await elasticClient.index({
//       index: 'game-of-thrones',
//       body: {
//         character: 'Daenerys Targaryen',
//         quote: 'I am the blood of the dragon.'
//       }
//     })
//
//     await elasticClient.index({
//       index: 'game-of-thrones',
//       body: {
//         character: 'Tyrion Lannister',
//         quote: 'A mind needs books like a sword needs a whetstone.'
//       }
//     })
//     res.send('seeded');
//   })()
// });

// Only run when being executed so that the server doesn't run during tests.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
}

// Export for tests
export default app;
