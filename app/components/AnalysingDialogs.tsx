import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";

interface Props {
  open: boolean;
  onClose: () => void; // appears when the user hits the analyse button
}

export default function AnalysingDialogs({ open, onClose }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left text-lg">
            Analysing your resume
          </AlertDialogTitle>
          <p className="text-left text-sm leading-relaxed text-muted-foreground">
            Extracting text, checking ATS parsability and matching keywords.
            This takes a few seconds.
          </p>
        </AlertDialogHeader>
        <div className="flex justify-end pt-2">
          <Spinner className="size-6 text-primary" />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
