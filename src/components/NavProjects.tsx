import { Folder, Forward, LucideIcon, MoreHorizontal, Trash2 } from 'lucide-react'
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, useSidebar } from './ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'

function NavProjects({
    projects,
}: {
    projects: {
        name: string
        url: string
        icon: LucideIcon
    }[]
}) {
    const { isMobile } = useSidebar()
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
                {projects.map((item) => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild>
                            <a href={item.url}>
                                <item.icon />
                                <span>{item.name}</span>
                            </a>
                        </SidebarMenuButton>
                      
                    </SidebarMenuItem>
                ))}
               
            </SidebarMenu>
        </SidebarGroup>
    )
}

export default NavProjects