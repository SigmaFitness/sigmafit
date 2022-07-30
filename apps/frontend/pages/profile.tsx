import { CheckIcon, XIcon } from "@heroicons/react/solid";
import { user } from "@sigmafit/commons/dist/prismaGenTypes";
import { useQuery } from "react-query";
import { ErrorResponse, getUserProfile, useGetCurrentUserQuery } from "../api";
import { MetaHead } from "../components/Head"
import { Navbar } from "../components/Navbar";
import { withAuthHOC } from "../hooks/withAuthHOC";
import { DescriptionText } from "./sessionSchema/[id]/view";



const Profile = () => {
    const { data, isLoading } = useQuery<user, ErrorResponse>("getUserProfile", getUserProfile); // no need to check for loading and all

    return (
        <div>
            <MetaHead />
            <Navbar />

            <div className="mt-10">
                {isLoading || !data ? <div className="alert">Loading</div> :
                    <div className="mx-auto max-w-lg px-4">

                        <div className="prose mb-6 ml-2 text-xl">
                            <h2>Profile</h2>
                        </div>
                        <div className="relative">
                            <div className="bg-gray-700 h-48 rounded-t-xl overflow-hidden">
                                <img src="https://unsplash.com/photos/T_Qe4QlMIvQ/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTZ8fHdhbGxwYXBlcnxlbnwwfHx8fDE2NTkxODMyODI&force=true&w=640" />
                            </div>
                            <div className="avatar absolute -bottom-5 left-5">
                                <div className="w-20 rounded-full">
                                    <img src={data.picture} />
                                </div>
                            </div>
                        </div>


                        <div className="border bg-base-200 rounded-b-xl pt-8 p-5 flex flex-col gap-3">
                            <DescriptionText
                                name="First Name"
                                value={data.first_name}
                                type="justify-between"
                                size="med"
                            />

                            <DescriptionText
                                name="Last Name"
                                value={data.last_name}
                                type="justify-between"
                                size="med"
                            />


                            <DescriptionText
                                name="Email"
                                value={data.email}
                                type="justify-between"
                                size="med"
                            />

                            <DescriptionText
                                name="Joined SigmaFit on"
                                value={new Date(data.created_time).toDateString()}
                                type="justify-between"
                                size="med"
                            />

                            <DescriptionText
                                name="Google Account Connected"
                                value={data.is_google_connected ? <CheckIcon className="text-green-500 w-4" /> : <XIcon className="text-red-500 w-4" />}
                                type="justify-between"
                                size="med"
                            />
                            <DescriptionText
                                name="GitHub Account Connected"
                                value={data.is_github_connected ? <CheckIcon className="text-green-500 w-4" /> : <XIcon className="text-red-500 w-4" />}
                                type="justify-between"
                                size="med"
                            />
                            <DescriptionText
                                name="Twitter Account Connected"
                                value={data.is_twitter_connected ? <CheckIcon className="text-green-500 w-4" /> : <XIcon className="text-red-500 w-4" />}
                                type="justify-between"
                                size="med"
                            />
                        </div>



                    </div>
                }

            </div>
        </div>
    )
}

export default withAuthHOC(Profile)
