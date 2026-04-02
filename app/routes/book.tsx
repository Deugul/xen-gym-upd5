import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Users, MapPin } from "lucide-react";

export const meta: MetaFunction = () => [
  { title: "Book a Class — XEN Studio" },
  { name: "description", content: "Browse and book real classes at XEN Studio. Reformer, Beginner, Intermediate and Multi Level." },
];

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
  capacity: number;
  isCancelled: boolean;
  allowWaitlist: boolean;
}

export async function loader() {
  const hostId = process.env.MOMENCE_HOST_ID ?? "230727";
  const token = process.env.MOMENCE_TOKEN ?? "4a041985b5";

  try {
    const res = await fetch(
      `https://momence.com/_api/primary/api/v1/Events?hostId=${hostId}&token=${token}`
    );
    const data: MomenceEvent[] = await res.json();

    const now = new Date();
    const events = data
      .filter((e: MomenceEvent) => !e.isCancelled && new Date(e.dateTime) >= now)
      .sort((a: MomenceEvent, b: MomenceEvent) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

    return { events, error: null };
  } catch {
    return { events: [] as MomenceEvent[], error: "Unable to load classes" };
  }
}

function formatDay(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function groupByDay(events: MomenceEvent[]) {
  const groups: Record<string, MomenceEvent[]> = {};
  for (const e of events) {
    const key = new Date(e.dateTime).toDateString();
    if (!groups[key]) groups[key] = [];
    groups[key].push(e);
  }
  return groups;
}

const levelColor: Record<string, string> = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced: "bg-red-100 text-red-700",
  "Multi Level": "bg-forest/10 text-forest",
};

export default function BookPage() {
  const { events, error } = useLoaderData<typeof loader>();
  const [activeFilter, setActiveFilter] = useState("All");

  const classTypes = ["All", ...Array.from(new Set(events.map((e: MomenceEvent) => e.title)))];

  const filtered = activeFilter === "All"
    ? events
    : events.filter((e: MomenceEvent) => e.title === activeFilter);

  const grouped = groupByDay(filtered);

  return (
    <>
      {/* Hero */}
      <section className="relative h-64 flex items-center justify-center bg-forest overflow-hidden rounded-b-[2.5rem] mx-2 mt-2">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1400&q=80')" }}
        />
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-xs tracking-widest uppercase text-white/60 mb-2">XEN Studio</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl">Book a Class</h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Class type filter */}
        <div className="flex gap-2 flex-wrap mb-10">
          {classTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`px-4 py-2 text-sm font-medium tracking-wide border rounded-xl transition-all duration-200 ${
                activeFilter === type
                  ? "bg-forest text-white border-forest"
                  : "bg-white text-gray-600 border-sand hover:border-forest hover:text-forest"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-center text-gray-400 py-16">{error}</p>
        )}

        {!error && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="font-display text-2xl mb-2">No upcoming classes</p>
            <p className="text-sm">Check back soon</p>
          </div>
        )}

        {/* Grouped by day */}
        <div className="space-y-10">
          {Object.entries(grouped).map(([day, dayEvents]) => (
            <div key={day}>
              <h2 className="font-display text-xl mb-4 text-forest">{formatDay(dayEvents[0].dateTime)}</h2>
              <div className="space-y-3">
                <AnimatePresence>
                  {dayEvents.map((cls, i) => {
                    const isFull = cls.spotsRemaining === 0;
                    return (
                      <motion.div
                        key={cls.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.05 }}
                        className="bg-white border border-sand rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-forest/30 hover:shadow-sm transition-all duration-200"
                      >
                        {/* Left info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className={`text-xs px-2.5 py-1 font-medium rounded-full ${levelColor[cls.title] ?? "bg-sand text-forest"}`}>
                              {cls.title}
                            </span>
                            {isFull && (
                              <span className="text-xs px-2.5 py-1 font-medium rounded-full bg-red-50 text-red-500">Full</span>
                            )}
                            {!isFull && cls.spotsRemaining <= 2 && (
                              <span className="text-xs px-2.5 py-1 font-medium rounded-full bg-amber-50 text-amber-600">
                                {cls.spotsRemaining} spot{cls.spotsRemaining !== 1 ? "s" : ""} left
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                            <span className="flex items-center gap-1.5">
                              <Clock size={13} />
                              {formatTime(cls.dateTime)} · {cls.duration} min
                            </span>
                            {cls.teacher && (
                              <span className="flex items-center gap-1.5">
                                <Users size={13} />
                                {cls.teacher}
                              </span>
                            )}
                            <span className="flex items-center gap-1.5">
                              <MapPin size={13} />
                              {cls.location}
                            </span>
                          </div>
                        </div>

                        {/* Right — price + CTA */}
                        <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-1">
                          <span className="font-display text-xl text-gray-900">£{cls.fixedPrice}</span>
                          {isFull && cls.allowWaitlist ? (
                            <a
                              href={cls.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-medium tracking-widest uppercase px-5 py-2 rounded-lg border border-amber-400 text-amber-600 hover:bg-amber-50 transition-all duration-200 whitespace-nowrap"
                            >
                              Join Waitlist
                            </a>
                          ) : isFull ? (
                            <span className="text-xs font-medium tracking-widest uppercase px-5 py-2 rounded-lg border border-gray-200 text-gray-300 cursor-not-allowed whitespace-nowrap">
                              Full
                            </span>
                          ) : (
                            <a
                              href={cls.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-medium tracking-widest uppercase px-5 py-2 rounded-lg border border-forest text-forest hover:bg-forest hover:text-white transition-all duration-200 whitespace-nowrap"
                            >
                              Book Now
                            </a>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
