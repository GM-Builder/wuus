import { after } from 'next/server';
import { createInquiryHandler } from '@/lib/inquiry';
import { allowedOrigin, inquiryConfigured, saveInquiry } from '@/lib/inquiry-server';
import { dispatchNotifications } from '@/lib/notification-server';

export const runtime = 'nodejs';
export const maxDuration = 30;
const receive = createInquiryHandler({ ready: inquiryConfigured, originAllowed: allowedOrigin, save: saveInquiry });
export async function POST(request: Request) {
  const response = await receive(request);
  if (response.ok) {
    const { requestId } = await response.clone().json();
    after(async () => {
      try { await dispatchNotifications(requestId); }
      catch { console.error('WUUS notification pending. Check the owner dashboard.'); }
    });
  }
  return response;
}
