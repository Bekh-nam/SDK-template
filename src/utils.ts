import { sha256 } from "js-sha256";

export const getOptionHashValue = (options: string[]) => {
  let hashOptionsValue = "";
  let i = 0;
  while (i < options.length) {
    const hash = sha256.create();
    hash.update(options[i]);
    hashOptionsValue += +hash.array().pop()!;
    i += 1;
  }
  return hashOptionsValue;
};
