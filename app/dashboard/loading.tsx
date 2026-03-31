export default function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
      <div className="h-72 rounded-xl bg-muted animate-pulse" />
      <div className="h-96 rounded-xl bg-muted animate-pulse" />
    </div>
  );
}
