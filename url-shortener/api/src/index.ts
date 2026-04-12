import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { nanoid } from 'nanoid';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

const app = express();

app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.json({ message: 'URL Shortener API running (Postgres)' });
});

app.post('/api/shorten', async (req: Request, res: Response) => {
  const { originalUrl } = req.body;
  if (!originalUrl || !originalUrl.startsWith('http')) {
    return res.status(400).json({ error: 'Valid URL required' });
  }
  try {
    const shortCode = nanoid(6);
    const link = await prisma.link.create({
      data: {
        shortCode,
        originalUrl,
        userId: null,
      },
    });
    res.json({ shortCode, shortUrl: `http://localhost:3001/${shortCode}` });
  } catch (e: any) {
    if (e.code === 'P2002') {
      res.status(409).json({ error: 'Short code collision, try again' });
    } else {
      res.status(500).json({ error: 'Failed to create short URL' });
    }
  }
});

app.get('/api/urls', async (req: Request, res: Response) => {
  try {
    const dbLinks = await prisma.link.findMany({
      where: {
        userId: null,
      },
      select: {
        shortCode: true,
        originalUrl: true,
        clicks: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const list = dbLinks.map((l: any) => ({
      shortCode: l.shortCode,
      originalUrl: l.originalUrl,
      clicks: l.clicks,
      createdAt: l.createdAt.toISOString(),
      shortUrl: `http://localhost:3001/${l.shortCode}`,
    }));
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch URLs' });
  }
});

app.delete('/api/urls/:shortCode', async (req: Request, res: Response) => {
  const shortCode = req.params.shortCode as string;
  try {
    await prisma.link.delete({
      where: { shortCode },
    });
    res.json({ success: true });
  } catch (e: any) {
    if (e.code === 'P2025') {
      res.status(404).json({ error: 'Not found' });
    } else {
      res.status(500).json({ error: 'Failed to delete' });
    }
  }
});

app.get('/:shortCode', async (req: Request, res: Response) => {
  const shortCode = req.params.shortCode as string;
  try {
    const link = await prisma.link.findUnique({
      where: { shortCode },
    });
    if (!link) {
      return res.status(404).json({ error: 'Short URL not found' });
    }
    await prisma.click.create({
      data: {
        linkId: link.id,
        ip: req.ip || null,
      },
    });
    await prisma.link.update({
      where: { id: link.id },
      data: { clicks: { increment: 1 } },
    });
    res.redirect(301, link.originalUrl);
  } catch (e) {
    res.status(500).json({ error: 'Redirect failed' });
  }
});

const PORT = Number(process.env.PORT) || 3001;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received, disconnecting Prisma');
  await prisma.$disconnect();
  server.close(() => {
    console.log('Server closed');
  });
});

export default app;