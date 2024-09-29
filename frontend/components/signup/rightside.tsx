import SignupForm from './signupform';

export default function RightSide() {
    return (
        <>
            <div className="p-4 md:p-8 lg:p-0">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 mb-[42px]">Register</h2>
                <div className="max-w-lg mb-[24px] space-y-[24px] flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800">Manage all your renting/rents efficiently</h3>
                    <span className='text-gray-500'>
                    Let’s get you all set up so you can verify your personal account and begin setting up your profile. 
                    </span>
                </div>
                <div className='w-full max-w-lg'>
                    <SignupForm />
                </div>
            </div>
        </>
    );
}
