import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error: unknown = useRouteError();
    if (isRouteErrorResponse(error)) {
        return (
            <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-4xl pb-3 font-semibold tracking-tight text-balance text-white sm:text-4xl'>{error?.status}</h1>
                    <p className='text-md font-semibold tracking-tight text-balance text-gray-500 sm:text-md'>{error.data}</p>
                </div>
            </div>
        )
    }
    return (
        <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-4xl pb-3 font-semibold tracking-tight text-balance text-white sm:text-4xl'>500</h1>
                <p className='text-xl font-semibold tracking-tight text-balance text-gray-500 sm:text-lx'>Something Went Wrong, Try Again Leter!</p>
            </div>
        </div>
    )
}

export default ErrorPage