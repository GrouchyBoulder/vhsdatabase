export default function AddReleasePage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl">Add VHS Release</h1>
      <form className="card-glow grid gap-3 p-6 md:grid-cols-2">
        <input className="rounded bg-zinc-900 px-3 py-2" placeholder="Movie ID (TMDb)" required />
        <input className="rounded bg-zinc-900 px-3 py-2" placeholder="Distributor" required />
        <input className="rounded bg-zinc-900 px-3 py-2" placeholder="Region/Country" required />
        <input className="rounded bg-zinc-900 px-3 py-2" placeholder="Catalog Number" required />
        <input className="rounded bg-zinc-900 px-3 py-2" placeholder="UPC" required />
        <select className="rounded bg-zinc-900 px-3 py-2"><option>slip</option><option>clamshell</option><option>bigbox</option><option>other</option></select>
        <textarea className="rounded bg-zinc-900 px-3 py-2 md:col-span-2" placeholder="Notes, bootleg indicators, reseal notes" />
        <label className="md:col-span-2 text-sm text-zinc-400">Upload required photos: front/back/spine (+optional tape label)</label>
        <button className="rounded bg-neon px-4 py-2 text-sm md:col-span-2">Submit for moderation</button>
      </form>
    </div>
  );
}
