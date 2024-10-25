import CallNotification from "@/components/CallNotification";
import Container from "@/components/layout/Container";
import ListOnlineUsers from "@/components/ListOnlineUsers";

const Features = () => {
  return (
    <div>
      <Container>
        <ListOnlineUsers />
        <CallNotification />
      </Container>
    </div>
  );
};

export default Features;
