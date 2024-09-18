import Page from "@/components/Page";
import Section from "@/components/Section";
import Controls from "@/components/Controls";

import "./index.css";

const About = () => {
  return (
    <Page>
      <Section>
        <h1>About & core principles.</h1>
      </Section>
      <Section>
        <p>
          Arbor studio is an atmosphere design studio specializing in making
          infrastructural art. At the core of our work is the desire to
          collaborate on building imaginative & flexible infrastructures for
          sustainable, relational worlds.
        </p>
        <p>Below are the core principles behind our design science.</p>
      </Section>
      <Section>
        <h2>Design is cosmotechnical and fractal.</h2>
        <p>
          Our approach considers design as cosmotechnical and fractal: The
          smallest decision mirrors the total vision and each decision is
          embedded within a larger cosmos of nested ecosystems, rippling through
          the whole. Design must be aware of and responsible for many scales.
        </p>
      </Section>
      <Section>
        <h2>Ecological being requires technique and skillful design.</h2>
        <p>
          We aim to become increasingly intentional about our designs and
          decisions, knowing that each action or arrangement we make defines a
          location and specific relation with everything around us—from the
          smallest and most immediate atmosphere to the all-encompassing and
          cosmic. Each design decision suggests and enacts a particular
          politics, ethics, and philosophy of being in the world.
        </p>
      </Section>
      <Section>
        <h2>Precision in the way of poetry.</h2>
        <p>
          Our approach to designs seeks precision in the way of poetry’s
          precision: nondeterministic, emergent, and principled. We want to help
          you choose precise tactics, in alignment with your principles and
          ours, in a true collaboration.
        </p>
      </Section>
      <Section>
        <h2>Tactical engagement for intuitive, emergent work.</h2>
        <p>
          We use precise and artistic tactics, manipulating specific variables,
          using grounded variables as an anchor for a project vision that is
          continuously emerging, to help you shape & co-create the atmosphere of
          your work—whether that is physical or conceptual infrastructure,
          though we find most projects to be a bit of both.
        </p>
      </Section>
      <Section>
        <h2>Art is infrastructure, infrastructure is art.</h2>
        <p>
          We believe in the potential of art beyond the manner in which it is
          being produced & consumed currently, captured by the neoliberal “art
          market.” Art has been sequestered into a realm of the public in which
          it can have no bearing on our built world—and, indeed, is understood
          commonly as oppositional to the sciences, which are seen as
          infrastructural and fundamental. We believe that art is, above all, a
          skillful practice of catalytic rearrangement of existing elements to
          produce the conditions for new & impossible beings, actions, and
          systems to unfurl.
        </p>
        <p>
          <i>The question of radical infrastructure</i> must necessarily deploy
          art as a strategy to ask after new and unknown horizons.
        </p>
      </Section>
      <Section>
        <Controls index={0} />
      </Section>
    </Page>
  );
};

export default About;
