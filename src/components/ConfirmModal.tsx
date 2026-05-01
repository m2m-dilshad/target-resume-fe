import Button from './ui/Button';
import Heading from './ui/Heading';
import Typography from './ui/Typography';
type ConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  loading?: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  children?: React.ReactNode;
};

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  loading = false,
  title = 'Are you sure?',
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  children,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-100">
        <Heading variant="h2" className="text-lg font-semibold text-gray-800">
          {title}
        </Heading>

        {description && (
          <Typography variant="p" className="mt-2 text-sm text-gray-500">
            {description}
          </Typography>
        )}

        {children && <div className="mt-3">{children}</div>}

        <div className="mt-6 flex justify-end gap-2">
          <Button
            theme="ghost"
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
          >
            {cancelText}
          </Button>

          <Button
            theme="ghost"
            onClick={onConfirm}
            disabled={loading}
            className="bg-primary hover:bg-primary/90 rounded-lg px-3 py-1.5 text-sm text-white disabled:opacity-50"
          >
            {loading ? 'Processing...' : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
