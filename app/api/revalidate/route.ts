// app/api/revalidate/route.ts
// Webhook handler para revalidación ISR desde Sanity Studio.
// Configurar en Sanity: Manage → API → Webhooks
// URL: https://creacionesvane.com/api/revalidate
// Header: x-sanity-webhook-secret = <SANITY_REVALIDATE_SECRET>
// Trigger on: Create, Update, Delete
// Filter: _type == "product" || _type == "category"

import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

const VALID_TYPES = ['product', 'category'] as const;
type ValidType = (typeof VALID_TYPES)[number];

export async function POST(request: NextRequest) {
  try {
    // 1. Verificar que el secret esté configurado
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      return NextResponse.json(
        { revalidated: false, message: 'Missing revalidation secret' },
        { status: 500 }
      );
    }

    // 2. Autenticar el request
    const headerSecret = request.headers.get('x-sanity-webhook-secret');
    if (headerSecret !== secret) {
      return NextResponse.json(
        { revalidated: false, message: 'Invalid secret' },
        { status: 401 }
      );
    }

    // 3. Parsear el body
    const body = await request.json();
    const _type = body?._type as string | undefined;

    if (!_type || !VALID_TYPES.includes(_type as ValidType)) {
      return NextResponse.json(
        {
          revalidated: false,
          message: `Invalid or missing _type. Expected one of: ${VALID_TYPES.join(', ')}. Received: "${_type}"`,
        },
        { status: 400 }
      );
    }

    // 4. Revalidar el tag correspondiente (expire: 0 = invalidación inmediata)
    revalidateTag(_type, 'default');

    return NextResponse.json({
      revalidated: true,
      type: _type,
      now: Date.now(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { revalidated: false, message },
      { status: 500 }
    );
  }
}
