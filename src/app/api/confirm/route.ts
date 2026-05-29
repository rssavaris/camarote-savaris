import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const FILE_PATH = path.join(process.cwd(), "src", "lib", "confirmations.json");

interface Confirmation {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  acompanhantes: number;
  timestamp: string;
}

function readConfirmations(): Confirmation[] {
  try {
    const raw = readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeConfirmations(data: Confirmation[]): void {
  writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  const confirmations = readConfirmations();
  return NextResponse.json({ confirmations, total: confirmations.length });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, email, telefone, acompanhantes } = body;

    if (!nome?.trim() || !email?.trim() || !telefone?.trim()) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 });
    }

    const newConfirmation: Confirmation = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      nome: nome.trim(),
      email: email.trim(),
      telefone: telefone.trim(),
      acompanhantes: Math.max(0, Math.min(5, Number(acompanhantes) || 0)),
      timestamp: new Date().toISOString(),
    };

    const existing = readConfirmations();
    writeConfirmations([...existing, newConfirmation]);

    return NextResponse.json({ success: true, confirmation: newConfirmation }, { status: 201 });
  } catch (err) {
    console.error("POST /api/confirm error:", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
