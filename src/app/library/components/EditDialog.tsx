// components/EditDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Track } from "types/index";

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  track: Track | null;
  onSave: (track: Track) => void;
}

export default function EditDialog({ open, onClose, track, onSave }: EditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Track</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={track?.title}
            onChange={(e) =>
              track &&
              onSave({
                ...track,
                title: e.target.value,
              })
            }
            placeholder="Track title"
          />
          <Input
            value={track?.description}
            onChange={(e) =>
              track &&
              onSave({
                ...track,
                description: e.target.value,
              })
            }
            placeholder="Description"
          />
          <Input
            value={track?.category}
            onChange={(e) =>
              track &&
              onSave({
                ...track,
                category: e.target.value,
              })
            }
            placeholder="Category"
          />
          <Button onClick={onClose}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}