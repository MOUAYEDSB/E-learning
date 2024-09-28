import './LineChartCard.css';
import { assets } from '../../../assets/assets';

const LineChartCard = () => {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Graines Chart</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adip</p>
        <button className="save-report-btn">
          <img src={assets.icon} alt="Save Icon" />
          Save Report
        </button>
      </div>
      {/* Replace with your actual chart implementation */}
      <div className="chart-content">
        <img src={assets.vector7} alt="Chart" className="chart-path" />
        <div className="tooltip">
          <div className="tooltip-text">
            <span>56 Subs</span>
            <span>Oct 18th, 2024</span>
          </div>
          <img src={assets.background2} alt="Tooltip Background" className="tooltip-bg" />
          <img src={assets.dot} alt="Dot" className="tooltip-dot" />
        </div>
      </div>
      <div className="chart-footer">
        <span>Sunday</span>
        <span>Monday</span>
        <span>Tuesday</span>
        <span>Wednesday</span>
        <span>Thursday</span>
        <span>Friday</span>
        <span>Saturday</span>
      </div>
    </div>
  );
};

export default LineChartCard;