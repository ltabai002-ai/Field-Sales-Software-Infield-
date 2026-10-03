import React, { useState } from "react";
import { Logo } from "./Logo";
import { 
  Building2, 
  UserCheck, 
  MapPin, 
  Calendar, 
  Clock, 
  Phone, 
  MessageSquare, 
  User, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Navigation,
  ShieldAlert,
  BarChart3,
  Calculator,
  CalendarCheck,
  Briefcase,
  Users,
  FileCheck,
  Sparkles,
  AlertTriangle,
  FileText,
  HelpCircle
} from "lucide-react";

// ============================================================================
// 📊 GOOGLE SHEETS INTEGRATION
// Submissions automatically post to your Google Apps Script Web App URL!
// ============================================================================
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbw5TnrtQ8-lGZfOE5zl_3lPpc2-foy-vDNlTFhmnzmNg1Uf37sy8FfzchTQMmgAYHR7/exec";

interface QuestionnaireProps {
  onComplete: () => void;
}

export function Questionnaire({ onComplete }: QuestionnaireProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    phone: "",
    teamSize: "",
    city: "",
    location: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  // Universal Role Options
  const roles = [
    { id: "business_owner", label: "Business Owner / Founder / Executive", desc: "Managing overall company growth, operations & field teams", icon: Briefcase },
    { id: "sales_head", label: "Head of Sales / Sales Director", desc: "Overseeing field sales reps, client meetings & revenue targets", icon: UserCheck },
    { id: "ops_manager", label: "Field Operations & Territory Manager", desc: "Managing daily routes, field visits & team attendance", icon: MapPin },
    { id: "team_lead", label: "Team Lead / Supervisor", desc: "Guiding daily reps, client check-ins & route efficiency", icon: Users },
    { id: "exploring_other", label: "Exploring Solutions / Other", desc: "Looking for team tracking & sales automation tools", icon: Sparkles },
  ];

  // Universal Operational Challenges Options
  const challenges = [
    { id: "no_visibility", label: "No Visibility on Live Team Location", desc: "Unsure where field reps are during working hours", icon: Navigation },
    { id: "fake_reports", label: "Unverifiable Client Visit Reports", desc: "Can't confirm if reps actually met the client/doctor at their real location", icon: AlertTriangle },
    { id: "high_fuel", label: "High Fuel Bills & Inefficient Travel Routes", desc: "Random unoptimized routes wasting petrol, time, and travel expenses", icon: MapPin },
    { id: "manual_commissions", label: "Manual Incentive & Salary Spreadsheet Disputes", desc: "Wasting hours on commission calculations and manual expense claims", icon: Calculator },
    { id: "territory_breach", label: "Unapproved Territory Exits", desc: "Reps leaving assigned sales zones without prior notice", icon: ShieldAlert },
    { id: "no_sales_data", label: "Lack of Real-Time Sales Performance Data", desc: "No clear live view of daily meetings, deals closed, and team leaderboard", icon: BarChart3 },
    { id: "delayed_notes", label: "Delayed Meeting Notes & Proof Photos", desc: "Visit summaries, orders, and customer feedback not reported on time", icon: FileText },
    { id: "irregular_visits", label: "Irregular Client Meeting Schedules", desc: "Difficulty maintaining consistent meeting frequency with key clients", icon: CalendarCheck },
  ];

  const toggleChallenge = (id: string) => {
    if (selectedChallenges.includes(id)) {
      setSelectedChallenges(selectedChallenges.filter((item) => item !== id));
    } else {
      setSelectedChallenges([...selectedChallenges, id]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      role: selectedRole,
      selectedChallenges: selectedChallenges,
      selectedFeatures: selectedChallenges, // for backward compatibility with sheet headers
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    // Send to Google Sheets
    if (GOOGLE_SHEET_URL) {
      try {
        await fetch(GOOGLE_SHEET_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error("Error sending data to Google Sheets:", err);
      }
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        onComplete();
      }, 1400);
    }, 800);
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-x-hidden font-sans select-none sm:select-text">
      {/* Mobile Ambient Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-primary/15 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none translate-y-1/3"></div>

      {/* Header Bar */}
      <header className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-2">
          <Logo className="h-7 sm:h-9 w-auto brightness-0 invert" />
        </div>
        
        {/* Top Right Small Skip Button */}
        <button
          onClick={onComplete}
          className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-slate-700/80 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white transition-all flex items-center gap-1 font-medium shadow-xs backdrop-blur-md active:scale-95 touch-manipulation"
          title="Skip to main website"
        >
          <span>Skip to Website</span>
          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary group-hover:translate-x-0.5 transition-transform" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-6 z-10 my-auto w-full">
        <div className="w-full max-w-3xl bg-slate-900/95 border border-slate-800/80 rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-2xl backdrop-blur-md flex flex-col justify-between my-auto">
          
          {/* Progress Bar Header */}
          {!isSubmitted && (
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-400 font-medium mb-1.5">
                <span>Step {step} of 3</span>
                <span className="text-primary font-semibold">{step === 1 ? "33% Completed" : step === 2 ? "66% Completed" : "Almost Done!"}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-500 ease-out" 
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* STEP 1: Role Selection */}
          {step === 1 && (
            <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
              <div className="text-center max-w-xl mx-auto space-y-1.5 sm:space-y-2">
                <span className="inline-block px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full">Welcome</span>
                <h1 className="text-xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  What is your primary role in your organization?
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Select your role so we can tailor the field tracking features for your team.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:gap-3.5 mt-4 sm:mt-6">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  return (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`cursor-pointer p-3 sm:p-4 rounded-xl border transition-all flex items-center gap-3 sm:gap-4 active:scale-[0.98] touch-manipulation ${
                        isSelected 
                          ? "border-primary bg-primary/10 shadow-md ring-1 ring-primary" 
                          : "border-slate-800/80 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-800/50"
                      }`}
                    >
                      <div className={`p-2.5 sm:p-3 rounded-lg shrink-0 ${isSelected ? "bg-primary text-slate-950" : "bg-slate-800 text-slate-300"}`}>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs sm:text-base font-semibold text-white truncate">{role.label}</h3>
                        <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-1">{role.desc}</p>
                      </div>
                      <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? "border-primary bg-primary text-slate-950" : "border-slate-700"
                      }`}>
                        {isSelected && <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 sm:pt-4 flex justify-end">
                <button
                  disabled={!selectedRole}
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-slate-950 font-bold text-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 touch-manipulation"
                >
                  <span>Continue to Challenges</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Challenges Selection (Replacing Features Question) */}
          {step === 2 && (
            <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
              <div className="text-center max-w-xl mx-auto space-y-1.5 sm:space-y-2">
                <span className="inline-block px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 rounded-full">Operational Challenges</span>
                <h1 className="text-xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  What challenges are you currently facing with your field team?
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Select all challenges that affect your daily sales & operations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[50vh] sm:max-h-[360px] overflow-y-auto pr-1 custom-scrollbar -webkit-overflow-scrolling-touch">
                {challenges.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedChallenges.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleChallenge(item.id)}
                      className={`cursor-pointer p-3 sm:p-3.5 rounded-xl border transition-all flex items-start gap-2.5 sm:gap-3 active:scale-[0.98] touch-manipulation ${
                        isSelected 
                          ? "border-amber-400 bg-amber-400/10 shadow-xs ring-1 ring-amber-400/60" 
                          : "border-slate-800/80 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-800/50"
                      }`}
                    >
                      <div className={`p-1.5 sm:p-2 rounded-md mt-0.5 shrink-0 ${isSelected ? "bg-amber-400 text-slate-950" : "bg-slate-800 text-slate-400"}`}>
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-semibold text-white leading-tight">{item.label}</h4>
                        <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 sm:mt-1 line-clamp-2">{item.desc}</p>
                      </div>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? "border-amber-400 bg-amber-400 text-slate-950" : "border-slate-700"
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 sm:pt-4 flex items-center justify-between gap-2.5">
                <button
                  onClick={() => setStep(1)}
                  className="px-3.5 sm:px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 text-xs sm:text-sm font-medium hover:bg-slate-800 transition flex items-center gap-1 active:scale-95 touch-manipulation"
                >
                  <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Back</span>
                </button>
                <button
                  disabled={selectedChallenges.length === 0}
                  onClick={() => setStep(3)}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-primary text-slate-950 font-bold text-xs sm:text-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-1.5 shadow-lg shadow-primary/20 active:scale-95 touch-manipulation"
                >
                  <span>Continue to Appointment</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Appointment Form (With Number of Teams / Reps Question) */}
          {step === 3 && !isSubmitted && (
            <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
              <div className="text-center max-w-xl mx-auto space-y-1.5 sm:space-y-2">
                <span className="inline-block px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full">Final Step</span>
                <h1 className="text-xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  Book an Appointment
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Schedule a personalized demo and live consultation with our product team.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 max-h-[52vh] sm:max-h-none overflow-y-auto pr-1 custom-scrollbar -webkit-overflow-scrolling-touch">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-medium text-slate-300 mb-1">Your Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 sm:py-2 text-base sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-medium text-slate-300 mb-1">Phone Number *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 sm:py-2 text-base sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Company / Business Name */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-medium text-slate-300 mb-1">Company / Business Name *</label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        name="businessName"
                        required
                        value={formData.businessName}
                        onChange={handleInputChange}
                        placeholder="Acme Sales / Global Corp"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 sm:py-2 text-base sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Number of Teams / Sales Reps */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-medium text-slate-300 mb-1">Number of Teams / Sales Reps *</label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <select
                        name="teamSize"
                        required
                        value={formData.teamSize}
                        onChange={handleInputChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 sm:py-2 text-base sm:text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
                      >
                        <option value="" disabled>Select Number of Teams / Reps</option>
                        <option value="1-5 Reps">1 - 5 Reps (1 Team)</option>
                        <option value="6-20 Reps">6 - 20 Reps (2-4 Teams)</option>
                        <option value="21-50 Reps">21 - 50 Reps (5+ Teams)</option>
                        <option value="50+ Reps">50+ Reps (Enterprise)</option>
                      </select>
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-medium text-slate-300 mb-1">City *</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Mumbai / Delhi / Bengaluru"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 sm:py-2 text-base sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Location / Address */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-medium text-slate-300 mb-1">Location / Detailed Address *</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Office Suite, Commercial Plaza, Sector 18"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 sm:py-2 text-base sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-medium text-slate-300 mb-1">Preferred Date *</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="date"
                        name="preferredDate"
                        required
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 sm:py-2 text-base sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-medium text-slate-300 mb-1">Preferred Time *</label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="time"
                        name="preferredTime"
                        required
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 sm:py-2 text-base sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* Message Section */}
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] sm:text-xs font-medium text-slate-300 mb-1">Message / Requirements</label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <textarea
                        name="message"
                        rows={2}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your team or specific requirements..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 sm:py-2 text-base sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-3.5 sm:px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 text-xs sm:text-sm font-medium hover:bg-slate-800 transition flex items-center gap-1 active:scale-95 touch-manipulation"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-primary text-slate-950 font-bold text-xs sm:text-sm hover:bg-primary/90 transition flex items-center justify-center gap-1.5 shadow-lg shadow-primary/25 disabled:opacity-50 active:scale-95 touch-manipulation"
                  >
                    {isSubmitting ? (
                      <span>Scheduling...</span>
                    ) : (
                      <>
                        <CalendarCheck className="w-4 h-4" />
                        <span>Book an Appointment</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Submission Success Screen */}
          {isSubmitted && (
            <div className="py-8 sm:py-12 text-center space-y-3 sm:space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <Check className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Appointment Confirmed!</h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto px-2">
                Thank you, <strong className="text-white">{formData.name}</strong>. We have booked your consultation for <strong className="text-white">{formData.businessName}</strong>.
              </p>
              <p className="text-xs text-primary font-medium animate-pulse pt-2">
                Redirecting you to the main website...
              </p>
            </div>
          )}

        </div>
      </main>

      {/* Footer copyright */}
      <footer className="w-full text-center py-3 text-[11px] sm:text-xs text-slate-500 z-10 shrink-0">
        &copy; {new Date().getFullYear()} InField Software. All rights reserved.
      </footer>
    </div>
  );
}
