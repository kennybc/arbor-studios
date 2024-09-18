import Page from "@/components/Page";
import Section from "@/components/Section";
import Controls from "@/components/Controls";

import "./index.css";

const Metaphysics = () => {
  return (
    <Page>
      <Section>
        <h1>Metaphysics.</h1>
      </Section>
      <Section>
        <p style={{ marginBottom: 0 }}>
          <i>
            I want to believe in another world in the world and I want to be in
          </i>{" "}
          <b>that</b>.
        </p>
        <p style={{ marginTop: 0 }}>– Fred Moten</p>
        <p>
          Welcome to the arborage. More than a design studio, Arbor understands
          ourselves as the middle of a movement. Middle, because everything
          follows a lineage and comes after the Other, and because everything
          happening has been happening. The new world to come will be a world
          that has always existed. We believe in the Other world in this world;
          we not only want to be in it, but know ourselves to be in it. Here are
          our metaphysics, the laws of our world within this world:
        </p>
      </Section>
      <Section>
        <ol>
          <li>
            Ancient futurism &#123;<b>the future</b> is ancient; movement into
            the new must be ancestrally informed; humbleness before the
            mysterious wisdom of age.&#125;
          </li>
          <li>
            Vital technics &#123;<b>technology</b> is a philosophy of the living
            for navigating a spiritual world; spiritual, as in, concerning
            spirit, which is the vital movement of an unfolding cosmic,
            collective life. All tactical moves, especially those with
            endurance, must have a precision & rigor that is acquired through
            attunement to spirit.&#125;
          </li>
          <li>
            Sessile sciences &#123;<b>science</b> is embedded and ecological;
            sciences are systems of knowledge & techniques of relation and
            location within networks of happenings of place & being; such
            systems are invested in locality & responsible to nested
            communities. Sciences are strategic infrastructures of being in
            right relation to place & land as the zones created by encounter
            between many kinds of beings&#125;
          </li>
          <li>
            Design dialectics &#123;<b>design</b> is a system of balance in
            which dynamic polarities become increasingly enfolded and integrated
            within one another. All things contain its counterpart; all states
            move into the next and into its opposite; design is the practice of
            enfolding and synthesizing polarities into/within one another at
            increasingly minute intervals, evening out the peaks and valleys of
            extremity through higher resolution and dimensionality&#125;
          </li>
          <li>
            Infrastructural art &#123;<b>art</b> is a skillful practice of
            catalytic rearrangement of existing elements to produce the
            conditions for new & impossible beings, actions, and systems to
            unfurl. It is expressive and rigorous, aesthetic and
            infrastructural. It affects not only through emotional or spiritual
            force, but by building new systems.&#125;
          </li>
        </ol>
      </Section>
      <Section>
        <p>
          In naming our metaphysics, we hope to begin to{" "}
          <i>restitute the terms and the language</i> that we use to describe
          the work that we do, to bring words like “technology” and “art” closer
          to the way in which <i>we—arbor</i>—use them. We do not hope to
          “change the world” or “make a new world” through this practice of
          renaming, but to make visible a world that has been here all along,
          and which we have always been in.
        </p>
      </Section>
      <Section>
        <Controls index={1} />
      </Section>
    </Page>
  );
};

export default Metaphysics;
