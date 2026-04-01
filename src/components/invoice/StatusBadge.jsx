export default function StatusBadge({ status }) {
  const config = {
    draft:     { label: "Draft",     dot: "bg-slate-400",   classes: "bg-slate-500/15 text-slate-300 border-slate-400/25" },
    sent:      { label: "Sent",      dot: "bg-blue-400",    classes: "bg-blue-500/15 text-blue-300 border-blue-400/25" },
    paid:      { label: "Paid",      dot: "bg-emerald-400", classes: "bg-emerald-500/15 text-emerald-300 border-emerald-400/25" },
    overdue:   { label: "Overdue",   dot: "bg-red-400",     classes: "bg-red-500/15 text-red-300 border-red-400/25" },
    cancelled: { label: "Cancelled", dot: "bg-gray-500",    classes: "bg-gray-500/15 text-gray-400 border-gray-400/25" },
  };

  const { label, dot, classes } = config[status] || config.draft;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${classes}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />
      {label}
    </span>
  );
}
