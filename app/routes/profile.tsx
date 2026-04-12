import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { getUserFromSession } from "~/auth.server";
import { Clock, MapPin, Users, LogOut, CalendarDays, Star, History } from "lucide-react";

export const meta: MetaFunction = () => [
  { title: "My Profile — XEN Studio" },
  { name: "description", content: "Your XEN Studio profile, membership and booking history." },
];

interface MomenceCustomer {
  memberId: number;
  email: string;
  firstName: string;
  lastName: string;
  activeSubscriptions: { name: string; status: string }[];
}

interface MomenceEvent {
  id: number;
  title: string;
  dateTime: string;
  duration: number;
  fixedPrice: number;
  link: string;
  teacher: string | null;
  location: string;
  spotsRemaining: number;
  isCancelled: boolean;
}

interface MomenceBooking {
  id: number;
  eventTitle: string;
  dateTime: string;
  duration: number;
  teacher: string | null;
  location: string;
  status: string;
}

async function getMomenceCustomer(email: string): Promise<MomenceCustomer | null> {
  const hostId = process.env.MOMENCE_HOST_ID ?? "230727";
  const token = process.env.MOMENCE_TOKEN ?? "4a041985b5";

  let page = 1;
  while (page <= 10) {
    const res = await fetch(
      `https://momence.com/_api/primary/api/v1/Customers?hostId=${hostId}&token=${token}&page=${page}&pageSize=50`
    );
    if (!res.ok) break;
    const data = await res.json();
    const customers: MomenceCustomer[] = data.payload ?? [];
    if (customers.length === 0) break;

    const match = customers.find(
      (c) => c.email.toLowerCase().trim() === email.toLowerCase().trim()
    );
    if (match) return match;
    page++;
  }
  return null;
}

async function getUpcomingEvents(): Promise<MomenceEvent[]> {
  const hostId = process.env.MOMENCE_HOST_ID ?? "230727";
  const token = process.env.MOMENCE_TOKEN ?? "4a041985b5";

  const res = await fetch(
    `https://momence.com/_api/primary/api/v1/Events?hostId=${hostId}&token=${token}`
  );
  if (!res.ok) return [];
  const data: MomenceEvent[] = await res.json();
  const now = new Date();
  return data
    .filter((e) => !e.isCancelled && new Date(e.dateTime) >= now)
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
    .slice(0, 6);
}

async function getBookingHistory(memberId: number): Promise<MomenceBooking[]> {
  const hostId = process.env.MOMENCE_HOST_ID ?? "230727";
  const token = process.env.MOMENCE_TOKEN ?? "4a041985b5";

  try {
    const res = await fetch(
      `https://momence.com/_api/primary/api/v1/Customers/${memberId}/Registrations?hostId=${hostId}&token=${token}`
    );
    if (!res.ok) return [];
    const data = await res.json();
    const bookings: MomenceBooking[] = (data.payload ?? data ?? []).map((b: {
      id: number;
      event?: { title?: string; dateTime?: string; duration?: number; teacher?: { displayName?: string } | null; location?: string };
      eventTitle?: string;
      dateTime?: string;
      duration?: number;
      teacher?: string | null;
      location?: string;
      status?: string;
    }) => ({
      id: b.id,
      eventTitle: b.event?.title ?? b.eventTitle ?? "Class",
      dateTime: b.event?.dateTime ?? b.dateTime ?? "",
      duration: b.event?.duration ?? b.duration ?? 0,
      teacher: b.event?.teacher?.displayName ?? b.teacher ?? null,
      location: b.event?.location ?? b.location ?? "",
      status: b.status ?? "confirmed",
    }));

    const now = new Date();
    return bookings
      .filter((b) => b.dateTime && new Date(b.dateTime) < now)
      .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())
      .slice(0, 10);
  } catch {
    return [];
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserFromSession(request);
  if (!user) throw redirect("/login");

  const [momenceCustomer, upcomingEvents] = await Promise.all([
    getMomenceCustomer(user.email),
    getUpcomingEvents(),
  ]);

  const bookingHistory = momenceCustomer
    ? await getBookingHistory(momenceCustomer.memberId)
    : [];

  return { user, momenceCustomer, upcomingEvents, bookingHistory };
};

