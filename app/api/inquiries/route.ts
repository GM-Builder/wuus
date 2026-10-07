import { createInquiryHandler } from '@/lib/inquiry';
import { allowedOrigin, inquiryConfigured, saveInquiry } from '@/lib/inquiry-server';

export const runtime = 'nodejs';
export const POST = createInquiryHandler({ ready: inquiryConfigured, originAllowed: allowedOrigin, save: saveInquiry });
