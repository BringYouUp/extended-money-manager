import { Section } from "@entities/Section";
import { ChagePasswordForm } from "@features/Forms";

const Component: React.FC = () => {
  return (
    <>
      <Section.Container>
        <Section.Top>
          <Section.Title>
            <Section.Icon name="user" />
            Profile
          </Section.Title>
        </Section.Top>
      </Section.Container>
      <Section.Container>
        <Section.Top>
          <Section.Title>
            <Section.Icon name="lock" />
            Change password
          </Section.Title>
        </Section.Top>

        <Section.Content>
          <ChagePasswordForm />
        </Section.Content>
      </Section.Container>
    </>
  );
};

export default Component;
