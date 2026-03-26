'use client';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MoreHorizontal, Plus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface TemplateListProps {
  data: { id: number; title: string; description?: string; previewImage?: string }[];
}

export default function TemplateList({ data }: TemplateListProps) {
  const router = useRouter();
  function onCreate() {
    router.push('/admin/templates/create');
  }
  function onEdit(id: number) {
    console.log('Edit template with id:', id);
  }
  function onDelete(id: number) {
    console.log('Delete template with id:', id);
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Create Template Card */}
      <Card
        className="flex cursor-pointer flex-col items-center justify-center p-6 shadow-sm transition hover:-translate-y-1"
        onClick={onCreate}
      >
        <Plus size={32} className="text-primary-light mb-3" />
        <CardTitle className="text-center">Create Template</CardTitle>
      </Card>

      {/* Existing Templates */}
      {data.map((template) => (
        <Card
          key={template.id}
          className="justify-between shadow-sm transition hover:-translate-y-1"
        >
          {/* Header with title and 3-dot menu */}
          <CardHeader className="flex items-center justify-between">
            <CardTitle>{template.title}</CardTitle>
            <div className="group relative">
              <MoreHorizontal size={20} className="cursor-pointer" />
              {/* Dropdown Menu */}
              <div className="absolute right-0 z-10 mt-2 w-32 rounded border bg-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                <Button
                  roundSize="xs"
                  theme="secondary"
                  className="block w-full border-none px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => onEdit(template.id)}
                >
                  Edit
                </Button>
                <Button
                  roundSize="xs"
                  theme="secondary"
                  className="block w-full border-none px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                  onClick={() => onDelete(template.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Preview / Description */}
          {template.previewImage ? (
            <Image
              src={template.previewImage}
              alt={template.title}
              className="mt-3 h-64 w-full rounded object-cover"
              width={400}
              height={256}
            />
          ) : (
            <CardContent className="mt-3 line-clamp-3 text-sm text-gray-500">
              {template.description || 'No preview available'}
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
