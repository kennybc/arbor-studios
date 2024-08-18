import Page from "@/components/Page";
import Section from "@/components/Section";

import "./index.css";
import { Link } from "react-router-dom";

const Offerings = () => {
  return (
    <Page>
      <Section>
        <h1>Offerings.</h1>
        <p>
          The tactical forms that our design science take & past models of
          collaboration:
        </p>
        <ol>
          <li>
            Atmosphere design and production &#123;including
            workspace/collaborative space/makerspace design, set design,
            immersive art installation design, exhibition & gallery design—&
            production on all such fronts&#125;
          </li>
          <li>
            Strategy consulting &#123;bringing our{" "}
            <Link to="/about">philosophy</Link> and{" "}
            <Link to="/about">design principles</Link> as an animating approach
            to scaffolding new pathways for you & your organization through
            strategic forms of thinking, decision making, and action&#125;
          </li>
          <li>
            Sigil-making &#123;original symbolic forms/matter for many uses:
            ritual, personal, company. Ex.&#x29; custom typesets, logos, tattoo
            designs, protective talismans, mural painting, commissioned
            art&#125;
          </li>
          <li>
            Event production &#123;helping bring to life your existing vision as
            a fully manifested happening—both short-term and long-term&#125;
          </li>
          <li>
            Workshops &#123;bringing our philosophy to your area of interest
            through hands-on and time-limited spaces of engagement,
            collaboration, and co-learning&#125;
          </li>
        </ol>
        <h3>Some possibilities.</h3>
        <p>
          To give you a sense of what work is possible together: designing and
          building an immersive installation for an art exhibition, producing a
          symposium, designing an office-space, designing and installing an
          exhibition/gallery space, designing organizational structures,
          developing conceptual frameworks for personal thinking,
          imagining/directing the development of a company.
        </p>
      </Section>
    </Page>
  );
};

export default Offerings;
