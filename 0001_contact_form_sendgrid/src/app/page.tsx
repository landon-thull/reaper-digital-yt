import ContactForm from "@/components/ContactForm";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles["page"]}>
      <h1 className={styles["heading"]}>Reaper Digital</h1>
      <ContactForm />
    </div>
  );
}
