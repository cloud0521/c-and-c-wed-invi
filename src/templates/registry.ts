import { elegantFloralTemplate } from './elegant-floral/template';
import type { WeddingTemplate } from './types';

const templates: Record<string, WeddingTemplate> = {
  [elegantFloralTemplate.id]: elegantFloralTemplate,
};

export const getWeddingTemplate = (templateId: string): WeddingTemplate =>
  templates[templateId] ?? elegantFloralTemplate;

export const availableTemplates = Object.values(templates);
