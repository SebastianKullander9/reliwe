import SecondaryHeader from "@/ui/header/SecondaryHeader";

export default function ContactLayout({ children} : { children: React.ReactNode }) {
  return (
    <>
      <SecondaryHeader />
      <main>{children}</main>
    </>
  );
}