const messageAuth = async (req, res, next) => {
  const { messageId: id } = req.params;
  const { id: userId } = req.user;
  try {
    const message = await req
      .db("messages")
      .select("*")
      .where({ id, userId })
      .first();
    if (message) {
      req.message = message;
      return next();
    }
    return res.status(403).send("Not authorized to delete or update message");
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = messageAuth;
