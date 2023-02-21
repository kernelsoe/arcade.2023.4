import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Meta from "../layout/meta";

export default function AppLayout({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {
  return (
    <>
      <Meta {...meta} />
      <div className="text-stone-400">
        <div className="absolute flex h-8 w-full max-w-screen-xl items-center justify-between border-b-[1px] border-b-stone-700 bg-stone-800 px-2 xl:mx-auto">
          <Link href="/" className="flex items-center font-display">
            <Image
              src="/logo.png"
              alt="Arcade Computer logo"
              width="18"
              height="18"
              className="mr-2 rounded-sm"
            ></Image>
            <p>Arcade</p>
          </Link>
        </div>
      </div>
      <main className="h-screen w-screen bg-stone-800 py-10 px-8 text-stone-200">
        {children}
      </main>
    </>
  );
}
