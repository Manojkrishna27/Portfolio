import { getSocials } from "@/lib/data";
import { DockDemo } from "@/components/Dock";

export default async function DockSection() {
  try {
    const socials = await getSocials();
    const hasSocials = socials && Object.keys(socials).length > 0;
    return <DockDemo socials={hasSocials ? socials : undefined} />;
  } catch {
    return <DockDemo />;
  }
}
