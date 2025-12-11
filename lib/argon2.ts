import { hash, type Options, verify } from '@node-rs/argon2';

const opts: Options = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
}

export const hashPassword = async (password: string) => {
  return await hash(password, opts);
}

export const verifyPassword = async (data: { password: string, hash: string }) => {
  const { password, hash } = data;

  return await verify(hash, password, opts);
}