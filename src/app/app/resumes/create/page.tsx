import Heading from '@/components/ui/Heading';
import CreateResumeForm from '../../_components/CreateResumeForm';

export default function CreateTemplate() {
  return (
    <div className="p-4">
      <Heading variant="h5" className="text-primary mb-2">
        Create Resume
      </Heading>
      <CreateResumeForm />
    </div>
  );
}
