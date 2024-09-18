import Page from "@/components/Page";
import Section from "@/components/Section";
import Controls from "@/components/Controls";

import "./index.css";

const Contact = () => {
  return (
    <Page>
      <Section>
        <h1> Contact & Connect </h1>
      </Section>
      <Section>
        <Controls index={5} />
      </Section>
    </Page>
  );
};

export default Contact;
