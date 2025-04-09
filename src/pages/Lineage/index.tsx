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
        <p style={{ textIndent: 0 }}>
          <a
            href="https://archive.org/details/taotechingbookab0000laoz"
            target="_blank"
          >
            Tao Te Ching
          </a>
          , trans. Ursula Le Guin
          <br />
          <a
            href="https://archive.org/details/bookofchangesunc0000nihu"
            target="_blank"
          >
            I Ching
          </a>
          , trans. Hua Ching-Ni
          <br />
          <a
            href="https://archive.org/details/Bhagavad-Gita.with.the.Commentary.of.Sri.Shankaracharya"
            target="_blank"
          >
            Bhagavad Gita
          </a>
          <br />
          <a href="https://archive.org/details/KingJamesBible" target="_blank">
            The Holy Bible
          </a>
          , King James Version
          <br />
          Balancing Heaven and Earth, Robert Johnson
          <br />
          These Wilds Beyond Our Fences, Bayo Akomolafe
          <br />
          Vibrant Matter, Jane Bennett
          <br />
          Animacies, Mel Chen
          <br />
          Ornamentalism, Anne Chang
          <br />
          Ghostly Matters, Avery Gordon
          <br />
          Fragments of an Anarchist Anthropology, David Graeber
          <br />
          The Black Shoals, Tiffany Lethabo King
          <br />
          The Mushroom at the End of the World, Anna Tsing
          <br />
          Unsettling the Coloniality of Being/Power/Truth/Freedom, Sylvia Wynter
          <br />
          The Telling, Ursula Le Guin
          <br />
          Companion Species Manifesto, Donna Haraway
          <br />
          Staying with the Trouble, Donna Haraway
          <br />
          Archipelago, Edouard Glissant (conversation with Hans Ulrich Obrist)
          <br />
          Poetics of Relation, Edouard Glissant
          <br />
          Capitalist Realism, Mark Fisher
          <br />
          Emergent Thinking, Adrienne Maree Brown
          <br />
          All About Love, Bell Hooks
          <br />
          Braiding Sweetgrass, Robin Wall Kimmerer
          <br />
          The Undercommons, Fred Moten and Stefano Harney
          <br />
          Subscendence, Timothy Morton
          <br />
          Story of Your Life, Ted Chiang
          <br />
          Demonic Grounds, Katherine McKittrick
          <br />
          Prison Notebooks, Antonio Gramsci
          <br />
          Capital, Marx
          <br />
          Of Other Spaces, Michel Foucault
          <br />
          The Marvelous Clouds, John Durham Peters
          <br />
          Art and Cosmotechnics, Yuk Hui
          <br />
          Carl Jung
          <br />
          Bird Relics, Branka Arsic
          <br />
          Atlas of Emotion, Giuliana Bruno
          <br />
          Decolonizing Nature, T.K. Demos
          <br />
          The Souls of Black Folk, Du Bois
          <br />
          We Were Never Modern, Bruno Latour
          <br />
          Wayward Lives, Beautiful Experiments, Sadiya Hartman
          <br />
          Making, Timothy Ingold
          <br />
          The Expressiveness of the Body, Shigehisa Kuriyama
          <br />
          Politics of Piety, Saba Mahmood
          <br />
          Orientalism, Edward Said
          <br />
          The Tao of Craft, Benebell Wen
        </p>
      </Section>
      <Section>
        <Controls index={4} />
      </Section>
    </Page>
  );
};

export default Lineage;
