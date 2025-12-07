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
                        className={'shadow-none text-secondary hover:bg-card/60 hover:text-foreground'}
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft strokeWidth={1} className={`'text-secondary `}/>
                    </Button>
                )}
                <div>
                    {
                        subTitle && <small className={`text-xs font-light block leading-tight text-secondary`}>{subTitle}</small>
                    }
                    <h3 className="text-lg capitalize font-medium leading-tight">{title}</h3>
                </div>

            </div>

            <div className="flex gap-2 items-center">
                {actions}

                {secondaryButton && (
                    <Button
                        className={`bg-muted font-md border-none text-xs rounded-sm text-foreground font-normal shadow-none hover:bg-primary/5 hover:text-foreground`}
                        variant={secondaryButton.variant ?? "outline"}
                        onClick={secondaryButton.onClick}

                    >
                        {secondaryButton.label}
                    </Button>
                )}

                {primaryButton && (
                    <Button
                        className={'rounded-sm shadow-none text-xs'}
                        variant={primaryButton.variant ?? "default"}
                        onClick={primaryButton.onClick}

                    >
                        {primaryButton.label}
                    </Button>
                )}
            </div>
        </div>
    );
}
