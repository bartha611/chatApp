import knex from "knex";
import knexfile from "../../knexfile";

const db = knex(knexfile);

export const getMessages = async (channelId) => {
  const messages = await db("messages AS m")
    .join("users AS u", "u.id", "=", "m.userId")
    .select("m.id", "message", "m.created_at", "username")
    .where({ channelId });
  return messages;
};
