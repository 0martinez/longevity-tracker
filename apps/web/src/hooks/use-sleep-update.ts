import { useState } from "react"
import { apiFetch } from "@/lib/api"

interface SleepData {
  subjective?: number
  awakenings?: number
  notes?: string
}

export function useSleepUpdate() {
  const [submitting, setSubmitting] = useState(false)

  const update = async (date: string, data: SleepData) => {
    setSubmitting(true)
    try {
      await apiFetch(`/journal/${date}/sleep`, {
        method: "POST",
        body: JSON.stringify(data),
      })
    } finally {
      setSubmitting(false)
    }
  }

  return { update, submitting }
}
