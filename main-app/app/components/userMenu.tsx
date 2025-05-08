import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CreditCard, Keyboard, LogOut, Palette, Plus, Settings, User, Users } from 'lucide-react';
import { useClerk } from '@clerk/nextjs';
import { Switch } from './ui/switch';
import { useTheme } from 'next-themes';


type UserMenuProps = {
  trigger: React.ReactNode;
};

export function UserMenu({ trigger }: UserMenuProps) {
  const { signOut } = useClerk()
  const { setTheme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = React.useState(resolvedTheme === 'dark');

  React.useEffect(() => {
    setIsDark(resolvedTheme === 'dark');
  }, [resolvedTheme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
      className="duration-200 w-[300px]"
      side='left'
      align='end'
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>

              <Palette />
              <span>Dark theme</span>
            </div>
            <Switch
              id="theme-mode-switch"
              checked={isDark}
              onCheckedChange={(checked) => {
                setTheme(checked ? 'dark' : 'light');
              }}
            />
            
            {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard />
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
              <Users />
              <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Plus />
            <span>New Team</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={()  => signOut({ redirectUrl: '/login' })}>
          <LogOut />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;