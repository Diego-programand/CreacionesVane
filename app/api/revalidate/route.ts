// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET
    if (!secret) {
      return NextResponse.json(
        { revalidated: false, message: 'Missing revalidation secret' },
        { status: 500 }
      )
    }

    const signature = request.headers.get(SIGNATURE_HEADER_NAME)
    if (!signature) {
      return NextResponse.json(
        { revalidated: false, message: 'Missing signature' },
        { status: 401 }
      )
    }

    const body = await request.text()
    const isValid = await isValidSignature(body, signature, secret)

    if (!isValid) {
      return NextResponse.json(
        { revalidated: false, message: 'Invalid signature' },
        { status: 401 }
      )
    }

    const parsed = JSON.parse(body)
    const _type = parsed?._type as string | undefined

    if (!_type || !['product', 'category'].includes(_type)) {
      return NextResponse.json(
        { revalidated: false, message: `Invalid _type: "${_type}"` },
        { status: 400 }
      )
    }

    revalidateTag(_type, 'default' as any)

    return NextResponse.json({
      revalidated: true,
      type: _type,
      now: Date.now(),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ revalidated: false, message }, { status: 500 })
  }
}
