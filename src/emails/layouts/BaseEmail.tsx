import { Html, Head, Body, Container, Text } from "@react-email/components";

export function BaseEmail({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head />
      <Body>
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "24px",
          }}
        >
          {children}
          <Text style={{ fontSize: "12px", color: "#999" }}>
            © {new Date().getFullYear()} NoteGrid
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
