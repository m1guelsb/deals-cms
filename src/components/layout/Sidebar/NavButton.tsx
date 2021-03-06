import { IconButton } from "@/components/form";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";

interface NavButton {
  href: string;
  iconSrc: string;
}
export const NavButton = ({ href, iconSrc }: NavButton) => {
  const { asPath } = useRouter();

  let isActive = false;

  if (asPath.includes(href)) {
    isActive = true;
  }
  return (
    <Link href={href} passHref>
      <a>
        <IconButton
          sType={isActive ? "primary" : "secondary"}
          iconSrc={iconSrc}
        />
      </a>
    </Link>
  );
};
