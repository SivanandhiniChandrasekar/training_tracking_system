const DashboardCard = ({ title, value }) => {
  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        minWidth: "200px",
        textAlign: "center",
        background: "#f9f9f9",
      }}
    >
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
};

export default DashboardCard;
