export const generateRandomValue = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomColor = () => {
  const colors = [
    "#4299E1", // blue
    "#48BB78", // green
    "#F6AD55", // orange
    "#9F7AEA", // purple
    "#F687B3", // pink
    "#4FD1C5", // teal
    "#667EEA", // indigo
    "#FC8181", // red
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Past 7 days mock data
export const generatePastWeekData = () => {
  const days = 7;
  const now = new Date();
  return Array.from({ length: days }).map((_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - (days - 1 - i));
    return {
      x: date.toLocaleDateString("en-US", { weekday: "short" }),
      y: generateRandomValue(1000, 5000),
    };
  });
};

// Mock user behavior data
export const funnelData = [
  { x: "Page Views", y: Math.floor(Math.random() * 310000), color: getRandomColor() },
  { x: "Unique Visitors", y: Math.floor(Math.random() * 37500), color: getRandomColor() },
  { x: "Sign Ups", y: Math.floor(Math.random() * 31000), color: getRandomColor() },
  { x: "Active Users", y: Math.floor(Math.random() * 3500), color: getRandomColor() },
  { x: "Paying Customers", y: Math.floor(Math.random() * 3100), color: getRandomColor() },
];

// Mock traffic sources
export const trafficSources = [
  { x: "Organic Search", y: 45 * Math.floor(Math.random() * 3), color: "#4299E1" },
  { x: "Direct", y: 25 * Math.floor(Math.random() * 3), color: "#48BB78" },
  { x: "Social", y: 15 * Math.floor(Math.random() * 3), color: "#F6AD55" },
  { x: "Referral", y: 10 * Math.floor(Math.random() * 3), color: "#9F7AEA" },
  { x: "Other", y: 5 * Math.floor(Math.random() * 3), color: "#F687B3" },
];

// Mock device data
export const deviceData = [
  { x: "Desktop", y: Math.floor(Math.random() * 3 + 60), color: "#4299E1" },
  { x: "Mobile", y: Math.floor(Math.random() * 3 + 35), color: "#48BB78" },
  { x: "Tablet", y: Math.floor(Math.random() * 3 + 35), color: "#F6AD55" },
];
