import Page from "@/components/Page";
import Section from "@/components/Section";
import Controls from "@/components/Controls";

import "./index.css";

const System = () => {
  return (
    <Page>
      <Section>
        <h1>System.</h1>
      </Section>
      <Section>
        <p>
          We build unique, individual workstreams for each collaboration. We
          know that all collaborators, artists, and builders arrive with a
          specific set of tools, goals, and dispositions, and that this
          coming-together requires a balancing strategy. The precondition for
          play, experimentation, and communion with the unknown is a common
          ground and space for collaboration that feels safe and secure to those
          who arrive in it.
        </p>
      </Section>
      <Section>
        <p>
          Our working process happens through the development of a collaborative
          infrastructure that balances this need for{" "}
          <i>
            safety (common language/ground—known parameters for contact with
            collaborators)
          </i>{" "}
          with the conditions for{" "}
          <i>emergence (transformative contact with the unknown)</i>.
          Workstreams should be nimble and flexible scaffolding for a shifting
          common ground that can adapt to changing collaborative needs for both
          process and outcome.
        </p>
      </Section>
      <Section>
        <p>
          We consider the workstream to be a predecessor/prototype of the
          infrastructure we build with our collaborators and of paramount
          importance to the design process. Together with our partners, our
          studio develops systems of working-together that build supportive
          conditions for continued creativity, emergent thinking, and intuitive
          development—such as to allow brave, necessary work to take place. Such
          systems will sometimes be published publicly as standalone research
          into the collaborative process and to offer models of work processes
          beyond and other-than “industry norms.”
        </p>
      </Section>
      <Section>
        <p>
          Our emphasis on developing systems of collaboration <i>during</i> and{" "}
          <i>through</i> the collaboration is grounded in our belief that
          radical work is sustained and maintained not through a single
          revelatory idea, but through a system of working which maintains
          within itself an open-ness to goals that reveal themselves overtime,
          with increasing clarity and precision. We want to leave you not only
          with a designed infrastructure that redirects your flow increasingly
          towards your known goals—and anticipates unarticulated goals—but with
          an adaptive, responsive groundwork that invites modification,
          evolution, and continued clarification.
        </p>
      </Section>
      <Section>
        <p>
          <i>Infrastructure</i> has often come to mean <i>institution</i>: a
          system of organization that continuously instates itself, regardless
          of its suitability to be responsible for increasingly
          clarified/high-resolution conditions. Our studio doesn’t know how to
          build institutions—we make collaborative, imaginative
          infrastructure—infrastructure that is not only <i>open to changing</i>
          , but is <i>built as an instrument of balancing state change.</i>
        </p>
      </Section>
      <Section>
        <Controls index={3} />
      </Section>
    </Page>
  );
};

export default System;
