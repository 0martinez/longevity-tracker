import { useEffect, useState, useCallback } from "react"
import { toast } from "sonner"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { JournalContent } from "./journal-content"
import { SleepForm } from "./sleep-form"
import { useJournalDay } from "@/hooks/use-journal-day"
import { useJournalSave } from "@/hooks/use-journal-save"

interface JournalSheetProps {
  selectedDate: string | null
  onClose: () => void
  onMutation: () => void
}

export function JournalSheet({ selectedDate, onClose, onMutation }: JournalSheetProps) {
  const { markdown, loading, refetch: refetchDay } = useJournalDay(selectedDate)
  const { save, saving } = useJournalSave()
  const [draft, setDraft] = useState("")
  const [dirty, setDirty] = useState(false)

  // Sync draft from fetched markdown
  useEffect(() => {
    if (markdown !== null) {
      setDraft(markdown)
      setDirty(false)
    }
  }, [markdown])

  const handleChange = useCallback((value: string) => {
    setDraft(value)
    setDirty(true)
  }, [])

  const handleSave = async () => {
    if (!selectedDate || !dirty) return
    try {
      await save(selectedDate, draft)
      setDirty(false)
      toast.success("Journal saved")
      onMutation()
    } catch {
      toast.error("Failed to save journal")
    }
  }

  const handleMutation = () => {
    refetchDay()
    onMutation()
  }

  // Keyboard shortcut: Cmd/Ctrl+S to save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault()
        if (selectedDate && dirty) {
          handleSave()
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  })

  return (
    <Sheet open={selectedDate !== null} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-[550px] sm:max-w-[550px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{selectedDate}</SheetTitle>
          <SheetDescription>Journal entry for {selectedDate}</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 px-6 py-6">
          <div className="space-y-3">
            <JournalContent markdown={draft} loading={loading} onChange={handleChange} />
            <div className="flex items-center gap-2">
              <Button
                onClick={handleSave}
                disabled={saving || !dirty}
                size="sm"
              >
                {saving ? "Saving..." : "Save"}
              </Button>
              {dirty && (
                <span className="text-xs text-muted-foreground">Unsaved changes</span>
              )}
            </div>
          </div>

          <SleepForm
            date={selectedDate!}
            onSaved={handleMutation}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
