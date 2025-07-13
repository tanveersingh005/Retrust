import React from 'react';
import Footer from '../components/Footer';
import ImpactStats from '../components/ImpactStats';
import LevelProgress from '../components/LevelProgress';
import RedeemCredits from '../components/RedeemCredits';
import ImpactTimeline from '../components/ImpactTimeline';
import { useAuth } from '../context/useAuth';

const getLevelInfo = (co2, credits, returned) => {
  // Example logic: you can adjust thresholds as needed
  if (co2 === 0 && credits === 0 && returned === 0) {
    return { level: 1, label: 'Newbie', progress: 0, nextLevel: 2 };
  } else if (co2 < 50) {
    return { level: 2, label: 'Eco-Starter', progress: 25, nextLevel: 3 };
  } else if (co2 < 100) {
    return { level: 3, label: 'Eco-Advancer', progress: 50, nextLevel: 4 };
  } else if (co2 < 200) {
    return { level: 4, label: 'Eco-Champion', progress: 75, nextLevel: 5 };
  } else {
    return { level: 5, label: 'Eco-Legend', progress: 100, nextLevel: null };
  }
};

const getRank = (credits) => {
  if (credits === 0) return 'Unranked';
  if (credits < 100) return 'Top 50%';
  if (credits < 300) return 'Top 25%';
  if (credits < 600) return 'Top 10%';
  return 'Top 1%';
};

const ImpactDashboard = () => {
  const { user } = useAuth();

  // Demo data for guests
  const demo = {
    co2: 12450,
    credits: 5800,
    returned: 3200,
    rank: 'Top 10%',
    level: 4,
    label: 'Eco-Champion',
    progress: 75,
    nextLevel: 5,
    milestones: [
      { icon: <img src="./assets/trophy.png" alt="First Product Returned" className="w-7 h-7 object-contain" />, label: 'First Product Returned', date: 'June 15, 2023' },
      { icon: <img src="./assets/milestone2.png" alt="Reached Level 2" className="w-7 h-7 object-contain" />, label: 'Reached Level 2', date: 'July 20, 2023' },
      { icon: <img src="./assets/milestone3.png" alt="Top 20% of Users" className="w-7 h-7 object-contain" />, label: 'Top 20% of Users', date: 'August 5, 2023' },
    ],
  };

  const co2 = user ? (user.CO2_saved || 0) : demo.co2;
  const credits = user ? (user.credits || 0) : demo.credits;
  const returned = user ? (user.productsReturned || 0) : demo.returned;
  const rank = user ? getRank(credits) : demo.rank;
  const { level, label, progress, nextLevel } = user
    ? getLevelInfo(co2, credits, returned)
    : { level: demo.level, label: demo.label, progress: demo.progress, nextLevel: demo.nextLevel };
  const milestones = user
    ? (() => {
        const arr = [];
        if (returned === 0) {
          arr.push({
            icon: <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Newbie" className="w-7 h-7 object-contain" />, label: 'Welcome! Start your eco journey.', date: ''
          });
        } else {
          if (returned >= 1) arr.push({ icon: <img src="./assets/trophy.png" alt="First Product Returned" className="w-7 h-7 object-contain" />, label: 'First Product Returned', date: '' });
          if (returned >= 5) arr.push({ icon: <img src="./assets/milestone2.png" alt="Reached Level 2" className="w-7 h-7 object-contain" />, label: 'Reached Level 2', date: '' });
          if (returned >= 10) arr.push({ icon: <img src="./assets/milestone3.png" alt="Top 20% of Users" className="w-7 h-7 object-contain" />, label: 'Top 20% of Users', date: '' });
        }
        return arr;
      })()
    : demo.milestones;

  return (
    <>
      <div className="bg-[#f7faf7] min-h-screen w-full pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 tracking-tight text-center">Your Impact</h1>
          <ImpactStats co2={co2} credits={credits} returned={returned} rank={rank} />
          <LevelProgress level={level} progress={progress} nextLevel={nextLevel} label={label} />
          <RedeemCredits />
          <ImpactTimeline milestones={milestones} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ImpactDashboard; 