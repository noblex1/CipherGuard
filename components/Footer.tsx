import { Shield, ExternalLink, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg gradient-text">CipherGuard</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Enhanced Caesar Cipher with Dynamic Key, Multi-Round Encryption, and Automated Cryptanalysis Tool.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/encrypt" className="text-muted-foreground hover:text-primary transition-colors">
                  Encryption
                </Link>
              </li>
              <li>
                <Link href="/decrypt" className="text-muted-foreground hover:text-primary transition-colors">
                  Decryption
                </Link>
              </li>
              <li>
                <Link href="/cryptanalysis" className="text-muted-foreground hover:text-primary transition-colors">
                  Cryptanalysis
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/learn" className="text-muted-foreground hover:text-primary transition-colors">
                  Learn
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Security Dashboard
                </Link>
              </li>
              <li>
                <Link href="/reports" className="text-muted-foreground hover:text-primary transition-colors">
                  Reports
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Final Year Computer Science Project
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>© 2026 CipherGuard. All rights reserved. Built for academic purposes.</p>
        </div>
      </div>
    </footer>
  );
}
