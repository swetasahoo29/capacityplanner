import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data: plans } = await supabase.from("production_plans").select("*");

  if (!plans) {
    return NextResponse.json([]);
  }

  const weeks = [
    { week: "Week 1", quantity: 0 },
    { week: "Week 2", quantity: 0 },
    { week: "Week 3", quantity: 0 },
    { week: "Week 4", quantity: 0 },
  ];

  const today = new Date();

  for (const plan of plans) {
    const start = new Date(plan.production_start);

    const completion = new Date(plan.completion_date);

    const effectiveCapacity = Math.ceil(plan.quantity / plan.required_days);

    const weeklyCapacity = effectiveCapacity * 5;

    let current = new Date(start);

    while (current <= completion) {
      const diff = Math.floor(
        (current.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      );

      const week = Math.floor(diff / 7);

      if (week >= 0 && week < 4) {
        weeks[week].quantity += weeklyCapacity;
      }

      current.setDate(current.getDate() + 7);
    }
  }

  const response = weeks.map((week) => {
    const utilization = Math.min(Math.round((week.quantity / 5000) * 100), 100);

    return {
      week: week.week,

      utilization,

      status:
        utilization >= 100
          ? "FULL"
          : utilization >= 80
            ? "NEAR FULL"
            : "AVAILABLE",
    };
  });

  return NextResponse.json(response);
}
