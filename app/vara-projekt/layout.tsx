import SecondaryHeader from "@/ui/header/SecondaryHeader";

export default function OurProjectsLayout({ children} : { children: React.ReactNode }) {
  return (
    <>
      <SecondaryHeader />
      <main>{children}</main>
    </>
  );
}