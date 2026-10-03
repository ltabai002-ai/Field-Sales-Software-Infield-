import { useState } from "react";
import { toast } from "sonner";
import { Reveal, PHONE, WA_BASE } from "./primitives";
import { supabase } from "../../integrations/supabase/client";
import { Phone, MessageSquare, Mail } from "lucide-react";

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
    };

    try {
      // Send to Google Sheets
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
            role: "Website Contact Form",
            submittedAt: new Date().toISOString(),
          }),
        }).catch((err) => console.error("Error sending contact form to Google Sheets:", err));
      }

      const { error } = await supabase.from("demo_requests").insert(data);
      if (error) throw error;
      
      toast.success("Demo request sent successfully! We'll contact you soon.");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error submitting demo request:", error);
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
                Book online in 60 seconds. Same-day setup available.
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

          {/* Right: Form */}
          <Reveal delay={0.2} className="flex items-center">
            <div className="w-full">
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input 
                    id="name" 
                    name="name" 
                    required 
                    placeholder="Full Name" 
                    className="min-h-[56px] rounded border border-[#333] bg-[#222] px-4 text-white placeholder-gray-500 focus:border-brand focus:outline-none" 
                  />
                  <input 
                    id="phone" 
                    name="phone" 
                    type="tel" 
                    required 
                    placeholder="Phone Number" 
                    className="min-h-[56px] rounded border border-[#333] bg-[#222] px-4 text-white placeholder-gray-500 focus:border-brand focus:outline-none" 
                  />
                </div>

                <input 
                  id="company" 
                  name="company" 
                  required 
                  placeholder="Company Name" 
                  className="min-h-[56px] rounded border border-[#333] bg-[#222] px-4 text-white placeholder-gray-500 focus:border-brand focus:outline-none" 
                />

                <select 
                  id="team_size" 
                  name="team_size" 
                  required 
                  className="min-h-[56px] rounded border border-[#333] bg-[#222] px-4 text-white focus:border-brand focus:outline-none appearance-none"
                >
                  <option value="" disabled selected>Select Team Size</option>
                  <option value="1-10">1 - 10 Reps</option>
                  <option value="11-50">11 - 50 Reps</option>
                  <option value="50+">50+ Reps</option>
                </select>

                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="mt-2 w-full bg-brand hover:bg-brand-dark min-h-[64px] text-lg font-bold text-white uppercase tracking-wider rounded transition-colors"
                >
                  {isSubmitting ? "Submitting..." : "Book My Demo"}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
