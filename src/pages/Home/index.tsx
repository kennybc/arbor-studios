import "./index.css";
import TarotCard from "@/components/TarotCard";

const Home = () => {
  return (
    <div className="Home">
      <div className="Home__deck">
        {Array.from({ length: 6 }, (_, i) => {
          return <TarotCard key={i} index={i + 1} />;
        })}
      </div>
    </div>
  );
};

export default Home;
