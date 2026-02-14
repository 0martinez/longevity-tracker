import { useCallback, useEffect, useState } from "react"
import { apiFetch } from "@/lib/api"

interface DayResponse {
  date: string
  markdown: string
}

export function useJournalDay(date: string | null) {
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const refetch = useCallback(() => {
    if (!date) {
      setMarkdown(null)
      return
    }
    setLoading(true)
    apiFetch<DayResponse>(`/journal/${date}`)
      .then((data) => setMarkdown(data.markdown))
      .catch(() => setMarkdown(null))
      .finally(() => setLoading(false))
  }, [date])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { markdown, loading, refetch }
}
