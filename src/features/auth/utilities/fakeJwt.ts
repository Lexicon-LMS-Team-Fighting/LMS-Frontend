//This is for mocking an access_token without backend, remove when backend and frontend works together
function b64url(input: string) {
  return btoa(input).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

type MakeTokenOpts = {
  email: string;
  roles: string[];
  ttlSeconds: number;
  sub?: string;
};

export function makeFakeJwt({ email, roles, ttlSeconds, sub = "demo-user-id" }: MakeTokenOpts) {
  const header = { alg: "none", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub,
    email,
    role: roles.length === 1 ? roles[0] : roles,
    exp: now + ttlSeconds,
    iat: now,
    iss: "fake-auth",
    aud: "lms-frontend",
  };

  const head = b64url(JSON.stringify(header));
  const body = b64url(JSON.stringify(payload));  
  const sig = ""; // 'none'

  return `${head}.${body}.${sig}`;
}

export function makeFakeTokens(email: string, roles: string[]) {
  return {
    accessToken: makeFakeJwt({ email, roles, ttlSeconds: 60 * 15 }),
    refreshToken: makeFakeJwt({ email, roles, ttlSeconds: 60 * 60 * 24 }),
  };
}
