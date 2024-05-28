import { HttpMethod } from "@/enums/HttpMethod";
import {
  CommentBody,
  addEventComment,
  getEventComments,
  removeEventComment,
} from "@/lib/events";
import { NextApiRequest, NextApiResponse } from "next";

// just for training API routes

type ResponseData = {
  message: string;
  comment?: CommentBody;
  comments?: CommentBody[];
};

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) {
  let { eventId } = request.query;

  if (!eventId || Array.isArray(eventId)) {
    response.status(422).json({ message: "Invalid event ID!" });
    return;
  }

  if (request.method === HttpMethod.GET) {
    return getEventComments(+eventId).then((comments) => {
      response
        .status(200)
        .json({ message: "Successfully fetched list of comments", comments });
    });
  }

  if (request.method === HttpMethod.DELETE) {
    return removeEventComment(+eventId).then(() =>
      response.status(201).json({ message: "Comment was deleted!" })
    );
  }

  const { email, text, name } = JSON.parse(request.body);
  if (
    !email ||
    !email.includes("@") ||
    !text ||
    text.trim() === "" ||
    !name ||
    name.trim() === ""
  ) {
    response.status(422).json({ message: "Invalid input!" });
    return;
  }

  if (request.method === HttpMethod.POST) {
    const newComment: CommentBody = {
      id: Date.now(),
      eventId: +eventId,
      email,
      text,
      name,
    };

    return addEventComment(newComment).then((comment) => {
      response.status(201).json({ message: "Comment was added!" });
    });
  }
}
