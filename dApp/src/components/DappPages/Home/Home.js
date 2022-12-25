import styled from 'styled-components';
import theme from '../../Theme/theme';
import bp from '../../Theme/breakpoints';
import Footer from '../../Navigation/Footer/Footer';
import blueGlow from '../../../assets/images/BLUE_round.svg';
import greenGlow from '../../../assets/images/GREEN_round.svg';
import darkBlueGlow from '../../../assets/images/PURPLE_round.svg';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import AssetCards from '../../Charts/AssetCards';
import VotesTable from '../../Charts/VotesTable';
import InformationButtonGreyed from '../../Button/InformationButton/InformationButtonGreyed';
import PrimaryButton from '../../Button/Primary/PrimaryButton';
import 'animate.css/animate.min.css';
import * as contractMethods from '../../../contract/contract_methods';
import React from 'react';
import Web3 from 'web3';
import VoteModal from '../../PopUps/VoteScreen';
import SkeletonHome from '../../skeletonLoads/skeletonHome';
import { tokenData } from '../../../Data/tokens';

const PageWrapper = styled.div`
	padding: 0 28px 64px 28px;
	max-width: 1560px;
	margin: 0 auto;
	height: 100%;
	background-color: transparent;
	position: relative;
	overflow: hidden;

	@media ${bp.sm} {
		position: relative;
	}
	@media ${bp.xl} {
		position: relative;
		max-height: 100%;
	}
`;

const SectionWrapper = styled.div`
	border-radius: 15px;
	padding: 0 24px 0 24px;
	width: 90%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	background-color: transparent;
	margin: 0px auto;
`;

const DappCardWrapper = styled.div`
	border-radius: 15px;
	padding: 0 24px 0 24px;
	width: 90%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	position: relative;
	background-color: transparent;
	margin: 0px auto;
	margin-bottom: 100px;
`;

const PageHeader = styled.div`
	width: 85%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-top: 40px;
	margin: 0 auto;
	align-items: space-between;
	position: relative;
	background-color: transparent;
	@media ${bp.sm} {
		flex-direction: row;
	}
`;

const AssetAllocationContainer = styled.div`
	display: flex;
	flex-direction: column-reverse;
	justify-content: center;
	width: 100%;
	align-items: center;
	margin-bottom: 10px;
	margin-top: -10px;
	@media ${bp.smd} {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
		align-items: center;
		margin-bottom: 10px;
		margin-top: -10px;
	}
`;

const UserAndGraphContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 30px;
	width: 100%;
	align-items: center;
	@media ${bp.sm} {
		display: flex;
		flex-direction: column;
		margin-top: 30px;
		align-items: flex-end;
	}
	@media ${bp.md} {
		display: flex;
		flex-direction: column;
		margin-top: 30px;
		align-items: flex-end;
	}
	@media ${bp.lg} {
		display: flex;
		flex-direction: column;
		margin-top: 20px;
		align-items: flex-end;
	}
	@media ${bp.xl} {
		display: flex;
		flex-direction: column;
		margin-top: -15px;
		align-items: flex-end;
	}
`;

const AboutSectionHeader = styled.h1`
	max-width: 700px;
	color: ${theme.color.text.primary};
	margin-bottom: 16px;
	text-align: flex-start;
	font-size: 36px;
	@media ${bp.sm} {
		text-align: left;
		font-size: 50px;
	}
`;

const AboutSectionSubHeader = styled.div`
	color: ${theme.color.text.primary};
	margin-bottom: 0px;
	text-align: flex-start;
	justify-content: flex-start;
	justify-text: flex-start;
	font-size: 20px;
	margin-right: 20px;
	&:hover {
		cursor: pointer;
	}
	@media ${bp.md} {
		margin-right: 20px;
		text-align: left;
		font-size: 28px;
	}
`;

const AboutSectionSubHeaderInactive = styled.div`
	color: ${theme.color.text.secondary};
	margin-bottom: 0px;
	text-align: flex-start;
	justify-content: flex-start;
	justify-text: flex-start;
	font-size: 20px;
	margin-right: 20px;
	&:hover {
		cursor: pointer;
	}
	@media ${bp.md} {
		margin-right: 20px;
		text-align: left;
		font-size: 28px;
	}
