export default function Loading() {
  return (
    <main className="main-content">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Loading your tasks...</p>
      </div>

      <div className="stats-row">
        <div className="stat-card loading-card"></div>
        <div className="stat-card loading-card"></div>
        <div className="stat-card loading-card"></div>
        <div className="stat-card loading-card"></div>
      </div>

      <div className="content-grid">
        <div className="panel loading-panel"></div>

        <div>
          <div className="panel loading-panel"></div>
          <div className="panel loading-panel"></div>
        </div>
      </div>
    </main>
  );
}