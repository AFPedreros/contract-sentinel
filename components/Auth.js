import { useState, useEffect, useRef } from "react";

import SocialLogin from "@biconomy/web3-auth";
import { ChainId } from "@biconomy/core-types";
import { ethers } from "ethers";
import SmartAccount from "@biconomy/smart-account";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function Auth() {
    const [smartAccount, setSmartAccount] = useState();
    const [interval, enableInterval] = useState(false);
    const sdkRef = useRef();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let configureLogin;
        if (interval) {
            configureLogin = setInterval(() => {
                if (!!sdkRef.current?.provider) {
                    setupSmartAccount();
                    clearInterval(configureLogin);
                }
            }, 1000);
        }
    }, [interval]);

    async function login() {
        if (!sdkRef.current) {
            const socialLoginSDK = new SocialLogin();
            const signature1 = await socialLoginSDK.whitelistUrl(
                "https://contract-sentinel.vercel.app/"
            );
            await socialLoginSDK.init({
                chainId: ethers.utils.hexValue(ChainId.POLYGON_MAINNET),
                whitelistUrls: {
                    "https://contract-sentinel.vercel.app/": signature1,
                },
            });
            sdkRef.current = socialLoginSDK;
        }
        if (!sdkRef.current.provider) {
            // sdkRef.current.showConnectModal()
            sdkRef.current.showWallet();
            enableInterval(true);
        } else {
            setupSmartAccount();
        }
    }

    async function setupSmartAccount() {
        if (!sdkRef?.current?.provider) return;
        sdkRef.current.hideWallet();
        setLoading(true);
        const web3Provider = new ethers.providers.Web3Provider(
            sdkRef.current.provider
        );
        try {
            const smartAccount = new SmartAccount(web3Provider, {
                activeNetworkId: ChainId.POLYGON_MAINNET,
                supportedNetworksIds: [ChainId.POLYGON_MAINNET],
            });
            await smartAccount.init();
            setSmartAccount(smartAccount);
            setLoading(false);
        } catch (err) {
            console.log("error setting up smart account... ", err);
        }
    }

    const logout = async () => {
        if (!sdkRef.current) {
            console.error("Web3Modal not initialized.");
            return;
        }
        await sdkRef.current.logout();
        sdkRef.current.hideWallet();
        setSmartAccount(null);
        enableInterval(false);
    };

    return (
        <div className="py-4 md:py-0">
            {!smartAccount && !loading && (
                <button
                    className={`${
                        loading
                            ? "bg-[#4351C5] cursor-wait"
                            : "bg-[#4f5fe4] cursor-pointer"
                    } rounded-lg px-4 py-1 text-white
                 hover:bg-[#4351C5] font-semibold shadow-md`}
                    onClick={login}
                >
                    Login
                </button>
            )}
            {/* {loading && <p>Loading account details...</p>} */}
            {smartAccount && (
                <div className="flex items-center gap-2 py-4 md:py-0">
                    {/* <h3>Smart account address:</h3> */}
                    <CopyToClipboard text={smartAccount.address}>
                        <p className="cursor-pointer font-bold text-xl md:text-base md:text-normal">
                            {smartAccount.address.substr(0, 6)}...
                            {smartAccount.address.substr(
                                smartAccount.address.length - 4
                            )}
                        </p>
                    </CopyToClipboard>
                    <button
                        className={`${
                            loading
                                ? "bg-[#4351C5] cursor-wait"
                                : "bg-[#4f5fe4] cursor-pointer"
                        } rounded-lg px-4 py-1 text-white
                         hover:bg-[#4351C5] font-semibold shadow-md`}
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
