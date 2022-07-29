import Router from "next/router"
import { MetaHead } from "../../components/Head"
import { LogoWithoutBeta } from "../../components/Logo"
import { useScript } from "../../hooks/useScript"


const Welcome = () => {
    const googleIdentityServiceScriptStatus = useScript("https://accounts.google.com/gsi/client")

    return (
        <div className="min-h-screen">
            <MetaHead />


            <div className="form-container translate-y-1/2 absolute">

                <div className="flex justify-center my-4">
                    <LogoWithoutBeta className={'w-44 text-black'} />

                </div>
                <div className="prose mb-2 mt-7">
                    <h3 className="font-extrabold">Welcome Warriors!</h3>
                </div>

                <div className="text-gray-700 text-sm font-medium mb-2">Unleash the <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">true power</span> of this platform by  logging in:</div>

                <div className="flex flex-col gap-4 my-6">
                    <div onClick={() => {
                        if (googleIdentityServiceScriptStatus === 'ready') {
                            const client = (window as any).google.accounts.oauth2.initCodeClient({
                                client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
                                ux_mode: "redirect",
                                scope: 'https://www.googleapis.com/auth/userinfo.profile',
                                redirect_uri: `${window.location.protocol}//${window.location.host}/api/auth/google/callback`,
                            });

                            client.requestCode();
                        }
                    }} className="bg-white text-black hover:text-white btn rounded-md shadow-xl py-3 flex justify-center items-center gap-2"><span><GoogleIcon /></span> <span>Continue with Google</span></div>
                    <div
                    
                    onClick={() => {
                        const params=new URLSearchParams({
                            client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID??"",
                            redirect_uri: `${window.location.protocol}//${window.location.host}/api/auth/github/callback`,
                            scope: "user:email read:user"
                        })
                        window.location.href=`https://github.com/login/oauth/authorize?${params}`
                    }}
                    
                    className="bg-white text-black hover:text-white btn rounded-md shadow-xl py-3 hover:fill-white flex justify-center items-center gap-2"><span><GitHubIcon /></span> <span>Continue with GitHub</span></div>


                <div className="text-gray-500 mt-4 text-sm font-medium mb-2">By logging in you accept our Privacy Policy and Terms of Service.</div>

                </div>


            </div>
        </div>
    )
}


export default Welcome;



const GitHubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6"  viewBox="0 0 16 16"><path d="M7.999 0C3.582 0 0 3.596 0 8.032a8.031 8.031 0 0 0 5.472 7.621c.4.074.546-.174.546-.387 0-.191-.007-.696-.011-1.366-2.225.485-2.695-1.077-2.695-1.077-.363-.928-.888-1.175-.888-1.175-.727-.498.054-.488.054-.488.803.057 1.225.828 1.225.828.714 1.227 1.873.873 2.329.667.072-.519.279-.873.508-1.074-1.776-.203-3.644-.892-3.644-3.969 0-.877.312-1.594.824-2.156-.083-.203-.357-1.02.078-2.125 0 0 .672-.216 2.2.823a7.633 7.633 0 0 1 2.003-.27 7.65 7.65 0 0 1 2.003.271c1.527-1.039 2.198-.823 2.198-.823.436 1.106.162 1.922.08 2.125.513.562.822 1.279.822 2.156 0 3.085-1.87 3.764-3.652 3.963.287.248.543.738.543 1.487 0 1.074-.01 1.94-.01 2.203 0 .215.144.465.55.386A8.032 8.032 0 0 0 16 8.032C16 3.596 12.418 0 7.999 0z"/></svg>
)



const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" /><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" /><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" /><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" /></svg>
)
