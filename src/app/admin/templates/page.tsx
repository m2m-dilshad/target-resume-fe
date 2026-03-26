import { fetchTemplates } from '@/actions/admin/templates.action';
import TemplateList from '../_components/TemplateList';
import Heading from '@/components/ui/Heading';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Templates({ searchParams }: PageProps) {
  const queryParams = await searchParams;

  const offset = queryParams.offset ? parseInt(queryParams.offset as string, 10) : 0;
  const limit = queryParams.limit ? parseInt(queryParams.limit as string, 10) : 10;

  const templatesResponse = await fetchTemplates({ offset, limit });

  return (
    <div className="p-4">
      <Heading variant="h5" className="text-primary mb-2">
        Manage Templates
      </Heading>
      <TemplateList data={templatesResponse.data || []} />
    </div>
  );
}
