import { useState } from "react";
import { toast } from "sonner";
import { Reveal, PHONE, WA_BASE } from "./primitives";
import { supabase } from "../../integrations/supabase/client";
import { Phone, MessageSquare, User, Building2, MapPin, Calendar, Clock, Users } from "lucide-react";

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbw5TnrtQ8-lGZfOE5zl_3lPpc2-foy-vDNlTFhmnzmNg1Uf37sy8FfzchTQMmgAYHR7/exec";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      phone: formData.get("phone") as string,
      team_size: formData.get("team_size") as string,
      city: formData.get("city") as string,
      location: formData.get("location") as string,
      preferred_date: formData.get("preferred_date") as string,
      preferred_time: formData.get("preferred_time") as string,
      message: formData.get("message") as string,
    };

    try {
      // Send to Google Sheets (matching Questionnaire payload structure)
      if (GOOGLE_SHEET_URL) {
        fetch(GOOGLE_SHEET_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            phone: data.phone,
            businessName: data.company,
            teamSize: data.team_size,
            city: data.city,
            location: data.location,
            preferredDate: data.preferred_date,
            preferredTime: data.preferred_time,
            message: data.message,
            role: "Website Appointment Form",
            submittedAt: new Date().toISOString(),
          }),
        }).catch((err) => console.error("Error sending contact form to Google Sheets:", err));
      }

      const { error } = await supabase.from("demo_requests").insert({
        name: data.name,
        company: data.company,
        phone: data.phone,
        team_size: data.team_size,
      });
      if (error) console.error("Supabase insert error:", error);
      
      toast.success("Appointment request sent successfully! We'll contact you soon.");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error submitting appointment request:", error);
      toast.error("Failed to send request. Please try again or call us.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-[#111111] py-24 sm:py-32 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&auto=format&fit=crop&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/95 via-black/80 to-[#111111]/95" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left: Info */}
          <Reveal>
            <div>
              <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold leading-tight text-white uppercase tracking-tight">
                Need Your Team<br />
                <span className="text-secondary">Tracked Today?</span>
              </h2>
              
              <div className="my-6 h-1 w-24 bg-brand" />

              <p className="mt-4 text-lg text-gray-300">
                Book an appointment online in 60 seconds. Same-day setup available.
              </p>

              <ul className="mt-8 space-y-3">
                <li className="flex items-center gap-3 text-white font-medium">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-xs">✓</div>
                  No obligation
                </li>
                <li className="flex items-center gap-3 text-white font-medium">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-xs">✓</div>
                  Transparent pricing
                </li>
                <li className="flex items-center gap-3 text-white font-medium">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-xs">✓</div>
                  Quality support
                </li>
                <li className="flex items-center gap-3 text-white font-medium">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-xs">✓</div>
                  Local Indian team
                </li>
              </ul>

              <div className="mt-10 flex flex-col gap-4">
                <a
                  href={WA_BASE}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded border border-white/10 bg-white/5 p-4 transition-all hover:border-[#25D366] hover:bg-white/10"
                >
                  <MessageSquare className="h-6 w-6 text-[#25D366]" />
                  <div>
                    <p className="font-bold text-white uppercase">WhatsApp Us</p>
                  </div>
                </a>

                <a
                  href={`tel:${PHONE.replace(/\s+/g, '')}`}
                  className="group flex items-center gap-4 rounded border border-white/10 bg-white/5 p-4 transition-all hover:border-brand hover:bg-white/10"
                >
                  <Phone className="h-6 w-6 text-secondary" />
                  <div>
                    <p className="font-bold text-white uppercase">Call Sales ({PHONE})</p>
                  </div>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right: Form (Identical fields to Questionnaire Appointment Form) */}
          <Reveal delay={0.2} className="flex items-center">
            <div className="w-full bg-[#1a1a1a]/90 border border-white/10 p-6 sm:p-8 rounded-2xl shadow-xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-1">Book an Appointment</h3>
              <p className="text-xs text-gray-400 mb-6">Schedule a personalized demo & live consultation with our product team.</p>

              <form onSubmit={handleSubmit} className="grid gap-3.5">
                <div className="grid gap-3.5 sm:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Your Full Name *</label>
                    <input 
                      id="name" 
                      name="name" 
                      required 
                      placeholder="John Doe" 
                      className="w-full min-h-[48px] rounded border border-[#333] bg-[#222] px-4 text-base sm:text-sm text-white placeholder-gray-500 focus:border-brand focus:outline-none" 
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Phone Number *</label>
                    <input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      required 
                      placeholder="+91 98765 43210" 
                      className="w-full min-h-[48px] rounded border border-[#333] bg-[#222] px-4 text-base sm:text-sm text-white placeholder-gray-500 focus:border-brand focus:outline-none" 
                    />
                  </div>
                </div>

                <div className="grid gap-3.5 sm:grid-cols-2">
                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Company / Business Name *</label>
                    <input 
                      id="company" 
                      name="company" 
                      required 
                      placeholder="Acme Sales / Global Corp" 
                      className="w-full min-h-[48px] rounded border border-[#333] bg-[#222] px-4 text-base sm:text-sm text-white placeholder-gray-500 focus:border-brand focus:outline-none" 
                    />
                  </div>

                  {/* Number of Teams / Sales Reps */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Number of Teams / Sales Reps *</label>
                    <select 
                      id="team_size" 
                      name="team_size" 
                      required 
                      defaultValue=""
                      className="w-full min-h-[48px] rounded border border-[#333] bg-[#222] px-4 text-base sm:text-sm text-white focus:border-brand focus:outline-none appearance-none"
                    >
                      <option value="" disabled>Select Number of Teams / Reps</option>
                      <option value="1-5 Reps">1 - 5 Reps (1 Team)</option>
                      <option value="6-20 Reps">6 - 20 Reps (2-4 Teams)</option>
                      <option value="21-50 Reps">21 - 50 Reps (5+ Teams)</option>
                      <option value="50+ Reps">50+ Reps (Enterprise)</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-3.5 sm:grid-cols-2">
                  {/* City */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">City *</label>
                    <input 
                      id="city" 
                      name="city" 
                      required 
                      placeholder="Mumbai / Delhi / Bengaluru" 
                      className="w-full min-h-[48px] rounded border border-[#333] bg-[#222] px-4 text-base sm:text-sm text-white placeholder-gray-500 focus:border-brand focus:outline-none" 
                    />
                  </div>

                  {/* Location / Detailed Address */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Location / Detailed Address *</label>
                    <input 
                      id="location" 
                      name="location" 
                      required 
                      placeholder="Office Suite, Commercial Plaza, Sector 18" 
                      className="w-full min-h-[48px] rounded border border-[#333] bg-[#222] px-4 text-base sm:text-sm text-white placeholder-gray-500 focus:border-brand focus:outline-none" 
                    />
                  </div>
                </div>

                <div className="grid gap-3.5 sm:grid-cols-2">
                  {/* Preferred Date */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Preferred Date *</label>
                    <input 
                      id="preferred_date" 
                      name="preferred_date" 
                      type="date"
                      required 
                      className="w-full min-h-[48px] rounded border border-[#333] bg-[#222] px-4 text-base sm:text-sm text-white focus:border-brand focus:outline-none [color-scheme:dark]" 
                    />
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Preferred Time *</label>
                    <input 
                      id="preferred_time" 
                      name="preferred_time" 
                      type="time"
                      required 
                      className="w-full min-h-[48px] rounded border border-[#333] bg-[#222] px-4 text-base sm:text-sm text-white focus:border-brand focus:outline-none [color-scheme:dark]" 
                    />
                  </div>
                </div>

                {/* Message / Additional Requirements */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Message / Requirements</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={2}
                    placeholder="Tell us about your team or specific requirements..." 
                    className="w-full rounded border border-[#333] bg-[#222] p-3 text-base sm:text-sm text-white placeholder-gray-500 focus:border-brand focus:outline-none resize-none" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="mt-2 w-full bg-brand hover:bg-brand-dark min-h-[54px] text-base font-bold text-white uppercase tracking-wider rounded transition-colors shadow-lg shadow-brand/20 disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Book an Appointment"}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
