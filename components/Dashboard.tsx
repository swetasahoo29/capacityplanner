interface DashboardProps {
  plans: number;
  utilization: number;
}

export default function Dashboard({ plans, utilization }: DashboardProps) {
  const status =
    utilization >= 100 ? "FULL" : utilization >= 80 ? "NEAR FULL" : "AVAILABLE";

  return (
    <section className="dashboard">
      <div className="dashboardCard">
        <h4>Factory Status</h4>

        <div
          className={
            status === "FULL"
              ? "statusRed"
              : status === "NEAR FULL"
                ? "statusBadgeOrange"
                : "statusGreen"
          }
        >
          {status}
        </div>
      </div>

      <div className="dashboardCard">
        <h4>Production Plans</h4>

        <h2>{plans}</h2>
      </div>

      <div className="dashboardCard">
        <h4>Production Lines</h4>

        <h2>3</h2>
      </div>
    </section>
  );
}
