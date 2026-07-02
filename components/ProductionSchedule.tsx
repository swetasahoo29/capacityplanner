interface Schedule {
  id: number;
  style_name: string;
  production_line_id: number;
  production_start: string;
  completion_date: string;
  status: string;
}

type Props = {
  schedules: Schedule[];
};

export default function ProductionSchedule({ schedules }: Props) {
  if (!schedules.length) return null;

  return (
    <section className="resultCard">
      <h2>Production Schedule</h2>

      <table>
        <thead>
          <tr>
            <th>Style</th>

            <th>Line</th>

            <th>Start</th>

            <th>Completion</th>

            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>{schedule.style_name}</td>

              <td>Line {schedule.production_line_id}</td>

              <td>{schedule.production_start}</td>

              <td>{schedule.completion_date}</td>

              <td>
                <span
                  className={
                    schedule.status === "FULL"
                      ? "statusBadgeRed"
                      : "statusBadgeGreen"
                  }
                >
                  {schedule.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
