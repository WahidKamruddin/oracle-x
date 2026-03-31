import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div
      className="flex h-svh overflow-hidden"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      {/* Sidebar */}
      <aside className="hidden md:flex h-full w-(--sidebar-width) shrink-0 flex-col gap-2 border-r bg-sidebar p-3">
        {/* Logo */}
        <div className="flex h-10 items-center px-2">
          <Skeleton className="h-5 w-24" />
        </div>
        {/* Quick create + inbox */}
        <div className="flex items-center gap-2 px-1">
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="size-8 shrink-0" />
        </div>
        {/* Nav items */}
        <div className="flex flex-col gap-1 px-1 pt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-2 py-2">
              <Skeleton className="size-4 shrink-0 rounded-sm" />
              <Skeleton className="h-4 w-28" />
            </div>
          ))}
        </div>
        {/* Documents */}
        <div className="mt-4 flex flex-col gap-1 px-1">
          <Skeleton className="mx-2 mb-1 h-3 w-20" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-2 py-2">
              <Skeleton className="size-4 shrink-0 rounded-sm" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
        {/* User footer */}
        <div className="mt-auto flex items-center gap-3 px-2 py-2">
          <Skeleton className="size-8 rounded-full" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b px-4 lg:px-6">
          <Skeleton className="size-6" />
          <div className="mx-2 h-4 w-px bg-border" />
          <Skeleton className="h-4 w-24" />
          <div className="ml-auto">
            <Skeleton className="h-7 w-16" />
          </div>
        </header>

        {/* Content */}
        <div className="@container/main flex flex-1 flex-col gap-2 overflow-auto">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

            {/* Section cards */}
            <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-5">
              <div className="col-span-2 rounded-xl border bg-linear-to-t from-primary/5 to-card p-5 shadow-xs">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="mt-3 h-8 w-40" />
                <div className="mt-4 flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-44" />
                  <Skeleton className="h-3.5 w-32" />
                </div>
              </div>
              <div className="col-span-2 rounded-xl border bg-linear-to-t from-primary/5 to-card p-5 shadow-xs">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="mt-3 h-8 w-36" />
                <div className="mt-4 flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3.5 w-36" />
                </div>
              </div>
              <div className="col-span-1 rounded-xl border bg-linear-to-t from-primary/5 to-card p-5 shadow-xs">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="mt-3 h-8 w-16" />
                <div className="mt-4 flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-3.5 w-28" />
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="px-4 lg:px-6">
              <div className="rounded-xl border p-5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-4 w-44" />
                  </div>
                  <Skeleton className="h-8 w-40" />
                </div>
                <Skeleton className="mt-6 h-[250px] w-full rounded-lg" />
              </div>
            </div>

            {/* Coins table */}
            <div className="px-4 lg:px-6">
              <div className="rounded-lg border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="w-10 px-4 py-3" />
                      <th className="w-8 px-2 py-3">
                        <Skeleton className="mx-auto h-3.5 w-3" />
                      </th>
                      <th className="px-4 py-3 text-left">
                        <Skeleton className="h-3.5 w-8" />
                      </th>
                      <th className="px-4 py-3 text-right">
                        <Skeleton className="ml-auto h-3.5 w-10" />
                      </th>
                      <th className="px-4 py-3 text-right">
                        <Skeleton className="ml-auto h-3.5 w-10" />
                      </th>
                      <th className="hidden px-4 py-3 md:table-cell">
                        <Skeleton className="ml-auto h-3.5 w-16" />
                      </th>
                      <th className="hidden px-4 py-3 lg:table-cell">
                        <Skeleton className="ml-auto h-3.5 w-16" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <tr key={i} className="border-b">
                        <td className="px-4 py-3">
                          <Skeleton className="size-7" />
                        </td>
                        <td className="px-2 py-3">
                          <Skeleton className="mx-auto h-4 w-5" />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Skeleton className="size-7 rounded-full" />
                            <div className="flex flex-col gap-1.5">
                              <Skeleton className="h-4 w-24" />
                              <Skeleton className="h-3 w-10" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Skeleton className="ml-auto h-4 w-20" />
                        </td>
                        <td className="px-4 py-3">
                          <Skeleton className="ml-auto h-4 w-14" />
                        </td>
                        <td className="hidden px-4 py-3 md:table-cell">
                          <Skeleton className="ml-auto h-4 w-24" />
                        </td>
                        <td className="hidden px-4 py-3 lg:table-cell">
                          <Skeleton className="ml-auto h-4 w-24" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
