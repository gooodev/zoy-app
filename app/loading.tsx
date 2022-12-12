export default function Loading() {
  return (
    <main className="h-screen w-screen">
      <center>
        <progress className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200" />
      </center>
    </main>
  )
}
