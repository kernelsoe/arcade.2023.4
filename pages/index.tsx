import Layout from "@/components/layout";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Layout>
      <div>
        <h1 className="text-strpo bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]">
          Arcade Computer
        </h1>
      </div>
    </Layout>
  );
}
