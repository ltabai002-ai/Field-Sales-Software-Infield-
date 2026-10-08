import { Logo } from "./Logo";
import { PHONE } from "./primitives";

export function Footer() {
  return (
    <footer className="bg-[#111111] text-gray-400 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&auto=format&fit=crop&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/80 to-[#111111]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="bg-white/5 inline-block p-2 rounded-lg w-fit">
              <Logo onDark />
            </div>
            <p className="text-sm mt-4">
              Your local Indian software partner for reliable field sales tracking and reporting.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#problem" className="hover:text-white transition-colors">Live Tracking</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Visit Verification</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">Route Planning</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">Auto Incentives</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#faq" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Contact Info</h4>
            <ul className="space-y-2 text-sm">
              <li>Phone: <a href={`tel:${PHONE.replace(/\s+/g, '')}`} className="text-white hover:text-brand transition-colors">{PHONE}</a></li>
              <li>Email: <a href="mailto:contact@infield.com" className="text-white hover:text-brand transition-colors">contact@infield.com</a></li>
              <li className="mt-4">Hours:<br />Mon - Fri: 9:00am - 6:00pm</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Blue Bar */}
      <div className="relative z-10 bg-secondary text-white py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-medium">
          <p>© 2026 InField Software. All Rights Reserved. • Powered by infield7</p>
          <div className="flex items-center gap-6">
            <span>{PHONE}</span>
            <a href="#contact" className="bg-brand hover:bg-brand-dark px-4 py-1.5 rounded text-white font-bold uppercase transition-colors">
              Book Now
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
