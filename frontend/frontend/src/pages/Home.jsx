import "../styles/home.css";

import Hero from "../components/Hero";
import OurStory from "../components/OurStory";
import Goals from "../components/Goals";
import ScrollNavigator from "../components/ScrollNavigator";

function Home() {
    return (
        <>
            <ScrollNavigator />
            <Hero />
            <OurStory />
            <Goals />
        </>
    );
}

export default Home;