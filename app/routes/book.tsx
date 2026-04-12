import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
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
  return new Date(dateStr).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
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

/* ── Shared checkbox row ── */
function CheckRow({
  label,
  count,
  checked,
  onToggle,
}: {
  label: string;
  count: number;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-2.5 px-1 group"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all ${
            checked ? "bg-forest border-forest" : "border-white/20 group-hover:border-white/40"
          }`}
        >
          {checked && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <span className={`text-sm transition-colors ${checked ? "text-white" : "text-white/55 group-hover:text-white/80"}`}>
          {label}
        </span>
      </div>
      <span className="text-xs text-white/25">{count}</span>
    </button>
  );
}

/* ── Filter content (shared between sidebar and bottom sheet) ── */
function FilterContent({
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

  function toggleSection(s: string) {
    setOpenSections((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  const sections = [
    {
      key: "Level",
      options: LEVELS,
      selected: selectedLevels,
      toggle: (v: string) =>
        setSelectedLevels(
          selectedLevels.includes(v)
            ? selectedLevels.filter((l) => l !== v)
            : [...selectedLevels, v]
        ),
      count: (v: string) => events.filter((e) => e.title.trim() === v).length,
    },
    {
      key: "Host",
      options: HOSTS,
      selected: selectedHosts,
      toggle: (v: string) =>
        setSelectedHosts(
          selectedHosts.includes(v)
            ? selectedHosts.filter((h) => h !== v)
            : [...selectedHosts, v]
        ),
      count: (v: string) => events.filter((e) => matchesHost(e.teacher, v)).length,
    },
  ];

  return (
    <div className="space-y-1">
      {sections.map(({ key, options, selected, toggle, count }) => {
        const isOpen = openSections.includes(key);
        return (
          <div key={key} className="bg-white/5 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection(key)}
              className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              <span className="tracking-wide">{key}</span>
              <div className="flex items-center gap-2">
                {selected.length > 0 && (
                  <span className="text-xs bg-forest text-white px-1.5 py-0.5 rounded-full font-medium">
                    {selected.length}
                  </span>
                )}
                {isOpen ? (
                  <ChevronUp size={14} className="text-white/40" />
                ) : (
                  <ChevronDown size={14} className="text-white/40" />
                )}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="overflow-hidden border-t border-white/5"
                >
                  <div className="px-3 py-1">
                    {options.map((opt) => (
                      <CheckRow
                        key={opt}
                        label={opt}
                        count={count(opt)}
                        checked={selected.includes(opt)}
                        onToggle={() => toggle(opt)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {(selectedLevels.length > 0 || selectedHosts.length > 0) && (
        <button
          onClick={() => { setSelectedLevels([]); setSelectedHosts([]); }}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          <X size={11} /> Clear all filters
        </button>
      )}
    </div>
  );
}

/* ── Mobile bottom-sheet filter ── */
function MobileFilterSheet({
  open,
  onClose,
  events,
  selectedLevels,
  setSelectedLevels,
  selectedHosts,
  setSelectedHosts,
  activeFilterCount,
}: {
  open: boolean;
  onClose: () => void;
  events: MomenceEvent[];
  selectedLevels: string[];
  setSelectedLevels: (v: string[]) => void;
  selectedHosts: string[];
  setSelectedHosts: (v: string[]) => void;
  activeFilterCount: number;
}) {
  // Lock body scroll while sheet is open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 inset-x-0 z-50 bg-[#141414] rounded-t-3xl border-t border-white/10 pb-safe"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
              <span className="font-display text-lg text-white">Filter Classes</span>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X size={16} className="text-white/60" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="px-4 py-4 overflow-y-auto max-h-[60vh]">
              <FilterContent
                events={events}
                selectedLevels={selectedLevels}
                setSelectedLevels={setSelectedLevels}
                selectedHosts={selectedHosts}
                setSelectedHosts={setSelectedHosts}
              />
            </div>

            {/* Apply button */}
            <div className="px-4 pb-6 pt-3 border-t border-white/5">
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl bg-forest text-white font-medium tracking-wide text-sm hover:bg-forest/80 transition-colors"
              >
                {activeFilterCount > 0
                  ? `Show results (${activeFilterCount} filter${activeFilterCount > 1 ? "s" : ""})`
                  : "Show all classes"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Main page ── */
export default function BookPage() {
  const { events, error } = useLoaderData<typeof loader>();
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedHosts, setSelectedHosts] = useState<string[]>([]);
  const [view, setView] = useState<"list" | "calendar">("list");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = events.filter((e: MomenceEvent) => {
    const levelOk = selectedLevels.length === 0 || selectedLevels.includes(e.title.trim());
    const hostOk = selectedHosts.length === 0 || selectedHosts.some((h) => matchesHost(e.teacher, h));
    return levelOk && hostOk;
  });

  const grouped = groupByDay(filtered);
  const activeFilterCount = selectedLevels.length + selectedHosts.length;

  return (
    <>
      {/* Hero */}
      <section className="relative h-52 sm:h-64 flex items-center justify-center bg-cream overflow-hidden rounded-b-[2rem] sm:rounded-b-[2.5rem] mx-2 mt-2">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/hero-book.jpg')" }}
        />
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-xs tracking-widest uppercase text-white/60 mb-2">XEN Studio</p>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl">Book a Class</h1>
        </div>
      </section>

      {/* Top bar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex items-center justify-between gap-3">
          {/* Filter button */}
          {view === "list" && (
            <button
              onClick={() => setFilterOpen((v) => !v)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                activeFilterCount > 0
                  ? "border-forest text-forest bg-forest/10"
                  : "border-white/10 text-white/50 hover:border-white/30 hover:text-white/70"
              }`}
            >
              <SlidersHorizontal size={15} />
              <span>Filter</span>
              {activeFilterCount > 0 && (
                <span className="bg-forest text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
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

      {/* List view */}
      {view === "list" && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex gap-6 items-start">

            {/* Desktop sidebar filter */}
            <AnimatePresence>
              {filterOpen && (
                <motion.aside
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 224 }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.22 }}
                  className="hidden sm:block shrink-0 overflow-hidden"
                >
                  <div className="w-56">
                    <FilterContent
                      events={events}
                      selectedLevels={selectedLevels}
                      setSelectedLevels={setSelectedLevels}
                      selectedHosts={selectedHosts}
                      setSelectedHosts={setSelectedHosts}
                    />
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Class list */}
            <div className="flex-1 min-w-0">
              {error && (
                <p className="text-center text-white/40 py-16">{error}</p>
              )}

              {!error && filtered.length === 0 && (
                <div className="text-center py-20">
                  <p className="font-display text-2xl text-white/60 mb-2">No classes found</p>
                  <p className="text-sm text-white/30">Try adjusting your filters</p>
                </div>
              )}

              <div className="space-y-8">
                {Object.entries(grouped).map(([day, dayEvents]) => (
                  <div key={day}>
                    <h2 className="font-display text-lg sm:text-xl mb-3 text-forest">
                      {formatDay(dayEvents[0].dateTime)}
                    </h2>
                    <div className="space-y-3">
                      <AnimatePresence>
                        {dayEvents.map((cls, i) => {
                          const isFull = cls.spotsRemaining === 0;
                          return (
                            <motion.div
                              key={cls.id}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.04 }}
                              className="bg-cream-200 border border-white/5 rounded-2xl p-4 sm:p-5 hover:border-forest/30 transition-all duration-200"
                            >
                              {/* Top row: badge + price */}
                              <div className="flex items-start justify-between gap-3 mb-2">
                                <div className="flex items-center gap-2 flex-wrap">
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
                                <span className="font-display text-xl text-white shrink-0">£{cls.fixedPrice}</span>
                              </div>

                              {/* Meta row */}
                              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/50 mb-4">
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

                              {/* CTA — full width on mobile */}
                              {isFull && cls.allowWaitlist ? (
                                <a
                                  href={cls.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block w-full text-center text-xs font-medium tracking-widest uppercase px-5 py-3 rounded-xl border border-amber-400 text-amber-600 hover:bg-amber-50 transition-all duration-200"
                                >
                                  Join Waitlist
                                </a>
                              ) : isFull ? (
                                <div className="w-full text-center text-xs font-medium tracking-widest uppercase px-5 py-3 rounded-xl border border-white/10 text-white/20 cursor-not-allowed">
                                  Full
                                </div>
                              ) : (
                                <a
                                  href={cls.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block w-full text-center text-xs font-medium tracking-widest uppercase px-5 py-3 rounded-xl border border-forest text-forest hover:bg-forest hover:text-black transition-all duration-200"
                                >
                                  Book Now
                                </a>
                              )}
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

      {/* Mobile filter bottom sheet */}
      <div className="sm:hidden">
        <MobileFilterSheet
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
          events={events}
          selectedLevels={selectedLevels}
          setSelectedLevels={setSelectedLevels}
          selectedHosts={selectedHosts}
          setSelectedHosts={setSelectedHosts}
          activeFilterCount={activeFilterCount}
        />
      </div>
    </>
  );
}
