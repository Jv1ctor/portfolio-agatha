import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // O usuário tem um package-lock.json em C:\Users\kaike\, então o Turbopack
  // ficaria confuso sobre qual é a raiz do projeto. Fixamos aqui.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
