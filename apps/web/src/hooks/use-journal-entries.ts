import { useCallback, useEffect, useState } from "react"
import { apiFetch } from "@/lib/api"

export interface IndexEntry {
  date: string
  file: string
  updatedAt: string
}

interface IndexFile {
  entries: IndexEntry[]
}

export function useJournalEntries() {
  const [entries, setEntries] = useState<IndexEntry[]>([])
  const [loading, setLoading] = useState(true)

  const refetch = useCallback(() => {
    setLoading(true)
    apiFetch<IndexFile>("/journal")
      .then((data) => setEntries(data.entries ?? []))
      .catch(() => setEntries([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { entries, loading, refetch }
}
