declare namespace Express {
  interface Request {
    authData: {
      userId: string;
      tenantId: string;
      email: string;
      name: string;
    };
  }
}
