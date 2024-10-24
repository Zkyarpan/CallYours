import CallNotification from "@/components/CallNotification";
import Container from "@/components/layout/Container";
import ListOnlineUsers from "@/components/ListOnlineUsers";

export default function Home() {
  return (
    <div>
      <Container>
        <ListOnlineUsers />
        <CallNotification/>
      </Container>
    </div>
  );
}
