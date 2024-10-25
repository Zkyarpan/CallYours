import CallNotification from "@/components/CallNotification";
import Container from "@/components/layout/Container";
import HeroSection from "@/components/layout/HeroSection";
import Navbar from "@/components/layout/Navbar";
import ListOnlineUsers from "@/components/ListOnlineUsers";

export default function Home() {
  return (
    <div>
      <Container>
        {/* <ListOnlineUsers />
        <CallNotification /> */}
        <>
          {/* <Navbar /> */}
          <HeroSection />
        </>
      </Container>
    </div>
  );
}
