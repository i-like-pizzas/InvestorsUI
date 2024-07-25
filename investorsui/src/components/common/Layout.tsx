import { PropsWithChildren } from "react";
import { Container } from "reactstrap";

const Layout: React.FC<PropsWithChildren> = (props) => {
	return <main id="main-content">
		<Container fluid={true}>
			{props.children}
		</Container>
	</main>
}

export default Layout;