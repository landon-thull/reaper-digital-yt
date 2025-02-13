"use client";

import styles from "./contactForm.module.scss";
import { useForm } from "react-hook-form";
import { ContactFormSchema, ContactFormType } from "@/interfaces/interfaces";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormType>({ resolver: zodResolver(ContactFormSchema) });
  const [successMessage, setSuccessMessage] = useState<string>("");

  const onSubmit = async (data: ContactFormType) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccessMessage("Your message has been sent! Thank you!");
        reset();
      } else {
        setSuccessMessage("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSuccessMessage("An error has occurred. Please try again later.");
    }
  };

  return (
    <div className={styles["container"]}>
      <form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles["title"]}>Ready to Scale Up?</h3>
        <p className={styles["text"]}>
          Drop us your details, and we'll call you back.
        </p>
        <label className={styles["label"]}>
          Name
          <input
            className={styles["input"]}
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </label>
        <label className={styles["label"]}>
          Email
          <input
            className={styles["input"]}
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </label>
        <label className={styles["label"]}>
          Phone
          <input
            className={styles["input"]}
            {...register("phone", { required: "Phone number is required" })}
            placeholder="Phone"
          />
          {errors.phone && (
            <p className={styles.error}>{errors.phone.message}</p>
          )}
        </label>
        <label className={styles["label"]}>
          Zipcode
          <input
            className={styles["input"]}
            {...register("zipcode")}
            placeholder="Zipcode"
          />
          {errors.zipcode && (
            <p className={styles.error}>{errors.zipcode.message}</p>
          )}
        </label>
        <label className={styles["label"]}>
          Message
          <textarea
            className={`${styles["input"]} ${styles["textarea"]}`}
            {...register("message", { required: "Message is required" })}
            placeholder="Message"
          ></textarea>
          {errors.message && (
            <p className={styles.error}>{errors.message.message}</p>
          )}
        </label>
        <button
          className={`${styles["button-solid"]} ${styles["submit"]}`}
          type="submit"
        >
          Request a Callback
        </button>
        {successMessage && <p className={styles.success}>{successMessage}</p>}
      </form>
    </div>
  );
}
