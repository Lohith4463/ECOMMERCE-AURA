export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 rounded-full border border-primary/30 border-t-primary animate-spin" />
        <p className="mt-5 font-display text-xl tracking-[0.25em]">AURA</p>
      </div>
    </div>
  );
}
