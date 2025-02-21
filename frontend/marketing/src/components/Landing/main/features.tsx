
import { CardHoverEffectComp } from '@/components/ui/CardHoverEffect/cardHoverEffectComp';

const Features: React.FC = () => {
    return (
        <div className='container sm:px-5 lg:px-0 pb-10 md:pt-40'>
            <div className='flex flex-col px-2.5 gap-6'>
                <h1 className='text-zinc-200 text-3xl font-semibold text-center md:text-4xl transition-all duration-500 ease font-["Helvetica"]'>Your developer journey starts here</h1>
                <h2 className='text-muted-foreground text-base text-center md:text-xl transition-all duration-500 ease font-["Helvetica"]'>Explore new opportunities, collaborate with experts, and create impactful projects together</h2>
            </div>
            <CardHoverEffectComp />
        </div>
    );
};

export default Features;