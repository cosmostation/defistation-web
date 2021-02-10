import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';

import { getOfficialDefiName } from '../../util/Util';

import '../../App.css';

import binanceImg1 from "../../assets/images/binance_img@2x.png";

const DefiOverview = observer((props) => {

    const [overviewTag, setOverviewTag] = useState();

    useEffect(() => {

        // console.log("props.defiName2222: ", props.defiName);

        switch (props.defiName) {
            case "pancake":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                        PancakeSwap is one of the top liquidity providers on BSC in terms of swap volume, active users, and gas fee contribution to the BSC ecosystem. Its unique gamification program sets PancakeSwap apart from other AMM protocols, bringing stronger incentive for user participation as well as more token use cases.
                        </span>
                    </div>
                );
                break;
            case "peachswap":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                        An evolution of Uniswap with Peach tokenomics on Binance Smart Chain.
                        </span>
                    </div>
                );
                break;
            case "Streamity":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                        Streamity is an autonomous company on the Binance Smart Chain to provide services in finance, education, healthcare, science and sports spheres.
                        </span>
                    </div>
                );
                break;
            case "bscSwap":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                        Launched on 9 September 2020, BSCswap is a decentralized exchange and an Automated Market Making protocol for Binance Smart Chain. It supports multiple BEP20 tokens over BSC ecosystem to create liquidity and fetch price oracles via on-chain smart contracts. Users can also yield-farm BSCswap LP tokens from the supported projects from BSC ecosystem.
                        </span>
                    </div>
                );
                break;
            case "Spartan Protocol":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        Spartan is a protocol for incentivized liquidity and synthetic assets on Binance Smart Chain.<br /><br />

Spartan Protocol has been audited by Certik. Audit report by Certik: <a href="https://github.com/spartan-protocol/resources/blob/master/certik-audit.pdf" target="_blank">https://github.com/spartan-protocol/resources/blob/master/certik-audit.pdf</a>
                        </span>
                    </div>
                );
                break; 
            case "Burger Swap":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                        Democratized DeFi platform on Binance Smart Chain. List and trade any BEP20 asset. Provide liquidity and participate in community governance to earn from tx fees and liquidity mining rewards.
                        </span>
                    </div>
                );
                break;
            case "Stakecow":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                        MILK Protocol is a yield farming project based on BSC
                        </span>
                    </div>
                );
                break;
            case "alphafinance":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                        Alpha Finance Lab is an ecosystem of DeFi products, starting on Binance Smart Chain and Ethereum. Alpha Finance Lab is focused on building an ecosystem of automated yield-maximizing Alpha products that interoperate to bring optimal alpha to users on a cross-chain level.
                        </span>
                    </div>
                );
                break;    
            case "Cream Finance":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                        C.R.E.A.M. is a peer to peer lending and exchange platform on Ethereum and BSC.
                        </span>
                    </div>
                );
                break; 
            case "Bakery Swap":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                        Bakery Swap is the first AMM and NFT platform on Binance Smart Chain.
                        </span>
                    </div>
                );
                break;
            case "ForTube":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        ForTube is a DeFi money market platform based on The Force Protocol. ForTube Bank is a liquidity pool based lending protocol that enables anyone to supply digital assets to earn interest, or borrow against a collateral. It supports a wide range of digital assets, and the borrowing & lending rates are algorithmically adjusted to incentivise and foster maximum liquidity in pools.<br /><br />

ForTube has a bug bounty program <a href="https://for.tube/bounty" target="_blank">https://for.tube/bounty</a>. The latest public audit reports <a href="https://for.tube/Smart%20Contract%20Security%20Audit%20Report%20-%20Fortube%20Bank%202.0.pdf" target="_blank">https://for.tube/Smart%20Contract%20Security%20Audit%20Report%20-%20Fortube%20Bank%202.0.pdf</a> are provided by the SlowMist team.
                        </span>
                    </div>
                );
                break;
            case "FryWorld":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                        Automated Market Maker built on Binance Smart Chain
                        </span>
                    </div>
                );
                break;  
            case "Narwhalswap":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                            Narwhalswap is an AMM protocol but is on Binance Smart Chain.
                        </span>
                    </div>
                );
                break;  
            case "beefy.finance":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                            beefy.finance is a yield farming optimizer on Binance Smart Chain.
                        </span>
                    </div>
                );
                break;    
            case "STORMSWAP":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                            Aumomated Market Maker built on Binance Smart Chain.
                        </span>
                    </div>
                );
                break;              
            case "BnEX":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                            Decentralized exchange for automated market making built on Binance Smart Chain.
                        </span>
                    </div>
                );
                break;
            case "7up.finance":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        7up.finance is a DeFi Filecoin (FIL) lending and investment platform based on Binance Smart Chain. Through matching the FIL holders and FIL seekers, 7up is designed for the FIL borrowing market. Meanwhile, on the 7up platform, lending itself is a way of mining. Once a loan contract takes effect, the borrower and lender will both receive rewards in 7UP, the native token of the platform.<br /><br />

