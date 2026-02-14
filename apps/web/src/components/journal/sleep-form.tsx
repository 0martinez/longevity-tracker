import { useState } from "react"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSleepUpdate } from "@/hooks/use-sleep-update"

interface SleepFormProps {
  date: string
  onSaved: () => void
}

export function SleepForm({ date, onSaved }: SleepFormProps) {
  const [subjective, setSubjective] = useState("")
  const [awakenings, setAwakenings] = useState("")
  const [notes, setNotes] = useState("")
  const { update, submitting } = useSleepUpdate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data: { subjective?: number; awakenings?: number; notes?: string } = {}
    if (subjective) data.subjective = Number(subjective)
    if (awakenings) data.awakenings = Number(awakenings)
    if (notes.trim()) data.notes = notes.trim()

    if (Object.keys(data).length === 0) return

    try {
      await update(date, data)
      toast.success("Sleep data saved")
      setSubjective("")
      setAwakenings("")
      setNotes("")
      onSaved()
    } catch {
      toast.error("Failed to save sleep data")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Label>Sleep Data</Label>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="sleep-quality" className="text-xs text-muted-foreground">
            Quality (1-10)
          </Label>
          <Input
            id="sleep-quality"
            type="number"
            min={1}
            max={10}
            value={subjective}
            onChange={(e) => setSubjective(e.target.value)}
            placeholder="7"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="sleep-awakenings" className="text-xs text-muted-foreground">
            Awakenings
          </Label>
          <Input
            id="sleep-awakenings"
            type="number"
            min={0}
            value={awakenings}
            onChange={(e) => setAwakenings(e.target.value)}
            placeholder="0"
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor="sleep-notes" className="text-xs text-muted-foreground">
          Notes
        </Label>
        <Input
          id="sleep-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Woke up twice, restless"
        />
      </div>
      <Button type="submit" disabled={submitting} size="sm" variant="secondary">
        {submitting ? "Saving..." : "Save Sleep"}
      </Button>
    </form>
  )
}
