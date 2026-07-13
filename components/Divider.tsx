interface DividerProps {
  compact?: boolean;
}

export default function Divider({ compact = false }: DividerProps) {
  return (
    <div className={compact ? "invitation-divider invitation-divider-compact" : "invitation-divider"} aria-hidden="true">
      <span />
      <i>✦</i>
      <span />
    </div>
  );
}
