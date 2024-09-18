import Page from "@/components/Page";
import Section from "@/components/Section";
import Controls from "@/components/Controls";

import "./index.css";

const Lineage = () => {
  return (
    <Page>
      <Section>
        <h1> Lineage </h1>
      </Section>
      <Section>
        <Controls index={4} />
      </Section>
    </Page>
  );
};

export default Lineage;
