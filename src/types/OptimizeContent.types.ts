// src\types\OptimizeContent.types.ts

// GET /api/optimize-content response
export interface OptimizeContentVariant {
  title: string;
  subtitle: string;
  ctaText: string;
}

export interface OptimizeContentResponse {
  variant: OptimizeContentVariant;
  change: boolean;
}
