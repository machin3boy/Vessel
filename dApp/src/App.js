import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/DappPages/Home/Home';
import Epoch from './components/DappPages/Epoch/Epoch';
import Layout from './components/Navigation/Layout/Layout';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';

function getLibrary(provider) {
	return new Web3(provider);
}

function App() {
	const routes = (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/Epoch" component={Epoch} />
			<Redirect to="/" />
		</Switch>
	);

	return (
		<>
			<Web3ReactProvider getLibrary={getLibrary}>
				<Layout>{routes}</Layout>
			</Web3ReactProvider>
		</>
	);
}

export default App;
