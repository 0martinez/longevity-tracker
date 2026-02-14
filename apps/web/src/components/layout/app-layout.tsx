import { useState } from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "./app-sidebar"
import { JournalTable } from "@/components/journal/journal-table"
import { JournalSheet } from "@/components/journal/journal-sheet"
import { useJournalEntries } from "@/hooks/use-journal-entries"

export function AppLayout() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const { entries, loading, refetch: refetchEntries } = useJournalEntries()

  return (
    <SidebarProvider>
      <AppSidebar
        entries={entries}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <span className="text-sm font-medium">Journal</span>
        </header>
        <main className="flex-1 overflow-auto p-4">
          <JournalTable
            entries={entries}
            loading={loading}
            onRowClick={setSelectedDate}
          />
        </main>
      </SidebarInset>
      <JournalSheet
        selectedDate={selectedDate}
        onClose={() => setSelectedDate(null)}
        onMutation={refetchEntries}
      />
    </SidebarProvider>
  )
}