function formatDateTime(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day: d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }),
    time: d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
  };
}

export default function ProfilePage() {
  const { user, momenceCustomer, upcomingEvents, bookingHistory } =
    useLoaderData<typeof loader>();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-forest/20 border border-forest/30 flex items-center justify-center text-forest font-display text-xl">
            {user.name[0]}
          </div>
          <div>
            <h1 className="font-display text-2xl text-white">{user.name}</h1>
            <p className="text-white/40 text-sm">{user.email}</p>
          </div>
        </div>
        <Form method="post" action="/auth/logout">
          <button
            type="submit"
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </Form>
      </div>

      {/* Membership */}
      <section className="mb-8">
        <h2 className="font-display text-lg text-forest mb-3 flex items-center gap-2">
          <Star size={16} /> Membership
        </h2>
        {momenceCustomer ? (
          <div className="bg-cream-200 border border-white/5 rounded-2xl p-5">
            <p className="text-white text-sm mb-1">
              {momenceCustomer.firstName.trim()} {momenceCustomer.lastName.trim()}
            </p>
            {momenceCustomer.activeSubscriptions.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-3">
                {momenceCustomer.activeSubscriptions.map((sub: { name: string; status: string }, i: number) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-forest/10 border border-forest/20 text-forest"
                  >
                    {sub.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-white/40 text-sm mt-2">No active membership.</p>
            )}
          </div>
        ) : (
          <div className="bg-cream-200 border border-white/5 rounded-2xl p-5">
            <p className="text-white/40 text-sm">
              No Momence account found for{" "}
              <span className="text-white/60">{user.email}</span>. Make sure you
              book classes using the same email.
            </p>
          </div>
        )}
      </section>

      {/* Booking History */}
      <section className="mb-8">
        <h2 className="font-display text-lg text-forest mb-3 flex items-center gap-2">
          <History size={16} /> Booking History
        </h2>
        {bookingHistory.length > 0 ? (
          <div className="space-y-3">
            {bookingHistory.map((booking: MomenceBooking) => {
              const { day, time } = formatDateTime(booking.dateTime);
              return (
                <div
                  key={booking.id}
                  className="bg-cream-200 border border-white/5 rounded-2xl p-4 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="text-white text-sm font-medium mb-1">
                      {booking.eventTitle}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {day} · {time}
                        {booking.duration ? ` · ${booking.duration}min` : ""}
                      </span>
                      {booking.teacher && (
                        <span className="flex items-center gap-1">
                          <Users size={11} />
                          {booking.teacher}
                        </span>
                      )}
                      {booking.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={11} />
                          {booking.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="shrink-0 text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/30 capitalize">
                    {booking.status}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-cream-200 border border-white/5 rounded-2xl p-5">
            <p className="text-white/40 text-sm">No past bookings found.</p>
          </div>
        )}
      </section>

      {/* Upcoming Classes */}
      <section>
        <h2 className="font-display text-lg text-forest mb-3 flex items-center gap-2">
          <CalendarDays size={16} /> Upcoming Classes
        </h2>
        <div className="space-y-3">
          {upcomingEvents.map((cls: MomenceEvent) => {
            const { day, time } = formatDateTime(cls.dateTime);
            const isFull = cls.spotsRemaining === 0;
            return (
              <div
                key={cls.id}
                className="bg-cream-200 border border-white/5 rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-forest/20 transition-all"
              >
                <div>
                  <p className="text-white text-sm font-medium mb-1">{cls.title}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/40">
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {day} · {time} · {cls.duration}min
                    </span>
                    {cls.teacher && (
                      <span className="flex items-center gap-1">
                        <Users size={11} />
                        {cls.teacher}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <MapPin size={11} />
                      {cls.location}
                    </span>
                  </div>
                </div>
                <div className="shrink-0">
                  {isFull ? (
                    <span className="text-xs text-white/30 border border-white/10 px-3 py-1.5 rounded-lg">
                      Full
                    </span>
                  ) : (
                    <a
                      href={cls.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium tracking-widest uppercase px-4 py-1.5 rounded-lg border border-forest text-forest hover:bg-forest hover:text-white transition-all"
                    >
                      Book
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
