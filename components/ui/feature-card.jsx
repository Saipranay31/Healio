import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export function FeatureCard({ title, href, icon: Icon }) {
  return (
    <Card className="hover:bg-[#e5f0e5] transition-colors">
      <Link href={href}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#2d5a27]">
            <Icon className="h-5 w-5" />
            {title}
          </CardTitle>
        </CardHeader>
      </Link>
    </Card>
  );
}

