const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '573128235654';

export function waUrl(message?: string): string {
  const base = `https://wa.me/${WA_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export { WA_NUMBER };
