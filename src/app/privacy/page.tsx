import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for iamsaadbilal",
};

export default function PrivacyPage() {
  return (
    <PageLayout>
      <div className="section-padding">
        <div className="container-custom max-w-3xl">
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-10">Last updated: January 2025</p>

          <div className="prose-custom space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Information I Collect</h2>
              <p>
                When you use the contact form on this website, I collect your name, email address,
                and the message you submit. This information is used solely to respond to your inquiry.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">How I Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>To respond to your contact form submissions</li>
                <li>To improve the website experience (via anonymous analytics)</li>
                <li>I do not sell, share, or distribute your personal information to third parties</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Analytics</h2>
              <p>
                This site uses Vercel Analytics to collect anonymous usage data (page views, performance
                metrics). No personally identifiable information is collected through analytics.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Cookies</h2>
              <p>
                This site uses a single cookie to remember your theme preference (dark/light mode).
                No tracking cookies are used.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Contact</h2>
              <p>
                For any privacy-related questions, contact me at{" "}
                <a href="mailto:iamsaadbilal@gmail.com" className="text-primary hover:underline">
                  iamsaadbilal@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
