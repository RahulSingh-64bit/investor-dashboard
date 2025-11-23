import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { toast } from "sonner";

export default function CancelOrderDialog({ order, onClose, onConfirm }) {
  const handleConfirm = () => {
    onConfirm?.();
    toast.success("Order cancelled successfully");
    onClose();
  };

  return (
    <AlertDialog open={!!order} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <X className="w-10 h-10 text-red-600" />
          </div>
          <AlertDialogTitle className="text-xl text-center">
            Cancel subscription order?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-center">
            Are you sure you want to cancel this order?
            <br />
            <code className="block mt-3 text-xs bg-muted px-3 py-2 rounded font-mono">
              {order?.paymentReference || "f56-42a-da32-dcf12-af123-12123"}
            </code>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row gap-3 mt-6">
          <AlertDialogCancel className="flex-1">No, go back</AlertDialogCancel>
          <AlertDialogAction
            className="flex-1 bg-destructive hover:bg-destructive/90"
            onClick={handleConfirm}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
