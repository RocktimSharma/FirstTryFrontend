import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import {useNavigate} from "react-router-dom";

interface PageSubHeaderProps {
    title: string;
    subTitle?: string;
    showBack?: boolean;

    // Primary and secondary buttons
    primaryButton?: {
        label: string;
        onClick: () => void;
        variant?: "default" | "outline" | "destructive";
    };
    secondaryButton?: {
        label: string;
        onClick: () => void;
        variant?: "default" | "outline" | "destructive";
    };

    // Extra custom actions
    actions?: React.ReactNode;

    className?: string;
}

export function PageSubHeader({
                                  title,
                                  subTitle,
                                  showBack = true,

                                  primaryButton,
                                  secondaryButton,

                                  actions,
                                  className = "",
                              }: PageSubHeaderProps) {
    const navigate = useNavigate();

    return (
        <div
            className={`flex items-center justify-between  py-4 ${className}`}
        >
            <div className="flex items-center gap-2">
                {showBack && (
                    <Button
                        variant="outline"
                        size="icon"
                        className={'shadow-none bg-secondary text-secondary-foreground hover:bg-muted hover:text-muted-foreground'}
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft strokeWidth={1.5} />
                    </Button>
                )}
                <div>
                    {
                        subTitle && <small className={`block text-xs font-light leading-tight text-muted-foreground`}>{subTitle}</small>
                    }
                    <h3 className="sm:text-md md:text-lg capitalize font-medium leading-tight">{title}</h3>
                </div>

            </div>

            <div className="space-x-2 items-center">
                {actions}

                {secondaryButton && (
                    <Button
                        //className={`bg-muted font-md border-none text-xs rounded-sm text-foreground font-normal shadow-none hover:bg-primary/5 hover:text-foreground`}
                        variant={secondaryButton.variant ?? "outline"}
                        className={`bg-secondary shadow-none text-secondary-foreground hover:bg-muted hover:text-muted-foreground text-xs`}
                        onClick={secondaryButton.onClick}

                    >
                        <span className={'md:hidden'}>
                                  Draft
                        </span>
                        <span className={'hidden md:flex'}>
                                  {secondaryButton.label}
                        </span>
                    </Button>
                )}

                {primaryButton && (
                    <Button
                        className={'rounded-sm shadow-none text-xs'}
                        variant={primaryButton.variant ?? "default"}
                        onClick={primaryButton.onClick}

                    >

                        <span className={'md:hidden'}>
                                 Save
                        </span>
                        <span className={'hidden md:flex'}>
                              {primaryButton.label}
                        </span>
                    </Button>
                )}
            </div>
        </div>
    );
}
