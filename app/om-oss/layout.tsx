import SecondaryHeader from "@/ui/header/SecondaryHeader";

export default function AboutLayout({ children} : { children: React.ReactNode }) {
  return (
    <>
      <SecondaryHeader />
      <main>{children}</main>
    </>
  );
}