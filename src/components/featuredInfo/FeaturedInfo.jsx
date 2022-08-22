import "./featuredInfo.css";


export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">User</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">2,415</span>
          <span className="featuredMoneyRate">
          
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Tour</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">4,415</span>
          <span className="featuredMoneyRate">
    
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
     
    </div>
  );
}
