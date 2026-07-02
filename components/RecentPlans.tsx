interface Plan {
  id: number;
  style_name: string;
  quantity: number;
  status: string;
  completion_date: string;
}

type Props = {
  plans: Plan[];
};

export default function RecentPlans({ plans }: Props) {
  if (!plans.length) return null;

  return (
    <section className="resultCard">
      <h2>Recent Production Plans</h2>

      <table>
        <thead>
          <tr>
            <th>Style</th>

            <th>Quantity</th>

            <th>Status</th>

            <th>Completion</th>
          </tr>
        </thead>

        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.style_name}</td>

              <td>{plan.quantity}</td>

              <td>
                <span
                  className={
                    plan.status === "FULL"
                      ? "statusBadgeRed"
                      : "statusBadgeGreen"
                  }
                >
                  {plan.status}
                </span>
              </td>

              <td>{plan.completion_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