After the recent launch of the Filecoin mainnet, a huge gap has grown between the large demand for FIL tokens by miners on the Filecoin mainnet and the small circulation volume of the token in the secondary market, a situation caused by Filecoin’s pre-stake mechanism. Filecoin’s economic design requires miners to pledge FIL tokens as initial collateral in order to seal data into valid network sectors so that they can increase their effective storage mining power.<br />
In order to have in-depth and immediate participation in the network activities, miners have to obtain FIL tokens in the secondary market. Therefore, a large demand for FIL tokens has emerged on the market.
                        </span>
                    </div>
                );
                break;
            // case "BFis.finance":
            //     break;
            case "bStable.finance":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        bStable is an open-source, automated market maker (AMM) mechanism especially designed to enable token swaps between any stablecoin on Binance Smart Chain (BSC) at low fees and with minimal price slippage.<br /><br />

The latest bStable public audit report (<a href="https://bstable.finance/assets/audit/report.pdf" target="_blank">https://bstable.finance/assets/audit/report.pdf</a>) was conducted by AnChain.ai (<a href="https://www.anchain.ai/bstable-certificate" target="_blank">https://www.anchain.ai/bstable-certificate</a>).
                        </span>
                    </div>
                );
                break;
            case "Dego":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                            Dego.finance as a NFT+DeFi Fusion Reactor whose transparency and fairness is governed by Law of Codes, for the unprivileged and unbanked underdogs.
                        </span>
                    </div>
                );
                break;
            // case "DODO":
            //     break;
            case "Equator.finance":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                            The Generic Liquidity Protocol: Build Customized Pools with Flexibility
                        </span>
                    </div>
                );
                break;
            case "StableXSwap":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                            StableXSwap is a stablecoin-focused AMM-style decentralized exchange built on Binance Smart Chain. Similar to what Curve.fi did for the Ethereum DEX space, StableXSwap describes itself as the first DEX featuring lower slippage and lower fees for the trading of stable assets. With minimized impermanent loss and lower gas fees on Binance Smart Chain, the swap mechanism is ideal for casual users and experienced arbitrageurs alike.
                        </span>
                    </div>
                );
                break;
            case "QIAN":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        QIAN is a stablecoin protocol based on Ethereum and Binance smart chain. It provides a one-stop liquidity solution for mainstream cryptoassets. It is committed to providing users with immediate access to liquidity by the assets they hold with low risk, no cost, and no loss of ownership. Users can lock their cryptoassets (such as ETH, HBTC, WBTC, USD stablecoins, mainstream exchange platform tokens, etc.) to the protocol and mint the stablecoin QUSD, the stablecoins can also be returned to smart contracts to redeem their assets.<br /><br />

The latest public audit reports (<a href="https://bsc.qian.finance/PeckShield-Audit-Report-QIAN2-v1.0.pdf" target="_blank">https://bsc.qian.finance/PeckShield-Audit-Report-QIAN2-v1.0.pdf</a>) are provided by PeckShield. There's also a bug bounty program (<a href="https://bsc.qian.finance/bounty" target="_blank">https://bsc.qian.finance/bounty</a>) for QIAN.
                        </span>
                    </div>
                );
                break;
            case "Venus":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            Venus Protocol (“Venus”) is an algorithmic-based money market system designed to bring a complete decentralized finance-based lending and credit system onto Binance Smart Chain. Venus enables users to utilize their cryptocurrencies by supplying collateral to the network that may be borrowed by pledging over-collateralized cryptocurrencies. This creates a secure lending environment where the lender receives a compounded interest rate annually (APY) paid per block, while the borrower pays interest on the cryptocurrency borrowed.<br /><br />

These interest rates are set by the protocol in a curve yield, where the rates are automated based on the demand of the specific market, such as Bitcoin. The difference of Venus from other money market protocols is the ability to use the collateral supplied to the market not only to borrow other assets but also to mint synthetic stablecoins with over-collateralized positions that protect the protocol. These synthetic stablecoins are not backed by a basket of fiat currencies but by a basket of cryptocurrencies. Venus utilizes the Binance Smart chain for fast, low-cost transactions while accessing a deep network of wrapped tokens and liquidity.<br /><br />

