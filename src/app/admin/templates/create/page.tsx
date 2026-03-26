import Heading from '@/components/ui/Heading';
import CreateTemplateForm from '../../_components/CreateTemplateForm';

export default function CreateTemplate() {
  return (
    <div className="p-4">
      <Heading variant="h5" className="text-primary mb-2">
        Create Template
      </Heading>
      <CreateTemplateForm />
    </div>
  );
}
