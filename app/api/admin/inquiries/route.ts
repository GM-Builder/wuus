import { jsonResponse, readJson, RequestError, validateStatusChange } from '@/lib/inquiry';
import { requireOwner, serviceClient } from '@/lib/inquiry-server';

export const runtime = 'nodejs';

function failure(error: unknown) {
  return error instanceof RequestError
    ? jsonResponse({ error: error.message }, error.status)
    : jsonResponse({ error: 'Inquiry service unavailable. Please retry.' }, 503);
}

export async function GET(request: Request) {
  try {
    await requireOwner(request);
    const { data, error } = await serviceClient().from('hospitality_inquiries')
      .select('id,hotel_name,website_url,contact_name,email,notes,status,created_at,source,request_type,consent_at,consent_version')
      .order('created_at', { ascending: false }).limit(500);
    if (error) throw new Error('Read failed.');
    return jsonResponse({ inquiries: data });
  } catch (error) { return failure(error); }
}

export async function PATCH(request: Request) {
  try {
    await requireOwner(request);
    const input = validateStatusChange(await readJson(request));
    const { data, error } = await serviceClient().from('hospitality_inquiries')
      .update({ status: input.status }).eq('id', input.id).select('id,status').maybeSingle();
    if (error) throw new Error('Update failed.');
    if (!data) return jsonResponse({ error: 'Inquiry not found.' }, 404);
    return jsonResponse({ inquiry: data });
  } catch (error) { return failure(error); }
}