`;

const AssetCardsContainer = styled.div`
	padding-top: 50px;
	padding-bottom: 10px;
	position: relative;
	justify-content: center;
	margin-left: 20px;
	margin-right: 20px;
	@media ${bp.sm} {
		width: 55%;
		display: flex;
		justify-content: center;
	}
`;

const BackgroundBlurLeft = styled.img`
	left: -30%;
	opacity: 30%;
	position: absolute;
	z-index: -1;
	min-width: 800px;
	min-height: 600px;
	margin-top: -100px;
	object-fit: fill;
	@media ${bp.sm} {
		left: -5%;
		max-width: 100%;
		margin-top: -100px;
	}

	@media ${bp.xl} {
		left: -1%;
		max-width: 100%;
		margin-top: -100px;
	}
`;

const BackgroundBlurRight = styled.img`
	position: absolute;
	z-index: -1;
	opacity: 30%;
	right: 0;
	min-width: 800px;
	min-height: 600px;
	margin-top: -100px;
	object-fit: fill;
	@media ${bp.sm} {
		right: 0;
		max-width: 100%;
		margin-top: -100px;
	}

	@media ${bp.xl} {
		right: 0;
		max-width: 100%;
		margin-top: -100px;
	}
`;

const UserBoxContent = styled.div`
	display: flex;
	flex-direction: column;
	padding: 24px;
	background: rgba(30, 55, 52, 0.62);
	backdrop-filter: blur(10px);
	border-radius: 16px;
	margin-bottom: 20px;
	justify-content: center;
	color: ${theme.color.text.primary};
	border: 0px solid rgba(255, 255, 255, 0.2);
	width: 110%;
	@media ${bp.sm} {
		width: 70%;
		max-width: 70%;
	}
	@media ${bp.smd} {
		width: 350px;
	}
	@media ${bp.md} {
		width: 400px;
	}
	@media ${bp.lg} {
		width: 500px;
	}
`;

const BoxHeader = styled.h1`
	color: ${theme.color.text.primary};
	margin-bottom: 16px;
	text-align: flex-start;
	font-size: 16px;
	display: flex;
	justify-content: space-between;
	padding-bottom: 4px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	@media ${bp.md} {
		color: ${theme.color.text.primary};
		margin-bottom: 16px;
		text-align: flex-start;
		font-size: 24px;
		display: flex;
		justify-content: space-between;
		padding-bottom: 4px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	}
`;

const BoxSubHeader = styled.h1`
	color: ${theme.color.text.primary};
	margin-bottom: 16px;
	text-align: flex-start;
	margin-left: 5px;
	font-size: 14px;
	display: flex;
	justify-content: flex-start;
	padding-bottom: 4px;

	@media ${bp.md} {
		color: ${theme.color.text.primary};
		margin-bottom: 16px;
		text-align: flex-start;
		font-size: 16px;
		font-weight: 700;
		display: flex;
		justify-content: flex-start;
		padding-bottom: 4px;
	}
`;

const VoteContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: space-between;
	width: 40%;
`;

const SubheaderContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-left;
	width: 300px;
	@media ${bp.md} {
		width: 400px;
	}
`;

const VoteDescriptionContainer = styled.div`
	display: flex;
	flex-direction: column;
	font-weight: 100px;
	font-size: 12px;
	margin-bottom: 40px;
	padding-left: 5px;
	padding-right: 10px;
	@media ${bp.sm} {
		font-size: 16px;
	}
