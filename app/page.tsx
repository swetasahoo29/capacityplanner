"use client";

import { useEffect, useRef, useState } from "react";

import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import PlannerForm from "@/components/PlannerForm";
import SuccessPopup from "@/components/SuccessPopup";
import ResultCard from "@/components/ResultCard";
import CapacityOutlook from "@/components/CapacityOutlook";
import ProductionSchedule from "@/components/ProductionSchedule";
import RecentPlans from "@/components/RecentPlans";

interface CapacityResult {
  productionLine: string;
  category: string;

  cut: number;
  sew: number;
  finish: number;
  pack: number;

  quantity: number;
  capacity: number;

  bottleneck: string;

  days: number;

  completion: string;
  shipment: string;

  status: string;

  spilloverDays: number;
  recommendation: string;
}

interface Week {
  week: string;
  utilization: number;
  status: string;
}

interface Plan {
  id: number;
  style_name: string;
  quantity: number;
  status: string;
  completion_date: string;
}

interface Schedule {
  id: number;
  style_name: string;
  production_line_id: number;
  production_start: string;
  completion_date: string;
  status: string;
}

export default function Home() {
  // -----------------------------
  // States
  // -----------------------------

  const [popup, setPopup] = useState(false);

  const [result, setResult] = useState<CapacityResult | null>(null);

  const [weeks, setWeeks] = useState<Week[]>([]);

  const [plans, setPlans] = useState<Plan[]>([]);

  const [schedule, setSchedule] = useState<Schedule[]>([]);

  const resultRef = useRef<HTMLDivElement>(null);

  // -----------------------------
  // Initial Load
  // -----------------------------

  useEffect(() => {
    refreshDashboard();
  }, []);

  // -----------------------------
  // Dashboard Refresh
  // -----------------------------

  async function refreshDashboard() {
    await Promise.all([loadCapacityOutlook(), loadPlans(), loadSchedule()]);
  }

  // -----------------------------
  // Capacity Outlook
  // -----------------------------

  async function loadCapacityOutlook() {
    try {
      const response = await fetch("/api/capacity-outlook");

      const data = await response.json();

      setWeeks(data);
    } catch (error) {
      console.error(error);
    }
  }

  // -----------------------------
  // Recent Plans
  // -----------------------------

  async function loadPlans() {
    try {
      const response = await fetch("/api/recent-plans");

      const data = await response.json();

      setPlans(data);
    } catch (error) {
      console.error(error);
    }
  }

  // -----------------------------
  // Production Schedule
  // -----------------------------

  async function loadSchedule() {
    try {
      const response = await fetch("/api/production-schedule");

      const data = await response.json();

      setSchedule(data);
    } catch (error) {
      console.error(error);
    }
  }

  // -----------------------------
  // Planner Submit
  // -----------------------------

  async function handlePlanner(data: any) {
    try {
      const response = await fetch("/api/capacity-plan", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });

      const plannerResult = await response.json();

      if (!response.ok) {
        alert(plannerResult.error ?? "Unable to create production plan.");

        return;
      }

      setResult(plannerResult);

      await refreshDashboard();

      setPopup(true);
    } catch (error) {
      console.error(error);

      alert("Something went wrong while creating the production plan.");
    }
  }

  // -----------------------------
  // Popup Close
  // -----------------------------

  function closePopup() {
    setPopup(false);

    if (!result) return;

    setTimeout(() => {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 250);
  }

  // -----------------------------
  // Dashboard Status
  // -----------------------------

  const highestUtilization =
    weeks.length > 0 ? Math.max(...weeks.map((week) => week.utilization)) : 0;

  // -----------------------------
  // UI
  // -----------------------------

  return (
    <main className="container">
      <Header />

      <Dashboard plans={plans.length} utilization={highestUtilization} />

      <PlannerForm onSubmit={handlePlanner} />

      <SuccessPopup open={popup} result={result} onClose={closePopup} />

      <div ref={resultRef}>
        <ResultCard result={result} />
      </div>

      <CapacityOutlook weeks={weeks} />

      <ProductionSchedule schedules={schedule} />

      <RecentPlans plans={plans} />
    </main>
  );
}
