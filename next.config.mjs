

/** @type {import('next').NextConfig} */
const nextConfig = {
    //add images outside of next 
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tailus.io'
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com'
            }
        ]
    }
};

export default nextConfig;
