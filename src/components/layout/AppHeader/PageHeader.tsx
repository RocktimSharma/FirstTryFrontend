
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@components/ui/breadcrumb"
import {Link, useLocation} from "react-router-dom"

const PageHeader = () => {
    const location = useLocation()
    const pathnames = location.pathname.split("/").filter(Boolean)
    console.log(pathnames)
    // Page title should always be the 2nd part of the URL (e.g. /dashboard/users → "Users")
    const pageTitle =
        pathnames.length >= 1 ? formatBreadcrumb(pathnames[0]) : "Dashboard"

    return (
        <div className="flex flex-col">
            {/* Page Title */}
            <h2 className="text-2xl font-medium capitalize leading-tight">{pageTitle}</h2>

            {/* Breadcrumb Navigation */}
            <div className="hidden md:block">
                <Breadcrumb className={''}>
                    <BreadcrumbList>
                        {/* Always start with Dashboard */}
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link className={`!text-muted-foreground text-xs !font-light`} to="/">Dashboard</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        {/* Show second part (if exists) */}
                        {pathnames.length >= 1 && (
                            <>
                                <BreadcrumbSeparator/>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className={'text-xs'}>{formatBreadcrumb(pathnames[0])}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    )
}

// Utility: "user-profile" → "User Profile"
const formatBreadcrumb = (str: string) =>
    str.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())

export default PageHeader
