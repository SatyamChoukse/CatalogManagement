import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from './ui/sidebar'
import NavMain from './NavMain'
import NavUser from './NavUser'
import { Blocks, GalleryVerticalEnd, LayoutDashboard,  Notebook, Package, ReceiptText, ShoppingBag, User, Users } from 'lucide-react'
import NavProjects from './NavProjects'
import TeamSwitcher from './TeamSwitcher'

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams:
    {
        name: "CatalogManagement",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
    }
    ,
    // navMain: [
    //     {
    //         title: "Playground",
    //         url: "#",
    //         icon: SquareTerminal,
    //         isActive: true,
    //         items: [
    //             {
    //                 title: "History",
    //                 url: "#",
    //             },
    //             {
    //                 title: "Starred",
    //                 url: "#",
    //             },
    //             {
    //                 title: "Settings",
    //                 url: "#",
    //             },
    //         ],
    //     },
    //     {
    //         title: "Models",
    //         url: "#",
    //         icon: Bot,
    //         items: [
    //             {
    //                 title: "Genesis",
    //                 url: "#",
    //             },
    //             {
    //                 title: "Explorer",
    //                 url: "#",
    //             },
    //             {
    //                 title: "Quantum",
    //                 url: "#",
    //             },
    //         ],
    //     },
    //     {
    //         title: "Documentation",
    //         url: "#",
    //         icon: BookOpen,
    //         items: [
    //             {
    //                 title: "Introduction",
    //                 url: "#",
    //             },
    //             {
    //                 title: "Get Started",
    //                 url: "#",
    //             },
    //             {
    //                 title: "Tutorials",
    //                 url: "#",
    //             },
    //             {
    //                 title: "Changelog",
    //                 url: "#",
    //             },
    //         ],
    //     },
    //     {
    //         title: "Settings",
    //         url: "#",
    //         icon: Settings2,
    //         items: [
    //             {
    //                 title: "General",
    //                 url: "#",
    //             },
    //             {
    //                 title: "Team",
    //                 url: "#",
    //             },
    //             {
    //                 title: "Billing",
    //                 url: "#",
    //             },
    //             {
    //                 title: "Limits",
    //                 url: "#",
    //             },
    //         ],
    //     },
    // ],
    projects: [
        {
            name: "Dashboard",
            url: "#",
            icon: LayoutDashboard,
        },
        {
            name: "Category",
            url: "#",
            icon: Blocks,
        },
        {
            name: "Employee",
            url: "#",
            icon: User,
        },
        {
            name: "Vendor",
            url: "#",
            icon: Users,
        },
        {
            name: "Product",
            url: "#",
            icon: Package,
        },
        {
            name: "Specification",
            url: "#",
            icon: Notebook,
        },
        {
            name: "Order",
            url: "#",
            icon: ShoppingBag,
        },
        {
            name: "Bill",
            url: "#",
            icon: ReceiptText,
        },
    ],
}

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                {/* <NavMain items={data.navMain} /> */}
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

export default AppSidebar