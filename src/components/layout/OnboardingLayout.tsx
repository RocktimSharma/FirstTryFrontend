import { Outlet, useLocation } from 'react-router-dom';
import OnboardingProgressBar from "@features/onboard/components/OnboardingProgressBar.tsx";



export default function OnboardingLayout() {
    const location = useLocation();

    // 1. Dynamically resolve section titles and sub-descriptions
    const getHeaderMeta = () => {
        if (location.pathname.includes('company')) {
            return {
                title: "Tell us about your organization",
                description: "Configure your legal corporate identity, currency parameters, and global settings."
            };
        }
        if (location.pathname.includes('profile')) {
            return {
                title: "Tell us about your business vertical",
                description: "Select your industry specialization to optimize forms, inventory rules, and tracking schemas."
            };
        }
        if (location.pathname.includes('operations')) {
            return {
                title: "Configure your primary operational hub",
                description: "Set up your first business unit and physical branch location to process transactions."
            };
        }
        if (location.pathname.includes('collaborators')) {
            return {
                title: "Invite your operational team members",
                description: "Add key collaborators, cashiers, or branch managers to clear bottleneck operations (Skipable)."
            };
        }
        return { title: "Workspace Onboarding", description: "Please complete the setup steps below." };
    };

    // 2. Dynamically calculate progress percentage based on the active sub-route path
    const getPercent = () => {
        if (location.pathname.includes('company')) return 25;
        if (location.pathname.includes('profile')) return 50;
        if (location.pathname.includes('operations')) return 75;
        if (location.pathname.includes('collaborators')) return 100;
        return 0;
    };

    const { title, description } = getHeaderMeta();

    return (
        <div className="flex min-h-screen bg-slate-50 text-slate-900">
            {/* Sticky Left Stepper Column — Stays mounted permanently */}
            {/*<SidebarStepper currentPath={location.pathname} />*/}

            {/* Right Canvas Main Layout Wrapper */}
            <div className="flex flex-1 flex-col">

                {/* Sticky Top Bar for Header Meta and Progress Line */}
                <header className="border-b bg-white px-8 py-6 shadow-sm">
                    <div className="max-w-4xl mx-auto w-full flex flex-col gap-4">

                        {/* Dynamic Typography Zone */}
                        <div className="flex flex-col gap-1">
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl transition-all duration-200">
                                {title}
                            </h1>
                            <p className="text-sm text-slate-500">
                                {description}
                            </p>
                        </div>

                        {/* Progress Line */}
                        <div className="w-full mt-2">
                            <OnboardingProgressBar percentage={getPercent()} />
                        </div>

                    </div>
                </header>

                {/* Scrollable Container for Step Component Content */}
                <main className="flex-1 p-8 max-w-4xl mx-auto w-full">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8 animate-fadeIn">
                        {/* ◄── Nested sub-step form views swap out here automatically inside a clean white card wrapper ── */}
                        <Outlet />
                    </div>
                </main>

            </div>
        </div>
    );
}