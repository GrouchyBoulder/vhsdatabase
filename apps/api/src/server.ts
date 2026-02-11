import Fastify from 'fastify';
import rateLimit from '@fastify/rate-limit';
import { contributionSchema } from '@vhs/shared/src/schemas';

const server = Fastify({ logger: true });

await server.register(rateLimit, {
  max: 20,
  timeWindow: '1 minute'
});

server.get('/health', async () => ({ status: 'ok', service: 'vhs-api' }));

server.post('/contributions', async (request, reply) => {
  const parsed = contributionSchema.safeParse(request.body);
  if (!parsed.success) {
    return reply.status(400).send({ error: parsed.error.flatten() });
  }

  return reply.status(202).send({ status: 'queued', data: parsed.data });
});

const port = Number(process.env.API_PORT ?? 4000);
server.listen({ port, host: '0.0.0.0' }).catch((error) => {
  server.log.error(error);
  process.exit(1);
});
