import { useCallback, useState } from "react"
import { apiFetch } from "@/lib/api"

export function useJournalSave() {
  const [saving, setSaving] = useState(false)

  const save = useCallback(async (date: string, markdown: string) => {
    setSaving(true)
    try {
      await apiFetch(`/journal/${date}`, {
        method: "PUT",
        body: JSON.stringify({ markdown }),
      })
    } finally {
      setSaving(false)
    }
  }, [])

  return { save, saving }
}
