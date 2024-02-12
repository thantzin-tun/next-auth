import * as React from "react";
import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Img,
    Section,
    Text,
} from "@react-email/components";
import { get_url } from "@/lib/get_url";

export function EmailTemplate(email: string, token: string) {
    const baseUrl = get_url();

    return (
        <Html>
            <Body style={main}>
                <Container style={container}>
                    <Img
                        src={`${baseUrl}/static/email.png`}
                        width="40"
                        height="40"
                        alt="logo"
                    />
                    <Text style={title}>
                        <strong>@{email.substring(0, 5)}</strong>, a personal
                        access was created on your account.
                    </Text>

                    <Section style={section}>
                        <Text style={text}>
                            Hey <strong>{email.substring(0, 3)}</strong>!
                        </Text>
                        <Text style={text}>
                            Thanks for starting the new account creation
                            process. We want to make sure it's really you.
                            Please click the following verification link when
                            prompted.
                        </Text>
                        <Button
                            style={button}
                            href={`${baseUrl}/verification?token=${token}`}
                        >
                            Click to Verify!
                        </Button>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

const main = {
    backgroundColor: "#ffffff",
    color: "#24292e",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
    maxWidth: "480px",
    margin: "0 auto",
    padding: "20px 0 48px",
};

const title = {
    fontSize: "24px",
    lineHeight: 1.25,
};

const section = {
    padding: "24px",
    border: "solid 1px #dedede",
    borderRadius: "5px",
    textAlign: "center" as const,
};

const text = {
    margin: "0 0 10px 0",
    textAlign: "left" as const,
};

const button = {
    fontSize: "14px",
    backgroundColor: "#000000",
    color: "#fff",
    lineHeight: 1.5,
    borderRadius: "0.5em",
    padding: "12px 24px",
    fontWeight: "bold",
};

const links = {
    textAlign: "center" as const,
};

const link = {
    color: "#0366d6",
    fontSize: "12px",
};

const footer = {
    color: "#6a737d",
    fontSize: "12px",
    textAlign: "center" as const,
    marginTop: "60px",
};
