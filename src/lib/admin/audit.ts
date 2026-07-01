import { serviceClient, supabaseConfigured } from '@/lib/supabase/service';

export type AuditAction = 'create' | 'update' | 'delete';
export type AuditEntityType = 'article' | 'athlete' | 'page' | 'role' | 'doc' | 'media';

export type AuditLogEntry = {
  id: string;
  actor_id: string | null;
  action: AuditAction;
  entity_type: AuditEntityType;
  entity_id: string;
  label: string | null;
  created_at: string;
};

// Fire-and-forget: a logging failure must never block or fail the save/delete
// it's recording, same principle as notifications elsewhere in this codebase.
export async function logAction(
  actorId: string,
  action: AuditAction,
  entityType: AuditEntityType,
  entityId: string,
  label?: string | null,
) {
  try {
    const db = serviceClient();
    await db.from('audit_log').insert({
      actor_id: actorId, action, entity_type: entityType, entity_id: entityId, label: label ?? null,
    });
  } catch {
    // best-effort only
  }
}

export async function listAuditLog(limit = 100) {
  if (!supabaseConfigured()) return { ok: false as const, error: 'Supabase not configured' };
  const db = serviceClient();
  const { data, error } = await db
    .from('audit_log')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const, entries: (data ?? []) as AuditLogEntry[] };
}
