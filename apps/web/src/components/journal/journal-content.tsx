import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"

interface JournalContentProps {
  markdown: string | null
  loading: boolean
  onChange: (value: string) => void
}

export function JournalContent({ markdown, loading, onChange }: JournalContentProps) {
  if (loading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    )
  }

  return (
    <Textarea
      value={markdown ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="min-h-[400px] font-mono text-sm resize-y"
      placeholder="Start writing..."
    />
  )
}
