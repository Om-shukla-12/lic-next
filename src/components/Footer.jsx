import Link from 'next/link';
import { Shield, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card-background border-t border-muted">
      <div className="max-w-[100rem] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-heading text-xl text-primary">LIC Digital</span>
            </div>
            <p className="font-paragraph text-sm text-foreground">
              आपकी बीमा पॉलिसी का डिजिटल समाधान। Your trusted digital insurance platform.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg text-card-heading mb-4">Support</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="font-paragraph text-sm text-foreground">support@licdigital.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="font-paragraph text-sm text-foreground">1800-123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted mt-8 pt-8 text-center">
          <p className="font-paragraph text-sm text-foreground">
            © {new Date().getFullYear()} LIC Digital Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
