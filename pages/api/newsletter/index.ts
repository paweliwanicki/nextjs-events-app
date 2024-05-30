import { HttpMethod } from '@/enums/HttpMethod';
import { joinNewsletter, leaveNewsletter } from '@/lib/newsletter';
import { NextApiRequest, NextApiResponse } from 'next';

// just for training API routes

type ResponseData = {
  message: string;
};

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) {
  const { email } = request.body;

  if (!email || !email.includes('@')) {
    response.status(422).json({ message: 'Invalid email address!' });
    return;
  }

  if (request.method === HttpMethod.POST) {
    joinNewsletter(email)
      .then((res) =>
        response
          .status(201)
          .json({ message: 'Successfuly joined to newsletter!' })
      )
      .catch((error) => {
        response.status(500).json({ message: 'Error joining to newsletter!' });
        throw error;
      });
  }

  if (request.method === HttpMethod.DELETE) {
    leaveNewsletter(email).then((res) =>
      response.status(200).json({ message: 'Successfuly left newsletter!' })
    );
  }
}