Check out the latest security audits and reports for Venus: <a href="https://docs.venus.io/docs/security" target="_blank">https://docs.venus.io/docs/security</a>
                        </span>
                    </div>
                );
                break;  
            case "Thugs":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        Welcome to the Traphouse, where Thugs come to do their Defi Yield Farming.  We offer some of the dopest rewards in BSC with our DRUGS token which you can farm by providing liquidity for many popular token pairs.  Once you start earning DRUGS you can hold on to those DRUGS and turn them in to HOES, our staking token.  HOES automatically stake for DRUGS, but they can also be staked in one of our HOES Staking Pools to earn an additional reward token.  You can earn our own GUNS token which will play a big part of our upcoming NFT project, or tokens from projects which have partnered with us to provide their tokens for our community.<br /><br />

Audit done by Vidar the Auditor. No major issues found during initial audit.<br /><br />

<a href="https://ipfs.io/ipfs/QmbWFXdyVbuejK3wmizMMMbGqqMKkJegmkU4vDSLVSv4fZ?filename=Thugs_review_v1.pdf" target="_blank">https://ipfs.io/ipfs/QmbWFXdyVbuejK3wmizMMMbGqqMKkJegmkU4vDSLVSv4fZ?filename=Thugs_review_v1.pdf</a><br /><br />

$10,000 Bug Bounty Program is live, anyone finding bugs in our contracts is welcome to apply for a bounty.  To date, one small concern was brought to our attention with the user interface, corrected and reporter was compensated from the bounty fund.
                        </span>
                    </div>
                );
                break; 
            case "CBerry":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        CBerry is a content sharing system on the Binance Smart Chain. Users are rewarded with CBY and can be tipped in BNB and CBY for quality contents shared. CBerry also integrates DeFi Swap infrastructure to create a solid content creation and reward ecosystem. CBerry aims at producing a platform even better than steemit on the Binance Smart Chain. After registration users can make posts, reactions on the post will mint new CBY tokens as earning for the post, the post author and those who reacted will share whatever was earned on the post after 7 days.<br /><br />

Post can be tipped before and after the 7 days without time limit in BNB and CBY. CBerry will incorporate a Swap system on the platform for easy conversion of assets on the platform. We intend to add other assets on Binance Smart Chain to our wallet also, do that users can be tipped in different assets and a Swap infrastructure will be totally useful in that case.
                        </span>
                    </div>
                );
                break;   
            case "Jetfuel.Finance":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        Jetfuel is a yield farming and yield aggregator platform that combines features from the most successful DeFi projects such as Compound, Fry.World, Yearn, and Harvest on Binance Smart Chain (BSC).<br /><br />

The FUEL token is a deflationary token that burns 1% per transaction. This helps alleviate sell pressure and makes the supply of FUEL more scarce over time.<br />
In addition, FUEL also funds the Jet Hanger with a 1% tax per transaction. The Jet Hanger is an easy to use staking and governance portal where users can control developments and features.<br /><br />

JET is the native governance token of the Jetfuel platform and can be earned by staking FUEL token. It allows users to submit and vote on proposals on the governance page to decentralize the project and put more power within the community rather than the team. Jet holders will earn all the FUEL produced in the hanger, along with a generous rewards rate as a stand-alone farming pool.<br />
Staking will go live 1 week after launch.<br /><br />

The Jet Vault allows users to automate and maximize their returns through various Binance Smart Chain protocols using a variety of liquidity provider tokens, staking tokens and other assets that generate positive yield for the user.<br />
The Jet Vaults will automatically harvest, sell, compound and buy tokens for you so you can maximize your returns without lifting a finger.
                        </span>
                    </div>
                );
                break;   
            case "ACryptoS":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                            
                        </span>
                    </div>
                );
                break;
            case "PancakeBunny":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        PancakeBunny is a new and rapidly growing DeFi yield aggregator that is used for PancakeSwap. PancakeBunny protocol empowers farmers to leverage their yield-seeking tendencies to optimize yield compounding strategy on BSC. We are providing strategies for the various needs of farmers from the highest yield seekers to the risk reward optimizing smart investors.<br /><br />

