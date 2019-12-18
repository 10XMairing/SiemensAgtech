import * as bcrypt from "bcrypt";

export async function comparePassword(
  passwod: string,
  hash: string
): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(passwod, hash);

    return isMatch;
    
  } catch (err) {
    throw err;
  }
}
