import {Menu, Container, Button} from "semantic-ui-react";
import Link from "next/link";
import {useRouter} from "next/router";

export const Navbar = () => {
    const router = useRouter();
    return (
    <Menu inverted borderless style={{padding: ".3rem", marginBottom: "20px"}} attached>
        <Container>
            <Menu.Item name="home">
                <Link href="/">
                    <img src="/react-js.svg" />
                </Link>
            </Menu.Item>
            <Menu.Menu position="right">
                <Button 
                    size="=mini"
                    primary
                    onClick={() => router.push("/forms/new")}
                >
                    New Form
                </Button>
            </Menu.Menu>
        </Container>
    </Menu>
    )
}
