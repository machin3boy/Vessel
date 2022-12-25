import styled from 'styled-components';
import bp from '../../../Theme/breakpoints';
import ConnectButton from '../../../Button/ConnectWallet/ConnectWallet';
import SecondaryButton from '../../../Button/Secondary/SecondaryButton';
import NavItem from '../NavItem/NavItem';
import ExternalNavItem from '../NavItem/ExternalNavItem';
import * as middleware_setup from '../../../../contract/middleware_setup';

const MenuNav = styled.nav`
	font-weight: bold;
	display: none;

	@media ${bp.md} {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}
`;

const buyVSLLink = 'https://pancake.kiemtienonline360.com/#/swap?outputCurrency=' + middleware_setup.contractAddress;

const Menu = () => {
	return (
		<MenuNav>
			<NavItem link="/">Vote</NavItem>
			<NavItem link="/Epoch">Epoch</NavItem>
			<ExternalNavItem href="https://vessel.finance/#/About" target="_blank">
				About
			</ExternalNavItem>
			<ExternalNavItem href="https://vessel.finance/#/Documentation" target="_blank">
				Documentation
			</ExternalNavItem>
			<ConnectButton />
			<SecondaryButton
				onClick={e => {
					e.preventDefault();
					window.open(buyVSLLink, '_blank');
				}}
			>
				Buy VSL
			</SecondaryButton>
		</MenuNav>
	);
};

export default Menu;
