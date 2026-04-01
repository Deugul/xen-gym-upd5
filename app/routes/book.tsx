import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Users, X, CheckCircle2, Filter } from "lucide-react";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => [
  { title: "Book a Class — XEN Gym" },
  { name: "description", content: "Browse and book classes at XEN Gym Halifax. Reformer, HIIT, Yoga, Spin and more." },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const classTypes = ["All", "Reformer", "HIIT", "Yoga", "Spin", "Strength", "Barre"];

interface ClassSession {
  id: string;
  name: string;
  type: string;
  time: string;
  duration: string;
  instructor: string;
  spots: number;
  totalSpots: number;
  day: string;
  level: "All Levels" | "Beginner" | "Intermediate" | "Advanced";
  description: string;
}

const schedule: ClassSession[] = [
  { id: "1", name: "Morning Reformer", type: "Reformer", time: "6:30", duration: "50 min", instructor: "Sarah K.", spots: 4, totalSpots: 12, day: "Mon", level: "All Levels", description: "Start your week strong with a full-body reformer session. Focus on core, posture and controlled movement." },
  { id: "2", name: "HIIT Express", type: "HIIT", time: "7:30", duration: "30 min", instructor: "James R.", spots: 8, totalSpots: 20, day: "Mon", level: "Intermediate", description: "A high-intensity 30-minute blast to wake up your body and fire up your metabolism." },
  { id: "3", name: "Vinyasa Flow", type: "Yoga", time: "9:00", duration: "60 min", instructor: "Priya M.", spots: 6, totalSpots: 15, day: "Mon", level: "All Levels", description: "Flowing sequences that build strength, flexibility and focus. Perfect morning practice." },
  { id: "4", name: "Spin & Burn", type: "Spin", time: "12:00", duration: "45 min", instructor: "Tom H.", spots: 2, totalSpots: 20, day: "Mon", level: "All Levels", description: "High-energy cycling class with pumping music. Great for cardio and leg strength." },
  { id: "5", name: "Power Reformer", type: "Reformer", time: "17:30", duration: "50 min", instructor: "Sarah K.", spots: 0, totalSpots: 12, day: "Mon", level: "Intermediate", description: "A more challenging reformer class focused on strength and endurance." },
  { id: "6", name: "Evening Yoga", type: "Yoga", time: "19:00", duration: "60 min", instructor: "Priya M.", spots: 9, totalSpots: 15, day: "Mon", level: "All Levels", description: "Wind down and restore with this calming evening yoga flow." },
  { id: "7", name: "Barre Fusion", type: "Barre", time: "7:00", duration: "50 min", instructor: "Lily C.", spots: 5, totalSpots: 12, day: "Tue", level: "All Levels", description: "Ballet-inspired low impact workout targeting glutes, thighs and core." },
  { id: "8", name: "Reformer Foundations", type: "Reformer", time: "9:30", duration: "50 min", instructor: "Sarah K.", spots: 7, totalSpots: 12, day: "Tue", level: "Beginner", description: "New to reformer pilates? This class covers all the fundamentals. No experience needed." },
  { id: "9", name: "Strength Circuit", type: "Strength", time: "18:00", duration: "45 min", instructor: "James R.", spots: 10, totalSpots: 20, day: "Tue", level: "All Levels", description: "Full-body strength circuit using free weights, kettlebells and bodyweight." },
  { id: "10", name: "Morning HIIT", type: "HIIT", time: "6:30", duration: "45 min", instructor: "Tom H.", spots: 6, totalSpots: 20, day: "Wed", level: "Intermediate", description: "45 minutes of functional high-intensity intervals to set your day up right." },
  { id: "11", name: "Reformer Flow", type: "Reformer", time: "11:00", duration: "50 min", instructor: "Lily C.", spots: 3, totalSpots: 12, day: "Wed", level: "All Levels", description: "A fluid, connected reformer session combining strength and mobility." },
  { id: "12", name: "Advanced Reformer", type: "Reformer", time: "17:00", duration: "50 min", instructor: "Sarah K.", spots: 5, totalSpots: 10, day: "Thu", level: "Advanced", description: "Advanced reformer class for experienced practitioners. Challenging sequences." },
  { id: "13", name: "Friday Spin", type: "Spin", time: "7:00", duration: "45 min", instructor: "Tom H.", spots: 12, totalSpots: 20, day: "Fri", level: "All Levels", description: "Kick off your Friday with an energetic spin class. All welcome." },
  { id: "14", name: "Weekend Reformer", type: "Reformer", time: "8:00", duration: "50 min", instructor: "Lily C.", spots: 2, totalSpots: 12, day: "Sat", level: "All Levels", description: "The best way to start your weekend — a full-body reformer flow." },
  { id: "15", name: "Yin Yoga", type: "Yoga", time: "10:00", duration: "75 min", instructor: "Priya M.", spots: 11, totalSpots: 15, day: "Sat", level: "All Levels", description: "Deep, restorative yin yoga. Hold poses for longer to release deep tissue tension." },
  { id: "16", name: "Sunday Reset", type: "Yoga", time: "9:00", duration: "60 min", instructor: "Priya M.", spots: 8, totalSpots: 15, day: "Sun", level: "All Levels", description: "Gentle yoga and breathwork to restore and prepare for the week ahead." },
];

function levelColor(level: string) {
  if (level === "Beginner") return "bg-green-100 text-green-700";
  if (level === "Intermediate") return "bg-amber-100 text-amber-700";
  if (level === "Advanced") return "bg-red-100 text-red-700";
  return "bg-forest/10 text-forest";
}

export default function BookPage() {
  const [activeDay, setActiveDay] = useState("Mon");
  const [activeType, setActiveType] = useState("All");
  const [selectedClass, setSelectedClass] = useState<ClassSession | null>(null);
  const [booked, setBooked] = useState(false);

  const filtered = schedule.filter(
    (c) => c.day === activeDay && (activeType === "All" || c.type === activeType)
  );

  function handleBook() {
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
      setSelectedClass(null);
    }, 2500);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-64 flex items-center justify-center bg-forest overflow-hidden rounded-b-[2.5rem] mx-2 mt-2">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1400&q=80')" }}
        />
        <div className="relative z-10 text-center text-white">
          <p className="text-xs tracking-widest uppercase text-white/60 mb-2">XEN Gym</p>
          <h1 className="font-display text-5xl md:text-6xl">Book a Class</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters row */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between mb-10">
          {/* Day selector */}
          <div className="flex gap-1 flex-wrap">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-4 py-2.5 text-sm font-medium tracking-wide border rounded-xl transition-all duration-200 ${
                  activeDay === day
                    ? "bg-forest text-white border-forest"
                    : "bg-white text-gray-600 border-sand hover:border-forest hover:text-forest"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Type filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-gray-400" />
            {classTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-3 py-1.5 text-xs font-medium tracking-widest uppercase border rounded-lg transition-all duration-200 ${
                  activeType === type
                    ? "bg-forest text-white border-forest"
                    : "border-sand text-gray-500 hover:border-forest hover:text-forest"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="font-display text-2xl mb-2">No classes today</p>
            <p className="text-sm">Try a different day or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((cls, i) => {
              const isFull = cls.spots === 0;
              const isAlmostFull = cls.spots > 0 && cls.spots <= 3;
              return (
                <motion.div
                  key={cls.id}
                  initial={{ opacity: 0, y: 28, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={!isFull ? { y: -4, boxShadow: "0 20px 40px -12px rgba(45,74,62,0.15)" } : {}}
                  className={`bg-white border border-sand rounded-2xl p-6 cursor-pointer transition-colors duration-200 hover:border-forest/25 ${
                    isFull ? "opacity-60 cursor-default" : ""
                  }`}
                  onClick={() => !isFull && setSelectedClass(cls)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className={`text-xs px-2.5 py-1 font-medium rounded-full mb-2 inline-block ${levelColor(cls.level)}`}>
                        {cls.level}
                      </span>
                      <h3 className="font-display text-xl leading-tight">{cls.name}</h3>
                    </div>
                    <span className="text-xs font-medium bg-sand rounded-lg px-2.5 py-1 text-forest uppercase tracking-wider">
                      {cls.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
                    <div className="flex items-center gap-1.5">
                      <Clock size={13} />
                      {cls.time} · {cls.duration}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users size={13} />
                      {isFull ? (
                        <span className="text-red-500 font-medium">Full</span>
                      ) : (
                        <span className={isAlmostFull ? "text-amber-500 font-medium" : ""}>
                          {cls.spots} spots left
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">with {cls.instructor}</p>
                    <motion.button
                      whileTap={!isFull ? { scale: 0.95 } : {}}
                      disabled={isFull}
                      className={`text-xs font-medium tracking-widest uppercase px-5 py-2 rounded-lg transition-all duration-200 ${
                        isFull
                          ? "text-gray-300 border border-gray-200 cursor-not-allowed"
                          : "text-forest border border-forest hover:bg-forest hover:text-white"
                      }`}
                    >
                      {isFull ? "Full" : "Book"}
                    </motion.button>
                  </div>

                  {/* Spots bar */}
                  <div className="mt-4 h-1 bg-sand rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((cls.totalSpots - cls.spots) / cls.totalSpots) * 100}%` }}
                      transition={{ duration: 0.9, delay: i * 0.07 + 0.3, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        isFull ? "bg-red-400" : isAlmostFull ? "bg-amber-400" : "bg-forest"
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Booking modal */}
      <AnimatePresence>
        {selectedClass && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
              onClick={() => setSelectedClass(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 24 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-cream p-8 shadow-2xl rounded-3xl"
            >
              {booked ? (
                <div className="text-center py-8">
                  <CheckCircle2 size={48} className="text-forest mx-auto mb-4" />
                  <h2 className="font-display text-2xl mb-2">You're booked!</h2>
                  <p className="text-gray-500 text-sm">Check your email for confirmation.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">{selectedClass.type} · {selectedClass.day}</p>
                      <h2 className="font-display text-2xl">{selectedClass.name}</h2>
                    </div>
                    <button onClick={() => setSelectedClass(null)} className="p-1 hover:text-forest transition-colors">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-3 mb-6 text-sm text-gray-600">
                    <div className="flex justify-between py-3 border-b border-sand">
                      <span>Time</span><span className="font-medium text-gray-900">{selectedClass.time} · {selectedClass.duration}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-sand">
                      <span>Instructor</span><span className="font-medium text-gray-900">{selectedClass.instructor}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-sand">
                      <span>Level</span><span className={`text-xs px-2 py-0.5 rounded-sm font-medium ${levelColor(selectedClass.level)}`}>{selectedClass.level}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-sand">
                      <span>Spots remaining</span><span className="font-medium text-forest">{selectedClass.spots} of {selectedClass.totalSpots}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mb-6 leading-relaxed">{selectedClass.description}</p>

                  <button onClick={handleBook} className="btn-primary w-full">
                    Confirm Booking
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-3">
                    Need a membership? <Link to="/membership" className="text-forest hover:underline">View plans</Link>
                  </p>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
