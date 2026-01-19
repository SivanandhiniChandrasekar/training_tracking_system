import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* Header */}
      <h2 className="dashboard-title">Welcome back, Chelsea 👋</h2>

      {/* Top Cards */}
      <div className="card-grid">
        <StatCard title="Total Courses" value="128" color="blue" />
        <StatCard title="Active Students" value="4,532" color="green" />
        <StatCard title="Courses Published" value="67" color="orange" />
        <StatCard title="Pending Submissions" value="152" color="red" />
      </div>

      {/* Middle Section */}
      <div className="dashboard-grid">
        {/* Bar Chart */}
        <div className="card large">
          <h3>Top Engaged Courses</h3>
          <div className="bar-chart">
            {[
              { name: "Web Dev", value: 300 },
              { name: "Data Science", value: 250 },
              { name: "UX Design", value: 485 },
              { name: "Python", value: 350 },
              { name: "Marketing", value: 420 },
            ].map((c) => (
              <div key={c.name} className="bar-item">
                <div className="bar" style={{ height: `${c.value / 5}px` }} />
                <span>{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="card">
          <h3>Recent Activity</h3>
          <ul className="activity-list">
            <li>📘 Course updated – Advanced Data Structures</li>
            <li>📝 Assignment submitted – React Hooks</li>
            <li>🎓 New enrollment – Python for Beginners</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="dashboard-grid">
        {/* Table */}
        <div className="card large">
          <h3>Engagement Breakdown</h3>
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Enrollments</th>
                <th>Completion</th>
                <th>Avg Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Web Development</td>
                <td>450</td>
                <td>75%</td>
                <td>85</td>
              </tr>
              <tr>
                <td>Data Science</td>
                <td>350</td>
                <td>68%</td>
                <td>88</td>
              </tr>
              <tr>
                <td>UI/UX Design</td>
                <td>600</td>
                <td>76%</td>
                <td>90</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Progress */}
        <div className="card">
          <h3>Assignment & Quiz Overview</h3>

          <Progress label="Assignments" value={80} />
          <Progress label="Quiz Engagement" value={65} />
          <Progress label="Pending Grading" value={40} />
        </div>
      </div>
    </div>
  );
}

/* Reusable Components */
function StatCard({ title, value, color }) {
  return (
    <div className={`stat-card ${color}`}>
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

function Progress({ label, value }) {
  return (
    <div className="progress-box">
      <span>{label}</span>
      <div className="progress-bar">
        <div style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
