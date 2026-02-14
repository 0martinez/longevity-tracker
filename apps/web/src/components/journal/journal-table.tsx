import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { JournalRow } from "./journal-row"
import type { IndexEntry } from "@/hooks/use-journal-entries"

interface JournalTableProps {
  entries: IndexEntry[]
  loading: boolean
  onRowClick: (date: string) => void
}

export function JournalTable({ entries, loading, onRowClick }: JournalTableProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Journal Entries</h1>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <p className="text-lg">No entries yet</p>
          <p className="text-sm">Use the sidebar to create today&apos;s entry</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Name</TableHead>
              <TableHead className="w-[150px]">Updated</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <JournalRow
                key={entry.date}
                entry={entry}
                onClick={() => onRowClick(entry.date)}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
