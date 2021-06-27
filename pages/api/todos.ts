import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/client';

const prisma = new PrismaClient();

interface Data {
  title: string;
  body: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const session = await getSession({ req });

  if (!session) return res.status(401).end('Please log in to view');

  const userId = session.id as number;

  if (req.method === 'GET') {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: { userId },
    });
    return res.status(200).json(todos);
  }

  if (req.method === 'POST') {
    const { title, body } = JSON.parse(req.body) as Data;
    const createdTodo = await prisma.todo.create({
      data: { title, body, User: { connect: { id: userId } } },
    });
    res.status(201).json(createdTodo);
  }
};

export default handler;
