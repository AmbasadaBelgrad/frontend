import ContactSection from "@/widgets/contact-section/ui/ContactSection";
import contactsDataMock from "@/mocks/fixtures/contacts/contact-section.json";
import type { TContactSection } from "@/widgets/contact-section/model/types";
import type { TContactData } from "@/features/contact-form/model/types";
import styles from "./ContactsPage.module.css";

type TContactsPageData = {
  contact_section: TContactSection;
  contact_form: TContactData;
};

const contactsPageData = contactsDataMock as TContactsPageData;

const ContactsPage = () => {
  return (
    <main className={styles.contactsPage}>
      <ContactSection
        sectionData={contactsPageData.contact_section}
        contactData={contactsPageData.contact_form}
        imageLoading="eager"
        imageFetchPriority="high"
      />
    </main>
  );
};

export default ContactsPage;
