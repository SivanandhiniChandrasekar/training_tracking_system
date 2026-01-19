import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { course: "React", students: 320 },
  { course: "Python", students: 280 },
  { course: "Data Science", students: 240 },
  { course: "Java", students: 200 },
  { course: "AI Basics", students: 180 },
];

export default function TopCoursesChart() {
  return (
    <div className="chart-card">
      <h3>Top Courses Enrolled</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="course" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="students" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
