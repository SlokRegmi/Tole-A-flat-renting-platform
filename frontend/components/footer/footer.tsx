// React and Next.js imports
import Image from "next/image";
import Link from "next/link";

// Third-party library imports
import Balancer from "react-wrap-balancer";

// UI component imports
import { Button } from "../ui/button";

// Icon imports
import { Github, Twitter, Facebook } from "lucide-react";

// Local component imports
import { Section, Container } from "../craft";

// Asset imports
import Logo from "@/public/logo.png";

export default function Footer() {
    return (
      <footer className="w-full bg-black text-white">
        <Section>
          <Container className="grid gap-6 w-full ">
            <div className="not-prose flex flex-col gap-6">
              <Link href="/">
                <h3 className="sr-only">Tole</h3>
                <Image
                  src={Logo}
                  alt="Logo"
                  width={120}
                  height={27.27}
                  className="transition-all hover:opacity-75 dark:invert"
                ></Image>
              </Link>
              <p>
                <Balancer>
                "Tole is a comprehensive platform designed to help you discover the best rental properties, tailored to your preferences and location, ensuring you find the perfect place to call home."
                </Balancer>
              </p>
            </div>
            <div className="mb-4 flex flex-col gap-4 md:mb-0 md:flex-row">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-of-service">Terms of Service</Link>
              <Link href="/cookie-policy">Cookie Policy</Link>
            </div>
          </Container>
          <Container className="not-prose flex flex-col justify-between gap-6 border-t md:flex-row md:items-center md:gap-2">
            <div className="flex gap-2">
              <Button  size="icon">
                <Github />
              </Button>
              <Button  size="icon">
                <Twitter />
              </Button>
              <Button  size="icon">
                <Facebook />
              </Button>
            </div>
            <p className="text-muted-foreground">
              ©{" "}
              <a href="https://github.com/brijr/components">Tole</a>.
              All rights reserved. 2024-present.
            </p>
          </Container>
        </Section>
      </footer>
    );
  }
  
