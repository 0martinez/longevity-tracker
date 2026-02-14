import {
  BookOpen,
  FileText,
  Plus,
  Settings,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import type { IndexEntry } from "@/hooks/use-journal-entries"
import { todayString, formatRelativeTime } from "@/lib/dates"

interface AppSidebarProps {
  entries: IndexEntry[]
  selectedDate: string | null
  onSelectDate: (date: string) => void
}

export function AppSidebar({ entries, selectedDate, onSelectDate }: AppSidebarProps) {
  const recentEntries = entries.slice(0, 10)

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <BookOpen className="h-5 w-5" />
          <span className="font-semibold text-sm">Longevity Tracker</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <BookOpen className="h-4 w-4" />
                  <span>Journal</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton disabled>
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Quick Add</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => onSelectDate(todayString())}>
                  <Plus className="h-4 w-4" />
                  <span>Today&apos;s Entry</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Recent Entries</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentEntries.map((entry) => (
                <SidebarMenuItem key={entry.date}>
                  <SidebarMenuButton
                    isActive={entry.date === selectedDate}
                    onClick={() => onSelectDate(entry.date)}
                  >
                    <FileText className="h-4 w-4" />
                    <span>{entry.date}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {formatRelativeTime(entry.updatedAt)}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {recentEntries.length === 0 && (
                <SidebarMenuItem>
                  <div className="px-2 py-1 text-xs text-muted-foreground">
                    No entries yet
                  </div>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center justify-between px-2">
          <span className="text-xs text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
