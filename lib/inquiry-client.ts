type Submission = {
  requestId: string; hotelName: string; websiteUrl: string; contactName: string;
  email: string; notes: string; requestType: 'review' | 'proposal';
  source: 'hospitality' | 'review'; consent: boolean; companyWebsite: string;
};

export function requestIdentity(payload: unknown, previous: { fingerprint: string; id: string } | null) {
  const fingerprint = JSON.stringify(payload);
  return previous?.fingerprint === fingerprint ? previous : { fingerprint, id: crypto.randomUUID() };
}

export async function submitInquiry(input: Submission): Promise<void> {
  try {
    const response = await fetch('/api/inquiries', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input), signal: AbortSignal.timeout(20_000),
    });
    const result = await response.json();
    if (!response.ok || result.received !== true) throw new Error(result.error || 'Your request could not be saved. Please try again.');
  } catch (error) {
    if (error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError' || error instanceof TypeError)) {
      throw new Error('We could not confirm receipt. Please retry using the same form, or email Faisal directly.');
    }
    throw error;
  }
}
