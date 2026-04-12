import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Users, MapPin, List, CalendarDays, ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";

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
      .filter((e) => !e.isCancelled && new Date(e.dateTime) >= now)
      .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

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

const LEVELS = ["Multi Level", "Beginner", "Intermediate"];
const HOSTS = ["Aisha S", "Umme H", "Shazia A"];

function matchesHost(teacher: string | null, host: string) {
  const [firstName, lastInitial] = host.split(" ");
  return (teacher ?? "").startsWith(firstName) && (teacher ?? "").includes(lastInitial);
}

function FilterPanel({
  events,
  selectedLevels,
  setSelectedLevels,
  selectedHosts,
  setSelectedHosts,
}: {
  events: MomenceEvent[];
  selectedLevels: string[];
  setSelectedLevels: (v: string[]) => void;
  selectedHosts: string[];
  setSelectedHosts: (v: string[]) => void;
}) {
  const [openSections, setOpenSections] = useState<string[]>(["Level", "Host"]);

  function toggleSection(section: string) {
    setOpenSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  }

  function toggleLevel(level: string) {
    setSelectedLevels(
      selectedLevels.includes(level)
        ? selectedLevels.filter((l) => l !== level)
        : [...selectedLevels, level]
    );
  }

  function toggleHost(host: string) {
    setSelectedHosts(
      selectedHosts.includes(host)
        ? selectedHosts.filter((h) => h !== host)
        : [...selectedHosts, host]
    );
  }

  const countForLevel = (level: string) =>
    events.filter((e) => e.title.trim() === level).length;

  const countForHost = (host: string) =>
    events.filter((e) => matchesHost(e.teacher, host)).length;

  const sections = [
    {
      key: "Level",
      options: LEVELS,
      selected: selectedLevels,
      toggle: toggleLevel,
      count: countForLevel,
    },
    {
      key: "Host",
      options: HOSTS,
      selected: selectedHosts,
      toggle: toggleHost,
      count: countForHost,
    },
  ];

  return (
    <div className="w-56 shrink-0 space-y-1">
      {sections.map(({ key, options, selected, toggle, count }) => {
        const isOpen = openSections.includes(key);
        return (
          <div key={key} className="bg-cream-200 border border-white/5 rounded-2xl overflow-hidden">
            {/* Section header */}
            <button
              onClick={() => toggleSection(key)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              <span className="tracking-wide">{key}</span>
              <div className="flex items-center gap-2">
                {selected.length > 0 && (
                  <span className="text-xs bg-forest text-white px-1.5 py-0.5 rounded-full font-medium">
                    {selected.length}
                  </span>
                )}
                {isOpen ? <ChevronUp size={14} className="text-white/40" /> : <ChevronDown size={14} className="text-white/40" />}
              </div>
            </button>

            {/* Subcategory checkboxes */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden border-t border-white/5"
                >
                  <div className="px-4 py-2 space-y-1">
                    {options.map((opt) => {
                      const checked = selected.includes(opt);
                      return (
                        <label
                          key={opt}
                          className="flex items-center justify-between py-1.5 cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            {/* Custom checkbox */}
                            <div
                              onClick={() => toggle(opt)}
                              className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                                checked
                                  ? "bg-forest border-forest"
                                  : "border-white/20 group-hover:border-white/40"
                              }`}
                            >
                              {checked && (
                                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                                  <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <span
                              onClick={() => toggle(opt)}
                              className={`text-sm transition-colors ${checked ? "text-white" : "text-white/50 group-hover:text-white/70"}`}
                            >
                              {opt}
                            </span>
                          </div>
                          <span className="text-xs text-white/25 ml-2">{count(opt)}</span>
                        </label>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Clear filters */}
      {(selectedLevels.length > 0 || selectedHosts.length > 0) && (
        <button
          onClick={() => { setSelectedLevels([]); setSelectedHosts([]); }}
          className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          <X size={11} /> Clear filters
        </button>
      )}
    </div>
  );
}

export default function BookPage() {
  const { events, error } = useLoaderData<typeof loader>();
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedHosts, setSelectedHosts] = useState<string[]>([]);
  const [view, setView] = useState<"list" | "calendar">("list");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = events.filter((e: MomenceEvent) => {
    const levelOk = selectedLevels.length === 0 || selectedLevels.includes(e.title.trim());
    const hostOk =
      selectedHosts.length === 0 || selectedHosts.some((h) => matchesHost(e.teacher, h));
    return levelOk && hostOk;
  });

  const grouped = groupByDay(filtered);
  const activeFilterCount = selectedLevels.length + selectedHosts.length;

  return (
    <>
      {/* Hero */}
      <section className="relative h-64 flex items-center justify-center bg-cream overflow-hidden rounded-b-[2.5rem] mx-2 mt-2">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/hero-book.jpg')" }}
        />
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-xs tracking-widest uppercase text-white/60 mb-2">XEN Studio</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl">Book a Class</h1>
        </div>
      </section>

      {/* Top bar: Filter toggle + view switch */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center justify-between gap-3">
          {/* Filter button (mobile + desktop toggle) */}
          {view === "list" && (
            <button
              onClick={() => setFilterOpen((v) => !v)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                activeFilterCount > 0
                  ? "border-forest text-forest bg-forest/10"
                  : "border-white/10 text-white/50 hover:border-white/30 hover:text-white/70"
              }`}
            >
              <SlidersHorizontal size={14} />
              Filter
              {activeFilterCount > 0 && (
                <span className="bg-forest text-white text-xs px-1.5 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>
          )}
          {view === "calendar" && <div />}

          {/* View toggle */}
          <div className="flex items-center gap-1 bg-cream-200 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setView("list")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                view === "list" ? "bg-forest text-black" : "text-white/50 hover:text-forest"
              }`}
            >
              <List size={14} />
              List
            </button>
            <button
              onClick={() => setView("calendar")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                view === "calendar" ? "bg-forest text-black" : "text-white/50 hover:text-forest"
              }`}
            >
              <CalendarDays size={14} />
              Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Calendar view */}
      {view === "calendar" && (
        <iframe
          src="/momence-embed"
          title="Class Schedule"
          className="w-full"
          style={{ height: "85vh", border: "none" }}
        />
      )}

      {/* List view: sidebar + cards */}
      {view === "list" && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <div className="flex gap-6 items-start">
            {/* Filter sidebar */}
            <AnimatePresence>
              {filterOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                  className="hidden sm:block"
                >
                  <FilterPanel
                    events={events}
                    selectedLevels={selectedLevels}
                    setSelectedLevels={setSelectedLevels}
                    selectedHosts={selectedHosts}
                    setSelectedHosts={setSelectedHosts}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile filter dropdown */}
            <AnimatePresence>
              {filterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="sm:hidden fixed inset-x-4 top-32 z-40 shadow-2xl"
                >
                  <FilterPanel
                    events={events}
                    selectedLevels={selectedLevels}
                    setSelectedLevels={setSelectedLevels}
                    selectedHosts={selectedHosts}
                    setSelectedHosts={setSelectedHosts}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Class list */}
            <div className="flex-1 min-w-0">
              {error && <p className="text-center text-white/40 py-16">{error}</p>}

              {!error && filtered.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                  <p className="font-display text-2xl mb-2">No classes found</p>
                  <p className="text-sm text-white/40">Try adjusting your filters</p>
                </div>
              )}

              <div className="space-y-10">
                {Object.entries(grouped).map(([day, dayEvents]) => (
                  <div key={day}>
                    <h2 className="font-display text-xl mb-4 text-forest">
                      {formatDay(dayEvents[0].dateTime)}
                    </h2>
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
                              className="bg-cream-200 border border-white/5 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-forest/30 hover:shadow-sm transition-all duration-200"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <span
                                    className={`text-xs px-2.5 py-1 font-medium rounded-full ${
                                      levelColor[cls.title] ?? "bg-sand text-forest"
                                    }`}
                                  >
                                    {cls.title}
                                  </span>
                                  {isFull && (
                                    <span className="text-xs px-2.5 py-1 font-medium rounded-full bg-red-50 text-red-500">
                                      Full
                                    </span>
                                  )}
                                  {!isFull && cls.spotsRemaining <= 2 && (
                                    <span className="text-xs px-2.5 py-1 font-medium rounded-full bg-amber-50 text-amber-600">
                                      {cls.spotsRemaining} spot{cls.spotsRemaining !== 1 ? "s" : ""} left
                                    </span>
                                  )}
                                </div>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/50">
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
                              <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-1">
                                <span className="font-display text-xl text-white">
                                  £{cls.fixedPrice}
                                </span>
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
                                    className="text-xs font-medium tracking-widest uppercase px-5 py-2 rounded-lg border border-forest text-forest hover:bg-forest hover:text-black transition-all duration-200 whitespace-nowrap"
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
          </div>
        </div>
      )}
    </>
  );
}
