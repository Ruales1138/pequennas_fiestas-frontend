import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { get } from "react-hook-form";
import BookingDetailModal from "@/features/booking/BookingDetailModal"
import LoadingSpinner from "@/components/ui/LoadingSpinner"

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const STATUS_STYLES = {
  pendiente: "bg-amber-100 text-amber-700",
  aceptada: "bg-green-100 text-green-700",
  rechazada: "bg-red-100 text-red-600",
};

function getInitials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function Avatar({ name, image }) {
  if (image)
    return (
      <img
        src={image}
        alt={name}
        className="w-9 h-9 rounded-full object-cover"
      />
    );
  return (
    <div className="w-9 h-9 rounded-full bg-indigo-200 text-indigo-800 flex items-center justify-center text-xs font-bold">
      {getInitials(name)}
    </div>
  );
}

export default function DashboardArtist() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
    fetch(`${API_BASE_URL}/api/bookings/artist`, { credentials: "include" })
    .then(res => res.json())
    .then(( json ) => {
        console.log('Booking resonse', json)
        setBookings(json.data ?? [])
    }).catch(() => setError('No se pudieron cargar las reservas'))
    .finally(() => setIsLoading(false))
    }, [])

    const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
        const res = await fetch(`${API_BASE_URL}/api/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
        });
        const { data } = await res.json();
        setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: data.status } : b)),
        );
        setSelectedBooking((prev)=> 
        prev && prev.id === id ?{...prev, status: data.status}: prev);
    } catch {
        alert("Error al actualizar la reserva");
    } finally {
        setUpdatingId(null);
    }
    };

    const pendientes = bookings.filter((b) => b.status === "pendiente").length;
    const aceptadas = bookings.filter((b) => b.status === "aceptada").length;
    const ingresos = bookings
    .filter((b) => b.status === "aceptada")
    .reduce((sum, b) => sum + Number(b.agreedPrice), 0);

    return (
    <main className="min-h-screen bg-[#f7f8fc] px-4 pt-28 pb-16">
        <div className="mx-auto max-w-5xl">
        <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            Management Console
            </span>
            <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-[#2e3145]">
            Mis Reservas
            </h1>
            <p className="mt-2 text-slate-500">
            Gestiona tus solicitudes de contratación y revisa el estado de tus
            eventos confirmados.
            </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Pendientes
            </p>
            <p className="mt-2 text-4xl font-extrabold text-[#2e3145]">
                {pendientes}
            </p>
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Confirmadas
            </p>
            <p className="mt-2 text-4xl font-extrabold text-indigo-600">
                {aceptadas}
            </p>
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Ingresos estimados
            </p>
            <p className="mt-2 text-4xl font-extrabold text-[#2e3145]">
                ${ingresos.toLocaleString("es-CO")}
            </p>
            </div>
        </div>

        <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
            {isLoading && (
            <div className="p-8">
                <LoadingSpinner message="Cargando reservas…" fullPage={false} />
            </div>
            )}
            {error && <p className="p-8 text-center text-red-500">{error}</p>}
            {!isLoading && !error && bookings.length === 0 && (
            <p className="p-8 text-center text-slate-500">
                Aún no tienes reservas.
            </p>
            )}
            {!isLoading && bookings.length > 0 && (
            <div className="overflow-x-auto w-full">
            <table className="w-full text-sm whitespace-nowrap">
                <thead>
                <tr className="border-b bg-slate-50 text-xs font-semibold uppercase tracking-widest text-slate-500">
                    <th className="px-6 py-4 text-left">Cliente</th>
                    <th className="px-6 py-4 text-left">Fecha</th>
                    <th className="px-6 py-4 text-left">Ubicación</th>
                    <th className="px-6 py-4 text-left">Precio</th>
                    <th className="px-6 py-4 text-left">Estado</th>
                    <th className="px-6 py-4 text-left">Acciones</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                {bookings.map((booking) => (
                    <tr
                    key={booking.id}
                    className="hover:bg-slate-50 transition-colors"
                    >
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                        <Avatar
                            name={booking.clientName}
                            image={booking.clientImage}
                        />
                        <div>
                            <p className="font-semibold text-[#2e3145]">
                            {booking.clientName}
                            </p>
                            <p className="text-xs text-slate-400">
                            {booking.clientEmail}
                            </p>
                        </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                        {new Date(booking.eventDate).toLocaleDateString("es-CO", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        })}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                        {booking.eventLocation}
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#2e3145]">
                        ${Number(booking.agreedPrice).toLocaleString("es-CO")}
                    </td>
                    <td className="px-6 py-4">
                        <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${STATUS_STYLES[booking.status] ?? "bg-slate-100 text-slate-600"}`}
                        >
                        {booking.status}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        {booking.status === "pendiente" ? (
                        <div className="flex gap-2">
                            <button
                            onClick={() => updateStatus(booking.id, "aceptada")}
                            disabled={updatingId === booking.id}
                            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                            >
                            Aceptar
                            </button>
                            <button
                            onClick={() =>
                                updateStatus(booking.id, "rechazada")
                            }
                            disabled={updatingId === booking.id}
                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-colors"
                            >
                            Rechazar
                            </button>
                            <button onClick={() => setSelectedBooking(booking)} className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 transition-colors">
                                Detalles
                            </button>
                        </div>
                        ) : (
                        <button onClick={() => setSelectedBooking(booking)} className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 transition-colors">
                            Ver detalles
                        </button>
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            )}
        </div>
        </div>
        {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onStatusChange={updateStatus}
          isUpdating={updatingId !== null}
        />
      )}
    </main>
    );
}
