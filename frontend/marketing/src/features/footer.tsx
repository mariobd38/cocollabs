import Logo from '@/assets/logo';


export default function Footer() {

    return (
        <footer className="w-full border-t bg-white py-6 font-['Geist']">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <div className="w-32">
                        <Logo />
                    </div>
                </div>
                <p className="text-center text-sm text-gray-500 md:text-left">
                    © {new Date().getFullYear()} Cocollabs Platform. All rights reserved.
                </p>
                <div className="flex gap-4">
                    <a href="/#" className="text-sm text-gray-500 hover:text-gray-900">
                    Terms
                    </a>
                    <a href="/#" className="text-sm text-gray-500 hover:text-gray-900">
                    Privacy
                    </a>
                    <a href="/#" className="text-sm text-gray-500 hover:text-gray-900">
                    Contact
                    </a>
                </div>
            </div>
        </footer>
    );
}