The PancakeBunny team is dedicated to support the underlying DeFi ecosystem by providing users with an easy way to automatically compound their yields through the Binance Smart Chain. The DeFi movement, and more specifically Yield Aggregators, have seen a huge surge in activity in 2020. The Rise of Yearn, which uses existing protocols such as Compound, DyDx, and Curve, has influenced the development of various other Yield Aggregator projects on the Ethereum Network. Our goal is to expand that same interest through the Binance Smart Chain Ecosystem.
                        </span>
                    </div>
                );
                break;  
            case "AnySwap":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        AnySwap is a fully decentralized cross chain swap protocol, with automated pricing and liquidity system. AnySwap enables swaps between any coins on any blockchain which uses ECDSA or EDDSA as signature algorithm, including BTC, ETH, BNB, USDT, XRP, LTC, FSN, etc.<br /><br />

AnySwap Cross-Chain Bridge is an innovative, safe, and decentralized cross-chain solution based on secure multi-party computation (SMPC) + threshold signature solution (TSS). It is composed of SMPC network based on distributed control rights management (DCRM) and Cross-Chain Bridge smart contract.<br /><br />

The latest public audit reports (<a href="https://github.com/anyswap/Anyswap-Audit/tree/master/SlowMist" target="_blank">https://github.com/anyswap/Anyswap-Audit/tree/master/SlowMist</a>) are provided by the SlowMist team.
                        </span>
                    </div>
                );
                break;
            case "BSC Farm":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        BSC.Farm to be the pioneering step on the Binance Smart Chain (BSC), with a mission to be the leader in listing Yield Farms projects. Countless yield farms surface on the Binance Smart Chain (BSC) daily; the difficult part is sorting through this information efficiently and effectively. Between the rise in rug-pulls and the increasing number of farms, the research begins to create a diminishing return vs. time. This is where BSC Farm proposes their solution. The BSC.Farm team aims to create a platform to track and research farms so users can make more informed investment decisions. The platform allows users to efficiently search for projects, investments, opportunities and avoid scams.<br /><br />

Yield Farmers who incorporate BSC.Farm could save hours and even days of research through their aggregated list of BSC farms. BSC.Farm reduces the diminished reward lost due to excessive research, users’ time.
                        </span>
                    </div>
                );
                break;    
            case "bDollar Protocol":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        bDollar is the first algorithmic stablecoin on Binance Smart Chain with an innovative solution that can adjust its supply deterministically to move the price of the token in the direction of a target price to bring programmability and interoperability to DeFi. Inspired by Basis and its predecessors, bDollar is a multi-token protocol that consists of three tokens: BDO (the algorithmic stablecoin), bDollar Shares (or sBDO, which holders can claim BDO inflation when the network expands), and bDollar Bonds (or bBDO, which can be purchased at a discount rate when the network is in contraction and can be redeemed for BDO when the network comes to its deflationary phase and price goes below 1$).<br /><br />
                        </span>
                    </div>
                );
                break;    
            case "Autofarm":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        AutoFarm aggregates the best vaults on BSC and implements the most optimal strategies to maximize users’ yields. The AUTO token is the platform’s native token, with a max supply of 80,000. AUTO holders benefit from a small fee on profits from Autofarm vaults. To be distributed to platform users till approximately Nov 2021. There was no pre-sale, no pre-farm. AUTO holders will also benefit from the expansion of the autofarm ecosystem. Expansion plans include a highly efficient DEX aggregator.<br /><br />

Audit report - <a href="https://beta.autofarm.network/audit_vidar_autofarm_v2.pdf" target="_blank">https://beta.autofarm.network/audit_vidar_autofarm_v2.pdf</a>
                        </span>
                    </div>
                );
                break;     
            case "Binance Agile Set Dollar":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        BASD is as an algorithmic stable coin pegged to BUSD. It's creation was inspired by the Empty Set Squad and utilizes the metrics from Dynamic Set Dollar with some alterations to the epoch length, coupon expiry and epoch advance rewards. The protocol is designed to be an agile reserve for the growing BSC DeFi ecosystem and a decentralized alternative to BUSD.<br /><br />

The ESD metrics were initially worked on and improved for the DSD model and similarly; the BASD team have made further improvements to these metrics. The epoch time has been reduced to 1 hour, the coupon expiry to 15 days and the epoch advance reward has been reduced. Utilizing the Binance Smart Chain has allowed us to lower the reward from 50 native tokens to just 1.5 BASD due to the transaction costing as little a $0.30 to run.<br /><br />

Audit is underway by Vidar the Auditor.
                        </span>
                    </div>
                );
                break;                                           
            default:
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewTitle">-</span><br /><div className="defiOverviewBr"></div>
                        <span className="defiOverviewContent">
                        -
                        </span>
                    </div>
                );
                break;
        }
        
        return () => {

        };
    }, [props.defiName])

    return (
        <>
            {overviewTag}
        </>
    );
})

export default DefiOverview;