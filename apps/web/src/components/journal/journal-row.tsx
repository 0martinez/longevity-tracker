import { FileText } from "lucide-react"
import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { IndexEntry } from "@/hooks/use-journal-entries"
import { formatRelativeTime } from "@/lib/dates"

interface JournalRowProps {
  entry: IndexEntry
  onClick: () => void
}

export function JournalRow({ entry, onClick }: JournalRowProps) {
  return (
    <TableRow
      className="cursor-pointer hover:bg-muted/50"
      onClick={onClick}
    >
      <TableCell>
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{entry.date}</span>
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatRelativeTime(entry.updatedAt)}
      </TableCell>
      <TableCell>
        <Badge variant="secondary">Entry</Badge>
      </TableCell>
    </TableRow>
  )
}
