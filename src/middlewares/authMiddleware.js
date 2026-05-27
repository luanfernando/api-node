export async function authMiddleware(request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.status(401).send({
      message: "Token inválido ou não fornecido.",
    });
  }
}
