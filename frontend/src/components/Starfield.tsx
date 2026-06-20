export default function Starfield() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.35] dark:opacity-[0.45]">
        <div className="stars" />
      </div>
    </div>
  );
}
