import { NextResponse } from 'next/server';
import { CompanyFacade } from '@/packages/domain/core-settings';

export async function POST(req: Request) {
  const body = await req.json();

  const facade = new CompanyFacade();
  const result = await facade.createCompany({
    name: body.name,
    country: body.country,
    currency: body.currency
  });

  return NextResponse.json(result);
}
