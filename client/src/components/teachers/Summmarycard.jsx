import React from "react";

import { motion as Motion } from "framer-motion";

const SummaryCard = ({ title, value, icon }) => (
  <Motion.div 
    className="summary-card"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="card-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{value}</p>
  </Motion.div>
);

export default SummaryCard;