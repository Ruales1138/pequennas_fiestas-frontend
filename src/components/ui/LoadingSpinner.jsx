
export default function LoadingSpinner({
  message = 'Cargando…',
  fullPage = true,
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-6 ${
        fullPage ? 'min-h-screen bg-[#fbf8ff]' : 'py-20'
      }`}
    >
      <div className="loading-spinner-wrapper">
        <div className="loading-ring loading-ring--outer" />
        <div className="loading-ring loading-ring--inner" />
        <div className="loading-dot" />
      </div>

      <p className="loading-text">{message}</p>
    </div>
  )
}
