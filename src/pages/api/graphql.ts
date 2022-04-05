import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import schema from '../../../graphql/schema';
import { createContext } from '../../../graphql/context';

const cors = Cors();

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
});

const startServer = apolloServer.start();

// eslint-disable-next-line consistent-return
export default cors(async (req: any, res: any) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
