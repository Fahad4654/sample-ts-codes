// pages/api/hello.ts
import { NextApiRequest, NextApiResponse } from 'next';

interface Data {
  name: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  if (req.method === 'GET') {
    try {
      const name = req.query.name as string || 'John Doe';
      res.status(200).json({ name });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const body = JSON.parse(req.body);
      const name = body.name || 'Jane Doe';
      res.status(201).json({ name });

    } catch (error) {
      res.status(400).json({ error: 'Invalid JSON' });
    }
  }
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}