import { PagesManager } from '@/components/admin/PagesManager';
import { listAllPages } from './actions';

export default async function PagesAdminPage() {
  const res = await listAllPages();
  const rows = res.ok ? res.rows : [];
  return <PagesManager initial={rows} />;
}
