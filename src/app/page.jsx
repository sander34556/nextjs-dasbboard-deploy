"use client"

import Image from "next/image";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession();


  return (
    <main>
      <Container>
        <Navbar session={session} />
        <div className="flex-grow text-center p-10">
          <h3 className="text-5xl">NextJs Dashboard</h3>
          <p>Become full-stack developer with NextJS</p>
          <div className="flex justify-center my-10">

          </div>
        </div>
        <Footer />
      </Container>
    </main>
  );
}