`;

const HomePage = () => {
	const [walletConnectedMode, setWalletConnectedMode] = React.useState(false);
	const [walletAddress, setWalletAddress] = React.useState('');
	const [votedStatus, setVotedStatus] = React.useState('disconnected');
	const [viewAssetAllocation, setViewAssetAllocation] = React.useState(true);
	const [recievedContractData, setRecievedContractData] = React.useState(false);
	const [viewVotes, setViewVotes] = React.useState(false);
	const [isLoaded, setIsLoaded] = React.useState(false);
	const [totalVotesCast, setTotalVotesCast] = React.useState(0);
	const [VSLTokens, setVSLTokens] = React.useState([]);
	const [balancedRatio, setBalancedRatio] = React.useState([]);
	const [assetVotes, setAssetVotes] = React.useState([]);
	const [assetPrices, setAssetPrices] = React.useState([]);
	const [rtAssetPrices, setRealTimeAssetPrices] = React.useState([]);
	const [thisUserVotes, setUserVotes] = React.useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	const [showModal, setShowModal] = React.useState(false);
	const [epochNumber, setEpochNumber] = React.useState(0);
	const [lastEpochVoteCast, setLastEpochVotesCast] = React.useState(0);
	const [userBalance, setUserBalance] = React.useState(0);
	const [userHasVotedThisSession, setUserHasVotedThisSession] = React.useState(0);
	const [walletHasSwappedThisSession, setWalletHasSwappedThisSession] = React.useState(0);
	const [tokenNames, setTokenNames] = React.useState([]);

	/* listen to event emitted from change in local storage, set Wallet Connect Mode for 
	appropriate component rerender */
	window.addEventListener('storage', function getFromStorage() {
		// When local storage changes, dump the list to
		// the console.
		//console.log('hello from event listener');
		if (localStorage.getItem('account') === '' || localStorage.getItem('account') === null) {
			setWalletConnectedMode(false);
			setUserVotes([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
		} else if (localStorage.getItem('account') !== '' || localStorage.getItem('account') !== null) {
			setWalletConnectedMode(true);
			setWalletAddress(localStorage.getItem('account'));
			setWalletHasSwappedThisSession(walletHasSwappedThisSession + 1);
		}
		setVoteStatusOfUser();
		window.removeEventListener('storage', getFromStorage);
	});

	/*change availability of vote button based on account connection and account vote status*/
	React.useEffect(() => {
		setVoteStatusOfUser();
	}, [thisUserVotes, walletConnectedMode, userBalance, lastEpochVoteCast]);

	/* get necessary data from Contract to display */
	React.useEffect(() => {
		const getContractData = async () => {
			// if wallet is connected, pull contract data and wallet data
			console.log('attempting wallet connect');
			try {
				if (!window.ethereum || localStorage.getItem('account') === '') {
					console.log('no account found');
					throw new Error('No crypto wallet found. Please install it.');
				}
				const web3 = new Web3(window.ethereum);
				web3.eth.setProvider(Web3.givenProvider);
				const accounts = await window.ethereum.request({ method: 'eth_accounts' });

				if (recievedContractData === false) {
					//	console.log('getting contract data');
					await getContractDataWithoutAccount();
					//	console.log('recieved contract data');
					setRecievedContractData(true);
				}

				//console.log('getting wallet data');
				await getContractAccountData(accounts);
				//console.log('recieved wallet data');
				setWalletConnectedMode(true);

				// if wallet not connected, just pull contract data
			} catch (err) {
				console.log(err.message);
				await getContractDataWithoutAccount();
			}
			setIsLoaded(true);
		};
		getContractData();
	}, [walletConnectedMode, recievedContractData, userHasVotedThisSession]);

	const setVoteStatusOfUser = () => {
		if (!walletConnectedMode) {
			setVotedStatus('disconnected');
		} else if (walletConnectedMode && lastEpochVoteCast < epochNumber && Number(userBalance) >= 1) {
			setVotedStatus('canVote');
		} else if (walletConnectedMode && Number(userBalance) < 1) {
			setVotedStatus('minBalance');
		} else if (walletConnectedMode && lastEpochVoteCast === epochNumber) {
			setVotedStatus('voted');
		}
	};

	/*
	this function sets the state values for all contract values that DO
	depend on the user's wallet account being connected.
	*/
	const getContractAccountData = async accounts => {
		const account = accounts[0];
		const accountContractData = await Promise.all([
			// votes from user
			Promise.all(
				[...Array(20)].map((e, i) => {
					return contractMethods.getUserVotes(account, i);
				}),
			),
			// last epoch votes
			contractMethods.lastEpochVoteCast(account),
			// number of current epoch
			contractMethods.epochNumber(),
			// balance of user's wallet
			contractMethods.balanceOf(account),
		]);

		//console.log('got users wallet data + balance');
		//console.log(accountContractData[3] / 10 ** 18);
		// if lastEpochVoteCast === epoch number, show votes, otherwise initialise votes displayed as 0's.
		if (accountContractData[1] === accountContractData[2]) {
			setUserVotes(accountContractData[0]);
		} else {
			setUserVotes([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
		}
		setLastEpochVotesCast(accountContractData[1]);
		setEpochNumber(accountContractData[2]);
		setUserBalance(accountContractData[3] / 10 ** 18);
		//console.log(userBalance);
	};

	/*
	this function sets the state values for all contract values that do NOT
	depend on the user's wallet account being connected.
	*/
	const getContractDataWithoutAccount = async () => {
		const allContractData = await Promise.all([
			// addresses
			Promise.all(
				[...Array(20)].map((e, i) => {
					return contractMethods.getCoinAddress(i);
				}),
			),
			//ratios
			Promise.all(
				[...Array(20)].map((e, i) => {
					return contractMethods.getBalancedRatio(i);
				}),
			),
			//assetTotalVotes
			Promise.all(
				[...Array(20)].map((e, i) => {
					return contractMethods.getCoinVotes(i);
				}),
			),
			// assetTotalPrices
			Promise.all(
				[...Array(20)].map((e, i) => {
					return contractMethods.getLastEpochPrices(i);
				}),
			),
			//total votes
			contractMethods.totalVotesCast(),
		]);

		const RTP = await Promise.all(
			allContractData[0].map((e, i) => {
				return contractMethods.getQuote(allContractData[0][i]);
			}),
		);

		const tokenNamesArr = [...Array(20)].map((e, i) => {
			return tokenData[allContractData[0][i]].name;
		});

		function renameFiles(arr) {
			var count = {};
			arr.forEach(function (x, i) {
				if (arr.indexOf(x) !== i) {
					var c = x in count ? (count[x] = count[x] + 1) : (count[x] = 1);
					var j = c + 1;
					var k = x + '(' + j + ')';

					while (arr.indexOf(k) !== -1) k = x + '(' + ++j + ')';
					arr[i] = k;
				}
			});
			return arr;
		}

		setTokenNames(renameFiles(tokenNamesArr));
		setVSLTokens(allContractData[0]);
		setBalancedRatio(allContractData[1]);
		setAssetVotes(allContractData[2]);
		setAssetPrices(allContractData[3]);
		setTotalVotesCast(allContractData[4]);
		setRealTimeAssetPrices(RTP);
	};

	const sleep = milliseconds => {
		return new Promise(resolve => setTimeout(resolve, milliseconds));
	};

	/* handle the contract send transaction when the user submits their vote allocation for the 
	current epoch. */
	const handleVotesSubmission = async submittedVotes => {
		try {
			if (!window.ethereum || localStorage.getItem('account') === '') {
				throw new Error('No crypto wallet found. Please install it.');
			}
			const web3 = new Web3(window.ethereum);
			web3.eth.setProvider(Web3.givenProvider);
			const contract = new web3.eth.Contract(contractMethods.cABI);
			const accounts = await window.ethereum.request({ method: 'eth_accounts' });
			const account = accounts[0];
			const contractAddress = contractMethods.cAddr;

			const transactionParameters = {
				from: account,
				to: contractAddress,
				gasPrice: web3.eth.gasPrice,
				gasLimit: (await web3.eth.getBlock('latest')).gasLimit,
				data: contract.methods.vote(submittedVotes).encodeABI(),
			};

			const txHash = await window.ethereum.request({
				method: 'eth_sendTransaction',
				params: [transactionParameters],
			});
			let transactionReceipt = null;
			while (transactionReceipt == null) {
				// Waiting expectedBlockTime until the transaction is mined
				transactionReceipt = await web3.eth.getTransactionReceipt(txHash);
				await sleep(1000);
			}
			if (transactionReceipt.status === true) {
				setUserHasVotedThisSession(userHasVotedThisSession + 1);
				console.log('transaction confirmed, rerendering...');
			} else {
				console.log('transaction failed, VOTE DID NOT GO THROUGH. NOT RERENDERING');
			}
			// get contract data to activate state trigger updates

			// if wallet not connected, just pull contract data
		} catch (err) {
			console.log('error submitting vote: ' + err.message);
		}
	};

	return !isLoaded ? (
		<SkeletonHome />
	) : (
		<>
			<PageWrapper>
				<PageHeader>
					<TitleContainer>
						<AboutSectionHeader>Voting</AboutSectionHeader>
						{viewAssetAllocation ? (
							<SubheaderContainer>
								<AboutSectionSubHeader
									onClick={() => {
										setViewAssetAllocation(true);
										setViewVotes(false);
									}}
								>
									Asset Allocation
								</AboutSectionSubHeader>

								<AboutSectionSubHeaderInactive
									onClick={() => {
										setViewAssetAllocation(false);
										setViewVotes(true);
									}}
								>
									Votes
								</AboutSectionSubHeaderInactive>
							</SubheaderContainer>
						) : (
							<SubheaderContainer>
								<AboutSectionSubHeaderInactive
									onClick={() => {
										setViewAssetAllocation(true);
										setViewVotes(false);
									}}
								>
									Asset Allocation
								</AboutSectionSubHeaderInactive>

								<AboutSectionSubHeader
									onClick={() => {
										setViewAssetAllocation(false);
										setViewVotes(true);
									}}
								>
									Votes
								</AboutSectionSubHeader>
							</SubheaderContainer>
						)}
					</TitleContainer>
					<UserAndGraphContainer>
						<UserBoxContent>
							<BoxHeader>Voting</BoxHeader>
							<VoteContainer>
								<BoxSubHeader>How does voting work?</BoxSubHeader>
								<VoteDescriptionContainer>
									Users can vote on the percentage allocation of tokens in the fund. In doing so,
									users decide how Vessel evolves.
								</VoteDescriptionContainer>
								{votedStatus === 'canVote' ? (
									<PrimaryButton
										onClick={() => {
											setShowModal(true);
											document.body.style.overflow = 'hidden';
										}}
									>
										Vote now
									</PrimaryButton>
								) : votedStatus === 'disconnected' ? (
									<InformationButtonGreyed>connect wallet to vote</InformationButtonGreyed>
								) : votedStatus === 'voted' ? (
									<InformationButtonGreyed>Your vote has been submitted</InformationButtonGreyed>
								) : votedStatus === 'minBalance' ? (
									<InformationButtonGreyed>Need at least 1 $VSL to vote</InformationButtonGreyed>
								) : null}
							</VoteContainer>
						</UserBoxContent>
					</UserAndGraphContainer>
				</PageHeader>

				<BackgroundBlurLeft src={greenGlow} alt="blue Glow" />

				{viewAssetAllocation && !viewVotes ? (
					<DappCardWrapper>
						<AssetAllocationContainer>
							<AssetCardsContainer>
								<AssetCards
									names={tokenNames}
									prices={assetPrices}
									votes={assetVotes}
									wrappertokens={VSLTokens}
									ratio={balancedRatio}
									realtimeprices={rtAssetPrices}
								/>
							</AssetCardsContainer>
						</AssetAllocationContainer>
					</DappCardWrapper>
				) : (
					<DappCardWrapper>
						<VotesTable
							names={tokenNames}
							prices={assetPrices}
							votes={assetVotes}
							wrappertokens={VSLTokens}
							ratio={balancedRatio}
							realtimeprices={rtAssetPrices}
							totalVotes={totalVotesCast}
							userVotes={thisUserVotes}
						/>
					</DappCardWrapper>
				)}
				<BackgroundBlurLeft src={darkBlueGlow} alt="blue Glow" />
				<SectionWrapper>
					<BackgroundBlurRight src={blueGlow} alt="blue Glow" />
				</SectionWrapper>
			</PageWrapper>
			<VoteModal
				onClose={() => {
					setShowModal(false);
					document.body.style.overflow = 'unset';
				}}
				open={showModal}
				wrappertokens={VSLTokens}
				names={tokenNames}
				onSubmit={submittedVotes => {
					handleVotesSubmission(submittedVotes);
				}}
				//supportCurrent={balancedRatio}
				supportCurrent={thisUserVotes}
			/>
			<Footer />
		</>
	);
};

export default HomePage;
