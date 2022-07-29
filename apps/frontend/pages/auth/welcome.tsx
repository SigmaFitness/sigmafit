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
                        console.log()
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
                    <div className="bg-white text-black hover:text-white btn rounded-md shadow-xl py-3 flex justify-center items-center gap-2"><span><TwitterIcon /></span> <span>Continue with Twitter</span></div>


                <div className="text-gray-500 mt-4 text-sm font-medium mb-2">By logging in you accept our Privacy Policy and Terms of Service.</div>

                </div>


            </div>
        </div>
    )
}


export default Welcome;



const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6" viewBox="0 0 16 16"><path fill="#03A9F4" d="M16 3.539a6.839 6.839 0 0 1-1.89.518 3.262 3.262 0 0 0 1.443-1.813 6.555 6.555 0 0 1-2.08.794 3.28 3.28 0 0 0-5.674 2.243c0 .26.022.51.076.748a9.284 9.284 0 0 1-6.761-3.431 3.285 3.285 0 0 0 1.008 4.384A3.24 3.24 0 0 1 .64 6.578v.036a3.295 3.295 0 0 0 2.628 3.223 3.274 3.274 0 0 1-.86.108 2.9 2.9 0 0 1-.621-.056 3.311 3.311 0 0 0 3.065 2.285 6.59 6.59 0 0 1-4.067 1.399c-.269 0-.527-.012-.785-.045A9.234 9.234 0 0 0 5.032 15c6.036 0 9.336-5 9.336-9.334 0-.145-.005-.285-.012-.424A6.544 6.544 0 0 0 16 3.539z" /></svg>
)



const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" /><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" /><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" /><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" /></svg>
)
