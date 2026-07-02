interface WeekData {
  week: string;
  utilization: number;
  status: string;
}

type Props = {
  weeks: WeekData[];
};

export default function CapacityOutlook({ weeks }: Props) {
  if (!weeks.length) return null;

  return (
    <section className="resultCard">
      <h2>4 Week Capacity Outlook</h2>

      <p className="outlookDescription">
        Factory availability forecast for the next four weeks.
      </p>

      {weeks.map((week) => (
        <div key={week.week} className="weekCard">
          <div className="weekHeader">
            <h3>{week.week}</h3>

            <span
              className={
                week.status === "FULL"
                  ? "statusBadgeRed"
                  : week.status === "NEAR FULL"
                    ? "statusBadgeOrange"
                    : "statusBadgeGreen"
              }
            >
              {week.status}
            </span>
          </div>

          <div className="weekFooter">
            <span>Capacity Status</span>

            <strong>{week.status}</strong>
          </div>
        </div>
      ))}
    </section>
  );
}
