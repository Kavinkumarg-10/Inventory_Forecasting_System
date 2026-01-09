export default function DashboardSkeleton() {
  return (
    <div className="dashboard-cards">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="stat-card skeleton skeleton-card">
          <div className="skeleton-line skeleton" />
          <div className="skeleton-number skeleton" />
        </div>
      ))}
    </div>
  );
}
