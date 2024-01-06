import { Request } from "express";

export type EnhancedRequest = Request & { user?: any };
