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
        <p style={{ textIndent: 0 }}>
          Reach out to us with any questions you may have and we'll get back to
          you promptly. <br />
          You can contact us via email at the address listed below:
        </p>
      </Section>
      <Section>
        <a className="Contact__email" href="mailto:hello@arbor-age.com">
          hello@arbor-age.com
        </a>
      </Section>
      <Section>
        <Controls index={5} />
      </Section>
    </Page>
  );
};

export default Contact;
