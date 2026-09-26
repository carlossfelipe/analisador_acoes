export default function ErrorState({ message = "Não foi possível carregar os dados." }: { message?: string }) {
  return (
    <div className="rounded-2xl border border-red-900/40 bg-red-950/10 p-8 text-center">
      <p className="font-medium text-red-300">{message}</p>
      <p className="mt-2 text-sm text-zinc-600">Não foi possível conectar ao servidor. Tente novamente mais tarde.</p>
    </div>
  );
}