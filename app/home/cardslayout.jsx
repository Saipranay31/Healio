import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#E5F4DD] font-montreal">
      <div className="p-8">
        <h1 className="text-4xl font-medium text-[#2d4c2d] mb-2">
          Hey Saipranay!, Welcome To Healio!
        </h1>
        <p className="text-[#547454] text-lg mb-8">
          Ready To Take The Next Step Toward A Calmer, More Balanced Life?
          <br />
          Explore Our Tools And Resources Designed Just For You
        </p>

        <div className="rounded-2xl border border-[#89AE76] bg-white/50 p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mb-6">
            <Link href="/ai">
              <Card className="p-6 rounded-xl border-[#89AE76] hover:shadow-lg transition">
                <h2 className="text-2xl text-[#2d4c2d] text-center">Healio AI</h2>
              </Card>
            </Link>
            <Link href="/activities">
              <Card className="p-6 rounded-xl border-[#89AE76] hover:shadow-lg transition">
                <h2 className="text-2xl text-[#2d4c2d] text-center">Activities</h2>
              </Card>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <Link href="/check-in">
              <Card className="p-6 rounded-xl border-[#89AE76] hover:shadow-lg transition">
                <h2 className="text-2xl text-[#2d4c2d] text-center">
                  Daily Mood Check-In
                </h2>
              </Card>
            </Link>
            <Link href="/gratitude">
              <Card className="p-6 rounded-xl border-[#89AE76] hover:shadow-lg transition">
                <h2 className="text-2xl text-[#2d4c2d] text-center">
                  Gratitude Journal
                </h2>
              </Card>
            </Link>
            <Link href="/chats">
              <Card className="p-6 rounded-xl border-[#89AE76] hover:shadow-lg transition">
                <h2 className="text-2xl text-[#2d4c2d] text-center">
                  Anonymous Chats
                </h2>
              </Card>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/stories">
              <Card className="p-6 rounded-xl border-[#89AE76] hover:shadow-lg transition">
                <h2 className="text-2xl text-[#2d4c2d] text-center">
                  Story Generator
                </h2>
              </Card>
            </Link>
            <Link href="/community">
              <Card className="p-6 rounded-xl border-[#89AE76] hover:shadow-lg transition">
                <h2 className="text-2xl text-[#2d4c2d] text-center">
                  Community Forum
                </h2>
              </Card>
            </Link>
            <Link href="/goals">
              <Card className="p-6 rounded-xl border-[#89AE76] hover:shadow-lg transition">
                <h2 className="text-2xl text-[#2d4c2d] text-center">
                  Goal Tracking
                </h2>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
