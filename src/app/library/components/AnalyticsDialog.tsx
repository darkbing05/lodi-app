// components/AnalyticsDialog.tsx

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Track } from "types/index";

interface AnalyticsDialogProps {
  open: boolean;
  onClose: () => void;
  track: Track | null;
}

export default function AnalyticsDialog({ open, onClose, track }: AnalyticsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Track Analytics</DialogTitle>
          <DialogDescription>
            {track?.title}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="text-2xl font-bold">{track?.plays}</div>
              <div className="text-sm text-gray-600">Total Plays</div>
            </div>
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="text-2xl font-bold">{track?.downloads}</div>
              <div className="text-sm text-gray-600">Downloads</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}