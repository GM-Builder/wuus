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
    const rawPage = new URL(request.url).searchParams.get('page') ?? '0';
    if (!/^\d{1,5}$/.test(rawPage)) throw new RequestError('Invalid page.');
    const page = Number(rawPage);
    const { data, error } = await serviceClient().from('hospitality_inquiries')
      .select('id,request_id,hotel_name,website_url,contact_name,email,notes,status,created_at,source,request_type,consent_at,consent_version')
      .order('created_at', { ascending: false }).order('id', { ascending: false }).range(page * 100, page * 100 + 100);
    if (error) throw new Error('Read failed.');
    return jsonResponse({ inquiries: (data ?? []).slice(0,100), page, hasMore: (data?.length ?? 0) > 100 });
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
