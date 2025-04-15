import FormLogin from "@/components/layout/FormLogin";

const Login = () => {

    return (
        <div className="cust-outer-container w-full flex justify-center items-center h-screen relative">
            <div className="w-10/12 sm:w-8/12 md:w-96 h-fit px-4 pb-3 pt-6 z-40 bg-custLight/40 shadow-lg  bg-opacity-70 rounded-lg flex items-center justify-center relative">
                <div className="flex flex-col items-center gap-10 w-full">
                    <div className="grid">
                        <h1 className="font-semibold text-center text-custPurple text-xl">
                            Frontend Development Test - PSN
                        </h1>
                        <p className="text-sm text-center">
                            Enter your username and password to login
                        </p>
                    </div>
                    <FormLogin />
                </div>
            </div>
        </div>
    );
}

export default Login;