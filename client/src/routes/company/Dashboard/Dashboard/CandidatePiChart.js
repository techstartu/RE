import { useRef, useEffect, useState } from "react";

// Define the CandidatePieChart component
const CandidatePieChart = () => {
  // Create a reference to the canvas element
  const chartRef = useRef(null);

  // Initialize state for storing application response data
  const [pieInfo, setPieInfo] = useState({
    interviewed: 0,
    shortlisted: 0,
    hired: 0,
  });

  // Temporary for now; data will come from the database
  const getPieInfo = async () => {
    try {
      // Make an asynchronous request to fetch application response data
      const res = await fetch("/company/getPieInfo", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      // Parse the response data and update the state
      const data = await res.json();
      setPieInfo(data);
      console.log("Data from pie info", data);
    } catch (error) {
      console.log(error);
    }
  };

  // Use the useEffect hook to fetch application response data when the component mounts
  useEffect(() => {
    getPieInfo();
  }, []);

  // Use another useEffect hook to redraw the pie chart when the pieInfo state changes
  useEffect(() => {
    drawPieChart();
  }, [pieInfo]);

  // Function to draw the pie chart
  const drawPieChart = () => {
    const canvas = chartRef.current;
    const context = canvas.getContext("2d");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const radius = Math.min(centerX, centerY) - 10; // Adjust margin

    const total = pieInfo.interviewed + pieInfo.hired + pieInfo.shortlisted;
    const startAngle = 0;
    const endAngleRejected = (pieInfo.interviewed / total) * 2 * Math.PI;
    const endAngleHired = (pieInfo.hired / total) * 2 * Math.PI;
    const endAngleShortlisted = (pieInfo.shortlisted / total) * 2 * Math.PI;

    context.clearRect(0, 0, canvasWidth, canvasHeight);

    drawSlice(
      context,
      centerX,
      centerY,
      radius,
      startAngle,
      endAngleRejected,
      "#d4ace9"
    );
    drawSlice(
      context,
      centerX,
      centerY,
      radius,
      endAngleRejected,
      endAngleRejected + endAngleHired,
      "#9747ff"
    );
    drawSlice(
      context,
      centerX,
      centerY,
      radius,
      endAngleRejected + endAngleHired,
      endAngleRejected + endAngleHired + endAngleShortlisted,
      "#6d0e9d"
    );

    drawHollowCircle(context, centerX, centerY, radius * 0.5, "#FFFFFF"); // Draw a white circle in the center
  };

  // Function to draw a slice of the pie chart
  const drawSlice = (
    context,
    centerX,
    centerY,
    radius,
    startAngle,
    endAngle,
    color
  ) => {
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius, startAngle, endAngle);
    context.closePath();
    context.fillStyle = color;
    context.fill();
  };

  // Function to draw a hollow circle in the center of the pie chart
  const drawHollowCircle = (context, centerX, centerY, radius, color) => {
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = color;
    context.fill();
  };

  // Render the pie chart component
  return (
    <div className="candidate-pie-chart-container">
      <div>
        <h3>Application Response</h3>
      </div>
      <canvas ref={chartRef} width={250} height={250} />
      <div className="pie-chart-bottom-div">
        <div>
          <span className="pie-chart-span span-shortlisted"></span>
          <p>{pieInfo.hired}</p>
        </div>
        <div>
          <span className="pie-chart-span span-hired"></span>
          <p>{pieInfo.interviewed}</p>
        </div>
        <div>
          <span className="pie-chart-span span-rejected"></span>
          <p>{pieInfo.shortlisted}</p>
        </div>
      </div>
    </div>
  );
};

export default CandidatePieChart;
